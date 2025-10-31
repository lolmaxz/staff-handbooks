---
id: how-to-host-an-event
title: How to Host an Event
---

import CardGrid, { Card } from "@site/src/components/CardGrid";
import ChannelBadge from "@site/src/components/ChannelBadge";
import RoleBadge from "@site/src/components/RoleBadge";
import Checklist from "@site/src/components/Checklist";
import { Megaphone } from 'lucide-react';

<div style={{ marginBottom: "1rem" }}>
  <Card title="Overview" status="info">
    <p>Hosting an event has three phases: <strong>Prep</strong>, <strong>Live</strong>, and <strong>Wrap‑up</strong>. Use the checklists below to stay on track.</p>
  </Card>
</div>

## Hosting Instructions (Revamped)

<Checklist checklistId="host-instructions" title="Quick Checklist">
  <Checklist.Item id="announce">Announce 2–6 hours before start; avoid overlapping events; include time, hammertime link, and role ping (in <ChannelBadge variant="post" label="🎉events" link="https://discord.com/channels/734595073920204940/870369777980436520" />).</Checklist.Item>
  <Checklist.Item id="signup">Create signup thread (in <ChannelBadge variant="post" label="🧵events-signups" link="https://discord.com/channels/734595073920204940/996823116477124608" />).</Checklist.Item>
  <Checklist.Item id="reminder">Post a 1‑hour reminder (in <ChannelBadge variant="post" label="🎉events" link="https://discord.com/channels/734595073920204940/870369777980436520" />).</Checklist.Item>
  <Checklist.Item id="go-live">When live, post a start notice (in <ChannelBadge variant="post" label="🧵events-signups" link="https://discord.com/channels/734595073920204940/996823116477124608" />); begin accepting requests (prioritize patrons first 10 min).</Checklist.Item>
  <Checklist.Item id="manage">Manage the signup thread; announce when capacity is full, note tech issues/world changes/event start/event end in the thread.</Checklist.Item>
  <Checklist.Item id="conclude">Conclude (in <ChannelBadge variant="post" label="🧵events-signups" link="https://discord.com/channels/734595073920204940/996823116477124608" />); close the thread (team will lock it later).</Checklist.Item>
</Checklist>

Related references: <ChannelBadge variant="post" label="💠｜rules" link="https://discord.com/channels/734595073920204940/737074569319546921" /> · <ChannelBadge variant="post" label="📘how-to-join-events" link="https://discord.com/channels/734595073920204940/980342448712724560" /> · <ChannelBadge variant="post" label="📆events-schedule" link="https://discord.com/channels/734595073920204940/820927836411002890" />

## Event Post Checklist

Before posting your event announcement, make sure your post includes all required elements:

<Checklist checklistId="event-post-checklist" title="Event Post Requirements">
  <Checklist.Item id="role-ping">General Event Ping role (<code> \<@&790399512116068375> </code>)</Checklist.Item>
  <Checklist.Item id="event-title">Event title with time in hours (using hammertime code)</Checklist.Item>
  <Checklist.Item id="date-time">Date and time (hammertime code format)</Checklist.Item>
  <Checklist.Item id="world-info">World information: Quest/PC compatibility emojis, world name + author, event capacity</Checklist.Item>
  <Checklist.Item id="cohost">Co-host mention (if applicable)</Checklist.Item>
  <Checklist.Item id="event-description">Event description, game rules if needed, and flairs</Checklist.Item>
  <Checklist.Item id="signup-link">Signup thread link</Checklist.Item>
  <Checklist.Item id="rules-link">Event Rules link</Checklist.Item>
  <Checklist.Item id="join-link">How to Join link</Checklist.Item>
  <Checklist.Item id="questions-link">Questions/Events Talk channel link</Checklist.Item>
  <Checklist.Item id="vrchat-link">VRChat Linking channel link</Checklist.Item>
  <Checklist.Item id="host-vr">Host's VRC account link</Checklist.Item>
</Checklist>

<details>
  <summary>Announcement Template (copy/paste)</summary>

```
<@&790399512116068375>
# EVENT TITLE [in X hours (using hammertime code)]
[date and time hammertime code]
WORLD: [ <:PCQuest_part1:1182072615301558364><:PCQuest_part2:1182072618166259892> or <:PC_Only_part1:1182072623975387216><:PC_Only_part2:1182072628492632064> ] - [World name + author] - Capacity of [EVENT CAPACITY (max amount of people)]
COHOST: [@cohost] (if applicable)

[add information about the event, game rules if needed, some flairs]

### Sign up here > [add event signup thread link]
> [Event Rules](https://discord.com/channels/734595073920204940/737074569319546921/1294366927111716914) · [How to Join](https://discord.com/channels/734595073920204940/980342448712724560) · [Any Questions Here](https://discord.com/channels/734595073920204940/894726709272793169) · [VRChat Linking](https://discord.com/channels/734595073920204940/1228159292306362368)

**__Add the Host__** ➜ [add your vrc account link]
```

</details>

<div style={{ marginTop: "1rem" }} />

## Pre‑Event Prep

- Confirm you are scheduled
- <Megaphone /> Publish the event
- Announcement in <ChannelBadge variant="post" label="🎉events" link="https://discord.com/channels/734595073920204940/870369777980436520" />
- Post <strong>2–6 hours</strong> before start

:::info Hammertime & Schedule
Hosts can always find their hammertime text in the <ChannelBadge variant="thread" label="📋CURRENT WEEK'S SCHEDULE" link="https://discord.com/channels/734595073920204940/1208883577643597834" /> forum post. This is also where the most recent schedule for all hosts to look at behind the scenes is posted.
:::

:::warning Overlapping Events
If overlapping another event, post <strong>1h after</strong> their doors open.
:::

- Reminder ping 1h before in <ChannelBadge variant="post" label="🎉events" link="https://discord.com/channels/734595073920204940/870369777980436520" />

## Live Pings

- <strong>10–15 min before start</strong>: Ping <RoleBadge color="#ffd957" role="Patreon Supporter" /> members; if all joined, open doors to regular members
- <strong>On time</strong>: Send the general invite request notice

## Patreon Access & Capacity Guidelines

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

Follow specific guidance for your event type; see [Event Types](../event-types).

## VR Announcement Talking Points

- Consent is key (ask before touch; OSC goes brr reminder)
- Name active staff (hosts, security)
- If issues, contact staff or open an event ticket in the server
- Event/world‑specific rules (no locked private rooms, collars, game rules, etc.)
- [Optional] Open applications for staff/hosts/security

## Post‑Event Wrap‑up

- Report incidents in <ChannelBadge variant="post" label="🔺events-incidents" link="https://discord.com/channels/734595073920204940/741166096421486645" />
- Announce event end in the event's thread
- Announce if the world capacity is full (in the event's thread)
- Send additional pings when new spots open
- Allow <strong>Purple</strong> or <strong>Golden</strong> Patreon icons even when soft capacity is reached (except limited‑slot games or hard cap)
- At the end of an event, it's up to the event host to open an Eden group instance for an afterparty

:::warning Timing & Reliability
Be punctual with pings and start times. Join early to handle technical issues proactively.
:::

## Related

- [Scheduling Procedures](./scheduling-procedures)
- [Incident Management](../Security/incident-management-guidelines)
- [Event Types](../event-types)
