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
  Complete verification. Run in verification ticket thread. <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" />: initial only. <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />: initial or final (different person for final). Uses the member's current roles.
</CommandCard>

<CommandCard cmd="/unverify" perms="Staff" cardColor="orange">
  Send an ID verification back to the first check. Run in the verification ticket. reason optional. Writes a transcript card naming who did it and which status the ticket moved to.
</CommandCard>

---

## Warnings

<CommandCard cmd="/warn" perms="Moderator" cardColor="orange">
  Formal server warning. <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> only. user (optional), <Tooltip tip="Optional — use when the member is no longer in the server" width="18rem">user_id</Tooltip>, reason, ticket (autocomplete), notes, evidence, <Tooltip tip="Optional. Off by default. Delivers the warning as server mail." width="16rem">server_mail</Tooltip>.
</CommandCard>

<CommandCard cmd="/warn-informal" perms="Moderator" cardColor="orange">
  Informal server warning. <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> only. user (optional), <Tooltip tip="Optional — use when the member is no longer in the server" width="18rem">user_id</Tooltip>, reason, ticket, evidence, <Tooltip tip="Optional. Off by default. Delivers the warning as server mail." width="16rem">server_mail</Tooltip>.
</CommandCard>

<CommandCard cmd="/warn-event" perms="Senior Event Team" cardColor="purple">
  Event warning. <RoleBadge role="Senior Event Team" color="#ffc857" /> only. user (optional), <Tooltip tip="Optional — use when the member is no longer in the server" width="18rem">user_id</Tooltip>, reason, ticket, notes, evidence, punishment (optional—24h, 2d, 3d, 5d, 1w, 2w, 3w, 1m, 3m, 6m, 1y, indefinite), <Tooltip tip="Optional. Off by default. Delivers the warning as server mail." width="16rem">server_mail</Tooltip>. Optional punishment creates event ban.
</CommandCard>

<CommandCard cmd="/warn-informal-event" perms="Senior Event Team" cardColor="purple">
  Informal event warning. <RoleBadge role="Senior Event Team" color="#ffc857" /> only. user (optional), <Tooltip tip="Optional — use when the member is no longer in the server" width="18rem">user_id</Tooltip>, reason, ticket, evidence, <Tooltip tip="Optional. Off by default. Delivers the warning as server mail." width="16rem">server_mail</Tooltip>.
</CommandCard>

:::info No ticket linked?
If you warn without linking a ticket, the confirmation message shows <DiscordButton type="primary" emoji="🎫">Open Ticket</DiscordButton> — creates a ticket, pulls the member, pre-fills the warning reason, and links it automatically. Not shown if the member is not in the server. When <code>server_mail</code> is left off, that same reply also shows <DiscordButton type="success">Send in server mail</DiscordButton> and <DiscordButton type="secondary">Send server mail with custom message</DiscordButton>. Full details: [Moderation and Warnings](/docs/general-handbook/orion-board/orion-board-moderation-and-warnings#opening-a-ticket-from-a-warning). How <code>server_mail</code> delivers the warning: [Server Mail](/docs/general-handbook/orion-board/orion-board-server-mail#warning-server-mail). You cannot warn yourself — [only the bot owner can](/docs/general-handbook/orion-board/orion-board-moderation-and-warnings#you-cannot-warn-yourself).
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
  Rename ticket. name (required). Has cooldown; if it fails, rename the thread manually. Status emoji changes on the Discord thread name are not a logged rename — see [Ticket status emojis](/docs/general-handbook/orion-board/orion-board-dashboard-overview#ticket-status-emojis).
</CommandCard>

<CommandCard cmd="/reminder" perms="Staff" cardColor="blue">
  Ping someone already in the ticket. <Tooltip tip="Optional. Must already be in the thread. If omitted, pings the opener — except warning tickets, which ping the warned member." width="20rem">user</Tooltip> optional, message optional. Cooldown: 24h apart, and at least 12h after the ticket opened. A Discord Administrator bypasses both limits.
</CommandCard>

<CommandCard cmd="/server-access" perms="Staff" cardColor="red">
  Restrict or grant server access with <RoleBadge role="Restricted Access" color="#e87878" /> (not Unverified). action (Restrict or Granted), user, reason optional. Details: [Restricted Access](/docs/general-handbook/orion-board/orion-board-moderation-and-warnings#restricted-access).
</CommandCard>

<CommandCard cmd="/server-mail" perms="Staff" cardColor="purple">
  Staff only, until further notice. Custom mail, not a warning. No slash options. The next modal asks for the member, title, message, up to 10 attachments, and whether to show your username. Unchecked stays anonymous. No Acknowledge button and no ticket button. Details: [Server Mail](/docs/general-handbook/orion-board/orion-board-server-mail).
</CommandCard>

---

## Context Menus (Right-Click User)

| Action | Who | Purpose |
|--------|-----|---------|
| **Apps → Member Details** | <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />, <RoleBadge role="Senior Event Team" color="#ffc857" /> | Quick view: tickets, watchlist, moderation. "View Full Details" opens dashboard. On the recent warnings, mail that was sent adds **Not acknowledged**, or **Acknowledged** and the time. |
| **Apps → Watchlist Data** | <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />, <RoleBadge role="Senior Event Team" color="#ffc857" /> | Quick view of watchlist entries. "View Full Details" opens dashboard. |
| **Mail Details** (message) | Command permissions | On a post in the server mail channel: sender, recipient, title, message, files, and a warning summary with a ticket link when one exists. |
