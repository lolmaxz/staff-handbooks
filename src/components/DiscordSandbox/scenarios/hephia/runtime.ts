/**
 * Hephia V2 event system, simulated.
 *
 * This is a port of hephia-v2's `/start-event` command and its interaction
 * handlers (signup, voting, +1, staff controls, status, reminders, feedback).
 * Wording and button layouts follow `lib/eventComponents.ts` so staff see what
 * Discord would show. Database calls are replaced with in-memory state.
 */
import type {
  ClockPreset,
  CommandInteraction,
  ComponentInteraction,
  ModalInteraction,
  SandboxActionRow,
  SandboxButton,
  SandboxContainer,
  SandboxContainerChild,
  SandboxInteraction,
  SandboxModal,
  SandboxPayload,
  SandboxSelectOption,
  ScenarioContext,
  ScenarioRuntime,
  SlashCommandDef,
} from "../../types";
import {
  CHANNEL,
  HEPHIA_LOVE,
  HEPHIA_YES,
  PC_ONLY_EMOJI,
  QUEST_EMOJI,
  ROLE,
  SETTINGS,
  VOLUNTEER_EVENT,
  VRC,
  WORLDS,
} from "./data";

/* ------------------------------------------------------------------ */
/* Constants (from the bot)                                            */
/* ------------------------------------------------------------------ */

const A = {
  SignUp: "eventsignup",
  ListAttendees: "eventlistattendees",
  CoHostSignup: "eventcohostsignup",
  SecuritySignup: "eventsecuritysignup",
  EndEvent: "eventendevent",
  RateEvent: "eventratebutton",
  FeedbackModal: "eventfeedbackmodal",
  ViewFeedback: "eventviewfeedback",
  ChangeVote: "eventchangevote",
  VoteWorldBtn: "eventvoteworldbtn",
  VoteSecondaryBtn: "eventvotesecondarybtn",
  VoteWorldSelect: "eventvoteworldselect",
  VoteSecondarySelect: "eventvotesecondaryselect",
  VoteConfirm: "eventvoteconfirm",
  VoteSkip: "eventvoteskip",
  VoteRemoveWorld: "eventvoteremoveworld",
  VoteRemoveSecondary: "eventvoteremovesecondary",
  UpdateDisplayName: "eventupdatedisplayname",
  NotifyBell: "eventnotifybell",
  PublicVrcName: "eventpublicvrcname",
  PlusOne: "eventplusone",
  PlusOneModal: "eventplusonemodal",
  PlusOneSelect: "eventplusoneselect",
  Scenario: "eventscenario",
  ScenarioCustomModal: "eventscenariomodal",
  HourReminder: "eventhourreminder",
  HourReminderModal: "eventhourremindermodal",
  Delay: "eventdelay",
  DelaySelect: "eventdelayselect",
  DoorOpenConfirm: "eventdooropenconfirm",
  DoorOpenCancel: "eventdooropencancel",
  StartFarConfirm: "eventstartfarconfirm",
  StartFarCancel: "eventstartfarcancel",
  StartVolunteerConfirm: "eventstartvolconfirm",
  StartVolunteerCancel: "eventstartvolcancel",
  VolunteerLink: "vrclinkstartlinking",
} as const;

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DEFAULT_DURATION = 120;
const MAX_START_LEAD_MS = 30 * HOUR;
const ROLEPLAY_CHANGE_WINDOW_MS = 10 * MINUTE;
const STARTING_SOON_MS = 20 * MINUTE;
const MAX_VOTE_OPTIONS = 25;
const BUTTON_LABEL_MAX = 80;
const ATTENDEES_PER_PAGE = 20;
const REMOVE_ID = "__remove__";
const NO_VOLUNTEER_EVENT = "none";
const STAFF_NOTICE_MS = 60_000;
const TIMESTAMP_RE = /<t:(\d+)(?::[tTdDfFR])?>/;
const WORLD_RE = /wrld_[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;

const DURATION_CHOICES = [
  { name: "1 hour", value: 60 },
  { name: "1.5 hours", value: 90 },
  { name: "2 hours (default)", value: 120 },
  { name: "2.5 hours", value: 150 },
  { name: "3 hours", value: 180 },
  { name: "3.5 hours", value: 210 },
  { name: "4 hours", value: 240 },
  { name: "4.5 hours", value: 270 },
  { name: "5 hours", value: 300 },
  { name: "5.5 hours", value: 330 },
  { name: "6 hours", value: 360 },
];

const STATUS_OPTIONS = [
  { value: "PATREON_DOOR_OPEN", label: "Patreon Door Open", emoji: "💎" },
  { value: "DOOR_OPEN", label: "Door Open", emoji: "🚪" },
  { value: "INSTANCE_FULL", label: "Instance Full", emoji: "🚫" },
  { value: "TECHNICAL_ISSUES", label: "Technical Issues", emoji: "🛠️" },
  { value: "DOOR_CLOSED", label: "Door Closed", emoji: "🔒" },
  { value: "CUSTOM", label: "Custom", emoji: "📝" },
] as const;

const DELAY_OPTIONS = [
  { label: "5 minutes", value: "5" },
  { label: "10 minutes", value: "10" },
  { label: "15 minutes", value: "15" },
  { label: "20 minutes", value: "20" },
  { label: "30 minutes", value: "30" },
  { label: "45 minutes", value: "45" },
  { label: "1 hour", value: "60" },
  { label: "1 hour 30 minutes", value: "90" },
  { label: "2 hours", value: "120" },
  { label: "3 hours", value: "180" },
];

/* ------------------------------------------------------------------ */
/* Model                                                               */
/* ------------------------------------------------------------------ */

type SecondaryType = "NONE" | "ROLEPLAY" | "BASIC";
type EventState = "ONGOING" | "DONE" | "CANCELLED";
type StatusValue = "AUTO" | (typeof STATUS_OPTIONS)[number]["value"];

interface WorldOption {
  id: string;
  label: string;
  worldId: string;
  capacity: number;
  questCompatible: boolean;
}

interface VoteOption {
  id: string;
  label: string;
}

type Volunteer = (typeof VOLUNTEER_EVENT.volunteers)[number];

interface HEvent {
  id: number;
  eventName: string;
  plannedDate: number;
  durationMinutes: number;
  hostId: string;
  channelId: string;
  state: EventState;
  worldVoteEnabled: boolean;
  worldOptions: WorldOption[];
  secondaryType: SecondaryType;
  secondaryOptions: VoteOption[];
  voteRequired: boolean;
  worldVoteMulti: boolean;
  roleplayVoteMulti: boolean;
  basicVoteMulti: boolean;
  customVoteText: string | null;
  isPatreonOnly: boolean;
  signupRoleId: string | null;
  attendeeGroup: 1 | 2 | null;
  groupCleared: boolean;
  hostVoteIds: string[];
  hostWorldVoteIds: string[];
  snapshot: { top: Array<{ optionId: string; label: string; worldId: string; count: number; questCompatible: boolean }>; winnerPcOnly: boolean } | null;
  publicStatus: StatusValue;
  customStatusText: string | null;
  publicStatusChangedAt: number | null;
  delayMinutes: number;
  hourReminderSentAt: number | null;
  hourReminderText: string | null;
  hourReminderAttachmentUrl: string | null;
  signupMessageId: string | null;
  listingMessageId: string | null;
  statusMessageId: string | null;
  eventPostMessageId: string | null;
  volunteerRoster: Volunteer[] | null;
  feedbackDeadline: number | null;
  notify: Set<string>;
  staffNotice: { text: string; at: number } | null;
  posted: boolean;
  soonSeen: boolean;
  startSeen: boolean;
}

interface Attendee {
  userId: string;
  vrcDisplayName: string;
  isActiveStaff: boolean;
  isSecurity: boolean;
  isPatreon: boolean;
  worldIds: string[];
  secondaryIds: string[];
  signupDate: number;
  guestOf: string | null;
}

interface SignupRole {
  isActiveStaff: boolean;
  isSecurity: boolean;
  isPatreon: boolean;
  vrcDisplayName: string;
}

interface Pending {
  world: string[];
  secondary: string[];
  mode: "signup" | "change" | "host";
  eventStaff: boolean;
  signupRole?: SignupRole;
}

interface Tracks {
  world: boolean;
  secondary: boolean;
}

interface Draft {
  userId: string;
  eventName: string;
  durationMinutes: number;
  startTimeUnix: number;
  startTimeSource: "option" | "post";
  worldVote: boolean;
  voteRequired: boolean;
  worldVoteMulti: boolean;
  roleplayVoteMulti: boolean;
  basicVoteMulti: boolean;
  customVoteText: string | null;
  isPatreonOnly: boolean;
  signupRoleId: string | null;
  portalEventId: string | null;
  secondaryType: SecondaryType;
  secondaryOptions: VoteOption[];
}

interface Tally {
  optionId: string;
  label: string;
  count: number;
}

/* ------------------------------------------------------------------ */
/* Small component helpers                                             */
/* ------------------------------------------------------------------ */

const text = (content: string): SandboxContainerChild => ({ type: "text", content });
const sep = (spacing: "small" | "large" = "small"): SandboxContainerChild => ({ type: "separator", spacing });
const row = (...components: SandboxActionRow["components"]): SandboxActionRow => ({ type: "row", components });
const button = (customId: string, label: string | undefined, style: SandboxButton["style"], emoji?: string, disabled?: boolean): SandboxButton => ({
  type: "button",
  customId,
  label,
  style,
  emoji,
  disabled,
});
const linkButton = (label: string, url: string): SandboxButton => ({ type: "button", label, style: "link", url });
const container = (children: SandboxContainerChild[], accentColor?: string): SandboxContainer => ({ type: "container", children, accentColor });
const simple = (content: string): SandboxPayload => ({ components: [container([text(content)])] });
const hex = (value: number) => `#${value.toString(16).padStart(6, "0")}`;

const unix = (ms: number) => Math.floor(ms / 1000);

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  const parts = [hours ? `${hours}h` : "", rest ? `${rest}m` : ""].filter(Boolean);
  return parts.length ? parts.join(" ") : `${minutes}m`;
}

function formatDelayDuration(minutes: number) {
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  const hourLabel = `${hours} hour${hours === 1 ? "" : "s"}`;
  return rest ? `${hourLabel} ${rest} minute${rest === 1 ? "" : "s"}` : hourLabel;
}

function slugOptionId(label: string, index: number) {
  const base = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return `${index}_${base || "option"}`;
}

function parseCommaOptions(raw: string) {
  return raw
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function truncate(textValue: string, max: number) {
  return textValue.length <= max ? textValue : `${textValue.slice(0, max - 1)}…`;
}

/* ------------------------------------------------------------------ */
/* Runtime                                                             */
/* ------------------------------------------------------------------ */

export interface HephiaSeed {
  /** Called once after setup, with helpers to pre-create an event. */
  (api: { createEvent: (draft: Partial<Draft> & { eventName: string }, signups?: Array<{ userId: string; role?: "attendee" | "cohost" | "security"; secondary?: string[] }>) => void }): void;
}

export function createHephiaRuntime(ctx: ScenarioContext, seed?: HephiaSeed): ScenarioRuntime {
  const events: HEvent[] = [];
  const attendees = new Map<number, Attendee[]>();
  const softWorldVotes = new Map<number, string[][]>();
  const ratings = new Map<number, Map<string, { rating?: number; comment?: string }>>();
  const pending = new Map<string, Pending>();
  const cachedBallots = new Map<string, { world: string[]; secondary: string[] }>();
  const publicNames = new Map<string, boolean>();
  const heldHostSignups = new Map<number, () => Promise<void>>();
  const drafts = new Map<string, Draft>();
  let nextEventId = 1;
  let nextToken = 1;

  const now = () => ctx.now();
  const member = (id: string) => ctx.member(id);
  const hasRole = (id: string, roleId: string | null | undefined) => Boolean(roleId && ctx.hasRole(id, roleId));
  const hasAny = (id: string, roleIds: readonly string[]) => ctx.hasAnyRole(id, roleIds);
  const pendingKey = (eventId: number, userId: string) => `${eventId}:${userId}`;
  const findEvent = (id: number) => events.find((event) => event.id === id);
  const roster = (eventId: number) => attendees.get(eventId) ?? [];
  const findAttendee = (eventId: number, userId: string) => roster(eventId).find((attendee) => attendee.userId === userId) ?? null;

  /* -------------------------- role helpers -------------------------- */

  const isAdmin = (userId: string) => ctx.isAdmin(userId);
  const isEventTeamStaff = (userId: string) => hasAny(userId, SETTINGS.eventTeamRoleIds);
  const hasListedStaffRole = (userId: string) => hasAny(userId, SETTINGS.listedStaffRoleIds);
  const isHighPatreon = (userId: string) => hasRole(userId, ROLE.patreon3) || hasAny(userId, SETTINGS.highPatreonRoleIds);
  const isRegularPatron = (userId: string) => hasAny(userId, SETTINGS.supporterRoleIds);
  const isPatreonMember = (userId: string) => hasAny(userId, [ROLE.patreon1, ROLE.patreon2, ROLE.patreon3]);
  const patreonLevel = (userId: string) => (hasRole(userId, ROLE.patreon3) ? 3 : hasRole(userId, ROLE.patreon2) ? 2 : hasRole(userId, ROLE.patreon1) ? 1 : 0);
  const isVerified = (userId: string) => hasAny(userId, SETTINGS.verifiedRoleIds);
  const training = (userId: string) => (hasRole(userId, SETTINGS.trialRoleId) ? " *(Training)*" : "");
  const groupRoleId = (event: HEvent) => (event.attendeeGroup === 1 ? SETTINGS.attendeeGroup1RoleId : event.attendeeGroup === 2 ? SETTINGS.attendeeGroup2RoleId : null);
  /** VRChat name, only when the member holds the VRChat Linked role (same as Hephia finding a linked account). */
  const linkedVrcName = (userId: string) => VRC[userId]?.vrcName ?? member(userId)?.vrcName ?? "";
  const vrcName = (userId: string) => (hasRole(userId, ROLE.linked) ? linkedVrcName(userId) : "");

  /* -------------------------- vote helpers -------------------------- */

  const isStarted = (event: Pick<HEvent, "plannedDate">) => now() >= event.plannedDate;
  const hasWorldVote = (event: HEvent) => event.worldVoteEnabled && event.worldOptions.length >= 2;
  const hasSecondaryVote = (event: HEvent) => (event.secondaryType === "ROLEPLAY" || event.secondaryType === "BASIC") && event.secondaryOptions.length > 0;
  const isWorldVoteOpen = (event: HEvent) => hasWorldVote(event) && event.state === "ONGOING" && !isStarted(event);
  const isSecondaryVoteOpen = (event: HEvent, attendee: Attendee | null) => {
    if (!hasSecondaryVote(event) || event.state !== "ONGOING") return false;
    if (event.secondaryType === "BASIC") return true;
    if (!isStarted(event)) return true;
    if (!attendee) return true;
    return now() - attendee.signupDate <= ROLEPLAY_CHANGE_WINDOW_MS;
  };
  const openTracks = (event: HEvent, attendee: Attendee | null): Tracks => ({ world: isWorldVoteOpen(event), secondary: isSecondaryVoteOpen(event, attendee) });
  const tracksNeedVote = (tracks: Tracks) => tracks.world || tracks.secondary;
  const secondaryAllowsMulti = (event: HEvent) =>
    event.secondaryType === "ROLEPLAY" ? event.roleplayVoteMulti : event.secondaryType === "BASIC" ? event.basicVoteMulti : false;
  const shouldUseButtons = (count: number, multi: boolean) => !multi && count > 0 && count <= 5;
  const trackRequired = (event: HEvent, state: Pending, track: "world" | "secondary") => {
    if (!event.voteRequired) return false;
    if (!state.eventStaff) return true;
    if (track === "world") return false;
    return event.secondaryType === "ROLEPLAY";
  };
  const requiredFilled = (event: HEvent, state: Pending, tracks: Tracks) => {
    const worldEmpty = state.world.filter((id) => id !== REMOVE_ID).length === 0;
    const secondaryEmpty = state.secondary.filter((id) => id !== REMOVE_ID).length === 0;
    if (tracks.world && worldEmpty && trackRequired(event, state, "world")) return false;
    if (tracks.secondary && secondaryEmpty && trackRequired(event, state, "secondary")) return false;
    return true;
  };
  const normalizeSecondary = (event: HEvent, ids: string[]) => {
    const cleaned = ids.filter((id) => id !== REMOVE_ID);
    return cleaned.length <= 1 || secondaryAllowsMulti(event) ? cleaned : cleaned.slice(0, 1);
  };
  const toggleOrSet = (current: string[], selected: string[], multi: boolean) => {
    if (multi) return selected.filter((id) => id !== REMOVE_ID);
    const next = selected[0];
    if (!next) return [];
    if (current.length === 1 && current[0] === next) return [];
    return [next];
  };
  const emptyPending = (mode: Pending["mode"], signupRole?: SignupRole): Pending => ({
    world: [],
    secondary: [],
    mode,
    eventStaff: mode === "host" || Boolean(signupRole?.isActiveStaff || signupRole?.isSecurity),
    signupRole,
  });
  const labelForChange = (tracks: Tracks, event: HEvent) =>
    tracks.secondary && !tracks.world && event.secondaryType === "ROLEPLAY" ? "Change Role" : "Change My Vote(s)";
  const secondaryLabels = (event: HEvent, ids: string[]) => ids.map((id) => event.secondaryOptions.find((option) => option.id === id)?.label ?? id);
  const secondaryChoiceLabel = (event: HEvent, ids: string[]) => {
    if (event.secondaryType !== "ROLEPLAY" && event.secondaryType !== "BASIC") return null;
    if (!ids.length) return null;
    return secondaryLabels(event, ids).join(", ");
  };
  const attendeeRoleplayLabel = (attendee: Attendee, event: HEvent) => (event.secondaryType === "ROLEPLAY" ? secondaryChoiceLabel(event, attendee.secondaryIds) : null);
  const attendeeStaffVoteLabel = (attendee: Attendee, event: HEvent) => secondaryChoiceLabel(event, attendee.secondaryIds);
  const hostRoleplayLabel = (event: HEvent) => secondaryChoiceLabel(event, event.hostVoteIds);
  const confirmedVoteLines = (event: HEvent, worldIds: string[], secondaryIds: string[]) => {
    const lines: string[] = [];
    if (worldIds.length) lines.push(`**World:** ${worldIds.map((id) => event.worldOptions.find((option) => option.id === id)?.label ?? id).join(", ")}`);
    if (secondaryIds.length) lines.push(`**${event.secondaryType === "ROLEPLAY" ? "Role" : "Vote"}:** ${secondaryLabels(event, secondaryIds).join(", ")}`);
    return lines.length ? lines.join("\n") : null;
  };
  const withVoteLines = (message: string, event: HEvent, worldIds: string[], secondaryIds: string[]) => {
    const lines = confirmedVoteLines(event, worldIds, secondaryIds);
    return lines ? `${message}\n${lines}` : message;
  };

  const votesRecap = (event: HEvent): { world: Tally[]; secondary: Tally[] } => {
    const worldCounts = new Map<string, number>();
    const secondaryCounts = new Map<string, number>();
    const bump = (map: Map<string, number>, ids: string[]) => ids.forEach((id) => map.set(id, (map.get(id) ?? 0) + 1));
    for (const attendee of roster(event.id)) {
      bump(worldCounts, attendee.worldIds);
      bump(secondaryCounts, attendee.secondaryIds);
    }
    for (const ids of softWorldVotes.get(event.id) ?? []) bump(worldCounts, ids);
    bump(worldCounts, event.hostWorldVoteIds);
    bump(secondaryCounts, event.hostVoteIds);
    return {
      world: event.worldOptions.map((option) => ({ optionId: option.id, label: option.label, count: worldCounts.get(option.id) ?? 0 })),
      secondary: event.secondaryOptions.map((option) => ({ optionId: option.id, label: option.label, count: secondaryCounts.get(option.id) ?? 0 })),
    };
  };
  const talliesWithVotes = (tallies: Tally[]) => tallies.filter((tally) => tally.count > 0).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

  /* -------------------------- status helpers ------------------------ */

  const isAutoStatus = (event: HEvent) => !event.publicStatus || event.publicStatus === "AUTO";
  const canDelayEvent = (event: HEvent) => event.state === "ONGOING" && isAutoStatus(event);
  const isDoorOpen = (value: string) => value === "DOOR_OPEN" || value === "PATREON_DOOR_OPEN";
  const canOfferHourReminder = (event: HEvent) =>
    event.state === "ONGOING" && !event.hourReminderSentAt && now() < event.plannedDate && !isDoorOpen(event.publicStatus);
  const isHourReminderVisible = (event: HEvent) =>
    event.state === "ONGOING" && Boolean(event.hourReminderSentAt) && now() < event.plannedDate && !isDoorOpen(event.publicStatus);
  const needsEarlyDoorOpenConfirm = (event: HEvent, value: string) => isDoorOpen(value) && now() < event.plannedDate - STARTING_SOON_MS;

  const resolveStatus = (event: HEvent, includeEnded = false) => {
    const ended = event.state === "DONE" || event.state === "CANCELLED";
    if (ended && !includeEnded) return null;
    const delayLine = isAutoStatus(event) && event.delayMinutes > 0 ? `Delayed by ${formatDelayDuration(event.delayMinutes)}.` : undefined;
    let status: { code: string; heading: string; emoji: string; detail?: string };
    switch (event.publicStatus) {
      case "PATREON_DOOR_OPEN":
        status = { code: event.publicStatus, heading: "Patreon Door Open", emoji: "💎" };
        break;
      case "DOOR_OPEN":
        status = { code: event.publicStatus, heading: "Door Open", emoji: "🚪" };
        break;
      case "INSTANCE_FULL":
        status = { code: event.publicStatus, heading: "Instance Full", emoji: "🚫" };
        break;
      case "TECHNICAL_ISSUES":
        status = { code: event.publicStatus, heading: "Technical Issues", emoji: "🛠️" };
        break;
      case "DOOR_CLOSED":
        status = { code: event.publicStatus, heading: "Closed", emoji: "🔒" };
        break;
      case "CUSTOM":
        status = { code: "CUSTOM", heading: "Custom", emoji: "📝", detail: event.customStatusText?.trim() || undefined };
        break;
      default: {
        const soon = now() >= event.plannedDate - STARTING_SOON_MS;
        status = { code: "AUTO", heading: soon ? "Starting Soon" : "Not Started", emoji: soon ? "⏰" : "⏳", detail: delayLine };
      }
    }
    if (event.state === "CANCELLED") return { ...status, heading: `${status.heading} · Cancelled` };
    if (event.state === "DONE") return { ...status, heading: `${status.heading} · Completed` };
    return status;
  };

  const statusHeading = (status: { emoji: string; heading: string }) => `${status.emoji} ${status.heading}`;

  const signupStatusFooter = (event: HEvent) => {
    const status = resolveStatus(event);
    if (!status) return null;
    let asOf: number | null = null;
    if (status.heading !== "Not Started") {
      if (event.publicStatusChangedAt) asOf = unix(event.publicStatusChangedAt);
      else if (status.code === "AUTO") asOf = unix(event.plannedDate - STARTING_SOON_MS);
    }
    const lines = [`-# Current Event Status${asOf == null ? "" : ` — as of <t:${asOf}:R>`}`, `## ${statusHeading(status)}`];
    if (status.detail) lines.push(status.detail);
    return lines.join("\n");
  };

  /* -------------------------- public message ------------------------ */

  const publicAccessLine = (event: HEvent) => {
    if (event.isPatreonOnly && event.signupRoleId) return `Patrons & Staff, or <@&${event.signupRoleId}>`;
    if (event.isPatreonOnly) return "Patrons & Staff";
    if (event.signupRoleId) return `Only <@&${event.signupRoleId}> can join`;
    return null;
  };

  const hasSecuritySignedUp = (event: HEvent) => roster(event.id).some((attendee) => !attendee.isActiveStaff && attendee.isSecurity);
  const hostPositionLabel = (event: HEvent) => (isStarted(event) && !hasSecuritySignedUp(event) ? "Host & Security" : "Host");

  const staffMention = (attendee: Attendee, event: HEvent) => {
    const role = attendeeStaffVoteLabel(attendee, event);
    return `<@${attendee.userId}>${training(attendee.userId)}${role ? ` [${role}]` : ""}`;
  };

  const publicStaffLines = (event: HEvent) => {
    const list = roster(event.id);
    const coHosts = list.filter((attendee) => attendee.isActiveStaff);
    const security = list.filter((attendee) => !attendee.isActiveStaff && attendee.isSecurity);
    const hostCovers = isStarted(event) && !hasSecuritySignedUp(event);
    if (!coHosts.length && !security.length && !hostCovers) return null;
    const lines: string[] = [];
    if (coHosts.length) lines.push(`🤝 **Co-Host:** ${coHosts.map((attendee) => staffMention(attendee, event)).join(", ")}`);
    if (security.length) lines.push(`🛡️ **Security:** ${security.map((attendee) => staffMention(attendee, event)).join(", ")}`);
    else if (hostCovers) {
      const role = hostRoleplayLabel(event);
      lines.push(`🛡️ **Security:** <@${event.hostId}>${training(event.hostId)}${role ? ` [${role}]` : ""}`);
    }
    return lines.join("\n");
  };

  const worldPublicLine = (option: WorldOption, count: number) =>
    `${option.questCompatible ? QUEST_EMOJI : PC_ONLY_EMOJI} [${option.label}](https://vrchat.com/home/world/${option.worldId}) (${option.capacity}) — (${count})`;

  const publicVoteSections = (event: HEvent) => {
    const votes = votesRecap(event);
    const parts: string[] = [];
    if (hasWorldVote(event)) {
      if (!isStarted(event)) {
        const counts = new Map(votes.world.map((tally) => [tally.optionId, tally.count]));
        parts.push(`**World options**\n${event.worldOptions.map((option) => worldPublicLine(option, counts.get(option.id) ?? 0)).join("\n")}`);
      } else {
        const top =
          event.snapshot?.top ??
          talliesWithVotes(votes.world)
            .slice(0, 3)
            .map((tally) => {
              const option = event.worldOptions.find((item) => item.id === tally.optionId);
              return { ...tally, worldId: option?.worldId ?? tally.optionId, questCompatible: option?.questCompatible ?? true };
            });
        if (top.length) {
          let block = `**Top worlds**\n${top.map((item, index) => `${index + 1}. [${item.label}](https://vrchat.com/home/world/${item.worldId}) — **${item.count}** votes`).join("\n")}`;
          if (event.snapshot?.winnerPcOnly || (top[0] && !top[0].questCompatible)) block += "\n_⚠️ Top world is PC-only (not Quest compatible)._";
          parts.push(block);
        }
      }
    }
    if (hasSecondaryVote(event)) {
      const counts = new Map(votes.secondary.map((tally) => [tally.optionId, tally.count]));
      const lines = event.secondaryOptions.map((option) => `• ${option.label} (${counts.get(option.id) ?? 0})`).join("\n");
      parts.push(`${event.secondaryType === "ROLEPLAY" ? "**Roleplay roles**" : "**Vote options**"}\n${lines}`);
    }
    return parts.length ? parts.join("\n\n") : null;
  };

  const volunteerSigned = (volunteer: Volunteer, signed: Set<string>) => signed.has(volunteer.discordId);

  const signedVolunteerBlock = (event: HEvent, header = "-# Volunteers") => {
    if (!event.volunteerRoster) return null;
    const list = roster(event.id);
    const signed = new Set(list.filter((attendee) => !attendee.guestOf).map((attendee) => attendee.userId));
    const lines = event.volunteerRoster
      .filter((volunteer) => volunteerSigned(volunteer, signed))
      .map((volunteer) => {
        const attendee = list.find((item) => item.userId === volunteer.discordId)!;
        const roleplay = attendeeRoleplayLabel(attendee, event);
        const tags = [volunteer.roleLabel, roleplay].filter(Boolean).map((label) => ` [${label}]`).join("");
        return `<@${attendee.userId}> — **${attendee.vrcDisplayName || volunteer.vrcName}**${tags}`;
      });
    return lines.length ? `${header}\n${lines.join("\n")}` : null;
  };

  const volunteerCategoryLines = (event: HEvent) => {
    if (!event.volunteerRoster?.length) return null;
    const lines: string[] = [];
    for (const role of ["FREE_USE", "AFTERCARE", "RP_EVENT"]) {
      const group = event.volunteerRoster.filter((volunteer) => volunteer.role === role);
      if (!group.length) continue;
      lines.push(`**${group[0].roleLabel}:** ${group.map((volunteer) => `<@${volunteer.discordId}>`).join(", ")}`);
    }
    return lines.length ? lines.join("\n") : null;
  };

  const publicSummary = (event: HEvent) => {
    const hostRole = hostRoleplayLabel(event);
    const hostRoleSuffix = hostRole ? ` [${hostRole}]` : "";
    const cancelled = event.state === "CANCELLED";
    const ended = event.state === "DONE";
    const hostLine = `${event.isPatreonOnly ? "Patreon event hosted" : "Hosted"} by <@${event.hostId}>${training(event.hostId)}${hostRoleSuffix}`;
    const access = !cancelled && !ended ? publicAccessLine(event) : null;
    let lead = cancelled
      ? `## ${event.eventName}\n${hostLine} — cancelled.`
      : ended
        ? `## ${event.eventName}\n${hostLine} — ended.`
        : `## ${event.eventName}\n${hostLine} <t:${unix(event.plannedDate)}:R>.${access ? ` (${access})` : ""}`;
    if (event.durationMinutes !== DEFAULT_DURATION) lead += `\nDuration: ${formatDuration(event.durationMinutes)}`;
    const staff = publicStaffLines(event);
    if (staff) lead += `\n${staff}`;

    let tail = "";
    const votes = publicVoteSections(event);
    if (votes) tail += votes;
    const group = groupRoleId(event);
    if (!cancelled && !ended && group) tail += `${tail ? "\n" : ""}-# Ping role: <@&${group}>`;
    const rosterLines = volunteerCategoryLines(event);
    if (rosterLines && !cancelled && !ended) tail += `${tail ? "\n\n" : ""}${rosterLines}`;
    return { lead, tail };
  };

  const publicSignupComponents = (event: HEvent): SandboxContainer => {
    const cancelled = event.state === "CANCELLED";
    const ended = event.state === "DONE";
    const changeTracks = openTracks(event, null);
    const showChange = !cancelled && !ended && tracksNeedVote(changeTracks);
    const actionRow = cancelled
      ? row(button(`${A.ListAttendees}:${event.id}:0`, "Participants", "primary", "📃"))
      : ended
        ? row(button(`${A.RateEvent}:${event.id}`, "Rate Event", "success", "⭐"), button(`${A.ListAttendees}:${event.id}:0`, "Participants", "primary", "📃"))
        : row(
            button(`${A.NotifyBell}:${event.id}`, undefined, "secondary", "🔔"),
            button(`${A.SignUp}:${event.id}`, "Sign Up", "success", "📩"),
            button(`${A.ListAttendees}:${event.id}:0`, "List of Attendees", "primary", "📃"),
            ...(showChange ? [button(`${A.ChangeVote}:${event.id}`, labelForChange(changeTracks, event), "secondary", "🗳️")] : []),
          );
    const summary = publicSummary(event);
    const children: SandboxContainerChild[] = [text(summary.lead)];
    const volunteers = !cancelled && !ended ? signedVolunteerBlock(event) : null;
    if (volunteers) children.push(sep(), text(volunteers), sep());
    if (summary.tail) children.push(text(summary.tail));
    children.push(actionRow);
    const footer = signupStatusFooter(event);
    if (isHourReminderVisible(event)) {
      const sent = event.hourReminderSentAt ? ` — as of <t:${unix(event.hourReminderSentAt)}:R>` : "";
      children.push(
        sep(),
        text([`-# Ping role: <@&${SETTINGS.generalEventPingRoleId}>`, `-# Current Event Status${sent}`, "## 📣 1h Reminder Ping!", event.hourReminderText?.trim() || "The event starts in 1 hour."].join("\n")),
      );
      if (event.hourReminderAttachmentUrl) children.push({ type: "gallery", urls: [event.hourReminderAttachmentUrl] });
    }
    if (footer) children.push(sep(), text(footer));
    return container(children, cancelled ? hex(0xed4245) : ended ? hex(0x808080) : hex(0x57f287));
  };

  /* -------------------------- staff listing ------------------------- */

  const eventHeader = (event: HEvent) => {
    const start = unix(event.plannedDate);
    const hostRole = hostRoleplayLabel(event);
    let header =
      `# 📅 ${event.eventName}\n` +
      `**Starts:** <t:${start}:F> (<t:${start}:R>)\n` +
      `**Duration:** ${formatDuration(event.durationMinutes)}\n` +
      `**${hostPositionLabel(event)}:** <@${event.hostId}>${training(event.hostId)}${hostRole ? ` [${hostRole}]` : ""}`;
    for (const guest of roster(event.id).filter((attendee) => attendee.guestOf === event.hostId)) header += `\n${plusOneGuestLine(guest, event)}`;
    if (event.eventPostMessageId ?? event.signupMessageId) {
      header += `\n**Links:** <#${event.channelId}> › ${event.eventPostMessageId ? "host announcement" : "signup message"}`;
    }
    const group = groupRoleId(event);
    if (group) header += `\n**Group:** <@&${group}>`;
    const access = publicAccessLine(event);
    if (access) header += `\n**Who can join:** ${access}`;
    const votes = votesRecap(event);
    if (isStarted(event)) {
      const top = event.snapshot?.top[0];
      if (top) {
        header += `\n**Winning world:** [${top.label}](<https://vrchat.com/home/world/${top.worldId}>) (${top.count} votes)`;
        if (event.snapshot?.winnerPcOnly || !top.questCompatible) header += "\n_⚠️ Winning world is PC-only (not Quest compatible)._";
      } else if (hasWorldVote(event)) {
        const winner = talliesWithVotes(votes.world)[0];
        if (winner) {
          const world = event.worldOptions.find((option) => option.id === winner.optionId);
          header += `\n**Winning world:** [${winner.label}](<https://vrchat.com/home/world/${world?.worldId ?? winner.optionId}>) (${winner.count} votes)`;
          if (world && !world.questCompatible) header += "\n_⚠️ Winning world is PC-only (not Quest compatible)._";
        }
      }
    }
    const basicWinner = event.secondaryType === "BASIC" ? talliesWithVotes(votes.secondary)[0] : undefined;
    if (basicWinner) header += `\n**Leading vote:** **${basicWinner.label}** (${basicWinner.count})`;
    return header;
  };

  const plusOneGuestLine = (guest: Attendee, event: HEvent) => {
    const role = attendeeRoleplayLabel(guest, event);
    return `  - ↳➕ <@${guest.userId}> — **${guest.vrcDisplayName}**${role ? ` [${role}]` : ""}`;
  };

  const staffListPrefix = (attendee: Attendee) => {
    if (attendee.isActiveStaff) return "🤝 ";
    if (attendee.isSecurity) return "🛡️ ";
    const parts: string[] = [];
    if (attendee.isPatreon) {
      const level = patreonLevel(attendee.userId);
      if (level >= 3) parts.push("🕐✌️");
      else if (level === 2) parts.push("🕐");
    }
    if (hasListedStaffRole(attendee.userId)) parts.push("🛠️");
    return parts.length ? `${parts.join(" ")} ` : "";
  };

  const staffLine = (attendee: Attendee, event: HEvent, guests: Attendee[]) => {
    const role = attendee.isActiveStaff || attendee.isSecurity ? attendeeStaffVoteLabel(attendee, event) : attendeeRoleplayLabel(attendee, event);
    const lines = [`- ${staffListPrefix(attendee)}<@${attendee.userId}> — **${attendee.vrcDisplayName}**${training(attendee.userId)}${role ? ` [${role}]` : ""}`];
    for (const guest of guests) lines.push(plusOneGuestLine(guest, event));
    return lines.join("\n");
  };

  const staffListingContainer = (event: HEvent): SandboxContainer => {
    const list = roster(event.id);
    const volunteerIds = new Set((event.volunteerRoster ?? []).map((volunteer) => volunteer.discordId));
    const visible = list.filter((attendee) => !attendee.guestOf);
    const guests = new Map<string, Attendee[]>();
    for (const attendee of list) {
      if (!attendee.guestOf) continue;
      guests.set(attendee.guestOf, [...(guests.get(attendee.guestOf) ?? []), attendee]);
    }
    const header = [`${eventHeader(event)}\n**Total Signed Up:** ${list.length} — 🔔 ${event.notify.size}`];
    const status = resolveStatus(event, true);
    if (status) {
      const heading = statusHeading(status);
      let line = `**Event Status** — ${event.state === "CANCELLED" ? `**${heading}**` : heading}`;
      if (status.detail) line += `\n${status.detail}`;
      header.push(line);
    }
    header.push("", "-# **Legend** — 🛠️ Staff · 🕐 Bypass capacity · ✌️ +1");
    const blocks = [header.join("\n")];

    const votes = votesRecap(event);
    const worldRanked = talliesWithVotes(votes.world);
    if (worldRanked.length) blocks.push(`### World votes\n${worldRanked.map((tally) => `- **${tally.label}** — ${tally.count}`).join("\n")}`);
    const secondaryRanked = talliesWithVotes(votes.secondary);
    if (secondaryRanked.length) {
      blocks.push(`### ${event.secondaryType === "ROLEPLAY" ? "Roleplay roles" : "Vote tallies"}\n${secondaryRanked.map((tally) => `- **${tally.label}** — ${tally.count}`).join("\n")}`);
    }

    const regular = (attendee: Attendee) => !attendee.isActiveStaff && !attendee.isSecurity && !volunteerIds.has(attendee.userId);
    const buckets = [
      { title: "Co-Host / Security", items: [...visible.filter((a) => a.isActiveStaff), ...visible.filter((a) => !a.isActiveStaff && a.isSecurity)], hide: true },
      { title: "💎 Patreon", items: visible.filter((a) => regular(a) && a.isPatreon), hide: true },
      { title: "🙋 Attendees", items: visible.filter((a) => regular(a) && !a.isPatreon), hide: false },
    ];
    for (const bucket of buckets) {
      if (bucket.hide && !bucket.items.length) {
        if (bucket.title === "Co-Host / Security") pushVolunteerSection();
        continue;
      }
      const lines = bucket.items.length ? bucket.items.map((attendee) => staffLine(attendee, event, guests.get(attendee.userId) ?? [])) : ["*No one signed up yet.*"];
      blocks.push(`### ${bucket.title} (${bucket.items.length})\n${lines.join("\n")}`);
      if (bucket.title === "Co-Host / Security") pushVolunteerSection();
    }

    function pushVolunteerSection() {
      if (!event.volunteerRoster?.length) return;
      const signed = new Set(list.map((attendee) => attendee.userId));
      const lines = event.volunteerRoster.map((volunteer) => `${signed.has(volunteer.discordId) ? "✅" : "☐"} <@${volunteer.discordId}> — **${volunteer.vrcName}** [${volunteer.roleLabel}]`);
      blocks.push(`### Volunteers\n${lines.join("\n")}`);
    }

    const children: SandboxContainerChild[] = [];
    blocks.forEach((block, index) => {
      if (index > 0) children.push(sep());
      children.push(text(block));
    });

    if (event.state === "ONGOING") {
      children.push(
        row(
          button(`${A.CoHostSignup}:${event.id}`, "Co-Host Signup", "primary", "🤝"),
          button(`${A.SecuritySignup}:${event.id}`, "Security Signup", "secondary", "🛡️"),
          button(`${A.EndEvent}:${event.id}`, isStarted(event) ? "End Event Now" : "Cancel Event", "danger", "🛑"),
        ),
        row({
          type: "select",
          customId: `${A.Scenario}:${event.id}`,
          placeholder: "Update event status…",
          options: STATUS_OPTIONS.map((option): SandboxSelectOption => {
            const selected = option.value === event.publicStatus;
            return {
              label: selected ? `${option.label} · current` : option.label,
              value: option.value,
              emoji: option.emoji,
              default: selected,
              description: selected ? "Already applied — selecting this will not change the status." : undefined,
            };
          }),
        }),
      );
      const timing: SandboxButton[] = [];
      if (canOfferHourReminder(event)) timing.push(button(`${A.HourReminder}:${event.id}`, "1h reminder", "secondary", "📣"));
      if (canDelayEvent(event)) timing.push(button(`${A.Delay}:${event.id}`, "Delay start", "secondary", "⏱️"));
      if (timing.length) children.push(row(...timing));
    } else if (event.state === "DONE") {
      children.push(row(button(`${A.ViewFeedback}:${event.id}`, "View Feedback Recap", "primary", "⭐")));
    }

    const notice = event.staffNotice && Date.now() - event.staffNotice.at < STAFF_NOTICE_MS ? event.staffNotice.text : null;
    if (notice) children.push(sep(), text(`✅ ${notice}`));
    return container(children);
  };

  /** Same job as the bot's UpdateEventAttendeesListing listener. */
  const refresh = (event: HEvent) => {
    if (event.signupMessageId && ctx.message(event.signupMessageId)) ctx.edit(event.signupMessageId, { components: [publicSignupComponents(event)] });
    if (event.listingMessageId && ctx.message(event.listingMessageId)) ctx.edit(event.listingMessageId, { components: [staffListingContainer(event)] });
  };

  const setStaffNotice = (event: HEvent, textValue: string) => {
    event.staffNotice = { text: textValue, at: Date.now() };
  };

  /* -------------------------- signup payloads ----------------------- */

  const signupRoleLabel = (role: { isActiveStaff: boolean; isSecurity: boolean }) =>
    role.isActiveStaff ? "Co-Host / Active Staff" : role.isSecurity ? "Security" : "Attendee";
  const appendVrcName = (message: string, name: string | undefined) => (name?.trim() ? `${message}\nVRChat name: **${name.trim()}**` : message);
  const groupAccessNote = (userId: string) =>
    VRC[userId]?.inGroup === false
      ? "\n⚠️ We don’t see you in **The Eden Apis** VRChat group — you may not be able to join an afterparty instance if there is one. Request to join: https://vrchat.com/home/group/grp_9ec2f3df-df53-4770-b24f-ea21c42354c2"
      : "";

  interface PlusOneFlags {
    plusOnePrompt?: boolean;
    plusOneUpsell?: boolean;
    plusOneSelect?: Array<{ id: string; label: string }>;
    plusOneGuest?: { mention: string; thumbnail?: string };
  }

  const plusOneFlags = (event: HEvent, userId: string, attendee?: Attendee | null): PlusOneFlags => {
    if (event.isPatreonOnly && !attendee?.guestOf && isHighPatreon(userId)) return { plusOnePrompt: true };
    if (!event.isPatreonOnly || attendee?.guestOf) return {};
    if (isHighPatreon(userId)) return {};
    if (!isRegularPatron(userId)) return {};
    return { plusOneUpsell: true };
  };

  const resolvePlusOne = (event: HEvent, userId: string, attendee: Attendee | null): PlusOneFlags => {
    const guest = roster(event.id).find((item) => item.guestOf === userId);
    if (guest) return { plusOneGuest: { mention: `<@${guest.userId}>`, thumbnail: member(guest.userId)?.avatar } };
    if (attendee?.guestOf) return {};
    return plusOneFlags(event, userId, attendee);
  };

  const signupSuccessPayload = (
    content: string,
    eventId: number,
    opts: PlusOneFlags & { showUpdateButton?: boolean; statusNote?: string; showVrcNamePublicly?: boolean } = {},
  ): SandboxPayload => {
    const showUpdate = opts.showUpdateButton ?? true;
    const publicOn = opts.showVrcNamePublicly === true;
    const parts = [content];
    if (opts.statusNote?.trim()) parts.push(opts.statusNote.trim());
    if (showUpdate) {
      parts.push(
        `\n-# If this isn’t your current VRChat display name, press **Update Display Name**.\n${
          publicOn ? "-# Your VRChat name is **visible** on the public attendee list for every event." : "-# Your VRChat name is **hidden** on the public attendee list for every event."
        }`,
      );
    }
    const children: SandboxContainerChild[] = [{ type: "section", texts: [parts.join("\n")], thumbnail: HEPHIA_YES }];
    if (showUpdate) {
      children.push(
        row(
          button(`${A.UpdateDisplayName}:${eventId}`, "Update Display Name", "success", "💾"),
          button(`${A.PublicVrcName}:${eventId}`, publicOn ? "Hide name publicly" : "Show name publicly", publicOn ? "secondary" : "primary", "👁️"),
        ),
      );
    }
    if (opts.plusOneGuest) {
      children.push(sep("large"));
      const confirm = `✅ Your friend is signed up: ${opts.plusOneGuest.mention}\nYou're signed up too. They were added without a ping.`;
      children.push(opts.plusOneGuest.thumbnail ? { type: "section", texts: [confirm], thumbnail: opts.plusOneGuest.thumbnail } : text(confirm));
    } else if (opts.plusOneSelect?.length) {
      children.push(
        sep(),
        text("Confirm which friend this is from the list. VRChat names stay hidden here."),
        row({
          type: "select",
          customId: `${A.PlusOneSelect}:${eventId}`,
          placeholder: "Confirm which friend this is",
          options: opts.plusOneSelect.slice(0, 25).map((option) => ({ label: option.label, value: option.id })),
        }),
        row(button(`${A.PlusOne}:${eventId}:cancel`, "Cancel", "secondary")),
      );
    } else if (opts.plusOnePrompt) {
      children.push(sep(), { type: "section", texts: ["You can add **one friend** as your +1."], button: button(`${A.PlusOne}:${eventId}:yes`, "Add a Friend", "success", "➕") });
    } else if (opts.plusOneUpsell) {
      children.push(sep(), { type: "section", texts: ["Add **one friend** as your +1."], button: linkButton("Upgrade to Legend", SETTINGS.patreonUpgradeUrl) }, text("High tier Patrons can invite a friend with them."));
    }
    return { components: [container(children)] };
  };

  const sponsorPayload = (eventId: number, userId: string, extra: PlusOneFlags & { statusNote?: string } = {}) => {
    const event = findEvent(eventId)!;
    const attendee = findAttendee(eventId, userId);
    const plusOne = extra.plusOneSelect?.length || extra.plusOneGuest ? {} : resolvePlusOne(event, userId, attendee);
    const content = attendee
      ? appendVrcName(`✅ You have signed up as **${signupRoleLabel(attendee)}**! Good luck and have fun!`, attendee.vrcDisplayName)
      : "✅ You're hosting this event.";
    return signupSuccessPayload(content, eventId, { showVrcNamePublicly: publicNames.get(userId) ?? false, ...plusOne, ...extra });
  };

  const accessDeniedPayload = (event: HEvent): SandboxPayload => {
    if (!event.isPatreonOnly) return simple(event.signupRoleId ? `Only <@&${event.signupRoleId}> can join this event.` : "You cannot join this event.");
    const extra = event.signupRoleId ? `\nYou can also join if you have <@&${event.signupRoleId}>.` : "";
    return {
      components: [
        container([
          { type: "section", texts: [`This event is for Patrons and staff. If you want to take part, become a Patron.${extra}`], thumbnail: HEPHIA_LOVE },
          row(linkButton("Become a Patron", SETTINGS.patreonPageUrl)),
        ]),
      ],
    };
  };

  const meetsSignupLimit = (event: HEvent, userId: string) => {
    const roleId = event.signupRoleId;
    if (!event.isPatreonOnly && !roleId) return true;
    const listed = roleId ? hasRole(userId, roleId) : false;
    const patronAccess = hasAny(userId, [...SETTINGS.signupStaffRoleIds, ...SETTINGS.supporterRoleIds]);
    if (event.isPatreonOnly && roleId) return listed || patronAccess;
    if (event.isPatreonOnly) return patronAccess;
    return listed;
  };

  /* -------------------------- vote prompt --------------------------- */

  const worldEmoji = (option: WorldOption) => (option.questCompatible ? QUEST_EMOJI : PC_ONLY_EMOJI);
  const worldSelectLabel = (option: WorldOption) => {
    const suffix = ` (${option.capacity})`;
    return `${truncate(option.label, 100 - suffix.length)}${suffix}`;
  };

  const votePrompt = (event: HEvent, state: Pending, tracks: Tracks, title?: string): SandboxPayload => {
    const dual = tracks.world && tracks.secondary;
    const worldMulti = event.worldVoteMulti;
    const secondaryMulti = secondaryAllowsMulti(event);
    const worldRequired = tracks.world && trackRequired(event, state, "world");
    const secondaryRequired = tracks.secondary && trackRequired(event, state, "secondary");
    const signupStillOpen = state.mode === "signup" && (worldRequired || secondaryRequired);
    const heading =
      title ??
      (state.mode === "host"
        ? tracks.secondary && !tracks.world && event.secondaryType === "ROLEPLAY"
          ? "### Pick your host roleplay role"
          : "### Cast your vote"
        : state.mode === "change"
          ? "### Update your vote"
          : signupStillOpen
            ? "### Your signup isn’t finished yet"
            : "### Complete your signup vote");
    const unfinished = signupStillOpen ? "\nYou are not on the event yet. Submit your vote to finish signing up." : "";
    const custom = event.customVoteText?.trim();
    const showSkip = (tracks.world || tracks.secondary) && !worldRequired && !secondaryRequired;

    const summary: string[] = [];
    if (tracks.world) {
      const labels = state.world.filter((id) => id !== REMOVE_ID).map((id) => event.worldOptions.find((option) => option.id === id)?.label ?? id);
      summary.push(`**World:** ${labels.length ? labels.join(", ") : "_not selected_"}`);
    }
    if (tracks.secondary) {
      const labels = secondaryLabels(event, state.secondary.filter((id) => id !== REMOVE_ID));
      summary.push(`**${event.secondaryType === "ROLEPLAY" ? "Role" : "Vote"}:** ${labels.length ? labels.join(", ") : "_not selected_"}`);
    }

    let skipNote = "";
    if (!event.voteRequired) skipNote = "\nYou can also skip voting.";
    else if (state.eventStaff) {
      const worldSkip = tracks.world && !trackRequired(event, state, "world");
      const basicSkip = tracks.secondary && event.secondaryType === "BASIC" && !trackRequired(event, state, "secondary");
      const roleplayReq = tracks.secondary && trackRequired(event, state, "secondary");
      if (worldSkip && basicSkip) skipNote = "\nYou can skip the world vote and the basic vote.";
      else if (worldSkip && roleplayReq) skipNote = "\nYou can skip the world vote. A roleplay role is still required.";
      else if (worldSkip) skipNote = "\nYou can skip the world vote.";
      else if (basicSkip) skipNote = "\nYou can skip this vote.";
    }
    const multiNote =
      (tracks.world && worldMulti) || (tracks.secondary && secondaryMulti) ? `\n-# Click outside the menu to confirm your picks.${dual ? " Click **Confirm** after that." : ""}` : "";

    const children: SandboxContainerChild[] = [
      text(`${heading}${unfinished}${custom ? `\n${custom}` : ""}\n${summary.join("\n")}${dual ? "\n\nSelect both options, then press **Confirm**." : ""}${skipNote}${multiNote}`),
    ];

    const optionButtons = (action: string, options: Array<{ id: string; label: string; emoji?: string }>, selected: string[]) => {
      const rows: SandboxActionRow[] = [];
      for (let index = 0; index < options.length; index += 5) {
        rows.push(
          row(
            ...options
              .slice(index, index + 5)
              .map((option) => button(`${action}:${event.id}:${option.id}`, truncate(option.label, 80), selected.includes(option.id) ? "success" : "secondary", option.emoji)),
          ),
        );
      }
      return rows;
    };
    const optionSelect = (customId: string, placeholder: string, options: Array<{ id: string; label: string; emoji?: string }>, multi: boolean, selected: string[], required: boolean) =>
      row({
        type: "select",
        customId,
        placeholder,
        minValues: required || !multi ? 1 : 0,
        maxValues: multi ? Math.min(options.length, 25) : 1,
        options: options.map((option) => ({ label: truncate(option.label, 100), value: option.id, emoji: option.emoji, default: selected.includes(option.id) })),
      });

    if (tracks.world) {
      const ui = event.worldOptions.map((option) => ({ id: option.id, label: worldSelectLabel(option), emoji: worldEmoji(option) }));
      children.push(sep(), text("**Preferred world**"));
      if (shouldUseButtons(ui.length, worldMulti)) children.push(...optionButtons(A.VoteWorldBtn, ui, state.world));
      else children.push(optionSelect(`${A.VoteWorldSelect}:${event.id}`, "Choose a world…", ui, worldMulti, state.world, worldRequired));
      if (state.mode === "change" && !worldRequired) children.push(row(button(`${A.VoteRemoveWorld}:${event.id}`, "Remove world vote", "danger")));
    }
    if (tracks.secondary) {
      children.push(sep(), text(event.secondaryType === "ROLEPLAY" ? "**Roleplay role**" : "**Your vote**"));
      if (shouldUseButtons(event.secondaryOptions.length, secondaryMulti)) children.push(...optionButtons(A.VoteSecondaryBtn, event.secondaryOptions, state.secondary));
      else
        children.push(
          optionSelect(
            `${A.VoteSecondarySelect}:${event.id}`,
            event.secondaryType === "ROLEPLAY" ? "Choose a role…" : "Choose an option…",
            event.secondaryOptions,
            secondaryMulti,
            state.secondary,
            secondaryRequired,
          ),
        );
      if (state.mode === "change" && event.secondaryType === "BASIC" && !secondaryRequired) children.push(row(button(`${A.VoteRemoveSecondary}:${event.id}`, "Remove my vote", "danger")));
    }
    const actions: SandboxButton[] = [];
    if (dual) actions.push(button(`${A.VoteConfirm}:${event.id}`, "Confirm", "success", "✅"));
    if (showSkip) actions.push(button(`${A.VoteSkip}:${event.id}`, "Skip vote", "secondary"));
    if (actions.length) children.push(row(...actions));
    return { components: [container(children, hex(0x5865f2))] };
  };

  const showVotePrompt = async (ix: SandboxInteraction, event: HEvent, state: Pending, tracks: Tracks, opts: { title?: string; edit?: boolean } = {}) => {
    pending.set(pendingKey(event.id, ix.user.id), state);
    const payload = votePrompt(event, state, tracks, opts.title);
    if (opts.edit && (ix.deferred || ix.replied)) return ix.editReply(payload);
    if (ix.kind === "component" && (ix as ComponentInteraction).isEphemeralMessage && !ix.deferred) return (ix as ComponentInteraction).update(payload);
    if (ix.deferred || ix.replied) return ix.editReply(payload);
    return ix.reply(payload, { ephemeral: true });
  };

  const replyVoteResult = async (ix: SandboxInteraction, content: string) => {
    if (ix.deferred || ix.replied) return ix.editReply(simple(content));
    return ix.reply(simple(content), { ephemeral: true });
  };

  const REQUIRED_VOTE_MESSAGE = "❌ Voting is required. Pick at least one option for each open vote.";

  const commitPendingVote = async (ix: SandboxInteraction, event: HEvent, state: Pending, tracks: Tracks) => {
    const userId = ix.user.id;
    await ctx.work();

    if (state.mode === "host") {
      if (!requiredFilled(event, state, tracks)) return replyVoteResult(ix, REQUIRED_VOTE_MESSAGE);
      const worldIds = tracks.world ? state.world.filter((id) => id !== REMOVE_ID) : [];
      const secondaryIds = tracks.secondary ? normalizeSecondary(event, state.secondary) : [];
      if (tracks.world) event.hostWorldVoteIds = worldIds;
      if (tracks.secondary) event.hostVoteIds = secondaryIds;
      pending.delete(pendingKey(event.id, userId));
      const release = heldHostSignups.get(event.id);
      heldHostSignups.delete(event.id);
      if (release) await release();
      refresh(event);
      return replyVoteResult(ix, withVoteLines("✅ Your vote has been saved.", event, worldIds, secondaryIds));
    }

    if (state.mode === "change") {
      if (!requiredFilled(event, state, tracks)) return replyVoteResult(ix, REQUIRED_VOTE_MESSAGE);
      const attendee = findAttendee(event.id, userId);
      const worldIds = tracks.world ? state.world.filter((id) => id !== REMOVE_ID) : [];
      const secondaryIds = tracks.secondary ? normalizeSecondary(event, state.secondary) : [];
      if (attendee) {
        if (tracks.world) attendee.worldIds = worldIds;
        if (tracks.secondary) attendee.secondaryIds = secondaryIds;
      }
      pending.delete(pendingKey(event.id, userId));
      refresh(event);
      return replyVoteResult(ix, withVoteLines("✅ Your vote has been updated.", event, tracks.world ? worldIds : [], tracks.secondary ? secondaryIds : []));
    }

    const role = state.signupRole;
    if (!role) return ix.editReply(simple("❌ Signup context was lost. Please press Sign Up again."));
    const cached = cachedBallots.get(pendingKey(event.id, userId));
    const worldIds = tracks.world ? state.world.filter((id) => id !== REMOVE_ID) : [];
    const secondaryIds = tracks.secondary ? normalizeSecondary(event, state.secondary) : [];
    const finalSecondary = secondaryIds.length ? secondaryIds : normalizeSecondary(event, cached?.secondary ?? []);
    const finalWorld = worldIds.length ? worldIds : cached?.world ?? [];
    if (!requiredFilled(event, { ...state, world: finalWorld, secondary: finalSecondary }, tracks)) return replyVoteResult(ix, REQUIRED_VOTE_MESSAGE);

    upsertAttendee(event, userId, { ...role, worldIds: finalWorld, secondaryIds: finalSecondary });
    cachedBallots.delete(pendingKey(event.id, userId));
    pending.delete(pendingKey(event.id, userId));
    refresh(event);
    const group = groupRoleId(event);
    if (group) ctx.addRole(userId, group);
    const content =
      appendVrcName(withVoteLines(`✅ You have signed up as **${signupRoleLabel(role)}**! Good luck and have fun!`, event, finalWorld, finalSecondary), role.vrcDisplayName) +
      groupAccessNote(userId);
    return ix.editReply(signupSuccessPayload(content, event.id, { ...plusOneFlags(event, userId), showVrcNamePublicly: publicNames.get(userId) ?? false }));
  };

  const upsertAttendee = (event: HEvent, userId: string, data: SignupRole & { worldIds: string[]; secondaryIds: string[]; guestOf?: string | null }) => {
    const list = roster(event.id).filter((attendee) => attendee.userId !== userId);
    const existing = findAttendee(event.id, userId);
    list.push({
      userId,
      vrcDisplayName: data.vrcDisplayName,
      isActiveStaff: data.isActiveStaff,
      isSecurity: data.isSecurity,
      isPatreon: data.isPatreon,
      worldIds: data.worldIds,
      secondaryIds: data.secondaryIds,
      signupDate: existing?.signupDate ?? now(),
      guestOf: data.guestOf ?? null,
    });
    attendees.set(event.id, list);
    event.notify.delete(userId);
  };

  const removeAttendeePreservingFrozenWorldVotes = (event: HEvent, existing: Attendee) => {
    pending.delete(pendingKey(event.id, existing.userId));
    cachedBallots.set(pendingKey(event.id, existing.userId), { world: [...existing.worldIds], secondary: [...existing.secondaryIds] });
    if (isStarted(event) && existing.worldIds.length) softWorldVotes.set(event.id, [...(softWorldVotes.get(event.id) ?? []), [...existing.worldIds]]);
    attendees.set(
      event.id,
      roster(event.id).filter((attendee) => attendee.userId !== existing.userId),
    );
  };

  const dropGroupRole = (event: HEvent, userIds: string[]) => {
    if (userIds.length === 1 && userIds[0] === event.hostId) return;
    const group = groupRoleId(event);
    if (!group) return;
    for (const userId of userIds) if (userId !== event.hostId) ctx.removeRole(userId, group);
  };

  /* -------------------------- event lifecycle ----------------------- */

  const freeAttendeeGroup = (): 1 | 2 | null => {
    for (const group of [1, 2] as const) {
      if (!events.some((event) => event.attendeeGroup === group && !event.groupCleared)) return group;
    }
    return null;
  };

  const clearGroupRole = (event: HEvent) => {
    const group = groupRoleId(event);
    if (group) for (const item of ctx.members()) if (item.roles.includes(group)) ctx.removeRole(item.id, group);
    event.groupCleared = true;
  };

  const statusUpdateContainer = (event: HEvent, ping: string | null): SandboxContainer => {
    if (event.state === "CANCELLED") return container([text(`## 🚫 Cancelled\n-# Update for **${event.eventName}**`)]);
    if (event.state === "DONE") return container([text(`## ✅ Event ended\n-# Update for **${event.eventName}**`)]);
    const status = resolveStatus(event);
    const title = status ? statusHeading(status) : "Update";
    return container([text(`## ${title}${status?.detail ? `\n${status.detail}` : ""}${ping ? `\n-# Ping role: <@&${ping}>` : ""}\n-# Update for **${event.eventName}**`)]);
  };

  const ghostPing = (channelId: string, roleId: string | null, keepMs = 1000) => {
    if (!roleId) return;
    const id = ctx.send(channelId, { content: `<@&${roleId}>`, pings: { roles: [roleId] } });
    void ctx
      .sleep(keepMs)
      .then(() => ctx.remove(id))
      .catch(() => undefined);
  };

  const announcePublicStatusChange = (event: HEvent, forceSignupEditOnly = false) => {
    const group = groupRoleId(event);
    const doorClosed = event.publicStatus === "DOOR_CLOSED" || forceSignupEditOnly;
    if (doorClosed || event.state !== "ONGOING") {
      if (event.statusMessageId && ctx.message(event.statusMessageId)) ctx.edit(event.statusMessageId, { components: [statusUpdateContainer(event, null)] });
      return;
    }
    if (event.statusMessageId && ctx.message(event.statusMessageId)) {
      ghostPing(event.channelId, group);
      ctx.edit(event.statusMessageId, { components: [statusUpdateContainer(event, group)] });
      return;
    }
    const channelMessages = ctx.channelMessages(event.channelId);
    const last = channelMessages[channelMessages.length - 1];
    if (last && last.id === event.signupMessageId) {
      ghostPing(event.channelId, group);
      return;
    }
    event.statusMessageId = ctx.send(event.channelId, { components: [statusUpdateContainer(event, group)], pings: group ? { roles: [group] } : undefined });
  };

  const publishStatus = (event: HEvent, forceSignupEditOnly = false) => {
    refresh(event);
    announcePublicStatusChange(event, forceSignupEditOnly);
  };

  const endEvent = (event: HEvent) => {
    if (event.state !== "ONGOING") return;
    const cancelled = now() < event.plannedDate;
    event.state = cancelled ? "CANCELLED" : "DONE";
    event.staffNotice = null;
    if (!cancelled) event.feedbackDeadline = now() + 24 * HOUR;
    for (const key of [...pending.keys()]) if (key.startsWith(`${event.id}:`)) pending.delete(key);
    clearGroupRole(event);
    if (event.statusMessageId && ctx.message(event.statusMessageId)) ctx.edit(event.statusMessageId, { components: [statusUpdateContainer(event, null)] });
    refresh(event);
  };

  const onEventStarted = (event: HEvent) => {
    if (hasWorldVote(event) && !event.snapshot) {
      const votes = votesRecap(event);
      const top = talliesWithVotes(votes.world)
        .slice(0, 3)
        .map((tally) => {
          const option = event.worldOptions.find((item) => item.id === tally.optionId);
          return { ...tally, worldId: option?.worldId ?? tally.optionId, questCompatible: option?.questCompatible ?? true };
        });
      event.snapshot = { top, winnerPcOnly: top[0] ? !top[0].questCompatible : false };
    }
    refresh(event);
  };

  /* -------------------------- /start-event -------------------------- */

  const findHostAnnouncement = (channelId: string, userId: string) => {
    const messages = ctx.channelMessages(channelId).slice(-50).reverse();
    let latest: (typeof messages)[number] | null = null;
    for (const message of messages) {
      if (message.authorId !== userId) continue;
      if (now() - message.createdAt > 24 * HOUR) continue;
      if (!latest || message.createdAt > latest.createdAt) latest = message;
      if (TIMESTAMP_RE.test(message.content ?? "")) return message;
    }
    return latest;
  };

  const extractUnix = (value: string) => {
    const match = TIMESTAMP_RE.exec(value);
    if (!match) return undefined;
    const parsed = Number(match[1]);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
  };

  const parseStartTimeOption = (raw: string): { ok: true; unix: number } | { ok: false; reason: string } => {
    const trimmed = raw.trim();
    if (!trimmed) return { ok: false, reason: "`start-time` was empty." };
    if (/^\d+$/.test(trimmed)) {
      const value = Number(trimmed);
      if (!Number.isFinite(value) || value <= 0) return { ok: false, reason: "`start-time` must be a positive Unix timestamp in seconds." };
      return { ok: true, unix: value };
    }
    const stamp = extractUnix(trimmed);
    if (stamp !== undefined) return { ok: true, unix: stamp };
    return {
      ok: false,
      reason: "`start-time` must be a Unix timestamp in seconds (e.g. `1735689600`) or a Discord timestamp like `<t:1735689600:F>` / `<t:1735689600:R>`.",
    };
  };

  const worldOptionFor = (worldId: string): WorldOption => {
    const known = WORLDS.find((world) => world.id.toLowerCase() === worldId.toLowerCase());
    if (known) return { id: worldId, label: known.name, worldId, capacity: known.capacity, questCompatible: known.quest };
    return { id: worldId, label: `World ${worldId.slice(5, 9)}`, worldId, capacity: 32, questCompatible: true };
  };

  const stageDraft = (draft: Draft) => {
    for (const [token, staged] of drafts) if (staged.userId === draft.userId) drafts.delete(token);
    const token = `t${nextToken++}`;
    drafts.set(token, draft);
    return token;
  };

  const takeDraft = (token: string | undefined, userId: string) => {
    if (!token) return null;
    const draft = drafts.get(token);
    if (!draft || draft.userId !== userId) return null;
    drafts.delete(token);
    return draft;
  };

  const farStartConfirm = (draft: Draft, token: string): SandboxPayload => {
    const source = draft.startTimeSource === "option" ? "That time is the `start-time` you entered." : "That time was found in your event announcement.";
    return {
      components: [
        container([
          text(`## This event is more than 30 hours away\nDetected start: <t:${draft.startTimeUnix}:F> (<t:${draft.startTimeUnix}:R>).\n${source}\n\nCreate the signup this far ahead anyway?`),
          row(button(`${A.StartFarConfirm}:${token}`, "Create event", "success"), button(`${A.StartFarCancel}:${token}`, "Cancel", "secondary")),
        ]),
      ],
    };
  };

  const volunteerConfirm = (draft: Draft, token: string): SandboxPayload => {
    const names = VOLUNTEER_EVENT.volunteers.map((volunteer) => `• ${volunteer.displayName} — **${volunteer.vrcName}** [${volunteer.roleLabel}]`).join("\n");
    const plates = VOLUNTEER_EVENT.volunteers.filter((volunteer) => volunteer.role === "FREE_USE").length;
    return {
      components: [
        container([
          text(
            `## Use this volunteer roster?\n**${draft.eventName}**\n${VOLUNTEER_EVENT.volunteers.length} confirmed volunteer(s), ${plates} free-use plate(s) from **${VOLUNTEER_EVENT.name}**.\n${names}\n\nCreate the signup with this roster?`,
          ),
          row(button(`${A.StartVolunteerConfirm}:${token}`, "Use volunteers", "success"), button(`${A.StartVolunteerCancel}:${token}`, "Cancel", "secondary")),
        ]),
      ],
    };
  };

  const startEvent = async (ix: CommandInteraction) => {
    const options = ix.options;
    const userId = ix.user.id;
    await ctx.work();
    const fail = (content: string) => ix.reply(simple(content), { ephemeral: true });

    if (!hasAny(userId, SETTINGS.authorizedRoleIds) && !isAdmin(userId)) return fail("❌ You don't have permission to start an event.");

    const eventName = String(options.name ?? "").trim();
    const durationMinutes = typeof options.duration === "number" ? options.duration : DEFAULT_DURATION;
    const startTimeRaw = typeof options["start-time"] === "string" ? options["start-time"] : null;
    const roleplayRaw = typeof options["roleplay-options"] === "string" ? options["roleplay-options"] : null;
    const basicRaw = typeof options["voting-basic"] === "string" ? options["voting-basic"] : null;
    const worldVote = options["world-vote"] === true;
    const voteRequired = options["allow-vote-skip"] !== true;
    const worldVoteMulti = options["world-multi-vote"] === true;
    const roleplayVoteMulti = options["roleplay-multi-vote"] === true;
    const basicVoteMulti = options["basic-multi-vote"] === true;
    const customVoteText = typeof options["custom-vote-text"] === "string" ? options["custom-vote-text"].trim() || null : null;
    const isPatreonOnly = options["is-patreon"] === true;
    const signupRoleId = typeof options["signup-role"] === "string" ? options["signup-role"] : null;
    const volunteerChoice = typeof options["use-volunteers-list"] === "string" ? options["use-volunteers-list"] : null;
    const portalEventId = volunteerChoice && volunteerChoice !== NO_VOLUNTEER_EVENT ? volunteerChoice : null;

    if (freeAttendeeGroup() == null) {
      return fail("❌ Both attendee groups are already in use. Wait until an event’s group role is cleared (door closed + delay), or end one of the current events.");
    }
    if (roleplayRaw && basicRaw) {
      return fail("❌ You cannot use both `roleplay-options` and `voting-basic` on the same event. Pick one secondary vote type (world vote can still be combined with either).");
    }
    const roleplayLabels = roleplayRaw ? parseCommaOptions(roleplayRaw) : [];
    const basicLabels = basicRaw ? parseCommaOptions(basicRaw) : [];
    for (const [kind, labels] of [
      ["roleplay-options", roleplayLabels],
      ["voting-basic", basicLabels],
    ] as const) {
      if (labels.length > MAX_VOTE_OPTIONS) return fail(`❌ \`${kind}\` supports at most ${MAX_VOTE_OPTIONS} options.`);
      const multi = kind === "roleplay-options" ? roleplayVoteMulti : basicVoteMulti;
      if (!multi && labels.length > 0 && labels.length <= 5) {
        const tooLong = labels.filter((label) => label.length > BUTTON_LABEL_MAX);
        if (tooLong.length) {
          return fail(
            `❌ These \`${kind}\` labels are too long for Discord buttons (max ${BUTTON_LABEL_MAX} characters):\n${tooLong.map((label) => `• \`${label}\` (${label.length})`).join("\n")}`,
          );
        }
      }
    }
    const secondaryType: SecondaryType = roleplayLabels.length ? "ROLEPLAY" : basicLabels.length ? "BASIC" : "NONE";
    const secondaryOptions = (roleplayLabels.length ? roleplayLabels : basicLabels).map((label, index) => ({ id: slugOptionId(label, index), label }));

    const hostPost = findHostAnnouncement(ix.channelId, userId);
    let startTimeUnix: number | undefined;
    let startTimeSource: "option" | "post" | undefined;
    if (startTimeRaw) {
      const parsed = parseStartTimeOption(startTimeRaw);
      if ("reason" in parsed) return fail(`❌ ${parsed.reason}`);
      startTimeUnix = parsed.unix;
      startTimeSource = "option";
    } else if (hostPost) {
      startTimeUnix = extractUnix(hostPost.content ?? "");
      if (startTimeUnix !== undefined) startTimeSource = "post";
    }
    if (startTimeUnix === undefined) {
      return fail(
        "❌ I could not determine when this event starts. Either supply the `start-time` option (Unix seconds or a Discord `<t:…>` timestamp), " +
          "or post your event announcement with a Discord timestamp (e.g. `<t:XXXXXXXXXX:F>` or `<t:XXXXXXXXXX:R>`) in this channel before running this command.",
      );
    }
    if (startTimeUnix * 1000 < now()) {
      const reason =
        startTimeSource === "option"
          ? "❌ The `start-time` you provided is in the past. Please use a future timestamp and try again."
          : "❌ The start time found in your event announcement is in the past. Update the post with a future Discord timestamp (or pass a future `start-time`) and try again.";
      return fail(`${reason}\nDetected: <t:${startTimeUnix}:F> (<t:${startTimeUnix}:R>).`);
    }

    const draft: Draft = {
      userId,
      eventName,
      durationMinutes,
      startTimeUnix,
      startTimeSource: startTimeSource ?? "post",
      worldVote,
      voteRequired,
      worldVoteMulti,
      roleplayVoteMulti,
      basicVoteMulti,
      customVoteText,
      isPatreonOnly,
      signupRoleId,
      portalEventId,
      secondaryType,
      secondaryOptions,
    };

    if (portalEventId) {
      await ix.deferReply({ ephemeral: true });
      await ctx.work();
      if (portalEventId === VOLUNTEER_EVENT.id) {
        const token = stageDraft(draft);
        return ix.editReply(volunteerConfirm(draft, token));
      }
      return ix.editReply(simple("❌ That volunteer event no longer has confirmed volunteers. Run `/start-event` again."));
    }

    if (startTimeUnix * 1000 > now() + MAX_START_LEAD_MS) {
      const token = stageDraft(draft);
      return ix.reply(farStartConfirm(draft, token), { ephemeral: true });
    }

    if (worldVote) await ix.deferReply({ ephemeral: true });
    else await ix.deferReply();
    await publishEvent(ix, draft, { hostPostId: hostPost?.id ?? null, ephemeralProgress: worldVote });
  };

  const publishEvent = async (ix: SandboxInteraction, draft: Draft, opts: { hostPostId: string | null; ephemeralProgress: boolean }) => {
    let worldOptions: WorldOption[] = [];
    const hostPost = opts.hostPostId ? ctx.message(opts.hostPostId) : null;
    if (draft.worldVote) {
      if (!hostPost) {
        return ix.editReply(
          simple(
            "❌ `world-vote` is enabled, but I could not find your recent event announcement in this channel (last 24 hours). Post the announcement with world links first, then run `/start-event` again.",
          ),
        );
      }
      const worldIds = [...new Set((hostPost.content ?? "").match(WORLD_RE) ?? [])];
      if (worldIds.length < 2) return ix.editReply(simple(`❌ \`world-vote\` needs at least 2 VRChat world links (\`wrld_…\`) in your announcement. Found ${worldIds.length}.`));
      if (worldIds.length > MAX_VOTE_OPTIONS) return ix.editReply(simple(`❌ Maximum ${MAX_VOTE_OPTIONS} world links are supported. Your announcement has ${worldIds.length}.`));
      await ix.editReply(simple(`⏳ Fetching world info from VRChat (0/${worldIds.length})…\nThe signup message will be posted when this finishes.`));
      for (let index = 0; index < worldIds.length; index += 1) {
        await ctx.sleep(700);
        await ix.editReply(simple(`⏳ Fetching worlds (${index + 1}/${worldIds.length})…\nThe signup message will be posted when this finishes.`));
        worldOptions.push(worldOptionFor(worldIds[index]));
      }
      await ctx.sleep(500);
    }

    const volunteerRoster = draft.portalEventId === VOLUNTEER_EVENT.id ? VOLUNTEER_EVENT.volunteers.map((volunteer) => ({ ...volunteer })) : null;
    const event: HEvent = {
      id: nextEventId++,
      eventName: draft.eventName,
      plannedDate: draft.startTimeUnix * 1000,
      durationMinutes: draft.durationMinutes,
      hostId: draft.userId,
      channelId: ix.channelId,
      state: "ONGOING",
      worldVoteEnabled: draft.worldVote && worldOptions.length > 0,
      worldOptions,
      secondaryType: draft.secondaryType,
      secondaryOptions: draft.secondaryOptions,
      voteRequired: draft.voteRequired,
      worldVoteMulti: draft.worldVoteMulti,
      roleplayVoteMulti: draft.roleplayVoteMulti,
      basicVoteMulti: draft.basicVoteMulti,
      customVoteText: draft.customVoteText,
      isPatreonOnly: draft.isPatreonOnly,
      signupRoleId: draft.signupRoleId,
      attendeeGroup: freeAttendeeGroup(),
      groupCleared: false,
      hostVoteIds: [],
      hostWorldVoteIds: [],
      snapshot: null,
      publicStatus: "AUTO",
      customStatusText: null,
      publicStatusChangedAt: null,
      delayMinutes: 0,
      hourReminderSentAt: null,
      hourReminderText: null,
      hourReminderAttachmentUrl: null,
      signupMessageId: null,
      listingMessageId: null,
      statusMessageId: null,
      eventPostMessageId: hostPost && TIMESTAMP_RE.test(hostPost.content ?? "") ? hostPost.id : null,
      volunteerRoster,
      feedbackDeadline: null,
      notify: new Set(),
      staffNotice: null,
      posted: false,
      soonSeen: false,
      startSeen: false,
    };
    events.push(event);
    attendees.set(event.id, []);
    await ctx.work();

    const hostTracks = openTracks(event, null);
    const hostRoleplayRequired = hostTracks.secondary && trackRequired(event, emptyPending("host"), "secondary");
    if (hostRoleplayRequired) {
      heldHostSignups.set(event.id, () => postSignupMessages(ix, event, { ephemeralProgress: opts.ephemeralProgress, promptHostVoteAfter: false }));
      await ix.editReply(simple(`Choose your roleplay role to post **${event.eventName}**.\nThe signup will not go up until you pick one.`));
      await promptHostVote(ix, event, hostTracks);
      return;
    }
    await postSignupMessages(ix, event, { ephemeralProgress: opts.ephemeralProgress, promptHostVoteAfter: true });
  };

  const promptHostVote = async (ix: SandboxInteraction, event: HEvent, tracks: Tracks) => {
    const state = emptyPending("host");
    pending.set(pendingKey(event.id, ix.user.id), state);
    const onlyRoleplay = tracks.secondary && !tracks.world && event.secondaryType === "ROLEPLAY";
    await ix.followUp(votePrompt(event, state, tracks, onlyRoleplay ? "### Pick your host roleplay role" : undefined), { ephemeral: true });
  };

  const postSignupMessages = async (ix: SandboxInteraction, event: HEvent, opts: { ephemeralProgress: boolean; promptHostVoteAfter: boolean }) => {
    const group = groupRoleId(event);
    if (group) {
      for (const item of ctx.members()) if (item.roles.includes(group)) ctx.removeRole(item.id, group);
      ctx.addRole(event.hostId, group);
    }
    const payload: SandboxPayload = { components: [publicSignupComponents(event)], pings: group ? { roles: [group] } : undefined };
    if (opts.ephemeralProgress) {
      event.signupMessageId = ctx.send(event.channelId, payload);
    } else {
      await ix.editReply(payload);
      event.signupMessageId = ix.replyMessageId;
    }
    event.posted = true;
    await ctx.sleep(400);
    // The new staff panel pings the host in 🪄｜events-attendees (later edits do not ping again).
    event.listingMessageId = ctx.send(SETTINGS.attendeesListChannelId, { components: [staffListingContainer(event)], pings: { users: [event.hostId] } });

    const voiceNote = event.volunteerRoster ? "\n⚠️ No staff voice category is set (`/events voice-category set`), so no voice channel was created." : "";
    if (opts.ephemeralProgress) await ix.editReply(simple(`✅ Event **${event.eventName}** signup posted in this channel.${voiceNote}`));
    else if (voiceNote) await ix.followUp(simple(voiceNote.trim()), { ephemeral: true });

    const hostPlusOne = plusOneFlags(event, event.hostId);
    if (hostPlusOne.plusOnePrompt || hostPlusOne.plusOneUpsell) {
      const line = hostPlusOne.plusOnePrompt ? `✅ Event **${event.eventName}** is live. You can add **one friend** as your +1.` : `✅ Event **${event.eventName}** is live.`;
      await ix.followUp(signupSuccessPayload(line, event.id, { ...hostPlusOne, showVrcNamePublicly: publicNames.get(event.hostId) ?? false }), { ephemeral: true });
    }
    if (opts.promptHostVoteAfter) {
      const tracks = openTracks(event, null);
      if (tracks.world || tracks.secondary) await promptHostVote(ix, event, tracks);
    }
  };

  /* -------------------------- button handlers ----------------------- */

  const handleSignup = async (ix: ComponentInteraction, event: HEvent, role: { isActiveStaff: boolean; isSecurity: boolean }) => {
    await ix.deferReply({ ephemeral: true });
    await ctx.work();
    const userId = ix.user.id;
    if (event.state === "DONE" || event.state === "CANCELLED") {
      return ix.editReply(simple(event.state === "CANCELLED" ? "❌ This event was cancelled, so signups are closed." : "❌ This event has ended, so signups are closed."));
    }
    const existing = findAttendee(event.id, userId);
    if (userId === event.hostId) return replyHostPlusOneCard(ix, event);

    if (existing && existing.isActiveStaff === role.isActiveStaff && existing.isSecurity === role.isSecurity) {
      const guests = roster(event.id).filter((attendee) => attendee.guestOf === userId);
      removeAttendeePreservingFrozenWorldVotes(event, existing);
      for (const guest of guests) removeAttendeePreservingFrozenWorldVotes(event, guest);
      dropGroupRole(event, [userId, ...guests.map((guest) => guest.userId)]);
      refresh(event);
      const labels = guests.map((guest) => (guest.vrcDisplayName ? `**${guest.vrcDisplayName}**` : `<@${guest.userId}>`));
      const message = !guests.length
        ? "✅ You have been removed from the event."
        : labels.length === 1
          ? `✅ You and your +1 ${labels[0]} have been removed from the event.`
          : `✅ You and your +1s (${labels.join(", ")}) have been removed from the event.`;
      return ix.editReply(simple(message));
    }

    const vrc = vrcName(userId);
    if (!vrc) {
      return ix.editReply({
        components: [
          container([
            text(
              "### 🔗 VRChat account required\nYou need to link your VRChat account before you can sign up for events.\nUse the button below to start linking, or read more here: <#vrchat-linking>",
            ),
            row(button(A.VolunteerLink, "Link Your VRChat Account", "primary", "🔗")),
          ]),
        ],
      });
    }

    const staffSignup = role.isActiveStaff || role.isSecurity;
    const isVolunteer = Boolean(event.volunteerRoster?.some((volunteer) => volunteer.discordId === userId));
    if (!staffSignup && !isVolunteer && !meetsSignupLimit(event, userId)) return ix.editReply(accessDeniedPayload(event));

    const isPatreon = isPatreonMember(userId);
    const moving = Boolean(existing && staffSignup);
    const tracks = openTracks(event, existing);
    const signupRole: SignupRole = { isActiveStaff: role.isActiveStaff, isSecurity: role.isSecurity, isPatreon: isPatreon && !staffSignup, vrcDisplayName: vrc };

    if (tracksNeedVote(tracks) && !moving) {
      const cached = cachedBallots.get(pendingKey(event.id, userId));
      const state = emptyPending("signup", signupRole);
      if (cached) {
        if (tracks.world) state.world = [...cached.world];
        if (tracks.secondary) state.secondary = [...cached.secondary];
      } else if (existing) {
        if (tracks.world) state.world = [...existing.worldIds];
        if (tracks.secondary) state.secondary = [...existing.secondaryIds];
      }
      return showVotePrompt(ix, event, state, tracks, { edit: true });
    }

    const keptWorld = moving && existing ? [...existing.worldIds] : null;
    const keptSecondary = moving && existing ? [...existing.secondaryIds] : null;
    const cached = moving ? null : cachedBallots.get(pendingKey(event.id, userId)) ?? null;
    cachedBallots.delete(pendingKey(event.id, userId));
    pending.delete(pendingKey(event.id, userId));
    upsertAttendee(event, userId, {
      ...signupRole,
      worldIds: keptWorld ?? (cached?.world.length ? cached.world : existing?.worldIds ?? []),
      secondaryIds: keptSecondary ?? cached?.secondary ?? [],
    });
    refresh(event);
    const group = groupRoleId(event);
    if (group) ctx.addRole(userId, group);

    const moved = `✅ You've been moved to **${signupRoleLabel(role)}**.`;
    const keptVote = moving && keptWorld && keptSecondary ? confirmedVoteLines(event, keptWorld, keptSecondary) : null;
    const base = existing ? (keptVote ? `${moved}\n${keptVote}` : moved) : `✅ You have signed up as **${signupRoleLabel(role)}**! Good luck and have fun!`;
    return ix.editReply(
      signupSuccessPayload(appendVrcName(base, vrc) + groupAccessNote(userId), event.id, {
        ...plusOneFlags(event, userId, existing),
        showVrcNamePublicly: publicNames.get(userId) ?? false,
      }),
    );
  };

  const replyHostPlusOneCard = async (ix: ComponentInteraction, event: HEvent) => {
    const userId = ix.user.id;
    const guests = roster(event.id).filter((attendee) => attendee.guestOf === userId);
    let statusNote: string | undefined;
    if (guests.length) {
      for (const guest of guests) removeAttendeePreservingFrozenWorldVotes(event, guest);
      dropGroupRole(
        event,
        guests.map((guest) => guest.userId),
      );
      refresh(event);
      const labels = guests.map((guest) => (guest.vrcDisplayName ? `**${guest.vrcDisplayName}**` : `<@${guest.userId}>`));
      statusNote = labels.length === 1 ? `✅ Your +1 ${labels[0]} has been removed from the event.` : `✅ Your +1s (${labels.join(", ")}) have been removed from the event.`;
    }
    const plusOne = resolvePlusOne(event, userId, null);
    const already = "You're already the host, so you can't sign up with this button.";
    if (!plusOne.plusOnePrompt && !plusOne.plusOneGuest && !plusOne.plusOneUpsell && !statusNote) {
      return ix.editReply(simple(`✅ Thanks for hosting **${event.eventName}**!\n${already}`));
    }
    const line = plusOne.plusOnePrompt ? `✅ Thanks for hosting **${event.eventName}**. You can add **one friend** as your +1.\n${already}` : `✅ Thanks for hosting **${event.eventName}**!\n${already}`;
    return ix.editReply(signupSuccessPayload(line, event.id, { ...plusOne, statusNote, showVrcNamePublicly: publicNames.get(userId) ?? false }));
  };

  const handleListAttendees = async (ix: ComponentInteraction, event: HEvent, page: number) => {
    const list = roster(event.id);
    const volunteerIds = new Set((event.volunteerRoster ?? []).map((volunteer) => volunteer.discordId));
    const regularAttendees = list.filter((attendee) => !attendee.isActiveStaff && !attendee.isSecurity && !volunteerIds.has(attendee.userId));
    const pageCount = Math.max(1, Math.ceil(regularAttendees.length / ATTENDEES_PER_PAGE));
    const clamped = Math.min(Math.max(0, page), pageCount - 1);
    const pageItems = regularAttendees.slice(clamped * ATTENDEES_PER_PAGE, clamped * ATTENDEES_PER_PAGE + ATTENDEES_PER_PAGE);
    const viewer = ix.user.id;
    const revealAll = viewer === event.hostId || list.some((attendee) => attendee.userId === viewer && (attendee.isActiveStaff || attendee.isSecurity));

    const staffLines: string[] = [];
    const mark = (position: string) => (position === "Co-Host" ? "🤝" : position === "Security" ? "🛡️" : position === "Host & Security" ? "🎤🛡️" : "🎤");
    const staffMemberLine = (userId: string, position: string, vrc: string | undefined, role: string | null) =>
      `- ${mark(position)} ${position} — <@${userId}>${vrc ? ` — **${vrc}**` : ""}${role ? ` [${role}]` : ""}${training(userId)}`;
    staffLines.push(staffMemberLine(event.hostId, hostPositionLabel(event), findAttendee(event.id, event.hostId)?.vrcDisplayName || vrcName(event.hostId) || undefined, hostRoleplayLabel(event)));
    for (const attendee of list.filter((item) => item.isActiveStaff && item.userId !== event.hostId)) staffLines.push(staffMemberLine(attendee.userId, "Co-Host", attendee.vrcDisplayName, attendeeStaffVoteLabel(attendee, event)));
    for (const attendee of list.filter((item) => !item.isActiveStaff && item.isSecurity)) staffLines.push(staffMemberLine(attendee.userId, "Security", attendee.vrcDisplayName, attendeeStaffVoteLabel(attendee, event)));

    const attendeeLines = pageItems.length
      ? pageItems.map((attendee) => {
          const role = attendeeRoleplayLabel(attendee, event);
          const show = revealAll || publicNames.get(attendee.userId) || attendee.userId === viewer;
          return `- <@${attendee.userId}>${show && attendee.vrcDisplayName ? ` — **${attendee.vrcDisplayName}**` : ""}${role ? ` [${role}]` : ""}`;
        })
      : ["*No regular attendees signed up yet.*"];
    const children: SandboxContainerChild[] = [text(`### 🛠️ Event Staff\n${staffLines.join("\n")}`), sep()];
    const volunteers = signedVolunteerBlock(event, "### Volunteers");
    if (volunteers) children.push(text(volunteers), sep());
    children.push(
      text(
        `### 🙋 Attendees (${regularAttendees.length})\nPage ${clamped + 1}/${pageCount}\n${attendeeLines.join("\n")}\n\n${
          revealAll
            ? "-# You can see every VRChat name because you are the host, a co-host, or security for this event."
            : "-# VRChat names stay hidden unless that person chose to show them."
        }`,
      ),
    );
    if (pageCount > 1) {
      children.push(
        row(
          button(`${A.ListAttendees}:${event.id}:${clamped - 1}`, "◀️ Previous", "secondary", undefined, clamped === 0),
          button(`${A.ListAttendees}:${event.id}:${clamped + 1}`, "Next ▶️", "secondary", undefined, clamped >= pageCount - 1),
        ),
      );
    }
    const payload = { components: [container(children)] };
    if (ix.isEphemeralMessage) return ix.update(payload);
    return ix.reply(payload, { ephemeral: true });
  };

  const handleEndEvent = async (ix: ComponentInteraction, event: HEvent) => {
    await ix.deferReply({ ephemeral: true });
    await ctx.work();
    const userId = ix.user.id;
    if (!isAdmin(userId) && userId !== event.hostId) return ix.editReply(simple(`❌ Only the host of this event or an admin can ${isStarted(event) ? "end" : "cancel"} it.`));
    if (event.state !== "ONGOING") return ix.editReply(simple(event.state === "CANCELLED" ? "This event has already been cancelled." : "This event has already ended."));
    const willCancel = now() < event.plannedDate;
    endEvent(event);
    return ix.editReply(simple(willCancel ? "✅ The event has been cancelled." : "✅ The event has been ended."));
  };

  const handleNotifyBell = async (ix: ComponentInteraction, event: HEvent) => {
    await ix.deferReply({ ephemeral: true });
    await ctx.work();
    const userId = ix.user.id;
    if (event.state !== "ONGOING") return ix.editReply(simple("❌ This event is closed."));
    if (findAttendee(event.id, userId)) return ix.editReply(simple("You're already signed up — you'll get the pings."));
    if (event.notify.has(userId)) {
      event.notify.delete(userId);
      dropGroupRole(event, [userId]);
      refresh(event);
      return ix.editReply(simple("🔕 Notifications off. You will not be pinged for this event."));
    }
    event.notify.add(userId);
    const group = groupRoleId(event);
    if (group) ctx.addRole(userId, group);
    refresh(event);
    return ix.editReply(simple("🔔 Notifications only — you are **not** signed up."));
  };

  const handleUpdateDisplayName = async (ix: ComponentInteraction, event: HEvent) => {
    await ix.deferUpdate();
    await ctx.work();
    const userId = ix.user.id;
    const attendee = findAttendee(event.id, userId);
    const label = attendee ? signupRoleLabel(attendee) : "Attendee";
    return ix.editReply(
      signupSuccessPayload(appendVrcName(`✅ You have signed up as **${label}**! Good luck and have fun!`, vrcName(userId)), event.id, {
        statusNote: "Your VRChat name is already up to date.",
        showVrcNamePublicly: publicNames.get(userId) ?? false,
        ...resolvePlusOne(event, userId, attendee),
      }),
    );
  };

  const handlePublicVrcName = async (ix: ComponentInteraction, event: HEvent) => {
    await ix.deferUpdate();
    await ctx.work();
    const userId = ix.user.id;
    const next = !(publicNames.get(userId) ?? false);
    publicNames.set(userId, next);
    for (const item of events) refresh(item);
    const attendee = findAttendee(event.id, userId);
    return ix.editReply(
      signupSuccessPayload(appendVrcName(`✅ You have signed up as **${attendee ? signupRoleLabel(attendee) : "Attendee"}**! Good luck and have fun!`, attendee?.vrcDisplayName), event.id, {
        showVrcNamePublicly: next,
        ...resolvePlusOne(event, userId, attendee),
        statusNote: next ? "✅ Your VRChat name will show on public attendee lists." : "Your VRChat name is hidden on public attendee lists again.",
      }),
    );
  };

  const handleVoteButton = async (ix: ComponentInteraction, event: HEvent, action: string, optionId: string | undefined) => {
    const userId = ix.user.id;
    if (action === A.ChangeVote) {
      await ix.deferReply({ ephemeral: true });
      await ctx.work();
      if (userId === event.hostId) {
        const tracks = openTracks(event, null);
        if (!tracksNeedVote(tracks)) return ix.editReply(simple("❌ Voting is closed for this event."));
        const state = emptyPending("host");
        state.world = [...event.hostWorldVoteIds];
        state.secondary = [...event.hostVoteIds];
        const onlyRoleplay = tracks.secondary && !tracks.world && event.secondaryType === "ROLEPLAY";
        return showVotePrompt(ix, event, state, tracks, { edit: true, ...(onlyRoleplay ? { title: "### Update your host roleplay role" } : {}) });
      }
      const attendee = findAttendee(event.id, userId);
      if (!attendee) return ix.editReply(simple("❌ You must be signed up for this event to change your vote."));
      const tracks = openTracks(event, attendee);
      if (!tracksNeedVote(tracks)) return ix.editReply(simple("❌ Voting is closed for this event."));
      const state = emptyPending("change");
      state.world = [...attendee.worldIds];
      state.secondary = [...attendee.secondaryIds];
      state.eventStaff = attendee.isActiveStaff || attendee.isSecurity;
      return showVotePrompt(ix, event, state, tracks, { edit: true });
    }

    let state = pending.get(pendingKey(event.id, userId));
    if (!state) return ix.reply(simple("❌ This vote prompt expired. Please try signing up or changing your vote again."), { ephemeral: true });
    const attendee = state.mode === "host" ? null : findAttendee(event.id, userId);
    const tracks = openTracks(event, attendee);

    if (action === A.VoteSkip) {
      await ix.deferUpdate();
      state = { ...state, world: tracks.world ? [] : state.world, secondary: tracks.secondary ? [] : state.secondary };
      return commitPendingVote(ix, event, state, tracks);
    }
    if (action === A.VoteConfirm) {
      await ix.deferUpdate();
      if (!requiredFilled(event, state, tracks)) return ix.followUp(simple("❌ Please select an option for every required vote before confirming."), { ephemeral: true });
      return commitPendingVote(ix, event, state, tracks);
    }
    const requiredTitle = "### A selection is required\nYou can change your choice, but you can’t clear every option.";
    if (action === A.VoteRemoveWorld || action === A.VoteRemoveSecondary) {
      const track = action === A.VoteRemoveWorld ? "world" : "secondary";
      if (trackRequired(event, state, track)) return showVotePrompt(ix, event, state, tracks, { title: requiredTitle });
      if (action === A.VoteRemoveWorld && !tracks.world) return ix.reply(simple("❌ World voting is not available for your signup."), { ephemeral: true });
      state = action === A.VoteRemoveWorld ? { ...state, world: [] } : { ...state, secondary: [] };
      return afterPick(ix, event, state, tracks);
    }
    if (!optionId) return;
    if (action === A.VoteWorldBtn) {
      if (!tracks.world) return ix.reply(simple("❌ World voting is not available for your signup."), { ephemeral: true });
      state = { ...state, world: toggleOrSet(state.world, [optionId], event.worldVoteMulti) };
    } else {
      state = { ...state, secondary: toggleOrSet(state.secondary, [optionId], secondaryAllowsMulti(event)) };
    }
    if (event.voteRequired && !requiredFilled(event, state, tracks)) {
      const kept = pending.get(pendingKey(event.id, userId)) ?? state;
      return showVotePrompt(ix, event, kept, tracks, { title: requiredTitle });
    }
    return afterPick(ix, event, state, tracks);
  };

  const afterPick = async (ix: ComponentInteraction, event: HEvent, state: Pending, tracks: Tracks) => {
    pending.set(pendingKey(event.id, ix.user.id), state);
    if ((tracks.world && tracks.secondary) || (event.voteRequired && !requiredFilled(event, state, tracks))) return showVotePrompt(ix, event, state, tracks);
    await ix.deferUpdate();
    return commitPendingVote(ix, event, state, tracks);
  };

  const handleVoteSelect = async (ix: ComponentInteraction, event: HEvent, action: string) => {
    const userId = ix.user.id;
    const state = pending.get(pendingKey(event.id, userId));
    if (!state) return ix.reply(simple("❌ This vote prompt expired. Please try again."), { ephemeral: true });
    const attendee = findAttendee(event.id, userId);
    const tracks = openTracks(event, attendee);
    const values = ix.values.filter((id) => id !== REMOVE_ID);
    const next = action === A.VoteWorldSelect ? { ...state, world: values } : { ...state, secondary: values };
    if (action === A.VoteWorldSelect && !tracks.world) return ix.reply(simple("❌ World voting is not available for your signup."), { ephemeral: true });
    if (action === A.VoteSecondarySelect && !tracks.secondary) return ix.reply(simple("❌ That vote is not available for your signup."), { ephemeral: true });
    if (event.voteRequired && !requiredFilled(event, next, tracks)) {
      return showVotePrompt(ix, event, state, tracks, { title: "### A selection is required\nYou can change your choice, but you can’t clear every option." });
    }
    pending.set(pendingKey(event.id, userId), next);
    if ((tracks.world && tracks.secondary) || (event.voteRequired && !requiredFilled(event, next, tracks))) return showVotePrompt(ix, event, next, tracks);
    await ix.deferUpdate();
    return commitPendingVote(ix, event, next, tracks);
  };

  const plusOneModal = (eventId: number): SandboxModal => ({
    customId: `${A.PlusOneModal}:${eventId}`,
    title: "Add a Friend",
    components: [{ type: "input", customId: "plus-one-query", label: "Username or display name", style: "short", required: true, minLength: 2, maxLength: 64 }],
  });

  const handlePlusOne = async (ix: ComponentInteraction, event: HEvent, choice: string | undefined) => {
    if (choice === "cancel") return ix.update(sponsorPayload(event.id, ix.user.id, { statusNote: "Cancelled the +1 invite." }));
    if (choice !== "yes") return;
    return ix.showModal(plusOneModal(event.id));
  };

  const searchPlusOneCandidates = (event: HEvent, query: string, sponsorId: string) => {
    const signed = new Set(roster(event.id).map((attendee) => attendee.userId));
    const needle = query.toLowerCase();
    return ctx
      .members()
      .filter((item) => !item.bot && item.id !== sponsorId && !signed.has(item.id) && isVerified(item.id) && Boolean(vrcName(item.id)))
      .filter((item) => [item.displayName, item.username, vrcName(item.id)].some((value) => value.toLowerCase().includes(needle)))
      .slice(0, 25)
      .map((item) => ({ id: item.id, label: `${item.displayName} (${item.username})`.slice(0, 100) }));
  };

  const handlePlusOneSelect = async (ix: ComponentInteraction, event: HEvent) => {
    await ix.deferUpdate();
    await ctx.work();
    const guestId = ix.values[0];
    const sponsorId = ix.user.id;
    if (!event.isPatreonOnly || !isHighPatreon(sponsorId)) return ix.editReply(simple("❌ Only high Patreon can add a +1 on Patreon-only events."));
    if (!guestId || !member(guestId) || !isVerified(guestId)) {
      return ix.editReply(sponsorPayload(event.id, sponsorId, { plusOnePrompt: true, statusNote: "❌ That member is not Eden/Fansly verified." }));
    }
    if (findAttendee(event.id, guestId)) {
      return ix.editReply(sponsorPayload(event.id, sponsorId, { plusOnePrompt: true, statusNote: "❌ That member is already signed up for this event." }));
    }
    upsertAttendee(event, guestId, { isActiveStaff: false, isSecurity: false, isPatreon: false, vrcDisplayName: vrcName(guestId), worldIds: [], secondaryIds: [], guestOf: sponsorId });
    const group = groupRoleId(event);
    if (group) ctx.addRole(guestId, group);
    refresh(event);
    return ix.editReply(sponsorPayload(event.id, sponsorId, { plusOneGuest: { mention: `<@${guestId}>`, thumbnail: member(guestId)?.avatar } }));
  };

  /** Mirrors loadControlledEvent: team access = host or event team, scenario access = host, co-host or admin. */
  const controlAccess = (event: HEvent, userId: string, access: "team" | "scenario") => {
    if (event.state !== "ONGOING") return "❌ This event is no longer open.";
    const ok =
      access === "scenario"
        ? userId === event.hostId || isAdmin(userId) || Boolean(findAttendee(event.id, userId)?.isActiveStaff)
        : userId === event.hostId || isEventTeamStaff(userId) || hasAny(userId, SETTINGS.authorizedRoleIds);
    if (ok) return null;
    return access === "scenario" ? "❌ Only the host, active staff, or an admin can update event status." : "❌ Only the host or event staff can do that.";
  };

  const replyOrEdit = (ix: SandboxInteraction, content: string) => (ix.deferred || ix.replied ? ix.editReply(simple(content)) : ix.reply(simple(content), { ephemeral: true }));

  const applyPresetStatus = (event: HEvent, value: Exclude<StatusValue, "AUTO" | "CUSTOM">, moveStartToNow = false) => {
    const label = STATUS_OPTIONS.find((option) => option.value === value)?.label ?? value;
    const move = moveStartToNow && needsEarlyDoorOpenConfirm(event, value);
    event.publicStatus = value;
    event.customStatusText = null;
    event.publicStatusChangedAt = now();
    if (move) {
      event.plannedDate = now();
      event.soonSeen = true;
      event.startSeen = false;
      setStaffNotice(event, `${label} applied. Start time moved to now.`);
    } else setStaffNotice(event, `${label} applied.`);
    publishStatus(event, value === "DOOR_CLOSED");
  };

  const handleStatusSelect = async (ix: ComponentInteraction, event: HEvent) => {
    const value = ix.values[0] as StatusValue | undefined;
    if (!value) return;
    if (value === "CUSTOM") {
      const denied = controlAccess(event, ix.user.id, "scenario");
      if (denied) return replyOrEdit(ix, denied);
      return ix.showModal({
        customId: `${A.ScenarioCustomModal}:${event.id}`,
        title: "Custom status",
        components: [{ type: "input", customId: "custom-status", label: "Status text", style: "short", required: true, maxLength: 100 }],
      });
    }
    await ix.deferUpdate();
    await ctx.work();
    const denied = controlAccess(event, ix.user.id, "scenario");
    if (denied) {
      refresh(event);
      return ix.followUp(simple(denied), { ephemeral: true });
    }
    const label = STATUS_OPTIONS.find((option) => option.value === value)?.label ?? value;
    if (value !== "AUTO" && event.publicStatus === value) {
      setStaffNotice(event, `The event status hasn't changed, it was already ${label}.`);
      refresh(event);
      return;
    }
    if (needsEarlyDoorOpenConfirm(event, value)) {
      refresh(event);
      const safeMinutes = Math.round(STARTING_SOON_MS / MINUTE);
      return ix.followUp(
        {
          components: [
            container([
              text(
                `The event has not started yet (planned <t:${unix(event.plannedDate)}:R>). Setting **${label}** now will move the start time to now.\n\nWait until the last **${safeMinutes} minutes** before start to open the door without changing the start time.\n\nContinue?`,
              ),
              row(button(`${A.DoorOpenConfirm}:${event.id}:${value}`, `Set ${label}`, "danger"), button(`${A.DoorOpenCancel}:${event.id}`, "Cancel", "secondary")),
            ]),
          ],
        },
        { ephemeral: true },
      );
    }
    applyPresetStatus(event, value as Exclude<StatusValue, "AUTO" | "CUSTOM">);
  };

  const handleDoorOpen = async (ix: ComponentInteraction, event: HEvent, action: string, value: string | undefined) => {
    if (action === A.DoorOpenCancel) return ix.update(simple("Cancelled. Start time was not changed."));
    if (!value || !isDoorOpen(value)) return ix.update(simple("❌ That door-open status is not valid."));
    await ix.deferUpdate();
    await ctx.work();
    if (controlAccess(event, ix.user.id, "scenario")) return ix.editReply(simple("❌ Could not update the event status."));
    const moved = needsEarlyDoorOpenConfirm(event, value);
    applyPresetStatus(event, value as "DOOR_OPEN" | "PATREON_DOOR_OPEN", true);
    const label = STATUS_OPTIONS.find((option) => option.value === value)?.label ?? "Door Open";
    return ix.editReply(simple(moved ? `${label} applied. Start time is now.` : `${label} applied.`));
  };

  const handleDelay = async (ix: ComponentInteraction, event: HEvent) => {
    const denied = controlAccess(event, ix.user.id, "team");
    if (denied) return replyOrEdit(ix, denied);
    if (!canDelayEvent(event)) return ix.reply(simple("❌ Delay is only available before a host sets a live status (Not Started / Starting Soon)."), { ephemeral: true });
    return ix.reply(
      {
        components: [
          container([
            text("Pick a delay. This shifts the start time and notifies attendees."),
            row({ type: "select", customId: `${A.DelaySelect}:${event.id}`, placeholder: "How long should we delay the start?", options: DELAY_OPTIONS }),
          ]),
        ],
      },
      { ephemeral: true },
    );
  };

  const handleDelaySelect = async (ix: ComponentInteraction, event: HEvent) => {
    await ix.deferUpdate();
    await ctx.work();
    const denied = controlAccess(event, ix.user.id, "team");
    if (denied) return ix.followUp(simple(denied), { ephemeral: true });
    if (!canDelayEvent(event)) return ix.editReply(simple("❌ Delay is no longer available for this event."));
    const extra = Number(ix.values[0]);
    if (!Number.isInteger(extra) || extra <= 0) return;
    event.plannedDate += extra * MINUTE;
    event.delayMinutes += extra;
    event.publicStatus = "AUTO";
    event.customStatusText = null;
    event.soonSeen = now() >= event.plannedDate - STARTING_SOON_MS;
    event.startSeen = now() >= event.plannedDate;
    setStaffNotice(event, `Delayed by ${formatDelayDuration(extra)}.`);
    publishStatus(event);
    return ix.deleteReply();
  };

  const handleRateEvent = async (ix: ComponentInteraction, event: HEvent) => {
    await ctx.sleep(150);
    if (event.state === "CANCELLED") return ix.reply(simple("❌ This event was cancelled, so feedback is not available."), { ephemeral: true });
    if (event.feedbackDeadline && now() > event.feedbackDeadline) return ix.reply(simple("❌ The feedback window for this event has closed."), { ephemeral: true });
    if (!findAttendee(event.id, ix.user.id)) return ix.reply(simple("❌ Only people who signed up for this event can leave a rating."), { ephemeral: true });
    const rating = ratings.get(event.id)?.get(ix.user.id);
    const rated = rating?.rating != null;
    const commented = Boolean(rating?.comment);
    if (rated && commented) return ix.reply(simple("✅ You have already submitted your full feedback for this event. Thank you!"), { ephemeral: true });
    const components: SandboxModal["components"] = [
      { type: "text", content: "_All questions are optional — leave stars, written feedback, or both. Responses are anonymous, and only admins can see this feedback._" },
    ];
    if (!rated) {
      components.push({
        type: "radio",
        customId: "event-rating",
        label: "How would you rate this event? (optional)",
        description: "Select a rating from 1 to 5 stars, or skip.",
        options: [
          { label: "1 ⭐ Poor", value: "1" },
          { label: "2 ⭐ Fair", value: "2" },
          { label: "3 ⭐ Okay", value: "3" },
          { label: "4 ⭐ Good", value: "4" },
          { label: "5 ⭐ Excellent", value: "5" },
        ],
      });
    }
    if (!commented) {
      components.push({ type: "input", customId: "feedback-text", label: "Optional written feedback", description: "Anonymous — only admins can see this.", style: "paragraph", maxLength: 1000 });
    }
    return ix.showModal({ customId: `${A.FeedbackModal}:${event.id}`, title: "Event Feedback", components });
  };

  const handleViewFeedback = async (ix: ComponentInteraction, event: HEvent) => {
    if (!isAdmin(ix.user.id)) return ix.reply(simple("❌ Only administrators can view the feedback recap."), { ephemeral: true });
    await ix.deferReply({ ephemeral: true });
    await ctx.work();
    const list = [...(ratings.get(event.id)?.values() ?? [])];
    const scored = list.filter((item) => item.rating != null);
    const average = scored.length ? scored.reduce((sum, item) => sum + (item.rating ?? 0), 0) / scored.length : 0;
    const comments = list.map((item) => item.comment).filter((value): value is string => Boolean(value));
    const start = unix(event.plannedDate);
    return ix.editReply({
      components: [
        container(
          [
            text(
              `# ⭐ Feedback Recap — ${event.eventName}\n**When:** <t:${start}:F> (<t:${start}:R>)\n**Host:** <@${event.hostId}>\n**Attendees:** ${roster(event.id).length}\n**Total Ratings:** ${scored.length}\n**Average Rating:** ${scored.length ? average.toFixed(2) : "N/A"} / 5`,
            ),
            sep(),
            text(`### Distribution\n${[5, 4, 3, 2, 1].map((stars) => `${"⭐".repeat(stars)} — ${scored.filter((item) => item.rating === stars).length}`).join("\n")}`),
            sep(),
            text(`### 📝 Written Feedback (anonymous)\n${comments.length ? comments.map((comment) => `> ${comment}`).join("\n\n") : "_No written feedback submitted._"}`),
          ],
          hex(0xfee75c),
        ),
      ],
    });
  };

  const handleFarConfirm = async (ix: ComponentInteraction, action: string, token: string | undefined) => {
    const isVolunteer = action === A.StartVolunteerConfirm || action === A.StartVolunteerCancel;
    if (action === A.StartFarCancel || action === A.StartVolunteerCancel) {
      takeDraft(token, ix.user.id);
      return ix.update(simple("Cancelled. No event was created."));
    }
    if (!isVolunteer) {
      const draft = takeDraft(token, ix.user.id);
      if (!draft) return ix.update(simple("❌ This confirmation expired. Run `/start-event` again."));
      await ix.deferUpdate();
      await ctx.work();
      if (freeAttendeeGroup() == null) return ix.editReply(simple("❌ Both attendee groups are already in use. Wait until an event’s group role is cleared, or end one of the current events."));
      const hostPost = findHostAnnouncement(ix.channelId, ix.user.id);
      return publishEvent(ix, draft, { hostPostId: hostPost?.id ?? null, ephemeralProgress: true });
    }
    await ix.deferUpdate();
    const draft = takeDraft(token, ix.user.id);
    if (!draft) return ix.editReply(simple("❌ This confirmation expired. Run `/start-event` again."));
    if (draft.startTimeUnix * 1000 > now() + MAX_START_LEAD_MS) {
      const next = stageDraft(draft);
      return ix.editReply(farStartConfirm(draft, next));
    }
    await ix.editReply(simple("⏳ Creating the event and downloading volunteer plates…"));
    await ctx.work();
    if (freeAttendeeGroup() == null) return ix.editReply(simple("❌ Both attendee groups are already in use. Wait until an event’s group role is cleared, or end one of the current events."));
    const hostPost = findHostAnnouncement(ix.channelId, ix.user.id);
    return publishEvent(ix, draft, { hostPostId: hostPost?.id ?? null, ephemeralProgress: true });
  };

  /* -------------------------- modal handlers ------------------------ */

  const onModalSubmit = async (ix: ModalInteraction) => {
    const [action, rawId] = ix.customId.split(":");
    const event = findEvent(Number(rawId));
    if (!event) return;
    const userId = ix.user.id;

    if (action === A.PlusOneModal) {
      await ix.deferUpdate();
      await ctx.work();
      const query = (ix.fields["plus-one-query"] ?? "").trim();
      const options = searchPlusOneCandidates(event, query, userId);
      if (!options.length) return ix.editReply(sponsorPayload(event.id, userId, { plusOnePrompt: true, statusNote: "❌ No verified, VRChat-linked members matched that name." }));
      return ix.editReply(sponsorPayload(event.id, userId, { plusOneSelect: options }));
    }

    if (action === A.ScenarioCustomModal) {
      await ix.deferUpdate();
      await ctx.work();
      if (controlAccess(event, userId, "scenario")) return;
      const custom = (ix.fields["custom-status"] ?? "").trim().slice(0, 100);
      if (!custom) return ix.followUp(simple("❌ Custom status cannot be empty."), { ephemeral: true });
      if (event.publicStatus === "CUSTOM" && (event.customStatusText ?? "").trim() === custom) {
        setStaffNotice(event, "The event status hasn't changed, it was already Custom.");
        refresh(event);
        return;
      }
      event.publicStatus = "CUSTOM";
      event.customStatusText = custom;
      event.publicStatusChangedAt = now();
      setStaffNotice(event, "Custom status applied.");
      publishStatus(event);
      return;
    }

    if (action === A.HourReminderModal) {
      await ix.deferReply({ ephemeral: true });
      await ctx.work();
      const denied = controlAccess(event, userId, "scenario");
      if (denied) return ix.editReply(simple(denied));
      if (!canOfferHourReminder(event)) return ix.editReply(simple("❌ The 1h reminder is no longer available for this event."));
      ghostPing(event.channelId, SETTINGS.generalEventPingRoleId, 3000);
      event.hourReminderSentAt = now();
      event.hourReminderText = (ix.fields.reminder_text ?? "").trim() || null;
      event.hourReminderAttachmentUrl = ix.fields.reminder_file || null;
      refresh(event);
      return ix.editReply(simple("✅ 1h reminder added to the signup message."));
    }

    if (action === A.FeedbackModal) {
      await ix.deferReply({ ephemeral: true });
      await ctx.work();
      const ratingRaw = ix.fields["event-rating"];
      const feedback = (ix.fields["feedback-text"] ?? "").trim();
      const stars = ratingRaw ? Number(ratingRaw) : undefined;
      if (event.state === "CANCELLED") return ix.editReply(simple("❌ This event was cancelled, so feedback is not available."));
      if (event.feedbackDeadline && now() > event.feedbackDeadline) return ix.editReply(simple("❌ The feedback window for this event has closed."));
      if (!findAttendee(event.id, userId)) return ix.editReply(simple("❌ Only people who signed up for this event can leave a rating."));
      if (stars === undefined && !feedback) return ix.editReply(simple("❌ Please leave a star rating and/or written feedback."));
      const byUser = ratings.get(event.id) ?? new Map();
      const current = byUser.get(userId) ?? {};
      byUser.set(userId, { ...current, ...(stars !== undefined ? { rating: stars } : {}), ...(feedback ? { comment: feedback } : {}) });
      ratings.set(event.id, byUser);
      return ix.editReply(simple("### ✅ Thank you for your feedback!\nYou can now dismiss this message."));
    }
  };

  /* -------------------------- component router ---------------------- */

  const onComponent = async (ix: ComponentInteraction) => {
    const parts = ix.customId.split(":");
    const action = parts[0];

    if (action === A.VolunteerLink) {
      // Sandbox shortcut: the real flow walks the member through linking. Here it succeeds at once.
      await ix.deferUpdate();
      await ctx.work();
      const userId = ix.user.id;
      if (!hasRole(userId, ROLE.linked)) ctx.addRole(userId, ROLE.linked);
      for (const event of events) if (event.posted) refresh(event);
      return ix.editReply(
        simple(
          `✅ Your VRChat account **${linkedVrcName(userId) || ix.user.displayName}** is now linked.
Press **Sign Up** again to join the event.
-# Sandbox: linking is confirmed instantly. On Discord you go through the full linking steps.`,
        ),
      );
    }
    if (action === A.StartFarConfirm || action === A.StartFarCancel || action === A.StartVolunteerConfirm || action === A.StartVolunteerCancel) {
      return handleFarConfirm(ix, action, parts[1]);
    }

    const event = findEvent(Number(parts[1]));
    if (!event) return ix.reply(simple("❌ This event could not be found. It may have been removed."), { ephemeral: true });

    switch (action) {
      case A.SignUp:
        return handleSignup(ix, event, { isActiveStaff: false, isSecurity: false });
      case A.CoHostSignup:
        return handleSignup(ix, event, { isActiveStaff: true, isSecurity: false });
      case A.SecuritySignup:
        return handleSignup(ix, event, { isActiveStaff: false, isSecurity: true });
      case A.ListAttendees:
        await ctx.work();
        return handleListAttendees(ix, event, Number(parts[2] ?? 0) || 0);
      case A.EndEvent:
        return handleEndEvent(ix, event);
      case A.NotifyBell:
        return handleNotifyBell(ix, event);
      case A.UpdateDisplayName:
        return handleUpdateDisplayName(ix, event);
      case A.PublicVrcName:
        return handlePublicVrcName(ix, event);
      case A.ChangeVote:
      case A.VoteWorldBtn:
      case A.VoteSecondaryBtn:
      case A.VoteConfirm:
      case A.VoteSkip:
      case A.VoteRemoveWorld:
      case A.VoteRemoveSecondary:
        if (action !== A.ChangeVote) await ctx.sleep(250);
        return handleVoteButton(ix, event, action, parts[2]);
      case A.VoteWorldSelect:
      case A.VoteSecondarySelect:
        await ctx.sleep(250);
        return handleVoteSelect(ix, event, action);
      case A.PlusOne:
        return handlePlusOne(ix, event, parts[2]);
      case A.PlusOneSelect:
        return handlePlusOneSelect(ix, event);
      case A.Scenario:
        return handleStatusSelect(ix, event);
      case A.DoorOpenConfirm:
      case A.DoorOpenCancel:
        return handleDoorOpen(ix, event, action, parts[2]);
      case A.Delay:
        await ctx.sleep(300);
        return handleDelay(ix, event);
      case A.DelaySelect:
        return handleDelaySelect(ix, event);
      case A.HourReminder:
        return ix.showModal({
          customId: `${A.HourReminderModal}:${event.id}`,
          title: "1h reminder",
          components: [
            { type: "input", customId: "reminder_text", label: "Custom message", style: "paragraph", maxLength: 1000 },
            { type: "file", customId: "reminder_file", label: "Image" },
          ],
        });
      case A.RateEvent:
        return handleRateEvent(ix, event);
      case A.ViewFeedback:
        return handleViewFeedback(ix, event);
      default:
        return undefined;
    }
  };

  /* -------------------------- command definition -------------------- */

  const commands: SlashCommandDef[] = [
    {
      name: "start-event",
      description: "Start a new event signup post.",
      options: [
        { name: "name", description: "The name of the event.", type: "string", required: true, maxLength: 100 },
        { name: "duration", description: "How long the event will last. Defaults to 2 hours if omitted.", type: "integer", choices: DURATION_CHOICES },
        {
          name: "start-time",
          description: "Unix seconds or a Discord timestamp (<t:…:F>, <t:…:R>, …). If omitted, your last <t:…> post is used.",
          type: "string",
          maxLength: 100,
        },
        { name: "roleplay-options", description: "Comma-separated roleplay roles attendees can pick.", type: "string", maxLength: 1000 },
        { name: "world-vote", description: "Parse your announcement for VRChat world links to vote on.", type: "boolean" },
        { name: "voting-basic", description: "Comma-separated basic vote options.", type: "string", maxLength: 1000 },
        { name: "allow-vote-skip", description: "Let attendees finish signup without voting. Defaults to false.", type: "boolean" },
        { name: "world-multi-vote", description: "Allow multiple world selections. Defaults to false.", type: "boolean" },
        { name: "roleplay-multi-vote", description: "Allow multiple roleplay roles, including alongside a world vote. Defaults to false.", type: "boolean" },
        { name: "basic-multi-vote", description: "Allow multiple basic vote options. Defaults to false.", type: "boolean" },
        { name: "custom-vote-text", description: "Text shown when asking attendees to pick vote options.", type: "string", maxLength: 200 },
        { name: "is-patreon", description: "Patreon-only event: high Patreon (including host, co-host, and security) can bring a +1.", type: "boolean" },
        { name: "signup-role", description: "Also allow this role to sign up. With Patreon, Patrons, staff, and this role can join.", type: "role" },
        {
          name: "use-volunteers-list",
          description: "Pull confirmed volunteers from one of your upcoming volunteer events.",
          type: "string",
          autocomplete: () => [{ name: `${VOLUNTEER_EVENT.name} — ${VOLUNTEER_EVENT.volunteers.length} volunteer(s) (sandbox demo)`, value: VOLUNTEER_EVENT.id }],
        },
      ],
    },
  ];

  /* -------------------------- seeding ------------------------------- */

  seed?.({
    createEvent: (partial, signups = []) => {
      const draft: Draft = {
        userId: partial.userId ?? ctx.members()[0].id,
        eventName: partial.eventName,
        durationMinutes: partial.durationMinutes ?? DEFAULT_DURATION,
        startTimeUnix: partial.startTimeUnix ?? unix(now() + 2 * HOUR),
        startTimeSource: "post",
        worldVote: false,
        voteRequired: partial.voteRequired ?? true,
        worldVoteMulti: false,
        roleplayVoteMulti: false,
        basicVoteMulti: false,
        customVoteText: null,
        isPatreonOnly: partial.isPatreonOnly ?? false,
        signupRoleId: null,
        portalEventId: null,
        secondaryType: partial.secondaryType ?? "NONE",
        secondaryOptions: partial.secondaryOptions ?? [],
      };
      const event: HEvent = {
        id: nextEventId++,
        eventName: draft.eventName,
        plannedDate: draft.startTimeUnix * 1000,
        durationMinutes: draft.durationMinutes,
        hostId: draft.userId,
        channelId: CHANNEL.events,
        state: "ONGOING",
        worldVoteEnabled: false,
        worldOptions: [],
        secondaryType: draft.secondaryType,
        secondaryOptions: draft.secondaryOptions,
        voteRequired: draft.voteRequired,
        worldVoteMulti: false,
        roleplayVoteMulti: false,
        basicVoteMulti: false,
        customVoteText: null,
        isPatreonOnly: draft.isPatreonOnly,
        signupRoleId: null,
        attendeeGroup: freeAttendeeGroup(),
        groupCleared: false,
        hostVoteIds: partial.secondaryOptions?.[0] ? [partial.secondaryOptions[0].id] : [],
        hostWorldVoteIds: [],
        snapshot: null,
        publicStatus: "AUTO",
        customStatusText: null,
        publicStatusChangedAt: null,
        delayMinutes: 0,
        hourReminderSentAt: null,
        hourReminderText: null,
        hourReminderAttachmentUrl: null,
        signupMessageId: null,
        listingMessageId: null,
        statusMessageId: null,
        eventPostMessageId: null,
        volunteerRoster: null,
        feedbackDeadline: null,
        notify: new Set(),
        staffNotice: null,
        posted: true,
        soonSeen: false,
        startSeen: false,
      };
      events.push(event);
      attendees.set(event.id, []);
      const group = groupRoleId(event);
      if (group) ctx.addRole(event.hostId, group);
      for (const signup of signups) {
        const staff = signup.role === "cohost" || signup.role === "security";
        upsertAttendee(event, signup.userId, {
          isActiveStaff: signup.role === "cohost",
          isSecurity: signup.role === "security",
          isPatreon: !staff && isPatreonMember(signup.userId),
          vrcDisplayName: vrcName(signup.userId),
          worldIds: [],
          secondaryIds: signup.secondary ?? [],
        });
        if (group) ctx.addRole(signup.userId, group);
      }
      event.signupMessageId = ctx.send(event.channelId, { components: [publicSignupComponents(event)] }, undefined, { createdAt: now() - 25 * MINUTE });
      event.listingMessageId = ctx.send(SETTINGS.attendeesListChannelId, { components: [staffListingContainer(event)] }, undefined, { createdAt: now() - 25 * MINUTE });
    },
  });

  /* -------------------------- runtime ------------------------------- */

  return {
    commands,
    onCommand: async (ix) => {
      if (ix.commandName === "start-event") await startEvent(ix);
    },
    onComponent,
    onModalSubmit,
    onRolesChanged: () => {
      for (const event of events) if (event.posted) refresh(event);
    },
    onTick: () => {
      for (const event of events) {
        if (event.state !== "ONGOING" || !event.posted) continue;
        if (!event.soonSeen && now() >= event.plannedDate - STARTING_SOON_MS) {
          event.soonSeen = true;
          refresh(event);
        }
        if (!event.startSeen && now() >= event.plannedDate) {
          event.startSeen = true;
          onEventStarted(event);
        }
        if (now() >= event.plannedDate + event.durationMinutes * MINUTE) {
          endEvent(event);
          continue;
        }
        if (event.staffNotice && Date.now() - event.staffNotice.at >= STAFF_NOTICE_MS) {
          event.staffNotice = null;
          refresh(event);
        }
      }
    },
    clockPresets: () => {
      const presets: ClockPreset[] = [];
      for (const event of events) {
        if (!event.posted) continue;
        if (event.state === "ONGOING") {
          presets.push(
            { label: `${event.eventName}: 20 min before start (Starting Soon)`, at: event.plannedDate - STARTING_SOON_MS },
            { label: `${event.eventName}: start time (world vote freezes)`, at: event.plannedDate },
            { label: `${event.eventName}: 11 min after start (roleplay change window closes)`, at: event.plannedDate + 11 * MINUTE },
            { label: `${event.eventName}: end (start + duration)`, at: event.plannedDate + event.durationMinutes * MINUTE },
          );
        } else if (event.state === "DONE" && event.feedbackDeadline) {
          presets.push({ label: `${event.eventName}: feedback window closes (+24h)`, at: event.feedbackDeadline + MINUTE });
        }
      }
      return presets;
    },
  };
}
