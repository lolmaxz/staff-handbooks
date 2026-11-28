import type { SandboxScenario, ScenarioContext } from "../../types";
import { ANNOUNCE_PC, ANNOUNCE_QUEST, BOT, buildMembers, CHANNEL, CHANNELS, ROLE, ROLES, SETTINGS, WORLDS } from "./data";
import { createHephiaRuntime } from "./runtime";

const MINUTE = 60_000;

/** Next quarter hour, at least `hours` from now. */
function startAfter(now: number, hours: number) {
  const target = now + hours * 60 * MINUTE;
  return Math.ceil(target / (15 * MINUTE)) * 15 * MINUTE;
}

/** Host announcement written from the handbook's announcement template. */
function postAnnouncement(ctx: ScenarioContext, hostId: string, start: number) {
  const unix = Math.floor(start / 1000);
  const [lounge, bathhouse] = WORLDS;
  const content = [
    `<@&${ROLE.ping}>`,
    `# Midnight Social <t:${unix}:R>`,
    `<t:${unix}:F>`,
    `WORLD: we vote between ${ANNOUNCE_QUEST} [${lounge.name}](https://vrchat.com/home/world/${lounge.id}) by ${lounge.author} - Capacity of ${lounge.capacity}`,
    `and ${ANNOUNCE_PC} [${bathhouse.name}](https://vrchat.com/home/world/${bathhouse.id}) by ${bathhouse.author} - Capacity of ${bathhouse.capacity}`,
    ``,
    `Come hang out for a cozy social night with music and games! 🌙`,
    `Event rule: no goofy avatars tonight, please.`,
    ``,
    `> [Event Rules](https://discord.com/channels/734595073920204940/737074569319546921/1294366927111716914) · [How to Join](https://discord.com/channels/734595073920204940/980342448712724560) · [Any Questions Here](https://discord.com/channels/734595073920204940/894726709272793169)`,
    ``,
    `**__Add the Host__** ➜ https://vrchat.com/home/user/usr_00000000-sandbox-host`,
  ].join("\n");
  ctx.send(CHANNEL.events, { content, pings: { roles: [ROLE.ping] } }, hostId, { createdAt: ctx.now() - 12 * MINUTE });
}

const base = {
  serverName: "The Eden Apis · Sandbox",
  roles: ROLES,
  bot: BOT,
  channels: CHANNELS,
  defaultChannelId: CHANNEL.events,
  adminRoleIds: SETTINGS.adminRoleIds,
};

/** Fresh start: the announcement is up, nothing is created yet. Run /start-event. */
export const hephiaStartEventScenario: SandboxScenario = {
  ...base,
  id: "hephia-start-event",
  title: "Hephia: start an event",
  description: "Your announcement is posted. Run /start-event and try every option.",
  members: buildMembers(),
  setup(ctx) {
    ctx.send(
      CHANNEL.attendees,
      { content: "I can take security tonight if you host 🛡️ Ping me once the listing is up." },
      "u_rook",
      { createdAt: ctx.now() - 40 * MINUTE },
    );
    postAnnouncement(ctx, "u_aurora", startAfter(ctx.now(), 3));
    return createHephiaRuntime(ctx);
  },
};

/** Signups already open with a roleplay vote, so member flows can be tested right away. */
export const hephiaLiveEventScenario: SandboxScenario = {
  ...base,
  id: "hephia-live-event",
  title: "Hephia: signups already open",
  description: "An event with a roleplay vote is live. Rook is security, Mochi and Sable signed up.",
  members: buildMembers(),
  setup(ctx) {
    const start = startAfter(ctx.now(), 1.5);
    postAnnouncement(ctx, "u_aurora", start);
    return createHephiaRuntime(ctx, ({ createEvent }) =>
      createEvent(
        {
          eventName: "Midnight Social",
          userId: "u_aurora",
          startTimeUnix: Math.floor(start / 1000),
          isPatreonOnly: false,
          secondaryType: "ROLEPLAY",
          secondaryOptions: [
            { id: "0_dom", label: "Dom" },
            { id: "1_sub", label: "Sub" },
            { id: "2_switch", label: "Switch" },
          ],
        },
        [
          { userId: "u_rook", role: "security", secondary: ["2_switch"] },
          { userId: "u_mochi", secondary: ["1_sub"] },
          { userId: "u_sable", secondary: ["0_dom"] },
        ],
      ),
    );
  },
};

export const hephiaScenarios = [hephiaStartEventScenario, hephiaLiveEventScenario];
