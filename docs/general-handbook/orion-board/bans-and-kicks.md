---
id: orion-board-bans-and-kicks
title: Bans and Kicks
---

import CommandCard from "@site/src/components/CommandCard";
import Tooltip from "@site/src/components/Tooltip";
import CardGrid, { Card } from "@site/src/components/CardGrid";

# Bans and Kicks

Kicks and bans are viewed and managed on the **Kicks and Bans** page in Orion Board.

---

## How Entries Are Created

| Type | How it's created |
|------|------------------|
| **Kicks** (server only) | Auto-detected when a user is kicked—via Discord UI or Hephia's <code>/kick</code> command |
| **Server bans** | Auto-detected when a user is banned—via Discord UI or Hephia's <code>/ban</code> command (including temporary bans and duration changes) |
| **Event bans** | Created when <code>/event-ban</code> is used, or when a punishment is added with an event warning (<code>/warn-event</code>) |

---

## Server Bans (Hephia Temp Bans)

Hephia V1.2 supports **temporary server bans** via an optional duration on <code>/ban</code>. Orion Board auto-detects these bans and any duration changes when staff re-run <code>/ban</code> with a different duration.

<CommandCard cmd="/ban" perms="Moderator" cardColor="orange">
  user, <Tooltip tip="Optional — weeks (w), months (m), and years (y) only; up to two parts; supports decimal/comma. Examples: 2w, 1m, 3m2w, 1.5y. Leave empty for a permanent ban." width="20rem">duration</Tooltip>, reason. Temporary bans auto-unban when they expire. Full command details: [Hephia V1.2 — Temporary Bans](/docs/general-handbook/hephia-bot/hephia-bot-v1-2#temporary-bans).
</CommandCard>

:::info What Orion tracks
Orion keeps server ban records in sync with Hephia—including when a ban is temporary, when its duration is updated, and when it expires (Active / Expired filters on the Kicks and Bans page).
:::

---

## Event Bans

<CommandCard cmd="/event-ban" perms="Senior Event Team" cardColor="purple">
  user, reason, duration (required), ticket, evidence. Duration options: 24h, 2d, 3d, 5d, 1w, 2w, 3w, 1m, 3m, 6m, 1y, indefinite.
</CommandCard>

:::tip Enforced by Hephia at signup
Active event bans are checked by Hephia when someone tries to join an event (attendee, co-host, or security). Banned members are blocked automatically and see a private message — hosts do **not** need to manually watch for them on the roster. Temporary bans allow signup again once they expire; permanent bans have no end date. See [Hephia Event System](/docs/event-staff-handbook/hephia-event-system#during-signups-members).
:::

---

## Kicks and Bans Page

In Orion Board, go to **Kicks and Bans**. Tabs:

- **Kicks** — Server only
- **Bans** — Server and event

Filters: All, Active, Expired, etc.

The **Ban Details** modal shows:

- Reason
- Evidence
- Related ticket
- Active status
- Duration / expiration (for temporary bans)
- Appeal information

<div style={{ maxWidth: "300px", marginBottom: "2rem" }}>
  <img src={require("@site/static/img/orion-ban-details-modal.png").default} alt="Ban Details modal" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Ban details with reason, evidence, and status.</p>
</div>

<div style={{ maxWidth: "450px" }}>
  <img src={require("@site/static/img/orion-kicks-bans-page.png").default} alt="Kicks and Bans page with filters" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Kicks and Bans page with filter tabs.</p>
</div>
