---
id: orion-board-moderation-and-warnings
title: Moderation and Warnings
---

import CommandCard from "@site/src/components/CommandCard";
import DiscordButton from "@site/src/components/DiscordButton";
import Tooltip from "@site/src/components/Tooltip";
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
      user (optional), <Tooltip tip="Optional — use when the member is no longer in the server" width="18rem">user_id</Tooltip>, reason, ticket (autocomplete), notes, evidence. Can link to ticket.
    </CommandCard>
  </Card>
  <Card title="Informal Warning" status="info" icon="💬">
    <CommandCard cmd="/warn-informal" perms="Moderator" cardColor="blue">
      user (optional), <Tooltip tip="Optional — use when the member is no longer in the server" width="18rem">user_id</Tooltip>, reason, ticket, evidence. Informal server warning.
    </CommandCard>
  </Card>
</CardGrid>

:::tip Warning a member who left
Both <code>user</code> and <code>user_id</code> are optional. Use <code>user_id</code> when the member is no longer in the server—for example, if a warning was supposed to be given but they left before it could be issued.
:::

---

## Event Warnings

<CardGrid columns={2}>
  <Card title="Formal Event Warning" status="warning" icon="⚠️">
    <CommandCard cmd="/warn-event" perms="Senior Event Team" cardColor="purple">
      user (optional), <Tooltip tip="Optional — use when the member is no longer in the server" width="18rem">user_id</Tooltip>, reason, ticket, notes, evidence, punishment (24h, 2d, 3d, 5d, 1w, 2w, 3w, 1m, 3m, 6m, 1y, indefinite). Optional punishment creates event ban automatically.
    </CommandCard>
  </Card>
  <Card title="Informal Event Warning" status="info" icon="💬">
    <CommandCard cmd="/warn-informal-event" perms="Senior Event Team" cardColor="purple">
      user (optional), <Tooltip tip="Optional — use when the member is no longer in the server" width="18rem">user_id</Tooltip>, reason, ticket, evidence. Informal event warning.
    </CommandCard>
  </Card>
</CardGrid>

---

## Opening a Ticket from a Warning

When you run **any** warning command without linking a ticket, the confirmation message includes an optional button:

<p>
  <DiscordButton type="primary" emoji="🎫">Open Ticket</DiscordButton>
</p>

Clicking it will:

<CardGrid columns={2}>
  <Card title="Create the ticket" status="success" icon="🎫">
    Opens a new ticket right away from the warning confirmation.
  </Card>
  <Card title="Pull the member" status="info" icon="👤">
    Automatically adds the warned member to the ticket.
  </Card>
  <Card title="Pre-fill the reason" status="info" icon="📝">
    Writes the warning reason into the ticket automatically.
  </Card>
  <Card title="Link automatically" status="success" icon="🔗">
    Links the new ticket to the warning so the records stay connected.
  </Card>
</CardGrid>

This applies to all warning types: <code>/warn</code>, <code>/warn-informal</code>, <code>/warn-event</code>, and <code>/warn-informal-event</code>.

:::warning Exception — member not in the server
If the member was **not currently in the server** when the warning was issued (for example, you used <code>user_id</code>), the <DiscordButton type="primary" emoji="🎫">Open Ticket</DiscordButton> button will **not** appear. Discord cannot open a ticket for someone who is not in the server.
:::

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
