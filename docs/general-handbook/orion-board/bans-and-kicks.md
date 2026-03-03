---
id: orion-board-bans-and-kicks
title: Bans and Kicks
---

import CommandCard from "@site/src/components/CommandCard";
import CardGrid, { Card } from "@site/src/components/CardGrid";

# Bans and Kicks

Kicks and bans are viewed and managed on the **Kicks and Bans** page in Orion Board.

---

## How Entries Are Created

| Type | How it's created |
|------|------------------|
| **Kicks** (server only) | Auto-detected when a user is kicked—via Discord UI or Hephia's <code>/kick</code> command |
| **Server bans** | Auto-detected when a user is banned—via Discord UI or Hephia's <code>/ban</code> command |
| **Event bans** | Created when <code>/event-ban</code> is used, or when a punishment is added with an event warning (<code>/warn-event</code>) |

---

## Event Bans

<CommandCard cmd="/event-ban" perms="Senior Event Team" cardColor="purple">
  user, reason, duration (required), ticket, evidence. Duration options: 24h, 2d, 3d, 5d, 1w, 2w, 3w, 1m, 3m, 6m, 1y, indefinite.
</CommandCard>

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
- Appeal information

<div style={{ maxWidth: "300px", marginBottom: "2rem" }}>
  <img src={require("@site/static/img/orion-ban-details-modal.png").default} alt="Ban Details modal" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Ban details with reason, evidence, and status.</p>
</div>

<div style={{ maxWidth: "450px" }}>
  <img src={require("@site/static/img/orion-kicks-bans-page.png").default} alt="Kicks and Bans page with filters" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Kicks and Bans page with filter tabs.</p>
</div>
