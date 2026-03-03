---
id: orion-board-watchlist
title: Watchlist
---

import RoleBadge from "@site/src/components/RoleBadge";
import CommandCard from "@site/src/components/CommandCard";
import CardGrid, { Card } from "@site/src/components/CardGrid";

# Watchlist

Server and event watchlist entries are created via slash commands. The dashboard is for viewing and managing entries.

---

## Server Watchlist

<CommandCard cmd="/watchlist" perms="Moderator" cardColor="orange">
  user, reason, use_last_hour (100 msgs) OR message_link (25 before/after), evidence.
</CommandCard>

**Context options** — Attach message history to the entry so staff can see what was said:

| Option | What it does |
|--------|--------------|
| **use_last_hour** | Fetches the last 100 messages in the channel where the command is run. Use when the relevant context is in recent messages. |
| **message_link** | Fetches 25 messages before and 25 after the linked message. Use when you have a specific message to point to. |

:::info Where the command is denied
The command is **denied** when a context option is used *and* run from a verification ticket, staff channel, or thread under a staff channel (e.g. to avoid attaching sensitive content). Use a different ticket or non-staff channel for context-based entries.
:::

:::info Attachments: Discord vs dashboard
Discord slash commands allow **only 1 attachment at a time**. For warnings, watchlist, and host discretion: use the dashboard to add up to 50 attachments if you need more evidence.
:::

---

## Event Watchlist

<CommandCard cmd="/watchlist-event" perms="Senior Event Team" cardColor="purple">
  user, reason, evidence, message_link. Event watchlist entry.
</CommandCard>

| Option | What it does |
|--------|--------------|
| **message_link** | Fetches 25 messages before and 25 after the linked message. Same restriction: denied when used from a verification ticket, staff channel, or thread under a staff channel. |

---

## Dashboard

Navigate: **Mod Logs** → switch to **Server** or **Event** → **Watchlist** tab.

Use the **+ Create Entry** button to add entries from the dashboard (when permitted).

**Quick access from Discord:** Right-click a user → **Apps** → **Watchlist Data** → "View Full Details" opens the dashboard.

<div style={{ maxWidth: "900px", marginBottom: "2rem" }}>
  <img src={require("@site/static/img/orion-watchlist-entries-page.png").default} alt="Watchlist Entries page with Create Entry button" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Watchlist entries with Create Entry button.</p>
</div>

<div style={{ maxWidth: "700px" }}>
  <img src={require("@site/static/img/orion-watchlist-entry-details.png").default} alt="Individual watchlist entry" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Individual watchlist entry details.</p>
</div>
