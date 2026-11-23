---
id: orion-board-commands
title: Slash Commands Reference
---

import CommandCard from "@site/src/components/CommandCard";
import ContextMenuChain, { ContextMenuItem } from "@site/src/components/ContextMenuItem";
import DiscordMessage, { DiscordActionRow, DiscordEmbed, DiscordRowButton } from "@site/src/components/DiscordMessage";
import RoleBadge from "@site/src/components/RoleBadge";
import SlashCommand from "@site/src/components/SlashCommand";
import Tooltip from "@site/src/components/Tooltip";

# Slash Commands Reference

Quick reference for all ticket and moderation slash commands used with Orion Board.

---

## Verification

`/verify` has no options. Run it in the verification ticket.

<SlashCommand
  command="verify"
  description="Verify a member's ID verification ticket"
  bot="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  plus
/>

<CommandCard cmd="/verify" perms="Cutie Helper, Moderator" cardColor="green">
  Complete verification. Run in verification ticket thread. <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" />: initial only. <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />: initial or final (different person for final). Uses the member's current roles.
</CommandCard>

<CommandCard cmd="/unverify" perms="Staff" cardColor="orange">
  Send an ID verification back to the first check. Also removes the member's <RoleBadge role="Eden Verified" color="#00ff00" />. Run in the verification ticket. reason optional. Writes a transcript card naming who did it and which status the ticket moved to.
</CommandCard>

---

## Warnings

The other warning commands use this same list. `/warn-event` adds an optional `punishment` choice.

<SlashCommand
  interactive
  command="warn"
  description="Issue a formal warning to a member"
  bot="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  options={[
    { name: "reason", description: "Reason for warning", required: true },
    { name: "user", description: "The user to warn", type: "user" },
    { name: "user_id", description: "Discord user ID if the user is not in the server" },
    { name: "ticket", description: "Link to currently open ticket (ticket ID)" },
    { name: "notes", description: "Extra staff notes (optional)" },
    { name: "evidence", description: "Attach evidence/screenshot", type: "attachment" },
    { name: "server_mail", description: "Deliver this warning as server mail", type: "boolean" },
  ]}
/>

Leaving `ticket` empty gets this reply. Only you can see it. **Open Ticket** creates a ticket, pulls the member in, pre-fills the reason, and links it. That button is left off when the member is not in the server. Inside a ticket thread, Orion also adds **Link Current Ticket**. The mail buttons show when `server_mail` is left off.

<DiscordMessage
  username="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  timestamp="Today at 4:12 PM"
  app
>
  <DiscordEmbed
    accent={false}
    description={`## ⚠️ Warning Issued\n\n**User:** <@Member> Member (123456789012345678)\n**Reason:** Repeated rule breaks in voice\n**Recorded:** Formal warning · Expires: <t:${Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60}:F>\n\n⚠️ **No ticket linked.** Click the button below to open a ticket and link this warning.\n\n_Opening a ticket will add the warned user to the ticket._`}
  />
  <DiscordActionRow>
    <DiscordRowButton type="primary" emoji="🎫">Open Ticket</DiscordRowButton>
  </DiscordActionRow>
  <DiscordActionRow>
    <DiscordRowButton type="success">Send in server mail</DiscordRowButton>
    <DiscordRowButton type="secondary">Send server mail with custom message</DiscordRowButton>
  </DiscordActionRow>
</DiscordMessage>

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

Full details: [Moderation and Warnings](/docs/general-handbook/orion-board/orion-board-moderation-and-warnings#opening-a-ticket-from-a-warning). How `server_mail` delivers the warning: [Server Mail](/docs/general-handbook/orion-board/orion-board-server-mail#warning-server-mail). You cannot warn yourself — only the bot owner can.

---

## Bans

<SlashCommand
  interactive
  command="event-ban"
  description="Ban a member from events with specified duration"
  bot="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  options={[
    { name: "user", description: "The user to ban from events", required: true, type: "user" },
    { name: "reason", description: "Reason for the ban", required: true },
    {
      name: "duration",
      description: "Ban duration",
      required: true,
      choices: ["24 hours", "2 days", "3 days", "5 days", "1 week", "2 weeks", "3 weeks", "1 month", "3 months", "6 months", "1 year", "Indefinite"],
    },
    { name: "ticket", description: "Link to currently open ticket (ticket ID)" },
    { name: "evidence", description: "Attach evidence/screenshot", type: "attachment" },
  ]}
/>

Leaving `ticket` empty gets this reply. Only you can see it. **Open Ticket** works the same way as on a warning. Inside a ticket thread, Orion also adds **Link Current Ticket**.

<DiscordMessage
  username="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  timestamp="Today at 4:18 PM"
  app
>
  <DiscordEmbed
    color="#57f287"
    description={`✅ Successfully banned <@Member> from events.\n\n**User:** <@Member> Member (123456789012345678)\n**Reason:** Repeated event rule breaks\n**Duration:** 1 week\n**Expires:** ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US")}\n\n⚠️ **No ticket linked.** Click the button below to open a ticket and link this ban.\n\n_Opening a ticket will add the banned user to the ticket._`}
  />
  <DiscordActionRow>
    <DiscordRowButton type="primary" emoji="🎫">Open Ticket</DiscordRowButton>
  </DiscordActionRow>
</DiscordMessage>

<CommandCard cmd="/event-ban" perms="Senior Event Team" cardColor="purple">
  Event ban. <RoleBadge role="Senior Event Team" color="#ffc857" /> only. user, reason, duration (required), ticket, evidence. Duration: 24h, 2d, 3d, 5d, 1w, 2w, 3w, 1m, 3m, 6m, 1y, indefinite.
</CommandCard>

---

## Watchlist

`/watchlist-event` uses the same fields, without `use_last_hour`.

<SlashCommand
  interactive
  command="watchlist"
  description="Add a member to the server watchlist or update existing entry"
  bot="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  options={[
    { name: "user", description: "The user to add to watchlist", required: true, type: "user" },
    { name: "reason", description: "Reason for adding to watchlist", required: true },
    { name: "use_last_hour", description: "Retrieve 100 messages from the last hour in the current channel", type: "boolean" },
    { name: "message_link", description: "Discord message link to grab context around (25 messages before/after)" },
    { name: "evidence", description: "Attach evidence (image/file) for the watchlist entry", type: "attachment" },
  ]}
/>

Only you can see this reply. **Context** is how many messages from the last hour were saved. A `message_link` adds a **View Context** button instead of using the current channel.

<DiscordMessage
  username="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  timestamp="Today at 4:24 PM"
  app
>
  <DiscordEmbed
    accent={false}
    description={"✅ Successfully added <@Member> [Member] to the watchlist.\n\n**Reason:** Repeated concerning messages\n**Context:** 18 messages captured"}
  />
</DiscordMessage>

<CommandCard cmd="/watchlist" perms="Moderator" cardColor="orange">
  Server watchlist. <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> only. user, reason, use_last_hour OR message_link, evidence. Denied when use_last_hour or message_link is used from a verification ticket, staff channel, or thread under a staff channel.
</CommandCard>

<CommandCard cmd="/watchlist-event" perms="Senior Event Team" cardColor="purple">
  Event watchlist. <RoleBadge role="Senior Event Team" color="#ffc857" /> only. user, reason, evidence, message_link. Denied when message_link is used from a verification ticket, staff channel, or thread under a staff channel.
</CommandCard>

---

## Host Discretion

<SlashCommand
  command="host-discretion"
  description="Create or update a host discretion entry"
  bot="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  options={[
    { name: "host", description: "The host who wants to ban the user" },
    { name: "banned_user", description: "The user to be banned from host's events" },
    { name: "reason", description: "Reason for discretion (must be substantial)" },
    { name: "evidence", description: "Attach evidence/screenshot (optional)" },
  ]}
/>

<CommandCard cmd="/host-discretion" perms="Event Committee" cardColor="purple">
  Create/update host discretion. <RoleBadge role="Event Committee" badgeIcon="event_committee_role_icon.png" color="#f75edb" /> only. host, banned_user, reason, evidence. Manage entries in Orion Board (Mod Logs → Event → Host Discretion).
</CommandCard>

---

## Ticket Management

Most of these are one field in the ticket thread. `/server-access` is the one with a choice list. `/server-mail` has no slash options — the member and message are in the next step. See [Server Mail](/docs/general-handbook/orion-board/orion-board-server-mail).

<SlashCommand
  command="close"
  description="Close the ticket"
  bot="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  options={[{ name: "reason", description: "Reason for closing the ticket (optional)" }]}
/>

<SlashCommand
  interactive
  command="server-access"
  description="Restrict or restore server access without the Unverified role"
  bot="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  options={[
    { name: "action", description: "Restrict access, or grant it back", required: true, choices: ["Restrict", "Granted"] },
    { name: "user", description: "The member", required: true, type: "user" },
    { name: "reason", description: "Why (optional)" },
  ]}
/>

Only you can see this reply. **Granted** says the role was removed and server access is back.

<DiscordMessage
  username="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  timestamp="Today at 4:30 PM"
  app
>
  <DiscordEmbed
    accent={false}
    description={"✅ Restricted Access added to Member. Their name stays normal. This is not verification."}
  />
</DiscordMessage>

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

Right-click the member, then:

<ContextMenuChain>
  <ContextMenuItem label="Apps" />
  <ContextMenuItem label="Orion Board" image={require("@site/static/img/orion-board-profile.png").default} />
  <ContextMenuItem label="Member Details" />
</ContextMenuChain>

**Watchlist Data** is the same path on a member. **Mail Details** is the same path on a message in the server mail channel.

| Action | Who | Purpose |
|--------|-----|---------|
| **Apps → Member Details** | <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />, <RoleBadge role="Senior Event Team" color="#ffc857" /> | Quick view: tickets, watchlist, moderation. "View Full Details" opens dashboard. On the recent warnings, mail that was sent adds **Not acknowledged**, or **Acknowledged** and the time. |
| **Apps → Watchlist Data** | <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />, <RoleBadge role="Senior Event Team" color="#ffc857" /> | Quick view of watchlist entries. "View Full Details" opens dashboard. |
| **Mail Details** (message) | Command permissions | On a post in the server mail channel: sender, recipient, title, message, files, and a warning summary with a ticket link when one exists. |
