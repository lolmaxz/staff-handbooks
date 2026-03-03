---
id: orion-board-moderation-and-warnings
title: Moderation and Warnings
---

import CommandCard from "@site/src/components/CommandCard";
import CardGrid, { Card } from "@site/src/components/CardGrid";

# Moderation and Warnings

Warnings **cannot be created on the dashboard**. Server and event warnings are created **only via slash commands** in Discord. The dashboard is for **viewing and editing** existing moderation actions.

:::info Attachments: Discord vs dashboard
Discord slash commands allow **only 1 attachment at a time** for warnings, watchlist, and host discretion. Use the dashboard to add up to 50 attachments if you need more evidence.
:::

---

## Server Warnings

<CardGrid columns={2}>
  <Card title="Formal Warning" status="warning" icon="⚠️">
    <CommandCard cmd="/warn" perms="Moderator" cardColor="orange">
      user, reason, ticket (autocomplete), notes, evidence. Can link to ticket. "Open Ticket" button if no ticket exists.
    </CommandCard>
  </Card>
  <Card title="Informal Warning" status="info" icon="💬">
    <CommandCard cmd="/warn-informal" perms="Moderator" cardColor="blue">
      user, reason, ticket, evidence. Informal server warning.
    </CommandCard>
  </Card>
</CardGrid>

---

## Event Warnings

<CardGrid columns={2}>
  <Card title="Formal Event Warning" status="warning" icon="⚠️">
    <CommandCard cmd="/warn-event" perms="Senior Event Team" cardColor="purple">
      user, reason, ticket, notes, evidence, punishment (24h, 2d, 3d, 5d, 1w, 2w, 3w, 1m, 3m, 6m, 1y, indefinite). Optional punishment creates event ban automatically.
    </CommandCard>
  </Card>
  <Card title="Informal Event Warning" status="info" icon="💬">
    <CommandCard cmd="/warn-informal-event" perms="Senior Event Team" cardColor="purple">
      user, reason, ticket, evidence. Informal event warning.
    </CommandCard>
  </Card>
</CardGrid>

---

## Dashboard: Viewing and Editing

In Orion Board, go to **Mod Logs** → switch to **Server** or **Event** → **Moderation Actions** tab.

The **Moderation Action Details** modal lets you view and edit:

- Reason
- Staff notes
- Evidence
- Related ticket
- Duration (for event warnings)

**Timeouts** are also auto-logged when a member receives a server timeout—whether from Hephia V1.2's <code>/timeout</code> command or from the manual timeout option in the Discord client UI.

<div style={{ maxWidth: "350px", marginBottom: "2rem" }}>
  <img src={require("@site/static/img/orion-moderation-action-details.png").default} alt="Moderation Action Details modal for a warning" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>View and edit reason, notes, evidence, and ticket link.</p>
</div>

<div style={{ maxWidth: "450px" }}>
  <img src={require("@site/static/img/orion-server-moderation-logs.png").default} alt="Server Moderation Logs page" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Server moderation actions list.</p>
</div>
