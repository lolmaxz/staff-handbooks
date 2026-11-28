---
id: how-to-host-an-event
title: How to Host an Event
---

import CardGrid, { Card } from "@site/src/components/CardGrid";
import ChannelBadge from "@site/src/components/ChannelBadge";
import RoleBadge from "@site/src/components/RoleBadge";
import Checklist from "@site/src/components/Checklist";
import StepTimeline from "@site/src/components/StepTimeline";
import AuditFlag from "@site/src/components/AuditFlag";
import Link from "@docusaurus/Link";
import DiscordButton from "@site/src/components/DiscordButton";
import DiscordMessage, { DiscordEmbed, DiscordActionRow, DiscordRowButton, DiscordSelect } from "@site/src/components/DiscordMessage";
import { Megaphone } from 'lucide-react';

<div style={{ marginBottom: "1rem" }}>
  <Card title="Overview" status="info">
    <p>Hosting an event has three phases: <strong>Prep</strong>, <strong>Live</strong>, and <strong>Wrap‑up</strong>. Use the checklists below to stay on track.</p>
    <p style={{ marginTop: "0.75rem" }}><AuditFlag type="NEW" /> Signups now run through the <Link to="/docs/event-staff-handbook/hephia-event-system">Hephia Event System</Link> — no more manual signup threads.</p>
  </Card>
</div>

<StepTimeline
title="Hosting phases"
size="sm"
accentColor="#f75edb"
steps={[
{
label: "Prep",
detail: "Announce · signup · reminders",
recap: "Confirm your slot, post in 🎭｜events 2–6 hours ahead, run /start-event in that same channel, and send the 1h reminder from the Staff Attendees Panel.",
},
{
label: "Live",
detail: "Pings · invites · run event",
recap: "Patreon doors, general invites, VR announcement once at start, and use the Staff Attendees Panel to check signups and capacity.",
},
{
label: "Wrap-up",
detail: "Incidents · end event · afterparty",
recap: "Log incidents in #events-incidents, end the event in Hephia, and optionally open a group instance for afterparty.",
},
]}
/>

## Hosting Instructions

<Checklist checklistId="host-instructions" title="Quick Checklist">
  <Checklist.Item id="announce">Announce 2–6 hours before start; avoid overlapping events; include time, hammertime link, and role ping (in <ChannelBadge variant="text" label="🎭｜events" link="https://discord.com/channels/734595073920204940/870369777980436520" />).</Checklist.Item>
  <Checklist.Item id="duration-not-2h">If the event is <strong>not 2 hours</strong>, state the duration in the announcement post <strong>and</strong> tell your security.</Checklist.Item>
  <Checklist.Item id="signup">Run <code>/start-event</code> in the <strong>same channel</strong> as your announcement so the signup message appears beneath it. If the event is not 2 hours, set <code>duration</code> on the command. Optionally enable voting (world / roleplay / basic). See <Link to="/docs/event-staff-handbook/hephia-event-system">Hephia Event System</Link>.</Checklist.Item>
  <Checklist.Item id="staff-list">Confirm the Staff Attendees Panel posted in <ChannelBadge label="🪄｜events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781" /> — use it to track signups (Discord + VRChat names) and live vote tallies.</Checklist.Item>
  <Checklist.Item id="reminder">About an hour before start, press <DiscordButton type="secondary" emoji="📣">1h reminder</DiscordButton> on the Staff Attendees Panel (it pings <RoleBadge role="General Event Ping" />). Optional message and image; blank text uses “The event starts in 1 hour.”</Checklist.Item>
  <Checklist.Item id="go-live">Open doors with <strong>Update event status…</strong> on the Staff Attendees Panel: <strong>Patreon Door Open</strong> first, then <strong>Door Open</strong>. Hephia updates the Public Sign-Up Post and pings everyone signed up. Begin accepting invite requests (prioritize patrons first 10 min) and use the Staff Attendees Panel to verify signups before inviting. World vote results freeze to a public top 3 at planned start.</Checklist.Item>
  <Checklist.Item id="manage">Keep members updated with the same status menu: <strong>Instance Full</strong>, <strong>Technical Issues</strong>, <strong>Door Open</strong> again when spots free up, <strong>Door Closed</strong>, or <strong>Custom</strong> for anything else (like a world change).</Checklist.Item>
  <Checklist.Item id="conclude">Hephia closes signups automatically at start + duration. To close early, press <strong>End Event Now</strong> on the Staff Attendees Panel (it reads <strong>Cancel Event</strong> before the start, and a cancelled event gets no feedback). Only you as the creating host, or an admin, can do this.</Checklist.Item>
</Checklist>

Related references: <Link to="/docs/event-staff-handbook/hephia-event-system">Hephia Event System</Link> · <ChannelBadge label="🪄｜events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781" /> · <ChannelBadge variant="post" label="💠｜rules" link="https://discord.com/channels/734595073920204940/737074569319546921" /> · <ChannelBadge variant="post" label="📘how-to-join-events" link="https://discord.com/channels/734595073920204940/980342448712724560" /> · <ChannelBadge variant="text" label="📆｜events-schedule" link="https://discord.com/channels/734595073920204940/820927836411002890" />

## Event Post Checklist

Before posting your event announcement, make sure your post includes all required elements:

<Checklist checklistId="event-post-checklist" title="Event Post Requirements">
  <Checklist.Item id="role-ping"><RoleBadge role="General Event Ping" /> role (<code> \<@&790399512116068375> </code>)</Checklist.Item>
  <Checklist.Item id="event-title">Event title with time in hours (using hammertime code)</Checklist.Item>
  <Checklist.Item id="date-time">Date and time (hammertime code format)</Checklist.Item>
  <Checklist.Item id="duration-not-2h">Duration — required in the post if the event is <strong>not 2 hours</strong> (also tell your security)</Checklist.Item>
  <Checklist.Item id="world-info">World information: Quest/PC compatibility emojis, world name + author, event capacity. For world voting, include at least <strong>2</strong> VRChat <code>wrld_…</code> links in the announcement.</Checklist.Item>
  <Checklist.Item id="cohost">Co-host mention (if applicable)</Checklist.Item>
  <Checklist.Item id="event-description">Event description, flairs, and any <strong>event-specific rules</strong> that apply only to this event</Checklist.Item>
  <Checklist.Item id="timestamp">Discord timestamp for start time (Hephia reads this when you run the event command)</Checklist.Item>
  <Checklist.Item id="rules-link">Event Rules link</Checklist.Item>
  <Checklist.Item id="join-link">How to Join link</Checklist.Item>
  <Checklist.Item id="questions-link">Questions/Events Talk channel link</Checklist.Item>
  <Checklist.Item id="host-vr">Host's VRC account link</Checklist.Item>
</Checklist>

:::info Security is no longer listed in the post
Co-hosts and security sign up on the Staff Attendees Panel, and the Hephia Public Sign-Up Post shows them (🤝 <strong>Co-Host</strong> / 🛡️ <strong>Security</strong> lines). If nobody signed up as security by the start, the card lists you as <strong>Host &amp; Security</strong>.
:::

:::info Default duration is 2 hours
If the event is <strong>not 2 hours</strong>, put the duration in the public event post <strong>and</strong> set <code>duration</code> on <code>/start-event</code>. Hephia then shows it on the Public Sign-Up Post and on the Staff Attendees Panel, so your security can see it there too.
:::

:::info Event-specific rules belong in the post
Put any rules that apply <strong>only to this event</strong> in the Discord announcement — including avatar / theme expectations when they matter (e.g. no goofy avis for orgy, hunt, or free-use). Staff no longer re-announce the full rule set to late joiners — members are expected to read the event post and the rules channel. Your initial start-of-event VR announcement is still expected; repeating it for every late arrival is not.
:::

<details>
  <summary>Announcement Template (copy/paste)</summary>

```
<@&790399512116068375>
# EVENT TITLE [in X hours (using hammertime codes)]
[date and time hammertime code]
DURATION: [only if not 2 hours — e.g. 90 min / 3 hours] (also tell security)
WORLD: [ <:PCQuest_part1:1182072615301558364><:PCQuest_part2:1182072618166259892> or <:PC_Only_part1:1182072623975387216><:PC_Only_part2:1182072628492632064> ] - [World name + author] - Capacity of [EVENT CAPACITY (max amount of people)]

[add information about the event, any event-specific rules, game rules if needed, some flairs]

> [Event Rules](https://discord.com/channels/734595073920204940/737074569319546921/1294366927111716914) · [How to Join](https://discord.com/channels/734595073920204940/980342448712724560) · [Any Questions Here](https://discord.com/channels/734595073920204940/894726709272793169)

**__Add the Host__** ➜ [add your vrc account link]
```

After posting, run /start-event in this channel. Hephia will post a signup message (Sign Up / List of Attendees — plus voting UI if you enabled it) below your announcement.

</details>

<div style={{ marginTop: "1rem" }} />

## Pre‑Event Prep

<StepTimeline
title="Day-of timing (typical classic event)"
direction="vertical"
size="sm"
accentColor="#f75edb"
ariaLabel="Day-of event ping timeline"
steps={[
{
label: "2–6 hours before",
detail: "Announcement in 🎭｜events",
recap: "Post the full event announcement with role ping, hammertime and world info, then run /start-event in that channel. If the event is not 2 hours, include the duration and set it on the command.",
},
{
label: "1 hour before",
detail: "Reminder ping",
recap: "Press 1h reminder on the Staff Attendees Panel. If overlapping another event, wait until 1 hour after their doors open.",
},
{
label: "15 min before",
detail: "Patreon doors (see capacity rules)",
recap: "Set Patreon Door Open on the Staff Attendees Panel about 15 minutes before start — invite Patreon members first even after general doors open.",
},
{
label: "Start time",
detail: "Door Open · VR announcement",
recap: "Set Door Open on the Staff Attendees Panel on time, then do your one VR announcement at start (rules + staff names — not repeated for every late joiner).",
},
{
label: "After event",
detail: "Event closes · incident reports",
recap: "Hephia closes the event at start + duration (or press End Event Now), members can rate it for 24 hours, and you report any incidents.",
},
]}
/>

- Confirm you are scheduled
- <Megaphone /> Publish the event
- Announcement in <ChannelBadge variant="text" label="🎭｜events" link="https://discord.com/channels/734595073920204940/870369777980436520" />
- Post <strong>2–6 hours</strong> before start

:::info Hammertime & Schedule
For event posts, copy hammertime from the staff-only <ChannelBadge variant="thread" label="📋CURRENT WEEK'S SCHEDULE" link="https://discord.com/channels/734595073920204940/1208883577643597834" /> thread in <ChannelBadge variant="post" label="📆event-scheduling" link="https://discord.com/channels/734595073920204940/1024399192300454029" /> — quick access to the week, with timestamps ready to paste.

The same published week is also on the [Eden Scheduler](/docs/general-handbook/eden-scheduler) after Committee **Push**, and in the public <ChannelBadge variant="text" label="📆｜events-schedule" link="https://discord.com/channels/734595073920204940/820927836411002890" />.
:::

:::warning Overlapping Events
If overlapping another event, post <strong>1h after</strong> their doors open.
:::

- About 1 hour before start, press <DiscordButton type="secondary" emoji="📣">1h reminder</DiscordButton> on the Staff Attendees Panel in <ChannelBadge label="🪄｜events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781" />. It pings <RoleBadge role="General Event Ping" /> for you.
- Prefer to write the reminder yourself? You still can, pinging <RoleBadge role="General Event Ping" /> by hand. Hephia won't detect it, so the **1h reminder** button stays on the panel. Don't press it as well, or members get pinged twice.

## Live Pings

- <strong>10–15 min before start</strong>: set <strong>Patreon Door Open</strong> in <strong>Update event status…</strong> on the Staff Attendees Panel. Hephia updates the Public Sign-Up Post and pings everyone signed up. If all <RoleBadge color="#ffd957" role="Patreon Supporter" /> members joined, open doors to regular members.
- <strong>On time</strong>: set <strong>Door Open</strong>. This replaces the old general invite notice.

## Patreon Access & Capacity Guidelines

:::info Spotting Patreon tiers on the Staff Attendees Panel
On the Staff Attendees Panel in <ChannelBadge label="🪄｜events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781" />, Patreon signups appear under <strong>💎 Patreon</strong>. Prefixes update from live Discord roles. Set what members see with **Update event status…** — <strong>Patreon Door Open</strong>, <strong>Door Open</strong>, or <strong>Instance Full</strong>. Full details: <Link to="/docs/event-staff-handbook/hephia-event-system#the-staff-attendees-panel-co-hosts--security">Hephia Event System</Link>.
:::

The Staff Attendees Panel looks like this:

<DiscordMessage
channel="🪄｜events-attendees"
username="Hephia V2"
avatar={require("@site/static/img/sandbox/hephia-v2-avatar.png").default}
timestamp="Today at 8:40 PM"
app

> <DiscordEmbed

    accent={false}
    description={"# 📅 Friday Lewd Social\n**Starts:** Friday 9:00 PM (in 20 minutes)\n**Duration:** 2h\n**Host:** <@Host>\n**Group:** <@&Event Participant Group #1>\n**Total Signed Up:** 5 — 🔔 1\n**Event Status** — ⏰ Starting Soon\n\n-# **Legend** — 🛠️ Staff · 🕐 Bypass capacity · ✌️ +1\n\n### Co-Host / Security (1)\n- 🛡️ <@Security> — **VRC Name**\n\n### 💎 Patreon (3)\n- <@Tier 1> — **VRC Name**\n- 🕐 <@Tier 2> — **VRC Name**\n- 🕐✌️ <@Tier 3> — **VRC Name**\n  - ↳➕ <@Friend> — **VRC Name**\n\n### 🙋 Attendees (1)\n- <@Member> — **VRC Name**"}

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

Tier 1 has no extra prefix. <code>🕐</code> can bypass soft capacity. <code>🕐✌️</code> can also bring a friend on Patreon-only events: they add the friend themselves with <strong>Add a Friend</strong> in Hephia, and the friend shows as <code>↳➕</code> under them. Invite from this list yourself — Hephia does not send the VRChat friend requests.

| Tier       | Staff list prefix | Perk                                                     |
| ---------- | ----------------- | -------------------------------------------------------- |
| **Tier 1** | _(none)_          | Can come in **early** (Patreon door time)                |
| **Tier 2** | `🕐`              | Can **bypass soft capacity**                             |
| **Tier 3** | `🕐✌️`            | Can **bring a friend** _(often only for Patreon events)_ |

<CardGrid columns={2}>
  <Card title="DO" status="success">
    <ul>
      <li>Open Patreon doors <strong>15 minutes</strong> before listed start time</li>
      <li>Invite Patreon <strong>FIRST</strong>, even after doors open to all</li>
      <li>Invite past your listed <strong>SOFT capacity</strong></li>
      <li>Reopen slots for <strong>Patreon FIRST</strong></li>
      <li>If <strong>10 minutes</strong> pass with no Patreon's requesting, open available slots to all</li>
    </ul>
  </Card>
  <Card title="DO NOT" status="error">
    <ul>
      <li>Let Patreon-only time go into event start time</li>
      <li>Invite past your PC's <strong>HARD capacity</strong></li>
      <li>Kick members to make room for Patreon</li>
      <li>Replace someone's spot without a <strong>5 minute</strong> opportunity to rejoin before using Patreon bypass</li>
    </ul>
  </Card>
</CardGrid>

## Host the Event

Follow specific guidance for your event type; see [Event Types](/docs/event-staff-handbook/event-types).

## VR Announcement Talking Points

Do this **once at the start** of the event. You are **not** required to repeat the full rules announcement for members who join late — they are expected to know the rules and to have read your Discord event post (including any event-specific rules). The Hephia Public Sign-Up Post shows who is working security.

- Consent is key (ask before touch; OSC goes brr reminder)
- Name active staff (hosts, security)
- If issues, contact staff or open an event ticket in the server
- Any event/world‑specific rules that matter in-world (collars, game rules, event-appropriate avatars / theme, etc.)
- Private rooms may be locked or unlocked — ring the bell once; leave them alone if there is no answer or a “no”
- [Optional] Open applications for staff/hosts/security

## Hephia Signups

Member signups are handled by Hephia buttons on your public signup message. The live staff roster (with VRChat names) appears in <ChannelBadge label="🪄｜events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781" />.

Ask co-hosts and <RoleBadge role="Event Security" /> to register with <DiscordButton type="primary" emoji="🤝">Co-Host Signup</DiscordButton> or <DiscordButton type="secondary" emoji="🛡️">Security Signup</DiscordButton> on that Staff Attendees Panel — not the public <DiscordButton type="success" emoji="📩">Sign Up</DiscordButton> button. Use **Update event status…** for doors, a full instance, or technical issues, and <DiscordButton type="secondary" emoji="📣">1h reminder</DiscordButton> for the hour-before ping.

Optional voting (world / roleplay / basic) is turned on with <code>/start-event</code> options. World voting needs at least 2 <code>wrld\_…</code> links in your announcement. Co-hosts and security get the same vote prompt but may skip the world and basic votes; a roleplay role is still required. Full details: [Hephia Event System — Event Voting](/docs/event-staff-handbook/hephia-event-system#voting).

For the full walkthrough (timestamps, ending events, feedback), see [Hephia Event System](/docs/event-staff-handbook/hephia-event-system).

## Post‑Event Wrap‑up

- Report incidents in <ChannelBadge variant="post" label="🔺events-incidents" />
- Let Hephia close signups (automatic at start + duration, or **End Event Now** on the Staff Attendees Panel — **only the creating host or an admin**). The Public Sign-Up Post switches to **Rate Event** for 24 hours.
- During the event, set **Instance Full** when the world is full, and **Door Open** again when spots open — Hephia pings everyone signed up
- Allow <code>🕐</code> and <code>🕐✌️</code> Patreon members (Tier 2 and 3 on the Staff Attendees Panel) even when soft capacity is reached (except limited‑slot games or hard cap)
- At the end of an event, it's up to the event host to open an Eden group instance for an afterparty (Verified-role limited). Hephia soft-checks group membership at signup and nudges members who still need to join — see [Hephia Event System](/docs/event-staff-handbook/hephia-event-system#the-public-sign-up-post-members)

:::warning Timing & Reliability
Be punctual with pings and start times. Join early to handle technical issues proactively.
:::

## Related

- [Hephia Event System](/docs/event-staff-handbook/hephia-event-system)
- [Scheduling Procedures](/docs/event-staff-handbook/Hosts/scheduling-procedures)
- [Incident Management Guidelines](/docs/event-staff-handbook/Security/incident-management-guidelines)
- [Event Types](/docs/event-staff-handbook/event-types)
