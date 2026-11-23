---
id: hephia-bot-introduction
title: Hephia Bot
slug: /general-handbook/hephia-bot
---

import CardGrid, { Card } from "@site/src/components/CardGrid";
import Link from "@docusaurus/Link";

# Hephia Bot 🤖

Hephia is Eden's custom Discord bot family. We currently run **two** Hephia bots side by side — each handles a different set of jobs. Use the page for the bot that owns the command you need.

---

## Which bot do I use?

<CardGrid columns={2}>
  <Card title="Hephia V1.2" status="warning" icon="🛡️" href="/docs/general-handbook/hephia-bot/hephia-bot-v1-2">
    <p><strong>Server moderation &amp; utilities</strong></p>
    <ul>
      <li>Member info (<code>/info</code>)</li>
      <li>Bans, kicks, timeouts, mute/deafen</li>
      <li>Voting, greetings, logging, and more</li>
    </ul>
    <p><Link to="/docs/general-handbook/hephia-bot/hephia-bot-v1-2">V1.2 commands →</Link></p>
  </Card>
  <Card title="Hephia V2" status="info" icon="🎮" href="/docs/general-handbook/hephia-bot/hephia-bot-v2">
    <p><strong>VRChat linking, XP, and staff helpers</strong></p>
    <ul>
      <li>VRChat account linking &amp; group tools</li>
      <li>Staff say &amp; linking status checks</li>
      <li>XP / leaderboard for members</li>
    </ul>
    <p><Link to="/docs/general-handbook/hephia-bot/hephia-bot-v2">V2 commands →</Link></p>
  </Card>
</CardGrid>

:::tip Quick tip
**Timeouts** and most moderation actions live on **Hephia V1.2**. **VRChat linking** and **`/say`** live on **Hephia V2**. If a slash command does not appear under one bot, check the other.
:::

---

## Event signups

Event signup buttons, voting, staff rosters, and feedback are also powered by Hephia. Those workflows are documented in the Event Staff Handbook:

- [Hephia Event System](/docs/event-staff-handbook/hephia-event-system)

---

## Related

- [Orion Board](/docs/general-handbook/orion-board) — tickets, warnings, bans, and verification records
- [Server Staff Handbook](/docs/server-staff-handbook) — day-to-day server moderation procedures
