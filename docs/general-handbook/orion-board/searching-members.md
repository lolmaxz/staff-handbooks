---
id: orion-board-searching-members
title: Searching Members
---

import CardGrid, { Card } from "@site/src/components/CardGrid";

# Searching Members

There are several ways to find a member and view their profile in Orion Board.

---

## Magnifying Glass (Top Navbar)

The magnifying glass is always visible in the top navbar.

<CardGrid columns={2}>
  <Card title="User ID in clipboard" status="success" icon="📋">
    Click the magnifying glass—if a valid user ID is in your clipboard and the user exists, you go straight to their details page.
  </Card>
  <Card title="Search by name or ID" status="info" icon="🔍">
    Click to expand a search field. The search accepts username, display name, user ID, or nickname (in some situations).
  </Card>
</CardGrid>

<div style={{ maxWidth: "500px", margin: "0 auto 2rem" }}>
  <img src={require("@site/static/img/orion-search-magnifying-glass.png").default} alt="Magnifying glass / search in top navbar" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Search bar in top navbar; paste user ID for quick lookup.</p>
</div>

---

## From Tickets

- Click a ticket → click a participant's avatar → **View Full Profile**
- The ticket DETAILS section shows the user with a link to their profile

---

## From Mod Logs or Kicks & Bans

Click a member's name or avatar to open their profile.

---

## From Discord

Right-click a user → **Apps** → **Member Details** → "View Full Details" button opens the dashboard member page.

---

## Member Profile

The member profile page has tabs: **Overview**, **Tickets**, **Moderation**, **Watchlist**, **Bans**.

It shows: avatar, username, ID (copy), account created, tickets opened/closed, and related moderation data.

<div style={{ maxWidth: "900px" }}>
  <img src={require("@site/static/img/orion-member-profile-page.png").default} alt="Member profile page with Overview, Tickets, Moderation tabs" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Member profile with Overview, Tickets, Moderation, and Watchlist tabs.</p>
</div>
