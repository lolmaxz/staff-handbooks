---
id: github-records
title: Moderation Records (Orion Board)
---

import CardGrid, { Card } from "@site/src/components/CardGrid";
import RoleBadge from "@site/src/components/RoleBadge";
import TextWithButton from "@site/src/components/TextWithButton";

# Moderation Records (Orion Board)

:::info
This page was formerly called **GitHub Records**. All moderation actions are now recorded in **Orion Board**.
:::

All moderation actions are now recorded in **Orion Board**. Server Moderation Logs, Watchlist, and Kicks & Bans are all managed in the dashboard.

<TextWithButton
  text="Access the Orion Board dashboard to view and manage moderation records:"
  buttonLabel="Open Orion Board"
  buttonHref="https://orion.theedenapis.com/dashboard"
/>

:::info Why this matters
Clear records help us make fair decisions, see patterns, and coordinate as a team. Orion Board keeps everything in one place—no more separate GitHub projects.
:::

## Where to Find Things

| What | Where in Orion Board |
|------|----------------------|
| **Moderation Actions** | Mod Logs → Server → Moderation Actions tab |
| **Watchlist** | Mod Logs → Server → Watchlist tab |
| **Kicks & Bans** | Kicks and Bans page |

Warnings are created via slash commands in Discord (<code>/warn</code>, <code>/warn-informal</code>). The dashboard is for viewing, editing, and linking tickets to moderation actions.

For full details on the moderation system, see [Orion Board: Moderation and Warnings](/docs/general-handbook/orion-board/orion-board-moderation-and-warnings).

<CardGrid columns={2}>
  <Card title="After Closing a Ticket" status="success" icon="✅">
    <ul>
      <li>The <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> records the outcome in Orion Board.</li>
      <li>Link the ticket to the moderation action when applicable.</li>
      <li>Include a brief summary in the reason and notes fields.</li>
    </ul>
  </Card>

  <Card title="What to Log" status="info" icon="📝">
    <ul>
      <li>Date/time of the incident</li>
      <li>Which rule was broken</li>
      <li>Punishment applied</li>
      <li>Screenshot(s) or evidence links</li>
    </ul>
  </Card>

  <Card title="Watchlist" status="info" icon="👁️">
    <ul>
      <li>Use <code>/watchlist</code> in Discord to add members who need continued visibility.</li>
      <li>View and manage entries in Mod Logs → Server → Watchlist.</li>
    </ul>
  </Card>

  <Card title="Labels and Levels" status="warning" icon="📈">
    <ul>
      <li>Use labels/status in Orion Board to track active warnings.</li>
      <li>Keep entries concise, factual, and neutral.</li>
    </ul>
  </Card>
</CardGrid>

<div style={{ maxWidth: "900px" }}>
  <img src={require("@site/static/img/orion-server-moderation-logs.png").default} alt="Server Moderation Logs on Orion Board" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Server moderation logs in Orion Board.</p>
</div>

:::warning Keep it accurate
Accurate record‑keeping is essential for consistency and fairness across cases.
:::

## Related

- [Server Rule Violations](/docs/server-staff-handbook/server-rule-violations)
- [Ban Types Overview](/docs/server-staff-handbook/ban-votes/ban-types-overview)
- [Orion Board: Moderation and Warnings](/docs/general-handbook/orion-board/orion-board-moderation-and-warnings)
