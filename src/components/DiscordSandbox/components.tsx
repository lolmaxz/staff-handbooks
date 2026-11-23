import React, { useEffect, useRef, useState } from "react";
import { DiscordMarkdown, EmojiText } from "./markdown";
import type {
  SandboxActionRow,
  SandboxButton,
  SandboxContainer,
  SandboxContainerChild,
  SandboxEmbed,
  SandboxMember,
  SandboxMessage,
  SandboxModal,
  SandboxSelect,
  SandboxTopComponent,
} from "./types";
import styles from "./DiscordSandbox.module.css";

export interface ComponentHandlers {
  isLoading(messageId: string, customId: string): boolean;
  onButton(message: SandboxMessage, button: SandboxButton): void;
  onSelect(message: SandboxMessage, select: SandboxSelect, values: string[]): void;
}

const LINK_ICON = (
  <svg className={styles.linkIcon} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M15 2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V4.41l-4.3 4.3a1 1 0 1 1-1.4-1.42L19.58 3H16a1 1 0 0 1-1-1Z" />
    <path fill="currentColor" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 1 0-2 0v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 1 0 0-2H5Z" />
  </svg>
);

const CHEVRON = (
  <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41Z" />
  </svg>
);

const CHECK = (
  <svg className={styles.check} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z" />
  </svg>
);

export function LoadingDots() {
  return (
    <span className={styles.dots} aria-label="Loading">
      <span />
      <span />
      <span />
    </span>
  );
}

function ButtonView({ message, button, handlers }: { message: SandboxMessage; button: SandboxButton; handlers: ComponentHandlers }) {
  const loading = Boolean(button.customId && handlers.isLoading(message.id, button.customId));
  return (
    <button
      type="button"
      className={`${styles.btn} ${styles[`btn_${button.style}`]} ${loading ? styles.btnLoading : ""}`}
      disabled={button.disabled}
      onClick={() => handlers.onButton(message, button)}
    >
      <span className={styles.btnInner} style={loading ? { visibility: "hidden" } : undefined}>
        {button.emoji ? (
          <span className={styles.btnEmoji}>
            <EmojiText value={button.emoji} />
          </span>
        ) : null}
        {button.label ? <span>{button.label}</span> : null}
        {button.style === "link" ? LINK_ICON : null}
      </span>
      {loading ? (
        <span className={styles.btnSpinner}>
          <LoadingDots />
        </span>
      ) : null}
    </button>
  );
}

function SelectView({ message, select, handlers }: { message: SandboxMessage; select: SandboxSelect; handlers: ComponentHandlers }) {
  const multi = (select.maxValues ?? 1) > 1;
  const initial = select.options.filter((option) => option.default).map((option) => option.value);
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<string[]>(initial);
  const rootRef = useRef<HTMLDivElement>(null);
  const loading = handlers.isLoading(message.id, select.customId);
  const initialKey = initial.join("|");

  useEffect(() => {
    setPicked(initialKey ? initialKey.split("|") : []);
  }, [initialKey, message]);

  const commit = (values: string[]) => {
    const min = select.minValues ?? 1;
    if (values.length < min) {
      setPicked(initialKey ? initialKey.split("|") : []);
      return;
    }
    if (values.join("|") === initialKey && multi) return;
    handlers.onSelect(message, select, values);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
        if (multi) commit(picked);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  });

  const chosen = select.options.filter((option) => picked.includes(option.value));

  return (
    <div className={styles.selectRoot} ref={rootRef}>
      <button
        type="button"
        className={`${styles.select} ${open ? styles.selectOpen : ""}`}
        disabled={select.disabled || loading}
        onClick={() => {
          if (open && multi) commit(picked);
          setOpen(!open);
        }}
      >
        <span className={styles.selectValue}>
          {loading ? (
            <LoadingDots />
          ) : chosen.length ? (
            chosen.map((option) => (
              <span key={option.value} className={styles.selectChosen}>
                {option.emoji ? <EmojiText value={option.emoji} /> : null} {option.label}
              </span>
            ))
          ) : (
            <span className={styles.placeholder}>{select.placeholder ?? "Make a selection"}</span>
          )}
        </span>
        {CHEVRON}
      </button>
      {open ? (
        <div className={styles.selectMenu} role="listbox">
          {select.options.map((option) => {
            const on = picked.includes(option.value);
            return (
              <button
                type="button"
                role="option"
                aria-selected={on}
                key={option.value}
                className={`${styles.selectOption} ${on ? styles.selectOptionOn : ""}`}
                onClick={() => {
                  if (multi) {
                    const max = select.maxValues ?? 1;
                    setPicked((current) =>
                      current.includes(option.value) ? current.filter((v) => v !== option.value) : current.length >= max ? current : [...current, option.value],
                    );
                    return;
                  }
                  setOpen(false);
                  setPicked([option.value]);
                  handlers.onSelect(message, select, [option.value]);
                }}
              >
                {option.emoji ? (
                  <span className={styles.selectEmoji}>
                    <EmojiText value={option.emoji} />
                  </span>
                ) : null}
                <span className={styles.selectText}>
                  <span className={styles.selectLabel}>{option.label}</span>
                  {option.description ? <span className={styles.selectDesc}>{option.description}</span> : null}
                </span>
                {multi ? <span className={`${styles.checkbox} ${on ? styles.checkboxOn : ""}`}>{on ? CHECK : null}</span> : on ? CHECK : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function RowView({ message, row, handlers }: { message: SandboxMessage; row: SandboxActionRow; handlers: ComponentHandlers }) {
  return (
    <div className={styles.actionRow}>
      {row.components.map((component, index) =>
        component.type === "select" ? (
          <SelectView key={`${component.customId}-${index}`} message={message} select={component} handlers={handlers} />
        ) : (
          <ButtonView key={`${component.customId ?? component.label}-${index}`} message={message} button={component} handlers={handlers} />
        ),
      )}
    </div>
  );
}

function ChildView({ message, child, handlers }: { message: SandboxMessage; child: SandboxContainerChild | SandboxTopComponent; handlers: ComponentHandlers }) {
  switch (child.type) {
    case "text":
      return (
        <div className={styles.textDisplay}>
          <DiscordMarkdown text={child.content} />
        </div>
      );
    case "separator":
      return <div className={`${styles.separator} ${child.spacing === "large" ? styles.separatorLarge : ""} ${child.divider === false ? styles.separatorBlank : ""}`} />;
    case "section":
      return (
        <div className={styles.section}>
          <div className={styles.sectionText}>
            {child.texts.map((text, index) => (
              <div key={index} className={styles.textDisplay}>
                <DiscordMarkdown text={text} />
              </div>
            ))}
          </div>
          {child.thumbnail ? <img className={styles.sectionThumb} src={child.thumbnail} alt="" /> : null}
          {child.button ? (
            <div className={styles.sectionButton}>
              <ButtonView message={message} button={child.button} handlers={handlers} />
            </div>
          ) : null}
        </div>
      );
    case "gallery":
      return (
        <div className={styles.gallery} data-count={Math.min(child.urls.length, 4)}>
          {child.urls.map((url) => (
            <img key={url} src={url} alt="" className={styles.galleryImage} />
          ))}
        </div>
      );
    case "row":
      return <RowView message={message} row={child} handlers={handlers} />;
    case "container":
      return <ContainerView message={message} container={child} handlers={handlers} />;
    default:
      return null;
  }
}

function ContainerView({ message, container, handlers }: { message: SandboxMessage; container: SandboxContainer; handlers: ComponentHandlers }) {
  return (
    <div
      className={`${styles.container} ${container.accentColor ? styles.containerAccent : ""}`}
      style={container.accentColor ? ({ ["--accent" as string]: container.accentColor } as React.CSSProperties) : undefined}
    >
      {container.children.map((child, index) => (
        <ChildView key={index} message={message} child={child} handlers={handlers} />
      ))}
    </div>
  );
}

function EmbedView({ embed }: { embed: SandboxEmbed }) {
  return (
    <div className={`${styles.container} ${styles.containerAccent}`} style={{ ["--accent" as string]: embed.color ?? "#1e1f22" } as React.CSSProperties}>
      <div className={styles.embedMain}>
        <div className={styles.embedBody}>
          {embed.title ? <div className={styles.embedTitle}>{embed.title}</div> : null}
          {embed.description ? (
            <div className={styles.textDisplay}>
              <DiscordMarkdown text={embed.description} />
            </div>
          ) : null}
          {embed.fields?.length ? (
            <div className={styles.embedFields}>
              {embed.fields.map((field, index) => (
                <div key={index} className={field.inline ? styles.embedFieldInline : styles.embedField}>
                  <div className={styles.embedFieldName}>{field.name}</div>
                  <div className={styles.textDisplay}>
                    <DiscordMarkdown text={field.value} />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {embed.thumbnail ? <img className={styles.sectionThumb} src={embed.thumbnail} alt="" /> : null}
      </div>
      {embed.image ? <img className={styles.galleryImage} src={embed.image} alt="" /> : null}
      {embed.footer ? <div className={styles.subtext}>{embed.footer}</div> : null}
    </div>
  );
}

export interface MessageViewProps {
  message: SandboxMessage;
  author: SandboxMember | undefined;
  continuation: boolean;
  highlighted: boolean;
  timeLabel: string;
  shortTime: string;
  handlers: ComponentHandlers;
  interactionUser?: SandboxMember;
  onDismiss(): void;
  onAuthorClick(): void;
  botName: string;
  nameColor?: string;
  roleIcon?: { src: string; name: string };
}

const EYE = (
  <svg className={styles.eyeIcon} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 5C5.65 5 2 12 2 12s3.65 7 10 7 10-7 10-7-3.65-7-10-7Zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
  </svg>
);

export const MessageView = React.memo(function MessageView({
  message,
  author,
  continuation,
  highlighted,
  timeLabel,
  shortTime,
  handlers,
  interactionUser,
  onDismiss,
  onAuthorClick,
  botName,
  nameColor,
  roleIcon,
}: MessageViewProps) {
  const roleColor = nameColor;
  const showHeader = !continuation || Boolean(message.interaction);
  return (
    <div
      className={`${styles.message} ${continuation && !message.interaction ? styles.messageContinuation : ""} ${highlighted ? styles.messageMention : ""} ${
        message.ephemeralFor ? styles.messageEphemeral : ""
      }`}
    >
      {message.interaction && interactionUser ? (
        <div className={styles.replyLine}>
          <span className={styles.replySpine} />
          <img className={styles.replyAvatar} src={interactionUser.avatar} alt="" />
          <span className={styles.replyName}>{interactionUser.displayName}</span>
          <span className={styles.replyText}>
            used <span className={styles.replyCommand}>/{message.interaction.commandName}</span>
          </span>
        </div>
      ) : null}
      <div className={styles.messageRow}>
        <div className={styles.gutter}>
          {showHeader ? (
            <img className={styles.avatar} src={author?.avatar} alt="" onClick={onAuthorClick} />
          ) : (
            <span className={styles.hoverTime}>{shortTime}</span>
          )}
        </div>
        <div className={styles.messageMain}>
          {showHeader ? (
            <div className={styles.messageHeader}>
              <span className={styles.authorName} style={roleColor ? { color: roleColor } : undefined} onClick={onAuthorClick} role="button" tabIndex={0}>
                {author?.displayName ?? "Unknown"}
              </span>
              {roleIcon ? <img className={styles.roleIcon} src={roleIcon.src} alt={roleIcon.name} title={roleIcon.name} /> : null}
              {author?.bot ? <span className={styles.appBadge}>APP</span> : null}
              <span className={styles.messageTime}>{timeLabel}</span>
            </div>
          ) : null}
          {message.thinking ? (
            <div className={styles.thinking}>
              <LoadingDots />
              <span>{botName} is thinking…</span>
            </div>
          ) : null}
          {message.content ? (
            <div className={styles.messageContent}>
              <DiscordMarkdown text={message.content} />
            </div>
          ) : null}
          {message.embeds?.map((embed, index) => (
            <EmbedView key={index} embed={embed} />
          ))}
          {message.components?.map((component, index) => (
            <ChildView key={index} message={message} child={component} handlers={handlers} />
          ))}
          {message.ephemeralFor ? (
            <div className={styles.ephemeralNote}>
              {EYE}
              <span>Only you can see this</span>
              <span aria-hidden="true">•</span>
              <button type="button" className={styles.dismiss} onClick={onDismiss}>
                Dismiss message
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* Modal                                                               */
/* ------------------------------------------------------------------ */

export function ModalView({
  modal,
  botAvatar,
  botName,
  onCancel,
  onSubmit,
}: {
  modal: SandboxModal;
  botAvatar: string;
  botName: string;
  onCancel(): void;
  onSubmit(values: Record<string, string>): void;
}) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const start: Record<string, string> = {};
    for (const component of modal.components) {
      if (component.type === "input") start[component.customId] = component.value ?? "";
    }
    return start;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const firstInput = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    firstInput.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const set = (id: string, value: string) => {
    setValues((current) => ({ ...current, [id]: value }));
    setErrors((current) => ({ ...current, [id]: "" }));
  };

  const submit = () => {
    const next: Record<string, string> = {};
    for (const component of modal.components) {
      if (component.type === "text") continue;
      const value = (values[component.customId] ?? "").trim();
      if (component.required && !value) next[component.customId] = "This field is required";
      else if (component.type === "input" && component.minLength && value && value.length < component.minLength) {
        next[component.customId] = `Must be at least ${component.minLength} characters long`;
      }
    }
    if (Object.values(next).some(Boolean)) {
      setErrors(next);
      return;
    }
    onSubmit(values);
  };

  let firstAssigned = false;

  return (
    <div className={styles.modalBackdrop} onMouseDown={(event) => event.target === event.currentTarget && onCancel()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label={modal.title}>
        <div className={styles.modalHeader}>
          <div className={styles.modalBot}>
            <img src={botAvatar} alt="" />
            <span>{botName}</span>
          </div>
          <div className={styles.modalTitle}>{modal.title}</div>
          <button type="button" className={styles.modalClose} onClick={onCancel} aria-label="Close">
            ✕
          </button>
        </div>
        <div className={styles.modalBody}>
          {modal.components.map((component, index) => {
            if (component.type === "text") {
              return (
                <div key={index} className={styles.modalText}>
                  <DiscordMarkdown text={component.content} />
                </div>
              );
            }
            const error = errors[component.customId];
            const label = (
              <div className={styles.modalLabel}>
                {component.label}
                {component.required ? <span className={styles.required}>*</span> : null}
                {error ? <span className={styles.modalError}> — {error}</span> : null}
              </div>
            );
            const description = component.description ? <div className={styles.modalDescription}>{component.description}</div> : null;
            if (component.type === "input") {
              const assignRef = !firstAssigned;
              firstAssigned = true;
              const common = {
                className: `${styles.modalInput} ${error ? styles.modalInputError : ""}`,
                value: values[component.customId] ?? "",
                maxLength: component.maxLength,
                placeholder: component.placeholder,
                onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(component.customId, event.target.value),
              };
              return (
                <label key={component.customId} className={styles.modalField}>
                  {label}
                  {description}
                  {component.style === "paragraph" ? (
                    <textarea {...common} rows={4} ref={assignRef ? (node) => (firstInput.current = node) : undefined} />
                  ) : (
                    <input
                      {...common}
                      ref={assignRef ? (node) => (firstInput.current = node) : undefined}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          submit();
                        }
                      }}
                    />
                  )}
                  {component.maxLength ? (
                    <span className={styles.modalCount}>
                      {(values[component.customId] ?? "").length}/{component.maxLength}
                    </span>
                  ) : null}
                </label>
              );
            }
            if (component.type === "radio") {
              return (
                <div key={component.customId} className={styles.modalField}>
                  {label}
                  {description}
                  <div className={styles.radioGroup}>
                    {component.options.map((option) => {
                      const on = values[component.customId] === option.value;
                      return (
                        <button
                          type="button"
                          key={option.value}
                          className={`${styles.radio} ${on ? styles.radioOn : ""}`}
                          onClick={() => set(component.customId, on ? "" : option.value)}
                        >
                          <span className={styles.radioDot} />
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            }
            return (
              <div key={component.customId} className={styles.modalField}>
                {label}
                {description}
                <label className={styles.fileDrop}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      set(component.customId, file ? URL.createObjectURL(file) : "");
                    }}
                  />
                  {values[component.customId] ? (
                    <img src={values[component.customId]} alt="" className={styles.filePreview} />
                  ) : (
                    <span>Click to pick an image (stays on your device)</span>
                  )}
                </label>
              </div>
            );
          })}
        </div>
        <div className={styles.modalFooter}>
          <button type="button" className={styles.modalCancel} onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className={`${styles.btn} ${styles.btn_primary}`} onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
