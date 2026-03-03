---
id: orion-board-dashboard-overview
title: Dashboard Overview
---

import CommandCard from "@site/src/components/CommandCard";
import CardGrid, { Card } from "@site/src/components/CardGrid";

# Dashboard Overview

The Orion Board dashboard provides a central place to manage tickets, moderation actions, verifications, watchlist, host discretion, and bans. Log in with your Discord account.

---

## Navigation

The sidebar gives you access to:

- **Dashboard** — Overview, stats, ticket columns (Verification, Server, Event)
- **Server Tickets** — Filter by type (Staff-Talk, Unsolicited DM, Friend Request, Scammer Report, etc.), status, search
- **Event Tickets** — Event report tickets (e.g. **Event-Talk** — members report event-related issues; only senior event staff and management can view)
- **Verifications** — Verification tickets with Verify button on the detail page
- **Mod Logs** — Switch between Server (Moderation Actions, Watchlist) and Event (Event Mod Logs, Host Discretion, Watchlist)
- **Kicks and Bans** — Tabs for Kicks (server only) and Bans (server + event)
- **Settings** — Your preferences (theme, date/time format, notifications)

<div style={{ maxWidth: "280px", margin: "0 auto" }}>
  <img src={require("@site/static/img/orion-sidebar-navigation.png").default} alt="Orion Board left sidebar navigation" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Left sidebar navigation on desktop.</p>
</div>

**Mobile:** On mobile, double-tap items at the bottom to switch between Server and Event views when you have permission for both (a small arrow icon appears):
- **Tickets** — Switch between Server and Event tickets
- **Mod Logs** (Server Mod / Event Mod) — Switch between server and event moderation
- **Watchlist** — Switch between server and event watchlist

The mobile experience is smooth and easy to navigate.

<div style={{ maxWidth: "280px", margin: "0 auto" }}>
  <img src={require("@site/static/img/orion-mobile-view-example.png").default} alt="Orion Board mobile view example" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Mobile bottom navigation with Tickets, Mod Logs, and Watchlist. Double-tap to switch between Server and Event views when permitted.</p>
</div>

---

## Ticket Closure

<CardGrid columns={2}>
  <Card title="/close" status="info" icon="🔒">
    <CommandCard cmd="/close" perms="Moderator" cardColor="indigo">
      Staff closes the ticket immediately. Must be used in the ticket thread. Moderator+ only (not Cutie Helper).
    </CommandCard>
  </Card>
  <Card title="/close-request" status="success" icon="✋">
    <CommandCard cmd="/close-request" perms="Staff" cardColor="green">
      Staff requests closure from the ticket opener. The opener gets Close/Deny buttons. Use when staff feel the user is done—lets the member close when they're ready. Only the ticket opener can click Close or Deny.
    </CommandCard>
  </Card>
</CardGrid>

---

## Ticket Type Change

Staff with the correct permissions can change a ticket's type in the dashboard. You can only change a ticket to a type you have access to view.

---

## Notifications

The notification bell in the top navbar shows:

- **Event bans** — When an event ban is happening or expiring. Targets event staff only.
- **Custom notifications** — Sent by high staff or admins.

In **Settings**, you can configure:

- **Theme** — Light or dark mode
- **Date format** — Absolute or relative
- **Time format** — 12h or 24h
- **Notifications** — Turn on or off. Turning off disables all notifications completely.

<div style={{ maxWidth: "700px" }}>
  <img src={require("@site/static/img/orion-settings-page.png").default} alt="Orion Board Settings page" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Theme, date/time format, and notification settings.</p>
</div>

---

## Server Help Options (Ticket Panel)

When members open a ticket from the open-a-ticket channel, they choose from a dropdown. Here's what each option means:

| Option | Description |
|--------|-------------|
| **Unsolicited DM** | Report someone who DMed them without consent |
| **Friend Request** | Report an unsolicited friend request |
| **Scammer Report** | Report a scammer |
| **Server Problem** | Technical or server-related issue |
| **Inquiries** | General questions |
| **Staff Problem** | Report an issue with a staff member or event host — directs to HR. Does **not** create a ticket. |
| **Other** | Anything else. Staff use this option when opening Staff-Talk tickets. |

### Event Ticket Options

When members or staff open a ticket under the **Event** category, they choose from these types:

| Type | Description | Who can view |
|------|-------------|--------------|
| **Event-Talk** | Members report event-related issues (rule breaks, concerns, feedback). | Senior event staff and event management |
| **Event Incident** | Staff-created tickets for incident follow-up and documentation. | Senior event staff and event management |
| **Other** (Event) | Other event-related matters. | Senior event staff and event management |
