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
  <Card title="Public signup card" status="info" icon="📢">
    <p>Posted under your announcement, in the same channel. Members sign up, leave, and vote here.</p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
      <DiscordButton type="secondary" emoji="🔔" />
      <DiscordButton type="success" emoji="📩">Sign Up</DiscordButton>
      <DiscordButton type="primary" emoji="📃">List of Attendees</DiscordButton>
    </div>
  </Card>
  <Card title="Staff listing" status="success" icon="🪄">
    <p>Posted in <ChannelBadge label="🪄｜events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781" />. Live roster with Discord <strong>and</strong> VRChat names, vote tallies, and the staff controls.</p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
      <DiscordButton type="primary" emoji="🤝">Co-Host Signup</DiscordButton>
      <DiscordButton type="secondary" emoji="🛡️">Security Signup</DiscordButton>
      <DiscordButton type="error" emoji="🛑">Cancel Event</DiscordButton>
    </div>
  </Card>
</CardGrid>

Both messages update on their own after every signup, vote, or status change. Several events can be open at once; each listing shows its own name and start time.


### Video walkthrough

<VideoCarousel
  heading="🎬 Hephia Event System, in short videos"
  videos={[
    { title: "Welcome", src: "/videos/hephia-event-system/01-welcome.mp4" },
    { title: "The /start-event command", src: "/videos/hephia-event-system/02-command.mp4" },
    { title: "From threads to Hephia", src: "/videos/hephia-event-system/03-start.mp4" },
    { title: "The public signup card", src: "/videos/hephia-event-system/04-members.mp4" },
    { title: "The Staff Panel List", src: "/videos/hephia-event-system/05-roster.mp4" },
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
    <p>Post your announcement as usual, with a Discord timestamp for the start, e.g. <Timestamp value="<t:1747208640:F>" />. Generate it on <a href="https://hammertime.cyou/" target="_blank" rel="noopener noreferrer">hammertime.cyou</a>. Post requirements: <Link to="/docs/event-staff-handbook/Hosts/how-to-host-an-event">How to Host an Event</Link>.</p>
  </Card>
  <Card title="2. Run /start-event" icon="⚡">
    <p>In the <strong>same channel</strong>. Only <code>name</code> is required. Hephia reads the start time from your announcement.</p>
  </Card>
  <Card title="3. Check the posts" icon="✅">
    <p>The signup card appears under your announcement and the staff listing appears in <ChannelBadge label="🪄｜events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781" />.</p>
  </Card>
</CardGrid>

<CommandCard cmd="/start-event" perms="Event Host" cardColor="purple">Required: name. Everything else is optional — see the table below.</CommandCard>

| Option | What it does |
| --- | --- |
| `name` | Short event name shown on both posts, e.g. "Friday Lewd Social". |
| `duration` | 1 to 6 hours in 30-minute steps. Default **2 hours**. Signups close when it runs out. |
| `start-time` | Only if your announcement has no timestamp. Paste a Discord timestamp or Unix seconds. |
| `is-patreon` | Patreon-only event. See <Link to="#patreon-only-and-limited-events">Patreon-only and limited events</Link>. |
| `signup-role` | Only members with this role can sign up (with `is-patreon`, this role joins Patrons and staff). |
| `world-vote`, `roleplay-options`, `voting-basic` | Turn on voting. See <Link to="#voting">Voting</Link>. |
| `allow-vote-skip` | Members may sign up without voting. Default **off** (voting is required). |
| `world-multi-vote`, `roleplay-multi-vote`, `basic-multi-vote` | Allow several picks on that vote. Default off. |
| `custom-vote-text` | A line shown above the vote choices. |
| `use-volunteers-list` | Pulls confirmed volunteers from one of your volunteer portal events. |

### Start time rules

- With no `start-time`, Hephia looks through **your** messages in that channel from the last 24 hours and uses the timestamp from your announcement. No timestamp found → the command stops and asks you to add one.
- A start time in the **past** is refused.
- A start time more than **30 hours** away asks you to confirm with <DiscordButton type="success">Create event</DiscordButton> before anything is posted.

If roleplay voting is on, Hephia first asks you to pick **your own** role. The signup card only goes up after you pick; your role then shows as `[role]` next to your name.

<Checklist checklistId="host-event-system" title="Host Quick Checklist" borderColor="#a259f7">
  <Checklist.Item id="announce">Announcement posted with a Discord timestamp (and 2+ <code>wrld_…</code> links if you use world vote)</Checklist.Item>
  <Checklist.Item id="command">Ran <code>/start-event</code> in the <strong>same channel</strong></Checklist.Item>
  <Checklist.Item id="staff-channel">Staff listing appeared in <ChannelBadge label="🪄｜events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781" /></Checklist.Item>
  <Checklist.Item id="cohost-security">Co-hosts and security signed up on the <strong>staff listing</strong>, not the public card</Checklist.Item>
</Checklist>

---

## The Public Signup Card (Members)

<DiscordMessage
  channel="🎭｜events"
  username="Hephia V2"
  avatar={require("@site/static/img/sandbox/hephia-v2-avatar.png").default}
  timestamp="Today at 2:00 PM"
  app
>
  <DiscordEmbed
    color="#57f287"
    description={`## Friday Lewd Social\nHosted by <@Host> <t:${Math.floor(Date.now() / 1000) + 6 * 60 * 60}:R>.\n🤝 **Co-Host:** <@Co-Host>\n🛡️ **Security:** <@Security> *(Training)*\n-# Ping role: <@&Event Attendees>\n\n-# Current Event Status\n## ⏳ Not Started`}
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

Signing up (or pressing the bell) gives the member the event's **attendee ping role**. Status updates, like doors opening, ping that role.

**To sign up, a member needs:**

- A VRChat account linked to Hephia. If not, Hephia shows a link button.
- A VRChat rank above <Tooltip tip="The lowest VRChat trust rank" bubbleColor="#5865F2">Visitor</Tooltip>. Hephia re-checks the rank live, at most once every 5 minutes per person.
- No active **event ban** in Orion. Banned members get a private message instead; you do not need to watch the roster for them. They can still remove themselves.

After signing up, the member gets a private confirmation with their stored VRChat name and two buttons: <DiscordButton type="success" emoji="💾">Update Display Name</DiscordButton> and <DiscordButton type="primary" emoji="👁️">Show name publicly</DiscordButton>.

:::info Who sees VRChat names
On **List of Attendees**, members see Discord names, plus the VRChat names of people who chose **Show name publicly**. The host, co-hosts, and security of that event see every VRChat name there. The staff listing always shows both.
:::

:::info Afterparty group check
After signing up, members who are not in **The Eden Apis** VRChat group get a private ⚠️ note with the group link (needed for afterparty instances). A pending join request is accepted automatically. This never blocks the signup.
:::

---

## The Staff Listing (Co-Hosts & Security)

Co-hosts and <RoleBadge role="Event Security" /> sign up on the staff listing in <ChannelBadge label="🪄｜events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781" />, **not** with the public **Sign Up** button.

<div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "0.75rem 0" }}>
  <DiscordButton type="primary" emoji="🤝">Co-Host Signup</DiscordButton>
  <DiscordButton type="secondary" emoji="🛡️">Security Signup</DiscordButton>
</div>

- Pressing your button again removes you. Pressing the other one moves you (an attendee who moves to staff keeps their vote).
- Trials use **Security Signup** too. Hephia adds *(Training)* next to members with the Event Trial role.
- Once the event has started with nobody signed up as security, the host is listed as **Host & Security**.

This is what the staff listing looks like (example names):

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
      "**Group:** <@&Event Attendees 1>",
      "**Total Signed Up:** 6 — 🔔 2",
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

**How the roster is grouped:** Co-Host / Security, then Volunteers (if any), then 💎 Patreon (hidden when empty), then 🙋 Attendees. Co-hosts and security are never repeated under Patreon. A 🛠️ marks a staff member who signed up as a regular attendee.

| Patreon tier | Prefix on the staff list | Perk |
| --- | --- | --- |
| Tier 1 | *(none)* | Early entry (Patreon door time) |
| Tier 2 | `🕐` | Bypasses soft capacity |
| Tier 3 | `🕐✌️` | Can bring a friend on Patreon-only events |

Prefixes follow the member's **current** Discord roles, so a tier change shows on the next refresh.

### Staff controls

| Control | What it does | Who can use it |
| --- | --- | --- |
| **Update event status…** | Sets what the public card shows: Patreon Door Open, Door Open, Instance Full, Technical Issues, Door Closed, or a custom line. Pings the attendee ping role. | Host, signed-up co-host, admin |
| <DiscordButton type="secondary" emoji="📣">1h reminder</DiscordButton> | Pings the general event ping role and adds a reminder (optional message and image) to the signup card until start. Once per event, before doors open. | Host, signed-up co-host, admin |
| <DiscordButton type="secondary" emoji="⏱️">Delay start</DiscordButton> | Moves the start later (5 minutes to 3 hours) and notifies attendees. Only while the status is still automatic. | Host, event team |
| <DiscordButton type="error" emoji="🛑">Cancel Event</DiscordButton> / <DiscordButton type="error" emoji="🛑">End Event Now</DiscordButton> | Closes signups. Reads **Cancel Event** before the start, **End Event Now** after. | Host who created it, admin |

Until someone sets a status, the card shows **Not Started**, then **Starting Soon** in the last 20 minutes. Setting **Patreon Door Open** or **Door Open** more than 20 minutes early asks you to confirm, because it moves the start time to now.

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
| **World** | Options and live counts on the card. Votes can change. | Closed. The card shows the **top 3** (with a warning if #1 is PC-only). Members who leave still count. |
| **Roleplay** | Changeable anytime. | Changeable for **10 minutes** after that member's own signup. |
| **Basic** | Live counts, changeable. | Live counts, changeable until the event ends. |

The staff listing always shows the live tallies, with each person's roleplay role next to their name.

---

## Patreon-only and Limited Events

- **`is-patreon`**: only Patrons and staff can sign up. Others get a private message with a **Become a Patron** button. High supporters (Tier 3, plus staff) get an <DiscordButton type="success" emoji="➕">Add a Friend</DiscordButton> button after signing up to bring one verified, VRChat-linked friend; the friend shows as `↳➕` under them on the staff listing. Tier 1 and 2 Patrons see an upgrade prompt instead.
- **`signup-role`**: only members with that role can sign up. Combined with `is-patreon`, that role can join alongside Patrons and staff.

Co-hosts, security, and listed volunteers can always sign up.

---

## Ending and Feedback

The event ends automatically at **start + duration**, or earlier with **End Event Now**.

- **Ended:** the card turns grey and shows <DiscordButton type="success" emoji="⭐">Rate Event</DiscordButton> and <DiscordButton type="primary" emoji="📃">Participants</DiscordButton>.
- **Cancelled before start:** the card turns red and only shows **Participants**. No feedback.

**Rate Event** stays open for **24 hours**, for people who signed up. It opens a short form with an optional 1–5 star rating and optional written feedback (at least one is needed). Answers are anonymous and only admins can read them. Each part can be sent once; pressing the button again only shows what is still missing.

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
<summary><strong>I cannot see the staff listing channel</strong></summary>

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
