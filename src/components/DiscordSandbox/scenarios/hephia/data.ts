import type { SandboxChannel, SandboxMember, SandboxRole } from "../../types";

/* eslint-disable @typescript-eslint/no-require-imports */
export const HEPHIA_AVATAR = require("@site/static/img/sandbox/hephia-v2-avatar.png").default as string;
export const HEPHIA_YES = require("@site/static/img/sandbox/hephia-yes.png").default as string;
export const HEPHIA_LOVE = require("@site/static/img/sandbox/hephia-love.png").default as string;
const ICON = {
  admin: require("@site/static/img/admin_role_icon.png").default as string,
  senior: require("@site/static/img/senior_event_team_role_icon.png").default as string,
  host: require("@site/static/img/event_host_role_icon.png").default as string,
  security: require("@site/static/img/event_security_role_icon.png").default as string,
};

const avatar = (index: number) => `https://cdn.discordapp.com/embed/avatars/${index % 6}.png`;

export const ROLE = {
  admin: "r_admin",
  senior: "r_senior",
  breed: "r_breed",
  host: "r_host",
  security: "r_security",
  trial: "r_trial",
  patreon3: "r_patreon3",
  patreon2: "r_patreon2",
  patreon1: "r_patreon1",
  member: "r_member",
  linked: "r_linked",
  ping: "r_ping",
  group1: "r_group1",
  group2: "r_group2",
} as const;

/** Ordered highest first: the first coloured role also colours the member's name. */
export const ROLES: SandboxRole[] = [
  { id: ROLE.admin, name: "Admin", color: "#db1cb8", icon: ICON.admin, description: "Counts as an admin: can end any event and view feedback recaps." },
  {
    id: ROLE.senior,
    name: "Senior Event Team",
    color: "#ffc857",
    icon: ICON.senior,
    description: "Senior event staff: can run /start-event and see 🪄｜events-attendees. Nobody has it by default.",
  },
  { id: ROLE.host, name: "Host", color: "#a259f7", icon: ICON.host, description: "Can run /start-event and see 🪄｜events-attendees." },
  { id: ROLE.security, name: "Security", color: "#ff5e5b", icon: ICON.security, description: "Event security role." },
  { id: ROLE.breed, name: "The Event Breed", color: "#c7a6ff", description: "Event team role." },
  { id: ROLE.trial, name: "Event Trial", color: "#3fa7ff", description: "Shows *(Training)* next to the name on event listings." },
  { id: ROLE.patreon3, name: "Patreon Tier 3", color: "#f96854", description: "High supporter: can bring a +1 to Patreon events." },
  { id: ROLE.patreon2, name: "Patreon Tier 2", color: "#f98a54", description: "Patron: bypasses soft capacity (🕐 on the staff list)." },
  { id: ROLE.patreon1, name: "Patreon Tier 1", color: "#f9ad54", description: "Patron: early entry." },
  { id: ROLE.member, name: "Member", color: "#99aab5", description: "Verified member." },
  {
    id: ROLE.linked,
    name: "VRChat Linked",
    color: "#2ea9e6",
    description: "VRChat account linked through Hephia. Without it, Sign Up asks the member to link first.",
  },
  { id: ROLE.ping, name: "General Event Ping", color: "#5865f2", description: "Pinged by event announcements and the 1h reminder." },
  { id: ROLE.group1, name: "Event Attendees 1", color: "#2ecc71", managed: true, description: "Given by Hephia to the attendees of one event so they can be pinged." },
  { id: ROLE.group2, name: "Event Attendees 2", color: "#1abc9c", managed: true, description: "Second attendee group, used when two events run at once." },
];

export const STAFF_ROLES = [ROLE.breed, ROLE.host, ROLE.security];

export const BOT: SandboxMember = {
  id: "u_hephia",
  displayName: "Hephia V2",
  username: "hephia",
  avatar: HEPHIA_AVATAR,
  roles: [],
  bot: true,
};

export interface VrcProfile {
  vrcName: string;
  /** In The Eden Apis VRChat group (needed for afterparty instances). */
  inGroup: boolean;
}

export function buildMembers(): SandboxMember[] {
  return [
    {
      id: "u_aurora",
      displayName: "Aurora",
      username: "aurora.hosts",
      avatar: avatar(5),
      roles: [...STAFF_ROLES, ROLE.linked],
      vrcName: "AuroraVR",
      badges: ["Event Team", "Staff benefits (high supporter)"],
      note: "This is you: an event host with security training.",
    },
    {
      id: "u_rook",
      displayName: "Rook",
      username: "rook.guards",
      avatar: avatar(1),
      roles: [...STAFF_ROLES, ROLE.linked],
      vrcName: "RookTheGuard",
      badges: ["Event Team", "Staff benefits (high supporter)"],
      note: "A fellow staff member. Act as Rook to test co-host / security signups, or a second host.",
    },
    {
      id: "u_mochi",
      displayName: "Mochi",
      username: "mochi.bun",
      avatar: avatar(2),
      roles: [ROLE.member, ROLE.patreon3, ROLE.linked],
      vrcName: "MochiBun",
      badges: ["Patron (Tier 3)", "Can bring a +1"],
    },
    {
      id: "u_pixel",
      displayName: "Pixel",
      username: "pixel.pop",
      avatar: avatar(3),
      roles: [ROLE.member, ROLE.patreon1, ROLE.linked],
      vrcName: "PixelPop",
      badges: ["Patron (Tier 1)"],
    },
    {
      id: "u_sable",
      displayName: "Sable",
      username: "sable.night",
      avatar: avatar(4),
      roles: [ROLE.member, ROLE.linked],
      vrcName: "SableNight",
      note: "Not in The Eden Apis VRChat group, so Hephia adds an afterparty warning when they sign up.",
    },
    {
      id: "u_juniper",
      displayName: "Juniper",
      username: "juni.per",
      avatar: avatar(0),
      roles: [ROLE.member, ROLE.linked],
      vrcName: "JuniperLeaf",
    },
    {
      id: "u_ember",
      displayName: "Ember",
      username: "ember.glow",
      avatar: avatar(1),
      roles: [ROLE.member, ROLE.linked],
      vrcName: "EmberGlow",
      badges: ["Volunteer (Free Use)"],
    },
    {
      id: "u_willow",
      displayName: "Willow",
      username: "willow.wisp",
      avatar: avatar(2),
      roles: [ROLE.member],
      vrcName: "WillowWisp",
      badges: ["Volunteer (Aftercare)", "Not VRChat linked"],
      note: "No VRChat Linked role, to test signing up without a linked account. In the sandbox, Hephia's link button links them instantly.",
    },
  ];
}

export const VRC: Record<string, VrcProfile> = {
  u_aurora: { vrcName: "AuroraVR", inGroup: true },
  u_rook: { vrcName: "RookTheGuard", inGroup: true },
  u_mochi: { vrcName: "MochiBun", inGroup: true },
  u_pixel: { vrcName: "PixelPop", inGroup: true },
  u_sable: { vrcName: "SableNight", inGroup: false },
  u_juniper: { vrcName: "JuniperLeaf", inGroup: true },
  u_ember: { vrcName: "EmberGlow", inGroup: true },
  u_willow: { vrcName: "WillowWisp", inGroup: true },
};

export const CHANNEL = {
  events: "c_events",
  attendees: "c_attendees",
} as const;

export const CHANNELS: SandboxChannel[] = [
  {
    id: CHANNEL.events,
    name: "🎭｜events",
    category: "⋆︵‿୨ 🎭 EVENT ZONE 🎭  ୧‿︵⋆",
    topic: "✅ Stay tuned here with the 'General Events' role from <#🎯｜role-picking> to be notified of next VR Event and 1 hour reminder!",
    sendRoles: [ROLE.host, ROLE.senior],
  },
  {
    id: CHANNEL.attendees,
    name: "🪄｜events-attendees",
    category: "⋆︵‿୨ 🎭 EVENT ZONE 🎭  ୧‿︵⋆",
    topic: "Staff-only attendee listings",
    viewRoles: [ROLE.host, ROLE.senior],
    sendRoles: [ROLE.host, ROLE.senior],
  },
];

/** Mirrors the guild's event settings (`/events …` config). */
export const SETTINGS = {
  authorizedRoleIds: [ROLE.host, ROLE.senior],
  attendeesListChannelId: CHANNEL.attendees,
  attendeeGroup1RoleId: ROLE.group1,
  attendeeGroup2RoleId: ROLE.group2,
  generalEventPingRoleId: ROLE.ping,
  /** Staff roles that count as "Patrons & Staff" on Patreon-only events. */
  signupStaffRoleIds: [ROLE.senior, ROLE.breed, ROLE.host, ROLE.security, ROLE.trial, ROLE.admin],
  supporterRoleIds: [ROLE.patreon1, ROLE.patreon2, ROLE.patreon3],
  /** Staff benefits: these roles count as high Patreon (can bring a +1). */
  highPatreonRoleIds: [ROLE.senior, ROLE.breed, ROLE.host, ROLE.security],
  patreonPageUrl: "https://www.patreon.com/",
  patreonUpgradeUrl: "https://www.patreon.com/",
  eventTeamRoleIds: [ROLE.senior, ROLE.breed, ROLE.trial, ROLE.host, ROLE.security, ROLE.admin],
  listedStaffRoleIds: [ROLE.senior, ROLE.breed, ROLE.trial, ROLE.host, ROLE.security, ROLE.admin],
  adminRoleIds: [ROLE.admin],
  trialRoleId: ROLE.trial,
  verifiedRoleIds: [ROLE.member, ROLE.senior, ROLE.breed, ROLE.host, ROLE.security],
};

export interface FakeWorld {
  id: string;
  name: string;
  author: string;
  capacity: number;
  quest: boolean;
}

export const WORLDS: FakeWorld[] = [
  { id: "wrld_6a1f0c2e-8b4d-4e2a-9c71-3d5e8f0a1b24", name: "Midnight Lounge", author: "Luma", capacity: 32, quest: true },
  { id: "wrld_b37e9d14-2c6a-4f8b-a0e5-7c9d1e3f5a68", name: "Velvet Bathhouse", author: "Kira", capacity: 40, quest: false },
  { id: "wrld_0d4c8e2a-6f1b-4a9c-b3e7-5f2a9c1d7e30", name: "Neon Rooftop", author: "Vex", capacity: 24, quest: true },
];

export const QUEST_EMOJI = "<:pcquest:1182068239057031179>";
export const PC_ONLY_EMOJI = "<:pc_only:1529772609376616448>";
export const ANNOUNCE_QUEST = "<:PCQuest_part1:1182072615301558364><:PCQuest_part2:1182072618166259892>";
export const ANNOUNCE_PC = "<:PC_Only_part1:1182072623975387216><:PC_Only_part2:1182072628492632064>";

/** The fake volunteer portal event used by `use-volunteers-list`. */
export const VOLUNTEER_EVENT = {
  id: "portal_free_use_social",
  name: "Free Use Social",
  volunteers: [
    { id: "vol_ember", discordId: "u_ember", displayName: "Ember", vrcName: "EmberGlow", role: "FREE_USE" as const, roleLabel: "Free Use" },
    { id: "vol_willow", discordId: "u_willow", displayName: "Willow", vrcName: "WillowWisp", role: "AFTERCARE" as const, roleLabel: "Aftercare" },
  ],
};
