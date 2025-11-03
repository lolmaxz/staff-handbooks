import React, { createContext, useContext, useRef } from "react";
import styles from "./DiscordConversation.module.css";

interface DiscordConversationContextType {
  getNextTimestamp: () => string;
  registerMessage: (authorName: string) => { position: number; isContinuation: boolean };
}

const DiscordConversationContext = createContext<DiscordConversationContextType | null>(null);

// Discord embed avatar URLs for default profiles
const DISCORD_AVATARS = [
  "https://cdn.discordapp.com/embed/avatars/0.png",
  "https://cdn.discordapp.com/embed/avatars/1.png",
  "https://cdn.discordapp.com/embed/avatars/2.png",
  "https://cdn.discordapp.com/embed/avatars/3.png",
  "https://cdn.discordapp.com/embed/avatars/4.png",
];

// Helper to get avatar URL based on name pattern
// This ensures consistent avatar assignment - the same name always gets the same avatar
function getAvatarFromName(name: string, providedAvatar?: string): string {
  // If avatar is explicitly provided, use it
  if (providedAvatar) {
    return providedAvatar;
  }

  // Normalize the name for consistent matching (trim and lowercase)
  const normalizedName = name.trim().toLowerCase();

  // Check for moderator patterns: "moderator 1", "moderator1", "moderator-1", etc.
  const moderatorMatch = normalizedName.match(/moderator\s*[_-]?(\d+)/);
  if (moderatorMatch) {
    const number = parseInt(moderatorMatch[1], 10);
    const index = (number - 1) % DISCORD_AVATARS.length;
    return DISCORD_AVATARS[index];
  }

  // Check for other patterns like "user 1", "member 1", "staff 1", "admin 1", etc.
  const numberMatch = normalizedName.match(/(user|member|staff|admin)\s*[_-]?(\d+)/);
  if (numberMatch) {
    const prefix = numberMatch[1]; // "user", "member", "staff", or "admin"
    const number = parseInt(numberMatch[2], 10);

    // Assign prefix-specific starting offsets to ensure different prefixes get different avatars
    // This ensures "member 1" gets a different avatar than "moderator 1"
    // Moderator pattern already uses 0-4, so we offset others to avoid conflicts
    let prefixOffset = 0;
    if (prefix === "user") prefixOffset = 1; // Start at avatar 1
    else if (prefix === "member") prefixOffset = 2; // Start at avatar 2
    else if (prefix === "staff") prefixOffset = 3; // Start at avatar 3
    else if (prefix === "admin") prefixOffset = 4; // Start at avatar 4

    // Use prefix offset as base, then cycle through based on number
    // This ensures unique avatars: member 1 = avatar 2, member 2 = avatar 3, etc.
    const index = (prefixOffset + number - 1) % DISCORD_AVATARS.length;
    return DISCORD_AVATARS[index];
  }

  // Default: use deterministic hash of normalized name to pick consistent avatar
  // This ensures the same name always maps to the same avatar across all conversations
  let hash = 0;
  for (let i = 0; i < normalizedName.length; i++) {
    hash = (hash << 5) - hash + normalizedName.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  const index = Math.abs(hash) % DISCORD_AVATARS.length;
  return DISCORD_AVATARS[index];
}

// Helper to generate a timestamp string
function generateTimestamp(minutesOffset: number = 0): string {
  const now = new Date();
  const messageTime = new Date(now.getTime() - minutesOffset * 60000);
  const hours = messageTime.getHours();
  const minutes = messageTime.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, "0");
  return `${displayHours}:${displayMinutes} ${ampm}`;
}

interface Reaction {
  emoji: string;
  count: number;
  selected?: boolean; // Whether this reaction is selected (appears blue-ish)
}

interface DiscordMessageProps {
  name: string;
  color?: string;
  avatar?: string;
  message?: React.ReactNode;
  children?: React.ReactNode;
  timestamp?: string;
  minutesOffset?: number;
  reactions?: Reaction[]; // Up to 4 reactions
  highlighted?: boolean; // Yellow-ish full-width background
}

// Helper to check if message contains @moderator (case-insensitive)
function containsModeratorMention(content: React.ReactNode): boolean {
  if (typeof content === "string") {
    return /@moderator/i.test(content);
  }

  // For React elements, recursively check children
  if (React.isValidElement(content)) {
    if (content.props.children) {
      if (typeof content.props.children === "string") {
        return /@moderator/i.test(content.props.children);
      }
      if (Array.isArray(content.props.children)) {
        return content.props.children.some((child: React.ReactNode) => containsModeratorMention(child));
      }
      return containsModeratorMention(content.props.children);
    }
  }

  return false;
}

// Helper to recursively process message content and style @mentions
function processMessageContent(content: React.ReactNode): React.ReactNode {
  if (typeof content === "string") {
    // Parse into paragraphs and UL blocks based on lines
    const lines = content.replace(/\r\n?/g, "\n").split("\n");
    const blocks: React.ReactNode[] = [];

    let listItems: string[] = [];
    let paragraphBuffer: string[] = [];

    const flushParagraph = () => {
      if (paragraphBuffer.length > 0) {
        const text = paragraphBuffer.join("\n");
        // Style mentions inside paragraph
        const styled = styleMentions(text);
        blocks.push(<p key={`p-${blocks.length}`}>{styled}</p>);
        paragraphBuffer = [];
      }
    };

    const flushList = () => {
      if (listItems.length > 0) {
        blocks.push(
          <ul key={`ul-${blocks.length}`} className={styles.messageList}>
            {listItems.map((item, idx) => (
              <li key={idx}>{styleMentions(item)}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    for (const rawLine of lines) {
      const line = rawLine.trimEnd();
      if (line.trim() === "") {
        // Empty line: end current block(s)
        flushList();
        flushParagraph();
        continue;
      }
      if (line.startsWith("- ")) {
        // Bullet item
        if (paragraphBuffer.length > 0) {
          flushParagraph();
        }
        listItems.push(line.slice(2));
      } else {
        // Normal text line
        if (listItems.length > 0) {
          flushList();
        }
        paragraphBuffer.push(line);
      }
    }

    // Flush remaining buffers
    flushList();
    flushParagraph();

    // If we built structured blocks, special-case single paragraph => return inline
    if (blocks.length === 1 && React.isValidElement(blocks[0]) && (blocks[0] as any).type === "p") {
      return (blocks[0] as any).props.children;
    }

    // If we built structured blocks, return them
    if (blocks.length > 0) {
      return <>{blocks}</>;
    }

    // Fallback to mention styling only
    return styleMentions(content);
  }

  // For React elements, recursively process children
  if (React.isValidElement(content)) {
    if (typeof content.props.children === "string") {
      return React.cloneElement(content, {
        ...content.props,
        children: processMessageContent(content.props.children),
      });
    }
    if (content.props.children) {
      const childrenArray = Array.isArray(content.props.children) ? content.props.children : [content.props.children];
      return React.cloneElement(content, {
        ...content.props,
        children: childrenArray.map((child: React.ReactNode) => processMessageContent(child)),
      });
    }
  }

  return content;
}

// Style @mentions inside a string by wrapping with span. Keeps original newlines using <br/>
function styleMentions(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const mentionRegex = /(@\w+)/g;

  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = mentionRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(renderWithLineBreaks(text.substring(lastIndex, match.index), key++));
    }
    parts.push(
      <span key={`m-${key++}`} className="mention">
        {match[0]}
      </span>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(renderWithLineBreaks(text.substring(lastIndex), key++));
  }
  return <>{parts}</>;
}

function renderWithLineBreaks(fragment: string, keyBase: number): React.ReactNode {
  const pieces = fragment.split("\n");
  return (
    <>
      {pieces.map((p, idx) => (
        <React.Fragment key={`${keyBase}-${idx}`}>
          {p}
          {idx < pieces.length - 1 ? <br /> : null}
        </React.Fragment>
      ))}
    </>
  );
}

export function DiscordMessage({
  name,
  color = "#ffffff",
  avatar,
  message,
  children,
  timestamp,
  minutesOffset,
  reactions,
  highlighted,
}: DiscordMessageProps) {
  const context = useContext(DiscordConversationContext);

  // Always register message to check for continuation, regardless of timestamp
  let isContinuation = false;
  if (context) {
    const info = context.registerMessage(name);
    isContinuation = info.isContinuation;
  }

  // Auto-generate timestamp if not provided
  let displayTimestamp: string | undefined = timestamp;

  if (!timestamp) {
    if (minutesOffset !== undefined) {
      displayTimestamp = generateTimestamp(minutesOffset);
    } else if (context) {
      displayTimestamp = context.getNextTimestamp();
    } else {
      displayTimestamp = generateTimestamp(0);
    }
  }

  // Get avatar URL (auto-assign if name matches pattern)
  const avatarUrl = getAvatarFromName(name, avatar);

  // Limit reactions to 4
  const displayReactions = reactions?.slice(0, 4) || [];

  // Resolve content from children first, then message prop
  const content: React.ReactNode = children ?? message ?? "";

  // Auto-detect @moderator mention and highlight
  const shouldHighlight = highlighted !== undefined ? highlighted : containsModeratorMention(content);

  return (
    <div
      className={`${styles.message} ${shouldHighlight ? styles.messageHighlighted : ""} ${
        isContinuation ? styles.messageContinuation : ""
      }`}
    >
      <div className={styles.avatarContainer}>{!isContinuation && <img src={avatarUrl} alt={name} className={styles.avatar} />}</div>
      <div className={styles.messageContent}>
        {!isContinuation && (
          <div className={styles.messageHeader}>
            <span className={styles.username} style={{ color }}>
              {name}
            </span>
            {displayTimestamp && <span className={styles.timestamp}>{displayTimestamp}</span>}
          </div>
        )}
        <div className={styles.messageBody}>{processMessageContent(content)}</div>
        {displayReactions.length > 0 && (
          <div className={styles.reactions}>
            {displayReactions.map((reaction, index) => (
              <div key={index} className={`${styles.reaction} ${reaction.selected ? styles.reactionSelected : ""}`}>
                <span className={styles.reactionEmoji}>{reaction.emoji}</span>
                <span className={styles.reactionCount}>{reaction.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface DiscordConversationProps {
  title?: string;
  children: React.ReactNode;
}

export default function DiscordConversation({ title = "Discord Conversation", children }: DiscordConversationProps) {
  const messageIndexRef = useRef(0);
  const totalMessagesRef = useRef(0);
  const lastAuthorRef = useRef<string | null>(null);
  const messagePositionsRef = useRef<number[]>([]);

  // First pass: count messages and store positions
  const countMessages = () => {
    let count = 0;
    React.Children.forEach(children, () => {
      count++;
    });
    return count;
  };

  const totalMessages = countMessages();
  totalMessagesRef.current = totalMessages;

  const registerMessage = (authorName: string) => {
    const position = messageIndexRef.current;
    const isContinuation = lastAuthorRef.current === authorName;
    lastAuthorRef.current = authorName;
    messagePositionsRef.current.push(position);
    messageIndexRef.current++;
    return { position, isContinuation };
  };

  const getNextTimestamp = () => {
    // Calculate offset: earlier messages (position 0) should have higher offsets
    // Last message should have offset 0 (most recent)
    const position = messageIndexRef.current - 1; // Current position (already incremented)
    const total = totalMessagesRef.current || messageIndexRef.current;
    const minutesOffset = (total - 1 - position) * 2; // 2 minutes between messages
    return generateTimestamp(minutesOffset);
  };

  const contextValue: DiscordConversationContextType = {
    getNextTimestamp,
    registerMessage,
  };

  // Reset counter when component mounts
  React.useEffect(() => {
    messageIndexRef.current = 0;
    totalMessagesRef.current = 0;
    lastAuthorRef.current = null;
    messagePositionsRef.current = [];
  }, []);

  return (
    <DiscordConversationContext.Provider value={contextValue}>
      <div className={styles.conversationWrapper}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>💬</div>
          <span className={styles.headerTitle}>{title}</span>
        </div>
        <div className={styles.conversation}>{children}</div>
      </div>
    </DiscordConversationContext.Provider>
  );
}
