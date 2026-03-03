---
id: github-records
title: Moderation Records (Orion Board)
---

import TextWithButton from "@site/src/components/TextWithButton";
import CardGrid, { Card } from "@site/src/components/CardGrid";

# Moderation Records (Orion Board)

All event moderation actions are now recorded in **Orion Board**. The GitHub Warning Book (project 4) has been replaced.

<TextWithButton
  text="Access the Orion Board dashboard to view and manage event moderation records:"
  buttonLabel="Open Orion Board"
  buttonHref="https://orion.theedenapis.com/dashboard"
/>

## Where to Find Things

| What                      | Where in Orion Board                      |
| ------------------------- | ----------------------------------------- |
| **Event Moderation Logs** | Mod Logs → Event → Moderation Actions tab |
| **Host Discretion**       | Mod Logs → Event → Host Discretion tab    |
| **Event Watchlist**       | Mod Logs → Event → Watchlist tab          |
| **Event Bans**            | Kicks and Bans page (Ban tab)             |

Event warnings are created via slash commands in Discord (<code>/warn-event</code>, <code>/warn-informal-event</code>). The dashboard is for viewing, editing, and linking tickets.

<CardGrid columns={2}>
  <Card title="Recording Details" status="info" icon="📝">
    <ul>
      <li>When the rule was broken</li>
      <li>What rule was broken</li>
      <li>Punishment received (if any) - Will record event bans automatically</li>
    </ul>
  </Card>

  <Card title="Documentation" status="info" icon="📎">
    <ul>
      <li>Add screenshots or evidence links to the moderation action - up to 50 screenshots and unlimited links</li>
      <li>Link the related ticket when applicable</li>
    </ul>
  </Card>
</CardGrid>

<div style={{ maxWidth: "900px", margin: "0 auto 2rem" }}>
  <img src={require("@site/static/img/orion-event-moderation-logs.png").default} alt="Event Moderation Logs on Orion Board" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Event moderation logs in Orion Board.</p>
</div>

:::warning
Accurate record-keeping is crucial for tracking member behavior and ensuring consistent moderation.
:::

## Related

- [Orion Board: Moderation and Warnings](/docs/general-handbook/orion-board/orion-board-moderation-and-warnings)
- [Orion Board: Host Discretion](/docs/general-handbook/orion-board/orion-board-host-discretion)
