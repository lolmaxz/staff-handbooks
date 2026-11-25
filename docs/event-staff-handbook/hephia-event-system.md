---
id: hephia-event-system
title: Hephia Event System
slug: /event-staff-handbook/hephia-event-system
---

import RoleBadge from "@site/src/components/RoleBadge";
import ChannelBadge from "@site/src/components/ChannelBadge";
import CardGrid, { Card } from "@site/src/components/CardGrid";
import Checklist from "@site/src/components/Checklist";
import DiscordButton from "@site/src/components/DiscordButton";
import CommandCard from "@site/src/components/CommandCard";
import AuditFlag from "@site/src/components/AuditFlag";
import Timestamp from "@site/src/components/Timestamp";
import Tooltip from "@site/src/components/Tooltip";
import StepTimeline from "@site/src/components/StepTimeline";
import Link from "@docusaurus/Link";
import SlashCommand from "@site/src/components/SlashCommand";
import TextWithButton from "@site/src/components/TextWithButton";
import VideoCarousel from "@site/src/components/VideoCarousel";
import DiscordMessage, { DiscordEmbed, DiscordActionRow, DiscordRowButton, DiscordSelect } from "@site/src/components/DiscordMessage";

# Hephia Event System <AuditFlag type="NEW" />

Hephia runs **event signups, optional voting, the staff roster, and post-event feedback** with Discord buttons. Signup threads are gone: members press **Sign Up** on Hephia's post, and staff follow everything from one live listing.

<SlashCommand
  animate="load"
  channel="🎭｜events"
  command="start-event"
  description="Start a new event signup post."
  bot="Hephia V2"
  avatar={require("@site/static/img/sandbox/hephia-v2-avatar.png").default}
  plus
  options={[
    { name: "name", description: "The name of the event.", required: true, input: "Friday Lewd Social" },
    { name: "duration", description: "How long the event will last. Defaults to 2 hours if omitted.", input: "3 hours" },
    { name: "roleplay-options", description: "Comma-separated roleplay roles attendees can pick.", input: "Dom, Sub, Switch" },
    { name: "world-vote", description: "Parse your announcement for VRChat world links to vote on." },
  ]}
/>

<TextWithButton
  text="🧪 Want to try it? The Hephia Event Sandbox is a safe copy of the event channels: run /start-event, sign up as other members, vote, and skip ahead in time. Nothing reaches Discord."
  buttonLabel="Open the sandbox →"
  buttonHref="/docs/event-staff-handbook/hephia-event-sandbox"
/>

---

## How It Works

<StepTimeline
  title="One event, start to finish"
  size="sm"
  accentColor="#a259f7"
  steps={[
    { label: "Announce", detail: "Post with a timestamp" },
    { label: "/start-event", detail: "Same channel" },
    { label: "Signups", detail: "Members + staff" },
    { label: "Doors", detail: "Status + reminder" },
    { label: "End", detail: "Timer or button" },
    { label: "Feedback", detail: "24 hours" },
  ]}
/>

Running <code>/start-event</code> makes Hephia post two messages:

<CardGrid columns={2}>
  <Card title="Public Sign-Up Post" status="info" icon="📢">
    <p>Posted under your announcement, in the same channel. Members sign up, leave, and vote here.</p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
      <DiscordButton type="secondary" emoji="🔔" />
      <DiscordButton type="success" emoji="📩">Sign Up</DiscordButton>
      <DiscordButton type="primary" emoji="📃">List of Attendees</DiscordButton>
    </div>
  </Card>
  <Card title="Staff Attendees Panel" status="success" icon="🪄">
    <p>Posted in <ChannelBadge label="🪄｜events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781" />. Live roster with Discord <strong>and</strong> VRChat names, vote tallies, and the staff controls.</p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
      <DiscordButton type="primary" emoji="🤝">Co-Host Signup</DiscordButton>
      <DiscordButton type="secondary" emoji="🛡️">Security Signup</DiscordButton>
      <DiscordButton type="error" emoji="🛑">Cancel Event</DiscordButton>
    </div>
  </Card>
</CardGrid>

Both messages update on their own after every signup, vote, or status change. Several events can be open at once; each Staff Attendees Panel shows its own name and start time.


### Video walkthrough

<VideoCarousel
  heading="🎬 Hephia Event System, in short videos"
  videos={[
    { title: "Welcome", src: "/videos/hephia-event-system/01-welcome.mp4" },
    { title: "The /start-event command", src: "/videos/hephia-event-system/02-command.mp4" },
    { title: "From threads to Hephia", src: "/videos/hephia-event-system/03-start.mp4" },
    { title: "The Public Sign-Up Post", src: "/videos/hephia-event-system/04-members.mp4" },
    { title: "The Staff Attendees Panel", src: "/videos/hephia-event-system/05-roster.mp4" },
    { title: "Voting", src: "/videos/hephia-event-system/06-voting.mp4" },
    { title: "Staff signup & controls", src: "/videos/hephia-event-system/07-panel.mp4" },
    { title: "Signup checks", src: "/videos/hephia-event-system/08-checks.mp4" },
    { title: "Patreon nights & +1", src: "/videos/hephia-event-system/09-plus.mp4" },
    { title: "Volunteers", src: "/videos/hephia-event-system/10-volunteers.mp4" },
    { title: "Event night, step by step", src: "/videos/hephia-event-system/11-night.mp4" },
  ]}
/>

---

## Starting an Event (Hosts)

<CardGrid columns={3}>
  <Card title="1. Announce" icon="📣">
    <p>Post your announcement as usual, with a Discord timestamp for the start, e.g. <code>{"<t:1767312000:F>"}</code> (example only). Generate it on <a href="https://hammertime.cyou/" target="_blank" rel="noopener noreferrer">hammertime.cyou</a>. Post requirements: <Link to="/docs/event-staff-handbook/Hosts/how-to-host-an-event">How to Host an Event</Link>.</p>
  </Card>
  <Card title="2. Run /start-event" icon="⚡">
    <p>In the <strong>same channel</strong>. Only <code>name</code> is required. Hephia reads the start time from your announcement.</p>
  </Card>
  <Card title="3. Check the posts" icon="✅">
    <p>The Public Sign-Up Post appears under your announcement and the Staff Attendees Panel appears in <ChannelBadge label="🪄｜events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781" />.</p>
  </Card>
</CardGrid>

<CommandCard cmd="/start-event" perms="Event Host" cardColor="purple">Required: name. Everything else is optional — see the table below.</CommandCard>

| Option | What it does |
| --- | --- |
| `name` | Short event name shown on both posts, e.g. "Friday Lewd Social". |
| `duration` | Pick one: `1 hour`, `1.5 hours`, `2 hours (default)`, `2.5 hours`, `3 hours`, `3.5 hours`, `4 hours`, `4.5 hours`, `5 hours`, `5.5 hours`, `6 hours`. Signups close when it runs out. |
| `start-time` | Only if your announcement has no timestamp. Paste a Discord timestamp or Unix seconds. See <Link to="#start-time-rules">accepted formats</Link>. |
| `is-patreon` | <svg viewBox="0 0 24 24" width="16" height="16" aria-label="Patreon" style={{ verticalAlign: "-2px", marginRight: "4px" }}><path fill="#FF424D" d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003" /></svg> Patreon-only event. See <Link to="#patreon-only-and-limited-events">Patreon-only and limited events</Link>. |
| `signup-role` | Only members with this role can sign up (with `is-patreon`, this role joins Patrons and staff). |
| `world-vote`, `roleplay-options`, `voting-basic` | Turn on voting. See <Link to="#voting">Voting</Link>. |
| `allow-vote-skip` | Members may sign up without voting. Default **off** (voting is required). |
| `world-multi-vote`, `roleplay-multi-vote`, `basic-multi-vote` | Allow several picks on that vote. Default off. |
| `custom-vote-text` | Optional. Adds your own line under the vote prompt's title. Without it, members just see the standard prompt. See <Link to="#voting">Voting</Link> for an example. |
| `use-volunteers-list` | Pulls confirmed volunteers from one of your volunteer portal events. See <Link to="#volunteers">Volunteers</Link>. |

### Start time rules

- With no `start-time`, Hephia looks through **your** messages in that channel from the last 24 hours and uses the timestamp from your announcement. No timestamp found → the command stops and asks you to add one.
- A start time in the **past** is refused.
- A start time more than **30 hours** away asks you to confirm with <DiscordButton type="success">Create event</DiscordButton> before anything is posted.

<details>
<summary><strong>What <code>start-time</code> accepts</strong> (the numbers are examples only)</summary>

| You type | Hephia reads |
| --- | --- |
| `1767312000` | Plain Unix seconds |
| `<t:1767312000>` | A Discord timestamp with no style |
| `<t:1767312000:F>` | A full date Discord timestamp |
| `<t:1767312000:R>` | A relative Discord timestamp (any style letter works: `t`, `T`, `d`, `D`, `f`, `F`, `R`) |
| `Doors at <t:1767312000:t> tonight` | Text around a timestamp is fine; Hephia uses the first `<t:…>` it finds |

Anything else (a date like `Jan 2 8pm`, or Unix **milliseconds**) is refused. Maximum 100 characters.

</details>

<details>
<summary><strong>Example: confirmation for an event more than 30 hours away</strong></summary>

<DiscordMessage
  username="Hephia V2"
  avatar={require("@site/static/img/sandbox/hephia-v2-avatar.png").default}
  timestamp="Today at 2:00 PM"
  app
>
  <DiscordEmbed
    accent={false}
    description={[
      "## This event is more than 30 hours away",
      "Detected start: <t:" + (Math.floor(Date.now() / 3600000) * 3600 + 48 * 3600) + ":F> (<t:" + (Math.floor(Date.now() / 3600000) * 3600 + 48 * 3600) + ":R>).",
      "That time was found in your event announcement.",
      "",
      "Create the signup this far ahead anyway?",
    ].join("\n")}
  >
    <DiscordActionRow>
      <DiscordRowButton type="success">Create event</DiscordRowButton>
      <DiscordRowButton type="secondary">Cancel</DiscordRowButton>
    </DiscordActionRow>
  </DiscordEmbed>
</DiscordMessage>

Only you see this message. If you typed `start-time` yourself, the third line reads "That time is the `start-time` you entered." instead.

</details>

:::tip Roleplay voting
If roleplay voting is on, Hephia first asks you to pick **your own** role. The Public Sign-Up Post only goes up after you pick; your role then shows as `[role]` next to your name.
:::

<Checklist checklistId="host-event-system" title="Host Quick Checklist" borderColor="#a259f7">
  <Checklist.Item id="announce">Announcement posted with a Discord timestamp (and 2+ <code>wrld_…</code> links if you use world vote)</Checklist.Item>
  <Checklist.Item id="command">Ran <code>/start-event</code> in the <strong>same channel</strong></Checklist.Item>
  <Checklist.Item id="staff-channel">Staff Attendees Panel appeared in <ChannelBadge label="🪄｜events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781" /></Checklist.Item>
  <Checklist.Item id="cohost-security">Co-hosts and security signed up on the <strong>Staff Attendees Panel</strong>, not the Public Sign-Up Post</Checklist.Item>
</Checklist>

---

## The Public Sign-Up Post (Members)

<DiscordMessage
  channel="🎭｜events"
  username="Hephia V2"
  avatar={require("@site/static/img/sandbox/hephia-v2-avatar.png").default}
  timestamp="Today at 2:00 PM"
  app
>
  <DiscordEmbed
    color="#57f287"
    description={`## Friday Lewd Social\nHosted by <@Host> <t:${Math.floor(Date.now() / 1000) + 6 * 60 * 60}:R>.\n🤝 **Co-Host:** <@Co-Host>\n🛡️ **Security:** <@Security> *(Training)*\n-# Ping role: <@&Event Participant Group #1>\n\n-# Current Event Status\n## ⏳ Not Started`}
  >
    <DiscordActionRow>
      <DiscordRowButton type="secondary" emoji="🔔" />
      <DiscordRowButton type="success" emoji="📩">Sign Up</DiscordRowButton>
      <DiscordRowButton type="primary" emoji="📃">List of Attendees</DiscordRowButton>
    </DiscordActionRow>
  </DiscordEmbed>
</DiscordMessage>

| Button | What it does |
| --- | --- |
| <DiscordButton type="success" emoji="📩">Sign Up</DiscordButton> | Signs the member up. Pressing it again removes them (and their +1). Opens the vote first if voting is on. |
| <DiscordButton type="secondary" emoji="🔔" /> | Get the event pings **without** signing up. Press again to stop. |
| <DiscordButton type="primary" emoji="📃">List of Attendees</DiscordButton> | Private list of who signed up. |
| <DiscordButton type="secondary" emoji="🗳️">Change Role</DiscordButton> / <DiscordButton type="secondary" emoji="🗳️">Change My Vote(s)</DiscordButton> | Only shown while a vote can still be changed. |

Signing up (or pressing the bell) gives the member the event's attendee ping role, like <RoleBadge role="Event Participant Group #1" color="#1abc9c" />. Status updates, like doors opening, ping that role.

:::warning Sign-up requirements
To sign up, a member needs **all three**:

- A **VRChat account linked** to Hephia. If not, Hephia shows a link button.
- A VRChat rank **above <Tooltip tip="The lowest VRChat trust rank" bubbleColor="#5865F2">Visitor</Tooltip>**. Hephia re-checks the rank live, at most once every 5 minutes per person.
- **No active event ban** in Orion. Banned members get a private message instead; you do not need to watch the roster for them. They can still remove themselves.
:::

After signing up, the member gets a private confirmation with their stored VRChat name and two buttons: <DiscordButton type="success" emoji="💾">Update Display Name</DiscordButton> and <DiscordButton type="primary" emoji="👁️">Show name publicly</DiscordButton>.

:::info Who sees VRChat names
VRChat names are **hidden from other members by default**. A member has to opt in with **Show name publicly** for their VRChat name to appear when other members open **List of Attendees**. The choice applies to every event, and **Hide name publicly** turns it back off.

Otherwise, members only see Discord names there. The host, co-hosts, and security of that event see every VRChat name, and the Staff Attendees Panel always shows both.
:::

:::info Afterparty group check
After signing up, members who are not in **The Eden Apis** VRChat group get a private ⚠️ note with the group link (needed for afterparty instances). A pending join request is accepted automatically. This never blocks the signup.
:::

<details>
<summary><strong>Example: signup confirmation for a member not in the VRChat group</strong></summary>

<DiscordMessage
  username="Hephia V2"
  avatar={require("@site/static/img/sandbox/hephia-v2-avatar.png").default}
  timestamp="Today at 2:05 PM"
  app
>
  <DiscordEmbed
    accent={false}
    thumbnail={require("@site/static/img/sandbox/hephia-yes.png").default}
    description={[
      "✅ You have signed up as **Attendee**! Good luck and have fun!",
      "VRChat name: **PixelPop**",
      "⚠️ We don’t see you in **The Eden Apis** VRChat group — you may not be able to join an afterparty instance if there is one. Request to join: https://vrchat.com/home/group/grp_9ec2f3df-df53-4770-b24f-ea21c42354c2",
      "",
      "-# If this isn’t your current VRChat display name, press **Update Display Name**.",
      "-# Your VRChat name is **hidden** on the public attendee list for every event.",
    ].join("\n")}
  >
    <DiscordActionRow>
      <DiscordRowButton type="success" emoji="💾">Update Display Name</DiscordRowButton>
      <DiscordRowButton type="primary" emoji="👁️">Show name publicly</DiscordRowButton>
    </DiscordActionRow>
  </DiscordEmbed>
</DiscordMessage>

Only the member sees this. Members already in the group get the same message without the ⚠️ line.

</details>

---

## The Staff Attendees Panel (Co-Hosts & Security)

Co-hosts and <RoleBadge role="Event Security" /> sign up on the Staff Attendees Panel in <ChannelBadge label="🪄｜events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781" />, **not** with the public **Sign Up** button.

<div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "0.75rem 0" }}>
  <DiscordButton type="primary" emoji="🤝">Co-Host Signup</DiscordButton>
  <DiscordButton type="secondary" emoji="🛡️">Security Signup</DiscordButton>
</div>

- Pressing your button again removes you. Pressing the other one moves you (an attendee who moves to staff keeps their vote).
- Trials use **Security Signup** too. Hephia adds *(Training)* next to members with the Event Trial role.
- Once the event has started with nobody signed up as security, the host is listed as **Host & Security**.

This is what the Staff Attendees Panel looks like (example names):

<DiscordMessage
  channel="🪄｜events-attendees"
  username="Hephia V2"
  avatar={require("@site/static/img/sandbox/hephia-v2-avatar.png").default}
  timestamp="Today at 7:00 PM"
  app
>
  <DiscordEmbed
    accent={false}
    description={[
      "# 📅 Friday Lewd Social",
      "**Starts:** <t:" + (Math.floor(Date.now() / 3600000) * 3600 + 7200) + ":F> (<t:" + (Math.floor(Date.now() / 3600000) * 3600 + 7200) + ":R>)",
      "**Duration:** 2h",
      "**Host:** <@Aurora> [Dom]",
      "**Links:** #🎭｜events › host announcement",
      "**Group:** <@&Event Participant Group #1>",
      "**Total Signed Up:** 8 — 🔔 2",
      "**Event Status** — ⏳ Not Started",
      "",
      "-# **Legend** — 🛠️ Staff · 🕐 Bypass capacity · ✌️ +1",
      "### Roleplay roles",
      "- **Sub** — 3",
      "- **Dom** — 2",
      "- **Switch** — 2",
      "### Co-Host / Security (2)",
      "- 🤝 <@Rook> — **RookTheGuard** [Switch]",
      "- 🛡️ <@Juniper> — **JuniperLeaf** *(Training)* [Dom]",
      "### Volunteers",
      "✅ <@Willow> — **WillowWisp** [Free Use]",
      "  ↳ ✅ ❤️ [PARTNER] <@Bramble> — **BrambleBear** [Free Use]",
      "☐ <@Clover> — **CloverHug** [Aftercare]",
      "### 💎 Patreon (2)",
      "- 🕐✌️ <@Mochi> — **MochiBun** [Sub]",
      "  ↳➕ <@Sable> — **SableNight** [Switch]",
      "- <@Pixel> — **PixelPop** [Sub]",
      "### 🙋 Attendees (1)",
      "- 🛠️ <@Ember> — **EmberGlow** [Sub]",
    ].join("\n")}
  >
    <DiscordActionRow>
      <DiscordRowButton type="primary" emoji="🤝">Co-Host Signup</DiscordRowButton>
      <DiscordRowButton type="secondary" emoji="🛡️">Security Signup</DiscordRowButton>
      <DiscordRowButton type="danger" emoji="🛑">Cancel Event</DiscordRowButton>
    </DiscordActionRow>
    <DiscordActionRow>
      <DiscordSelect
      placeholder="Update event status…"
      options={[
      { label: "Patreon Door Open", emoji: "💎" },
      { label: "Door Open", emoji: "🚪" },
      { label: "Instance Full", emoji: "🚫" },
      { label: "Technical Issues", emoji: "🛠️" },
      { label: "Door Closed", emoji: "🔒" },
      { label: "Custom", emoji: "📝" },
    ]}
    />
    </DiscordActionRow>
    <DiscordActionRow>
      <DiscordRowButton type="secondary" emoji="📣">1h reminder</DiscordRowButton>
      <DiscordRowButton type="secondary" emoji="⏱️">Delay start</DiscordRowButton>
    </DiscordActionRow>
  </DiscordEmbed>
</DiscordMessage>

**How the roster is grouped:** Co-Host / Security, then Volunteers (if any: ✅ signed up, ☐ not yet, ❤️ [PARTNER] for a volunteer's partner), then 💎 Patreon (hidden when empty), then 🙋 Attendees. Co-hosts and security are never repeated under Patreon. A 🛠️ marks a staff member who signed up as a regular attendee.

| Patreon tier | Prefix on the Staff Attendees Panel | Perk |
| --- | --- | --- |
| <img src={require("@site/static/img/patreon/runner-tier.png").default} alt="" width="24" height="24" style={{ verticalAlign: "middle", marginRight: "6px" }} />Tier 1 · Runner | *(none)* | Early entry (Patreon door time) |
| <img src={require("@site/static/img/patreon/ace-tier.png").default} alt="" width="24" height="24" style={{ verticalAlign: "middle", marginRight: "6px" }} />Tier 2 · Ace | `🕐` | Bypasses soft capacity |
| <img src={require("@site/static/img/patreon/legend-tier.png").default} alt="" width="24" height="24" style={{ verticalAlign: "middle", marginRight: "6px" }} />Tier 3 · Legend | `🕐✌️` | Can bring a friend on Patreon-only events |

Prefixes follow the member's **current** Discord roles, so a tier change shows on the next refresh.

### Staff controls

| Control | What it does | Who can use it |
| --- | --- | --- |
| <DiscordSelect placeholder="Update event status…" options={[{ label: "Patreon Door Open", emoji: "💎" }, { label: "Door Open", emoji: "🚪" }, { label: "Instance Full", emoji: "🚫" }, { label: "Technical Issues", emoji: "🛠️" }, { label: "Door Closed", emoji: "🔒" }, { label: "Custom", emoji: "📝" }]} /> | Sets what the Public Sign-Up Post shows: Patreon Door Open, Door Open, Instance Full, Technical Issues, Door Closed, or a custom line. Pings that event's attendee role, e.g. <RoleBadge role="Event Participant Group #1" color="#1abc9c" />. | Host, signed-up co-host, admin |
| <DiscordButton type="secondary" emoji="📣">1h reminder</DiscordButton> | Pings <RoleBadge role="General Event Ping" /> and adds a reminder (optional message and image) to the Public Sign-Up Post until start. Once per event, before doors open. | Host, signed-up co-host, admin |
| <DiscordButton type="secondary" emoji="⏱️">Delay start</DiscordButton> | Moves the start later (5 minutes to 3 hours) and notifies attendees. Only while the status is still automatic. | Host, event team |
| <DiscordButton type="error" emoji="🛑">Cancel Event</DiscordButton> / <DiscordButton type="error" emoji="🛑">End Event Now</DiscordButton> | Closes signups. Reads **Cancel Event** before the start, **End Event Now** after. | Host who created it, admin |

:::note Manual 1h reminders are still allowed
You can still post the 1h reminder yourself and ping <RoleBadge role="General Event Ping" /> by hand if you prefer. Hephia does not detect manual reminders, so the <DiscordButton type="secondary" emoji="📣">1h reminder</DiscordButton> button stays on the Staff Attendees Panel. Ignore it and don't press it too, or members get pinged twice.
:::

Until someone sets a status, the Public Sign-Up Post shows **Not Started**, then **Starting Soon** in the last 20 minutes.

:::warning Opening the door early moves the start time
Setting **Patreon Door Open** or **Door Open** more than **20 minutes** before the planned start does not apply right away. Hephia privately asks you to confirm first:

- **Set Door Open** (or **Set Patreon Door Open**): the status is applied, the attendee role is pinged, and the event's **start time moves to now**. The end time moves with it, so the event now ends at *now + duration*.
- **Cancel**: nothing changes.

Within the last 20 minutes, both statuses apply right away and the start time stays the same.
:::

<details>
<summary><strong>Example: opening the door too early</strong></summary>

<DiscordMessage
  username="Hephia V2"
  avatar={require("@site/static/img/sandbox/hephia-v2-avatar.png").default}
  timestamp="Today at 7:15 PM"
  app
>
  <DiscordEmbed
    accent={false}
    description={[
      "The event has not started yet (planned <t:" + (Math.floor(Date.now() / 3600000) * 3600 + 7200) + ":R>). Setting **Door Open** now will move the start time to now.",
      "",
      "Wait until the last **20 minutes** before start to open the door without changing the start time.",
      "",
      "Continue?",
    ].join("\n")}
  >
    <DiscordActionRow>
      <DiscordRowButton type="danger">Set Door Open</DiscordRowButton>
      <DiscordRowButton type="secondary">Cancel</DiscordRowButton>
    </DiscordActionRow>
  </DiscordEmbed>
</DiscordMessage>

Only you see this message. After **Set Door Open**, the Staff Attendees Panel shows "Door Open applied. Start time moved to now."

**The end time moves too.** Hephia always ends the event at *start + duration*, so the new end is *now + duration*. Example: a 2-hour event planned for 9:00 PM, opened early at 8:00 PM, now ends at 10:00 PM instead of 11:00 PM.

</details>

---

## Voting

Voting is optional. With no voting options, Sign Up works in one click.

| Vote | Use it for | Setup |
| --- | --- | --- |
| **World** | Pick a VRChat world | `world-vote`. Your announcement needs at least **2** `wrld_…` links (max 25). |
| **Roleplay** | Pick a role, e.g. Dom, Sub, Switch | `roleplay-options`, comma-separated |
| **Basic** | A simple poll | `voting-basic`, comma-separated |

World can be combined with roleplay **or** basic. Roleplay and basic **cannot** be used on the same event.

**What members see:** after pressing **Sign Up**, a private vote prompt. With one vote, the pick submits right away. With world **and** roleplay/basic, they pick both and press **Confirm**. Voting is required unless you set `allow-vote-skip`, which adds a **Skip vote** button. Co-hosts and security get the same prompt, but may skip the world and basic votes; a roleplay role is still required.

| | Before start | After start |
| --- | --- | --- |
| **World** | Options and live counts on the Public Sign-Up Post. Votes can change. | Closed. The post shows the **top 3** (with a warning if #1 is PC-only). Members who leave still count. |
| **Roleplay** | Changeable anytime. | Changeable for **10 minutes** after that member's own signup. |
| **Basic** | Live counts, changeable. | Live counts, changeable until the event ends. |

The Staff Attendees Panel always shows the live tallies, with each person's roleplay role next to their name.

**`custom-vote-text`** adds one line of your own under the prompt's title, for example to explain the roles. Without it, the prompt just has the standard title and the member's current picks.

<details>
<summary><strong>Example: vote prompt with <code>custom-vote-text</code></strong></summary>

Here the host ran <code>/start-event</code> with <code>roleplay-options: Dom, Sub, Switch</code> and <code>custom-vote-text: Pick the role you want to play tonight. Switches are welcome!</code>

<DiscordMessage
  username="Hephia V2"
  avatar={require("@site/static/img/sandbox/hephia-v2-avatar.png").default}
  timestamp="Today at 2:05 PM"
  app
>
  <DiscordEmbed
    description={[
      "### Your signup isn’t finished yet",
      "You are not on the event yet. Submit your vote to finish signing up.",
      "Pick the role you want to play tonight. Switches are welcome!",
      "**Role:** _not selected_",
      "",
      "**Roleplay role**",
    ].join("\n")}
  >
    <DiscordActionRow>
      <DiscordRowButton type="secondary">Dom</DiscordRowButton>
      <DiscordRowButton type="secondary">Sub</DiscordRowButton>
      <DiscordRowButton type="secondary">Switch</DiscordRowButton>
    </DiscordActionRow>
  </DiscordEmbed>
</DiscordMessage>

The third line is the custom text. Everything else is the standard prompt.

</details>

---

## Patreon-only and Limited Events

### Who can sign up

| Option | Who can sign up | Everyone else |
| --- | --- | --- |
| <svg viewBox="0 0 24 24" width="14" height="14" aria-label="Patreon" style={{ verticalAlign: "-1px", marginRight: "4px" }}><path fill="#FF424D" d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003" /></svg>`is-patreon` | Patrons and staff | Gets a private **Become a Patron** message |
| `signup-role` | Members with that role | Gets a private "only @role can join" message |
| Both | Patrons, staff, **and** that role | Gets the **Become a Patron** message |

Co-hosts, security, and listed volunteers can always sign up.

### Bringing a friend (+1)

On Patreon-only events, what a Patron sees after signing up depends on their tier:

| Tier | What they get |
| --- | --- |
| <img src={require("@site/static/img/patreon/legend-tier.png").default} alt="" width="18" height="18" style={{ verticalAlign: "-3px", marginRight: "4px" }} />**Tier 3 Legend** (and staff) | A working <DiscordButton type="success" emoji="➕">Add a Friend</DiscordButton> button to bring one verified, VRChat-linked friend |
| <img src={require("@site/static/img/patreon/runner-tier.png").default} alt="" width="18" height="18" style={{ verticalAlign: "-3px", marginRight: "4px" }} />**Tier 1 Runner**<br/><img src={require("@site/static/img/patreon/ace-tier.png").default} alt="" width="18" height="18" style={{ verticalAlign: "-3px", marginRight: "4px" }} />**Tier 2 Ace** | An upgrade prompt: <DiscordButton type="link">Upgrade to Legend</DiscordButton>, or a greyed-out <DiscordButton type="secondary" emoji="➕" disabled>Add a Friend</DiscordButton> if no upgrade link is set up |

The friend shows as `↳➕` under the Patron on the Staff Attendees Panel. Other prefixes there: `🕐` bypasses soft capacity (Tier 2 and 3), `✌️` can bring a +1 (Tier 3).

<details>
<summary><strong>Example: signup confirmation with the +1 button</strong></summary>

<DiscordMessage
  username="Hephia V2"
  avatar={require("@site/static/img/sandbox/hephia-v2-avatar.png").default}
  timestamp="Today at 2:05 PM"
  app
>
  <DiscordEmbed
    accent={false}
    thumbnail={require("@site/static/img/sandbox/hephia-yes.png").default}
    description={[
      "✅ You have signed up as **Attendee**! Good luck and have fun!",
      "VRChat name: **MochiBun**",
      "",
      "-# If this isn’t your current VRChat display name, press **Update Display Name**.",
      "-# Your VRChat name is **hidden** on the public attendee list for every event.",
    ].join("\n")}
  >
    <DiscordActionRow>
      <DiscordRowButton type="success" emoji="💾">Update Display Name</DiscordRowButton>
      <DiscordRowButton type="primary" emoji="👁️">Show name publicly</DiscordRowButton>
    </DiscordActionRow>
  </DiscordEmbed>
  <DiscordEmbed accent={false} description="You can add **one friend** as your +1.">
    <DiscordActionRow>
      <DiscordRowButton type="success" emoji="➕">Add a Friend</DiscordRowButton>
    </DiscordActionRow>
  </DiscordEmbed>
</DiscordMessage>

**Add a Friend** opens a short form asking for the friend's **username or display name**. Hephia then asks to confirm which member it is. Once added, this part changes to "✅ Your friend is signed up: @friend". The friend is added without a ping.

</details>

---

## Volunteers

With `use-volunteers-list`, Hephia copies the confirmed volunteers (and their partners) from that volunteer portal event. Volunteers still press **Sign Up** like everyone else, and they can always sign up, even on Patreon-only or role-limited events.

Before posting anything, Hephia privately shows you the roster it found. Press **Use volunteers** to create the signup with it, or **Cancel** to stop.

<details>
<summary><strong>Example: volunteer roster confirmation</strong></summary>

<DiscordMessage
  username="Hephia V2"
  avatar={require("@site/static/img/sandbox/hephia-v2-avatar.png").default}
  timestamp="Today at 2:00 PM"
  app
>
  <DiscordEmbed
    accent={false}
    description={[
      "## Use this volunteer roster?",
      "**Friday Lewd Social**",
      "3 confirmed volunteer(s), 2 free-use plate(s) from **Friday Free Use Night**.",
      "• Willow — **WillowWisp** [Free Use]",
      "• Bramble [Free Use]",
      "• Clover — **CloverHug** [Aftercare]",
      "",
      "Create the signup with this roster?",
    ].join("\n")}
  >
    <DiscordActionRow>
      <DiscordRowButton type="success">Use volunteers</DiscordRowButton>
      <DiscordRowButton type="secondary">Cancel</DiscordRowButton>
    </DiscordActionRow>
  </DiscordEmbed>
</DiscordMessage>

Each line is the volunteer's portal name, then their VRChat name when it differs, then their role. The plate count is the number of Free Use volunteers.

</details>

| Where | What it shows |
| --- | --- |
| **Public Sign-Up Post** | The planned volunteers by role for everyone to see, e.g. **Free Use:** @Willow & @Bramble. A small **Volunteers** list shows only the ones who have signed up; a pair appears once **both** partners have. Free Use volunteers' plate images show under "Here's today's free use:". |
| **List of Attendees** | A separate **Volunteers** section with the signed-up volunteers. They are not counted under Attendees. |
| **Staff Attendees Panel** | Every volunteer on the roster, signed up or not: ✅ signed up, ☐ not yet, and a partner on the line under them as ❤️ [PARTNER]. |

The volunteer lists disappear from the Public Sign-Up Post once the event ends or is cancelled.

---

## Ending and Feedback

The event ends automatically at **start + duration**, or earlier with **End Event Now**.

- **Ended:** the Public Sign-Up Post turns grey and shows <DiscordButton type="success" emoji="⭐">Rate Event</DiscordButton> and <DiscordButton type="primary" emoji="📃">Participants</DiscordButton>.
- **Cancelled before start:** the post turns red and only shows **Participants**. No feedback.

**Rate Event** stays open for **24 hours**, for people who signed up. It opens a short form with an optional 1–5 star rating and optional written feedback (at least one is needed). Each part can be sent once; pressing the button again only shows what is still missing.

:::note Feedback stays anonymous
Ratings and comments are **anonymous to all staff**. The database may keep the member's user ID only for content control, in case the system is abused or misused. That ID stays encrypted, and only the bot creator can access it. No one else can.
:::

---

## FAQ & Troubleshooting

<details>
<summary><strong>A member cannot sign up</strong></summary>

- VRChat account not linked — Hephia shows them a link button
- VRChat rank is Visitor — they can try again later (rank re-check every 5 minutes)
- Patreon-only or role-limited event — check `is-patreon` / `signup-role`
- Active event ban in Orion
- The event already ended or was cancelled
- Voting is required and they closed the prompt without picking

</details>

<details>
<summary><strong><code>/start-event</code> refused my start time</strong></summary>

It must be in the future. Without `start-time`, Hephia uses the timestamp from **your** announcement in that channel (last 24 hours). More than 30 hours away is allowed after you confirm.

</details>

<details>
<summary><strong>The world vote did not start</strong></summary>

Your announcement needs at least **2** VRChat `wrld_…` links. Worlds Hephia cannot load are skipped and listed to you; if fewer than 2 remain, the command stops.

</details>

<details>
<summary><strong>I cannot cancel or end the event</strong></summary>

Only the host who created it, or an admin, can. Ask them if it needs to close before the timer.

</details>

<details>
<summary><strong>I cannot see the Staff Attendees Panel</strong></summary>

<ChannelBadge label="🪄｜events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781" /> is staff-only. If you have event team access and still cannot see it, ask <RoleBadge role="Event Committee" />.

</details>

<details>
<summary><strong>Someone left after the start — does their world vote count?</strong></summary>

Yes. They leave the lists, but their world vote stays counted.

</details>

---

## Related

- [Hephia Event Sandbox](/docs/event-staff-handbook/hephia-event-sandbox) — practice everything safely
- [How to Host an Event](/docs/event-staff-handbook/Hosts/how-to-host-an-event)
- [How to be Security](/docs/event-staff-handbook/Security/how-to-be-security)
- [Scheduling Procedures](/docs/event-staff-handbook/Hosts/scheduling-procedures)
- [Event Team Channels](/docs/event-staff-handbook/event-team-channels)
- [Hephia Bot](/docs/general-handbook/hephia-bot)
