---
id: orion-board-introduction
title: Orion Board Introduction
slug: /general-handbook/orion-board
---

import RoleBadge from "@site/src/components/RoleBadge";
import ChannelBadge from "@site/src/components/ChannelBadge";
import TextWithButton from "@site/src/components/TextWithButton";
import CardGrid, { Card } from "@site/src/components/CardGrid";

# Orion Board

Orion Board is our in-house ticket and moderation system. It replaces GitHub Warning Books, Discord channel logging, and manual record-keeping for server and event warnings, bans, watchlist, host discretion, tickets, and verification.

<TextWithButton
  text="Access the Orion Board dashboard (Discord OAuth2 login required):"
  buttonLabel="Open Orion Board"
  buttonHref="https://orion.theedenapis.com/dashboard"
/>

---

## Critical Changes Staff Must Know

<CardGrid columns={2}>
  <Card title="/verify is the ONLY way to verify" status="warning" icon="✅">
    Staff cannot manually assign the Verified role. Use <code>/verify</code> in the ticket thread or the Verify button on the Orion Board. Hephia removes the Unverified role when verification completes.
  </Card>
  <Card title="Reply from the dashboard" status="success" icon="💬">
    Staff can send messages to Discord tickets directly from Orion Board without being in Discord. This is a new, highly useful feature—you can respond to tickets from anywhere.
  </Card>
</CardGrid>

<CardGrid columns={2}>
  <Card title="Server ticket types" status="info" icon="🎫">
    <p style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>Brand new ticket types are now available. Filter and organize by type in the dashboard:</p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
      <span style={{ padding: "0.2rem 0.5rem", borderRadius: "6px", fontSize: "0.8rem", backgroundColor: "#e68027", color: "white" }}>Staff-Talk</span>
      <span style={{ padding: "0.2rem 0.5rem", borderRadius: "6px", fontSize: "0.8rem", backgroundColor: "#3b82f6", color: "white" }}>Unsolicited DM</span>
      <span style={{ padding: "0.2rem 0.5rem", borderRadius: "6px", fontSize: "0.8rem", backgroundColor: "#8b5cf6", color: "white" }}>Friend Request</span>
      <span style={{ padding: "0.2rem 0.5rem", borderRadius: "6px", fontSize: "0.8rem", backgroundColor: "#ef4444", color: "white" }}>Scammer Report</span>
      <span style={{ padding: "0.2rem 0.5rem", borderRadius: "6px", fontSize: "0.8rem", backgroundColor: "#06b6d4", color: "white" }}>Server Problem</span>
      <span style={{ padding: "0.2rem 0.5rem", borderRadius: "6px", fontSize: "0.8rem", backgroundColor: "#22c55e", color: "white" }}>Inquiries</span>
      <span style={{ padding: "0.2rem 0.5rem", borderRadius: "6px", fontSize: "0.8rem", backgroundColor: "#64748b", color: "white" }}>Other</span>
    </div>
  </Card>
  <Card title="Event ticket types" status="info" icon="🎫">
    <p style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>Brand new ticket types are now available. Filter and organize by type in the dashboard:</p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
      <span style={{ padding: "0.2rem 0.5rem", borderRadius: "6px", fontSize: "0.8rem", backgroundColor: "#f75edb", color: "white" }}>Event-Talk</span>
      <span style={{ padding: "0.2rem 0.5rem", borderRadius: "6px", fontSize: "0.8rem", backgroundColor: "#a259f7", color: "white" }}>Event Incident</span>
      <span style={{ padding: "0.2rem 0.5rem", borderRadius: "6px", fontSize: "0.8rem", backgroundColor: "#64748b", color: "white" }}>Other</span>
    </div>
  </Card>
</CardGrid>

<CardGrid columns={3}>
  <Card title="No more Mod-on-call" status="info" icon="📋">
    Tickets, warnings and watchlist entries are now in one place, automatically organized. The Mod-on-call page is deprecated.
  </Card>
  <Card title="No more GitHub Warning Books" status="info" icon="📚">
    All moderation logging is in Orion Board. Server Moderation Logs, Watchlist, Kicks & Bans, and Host Discretion are all managed in the dashboard.
  </Card>
  <Card title="No reason needed to close" status="success" icon="📋">
    You no longer need to specify a reason when closing tickets or completing verification. Orion Board tracks who did what automatically— A major change from our previous system.
  </Card>
</CardGrid>

---

## Quick Links

- [Dashboard Overview](/docs/general-handbook/orion-board/orion-board-dashboard-overview) — Navigation, layout, ticket closure, notifications, settings
- [Slash Commands Reference](/docs/general-handbook/orion-board/orion-board-commands) — Full list of all commands with quick descriptions
- [Verification](/docs/general-handbook/orion-board/orion-board-verification) — /verify command, Verify button, verification panel options
- [Moderation and Warnings](/docs/general-handbook/orion-board/orion-board-moderation-and-warnings) — Server and event warnings via slash commands
- [Bans and Kicks](/docs/general-handbook/orion-board/orion-board-bans-and-kicks) — Event bans, Ban Details modal
- [Watchlist](/docs/general-handbook/orion-board/orion-board-watchlist) — Server and event watchlist
- [Orion Host Discretion](/docs/general-handbook/orion-board/orion-board-host-discretion) — Host discretion in Orion Board; full policy: [Host Discretion List](/docs/event-staff-handbook/Hosts/host-discretion-list)
- [Searching Members](/docs/general-handbook/orion-board/orion-board-searching-members) — How to find users and view member profiles
- [Data Protection and Privacy](/docs/general-handbook/orion-board/orion-board-data-protection-privacy) — Permissions, access limits, and how we protect sensitive data

---

## Notifications

The notification bell in the top navbar alerts you to important updates. Notifications include: event bans (happening or expiring)—targeting event staff only—and custom notifications sent by high staff or admins. You can turn notifications off completely in Settings.

---

## Staff Analytics

High staff have access to limited analytics about staff performance (server-side data only for now). This is available from the dashboard for those with the appropriate permissions.

---

<div style={{ maxWidth: "900px" }}>
  <img src={require("@site/static/img/orion-dashboard-overview.png.png.png").default} alt="Orion Board dashboard overview" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Main dashboard with ticket columns and stats.</p>
</div>

### Quick link from Discord

Staff can also find a quick link to open Orion Board directly in the ticket panel in <ChannelBadge label="🎫open-a-ticket" link="https://discord.com/channels/734595073920204940/1106413750975746070"/>.

<div style={{ maxWidth: "400px", margin: "0.5rem auto 0" }}>
  <img src={require("@site/static/img/orion-discord-dashboard-button.png").default} alt="Orion Board button in ticket panel" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Orion Board button in the ticket panel.</p>
</div>
