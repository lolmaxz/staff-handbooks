---
id: orion-board-commands
title: Slash Commands Reference
---

import CommandCard from "@site/src/components/CommandCard";
import DiscordButton from "@site/src/components/DiscordButton";
import RoleBadge from "@site/src/components/RoleBadge";
import Tooltip from "@site/src/components/Tooltip";

# Slash Commands Reference

Quick reference for all ticket and moderation slash commands used with Orion Board.

---

## Verification

<CommandCard cmd="/verify" perms="Cutie Helper, Moderator" cardColor="green">
  Complete verification. Run in verification ticket thread. <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" />: initial only. <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />: initial or final (different person for final).
</CommandCard>

---

## Warnings

<CommandCard cmd="/warn" perms="Moderator" cardColor="orange">
  Formal server warning. <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> only. user (optional), <Tooltip tip="Optional — use when the member is no longer in the server" width="18rem">user_id</Tooltip>, reason, ticket (autocomplete), notes, evidence.
</CommandCard>

<CommandCard cmd="/warn-informal" perms="Moderator" cardColor="orange">
  Informal server warning. <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> only. user (optional), <Tooltip tip="Optional — use when the member is no longer in the server" width="18rem">user_id</Tooltip>, reason, ticket, evidence.
</CommandCard>

<CommandCard cmd="/warn-event" perms="Senior Event Team" cardColor="purple">
  Event warning. <RoleBadge role="Senior Event Team" color="#ffc857" /> only. user (optional), <Tooltip tip="Optional — use when the member is no longer in the server" width="18rem">user_id</Tooltip>, reason, ticket, notes, evidence, punishment (optional—24h, 2d, 3d, 5d, 1w, 2w, 3w, 1m, 3m, 6m, 1y, indefinite). Optional punishment creates event ban.
</CommandCard>

<CommandCard cmd="/warn-informal-event" perms="Senior Event Team" cardColor="purple">
  Informal event warning. <RoleBadge role="Senior Event Team" color="#ffc857" /> only. user (optional), <Tooltip tip="Optional — use when the member is no longer in the server" width="18rem">user_id</Tooltip>, reason, ticket, evidence.
</CommandCard>

:::info No ticket linked?
If you warn without linking a ticket, the confirmation message shows <DiscordButton type="primary" emoji="🎫">Open Ticket</DiscordButton> — creates a ticket, pulls the member, pre-fills the warning reason, and links it automatically. Not shown if the member is not in the server. Full details: [Moderation and Warnings](/docs/general-handbook/orion-board/orion-board-moderation-and-warnings#opening-a-ticket-from-a-warning).
:::

---

## Bans

<CommandCard cmd="/event-ban" perms="Senior Event Team" cardColor="purple">
  Event ban. <RoleBadge role="Senior Event Team" color="#ffc857" /> only. user, reason, duration (required), ticket, evidence. Duration: 24h, 2d, 3d, 5d, 1w, 2w, 3w, 1m, 3m, 6m, 1y, indefinite.
</CommandCard>

---

## Watchlist

<CommandCard cmd="/watchlist" perms="Moderator" cardColor="orange">
  Server watchlist. <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> only. user, reason, use_last_hour OR message_link, evidence. Denied when use_last_hour or message_link is used from a verification ticket, staff channel, or thread under a staff channel.
</CommandCard>

<CommandCard cmd="/watchlist-event" perms="Senior Event Team" cardColor="purple">
  Event watchlist. <RoleBadge role="Senior Event Team" color="#ffc857" /> only. user, reason, evidence, message_link. Denied when message_link is used from a verification ticket, staff channel, or thread under a staff channel.
</CommandCard>

---

## Host Discretion

<CommandCard cmd="/host-discretion" perms="Event Committee" cardColor="purple">
  Create/update host discretion. <RoleBadge role="Event Committee" badgeIcon="event_committee_role_icon.png" color="#f75edb" /> only. host, banned_user, reason, evidence. Manage entries in Orion Board (Mod Logs → Event → Host Discretion).
</CommandCard>

---

## Ticket Management

<CommandCard cmd="/close" perms="Moderator" cardColor="indigo">
  Close ticket immediately. Must be in ticket thread. <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />+ only (not Cutie Helper). reason optional.
</CommandCard>

<CommandCard cmd="/close-request" perms="Staff" cardColor="green">
  Request closure from ticket opener. Opener gets Close/Deny buttons. Use when staff feel the user is done. reason optional.
</CommandCard>

<CommandCard cmd="/add-member" perms="Staff" cardColor="blue">
  Add user to ticket. member (required).
</CommandCard>

<CommandCard cmd="/remove-member" perms="Staff" cardColor="blue">
  Remove user from ticket. member (required).
</CommandCard>

<CommandCard cmd="/rename" perms="Staff" cardColor="blue">
  Rename ticket. name (required). Has cooldown; if it fails, rename the thread manually.
</CommandCard>

<CommandCard cmd="/reminder" perms="Staff" cardColor="blue">
  Ping ticket opener with reminder. message optional. Can only be used 24h apart and at least 12h after ticket opened.
</CommandCard>

---

## Context Menus (Right-Click User)

| Action | Who | Purpose |
|--------|-----|---------|
| **Apps → Member Details** | <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />, <RoleBadge role="Senior Event Team" color="#ffc857" /> | Quick view: tickets, watchlist, moderation. "View Full Details" opens dashboard. |
| **Apps → Watchlist Data** | <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />, <RoleBadge role="Senior Event Team" color="#ffc857" /> | Quick view of watchlist entries. "View Full Details" opens dashboard. |
