---
id: hephia-bot-v2
title: Hephia V2 Commands
---

import CardGrid, { Card } from "@site/src/components/CardGrid";
import DiscordButton from "@site/src/components/DiscordButton";

# Hephia V2 Commands 🤖

Hephia V2 handles **VRChat linking**, **group tools**, **XP**, and a few staff utilities. Moderation commands like `/ban`, `/kick`, and `/timeout` are on [Hephia V1.2](/docs/general-handbook/hephia-bot/hephia-bot-v1-2) — not here.

:::info Who this page is for
**All staff** can use the staff tools below (role requirements noted per command). **Member-facing** commands are included so you can help members use them correctly.
:::

## 📋 Quick Reference

### Staff tools

- **`/say`** — Make Hephia post a message in a text channel
- **Check Linking Status** — Right-click a user → Apps → check VRChat / Discord / world link status
- **`/vrchat join-requests`** — Browse pending VRChat group join requests
- **`/vrchat group-stats`** — View Eden VRChat group stats

### Member-facing tools (staff often help with these)

- **`/linkvrc`** — Link a VRChat account to Discord
- **`/setjingle`** — Set a custom world join jingle (Patreon / staff)
- **`/invitemepatreongroup`** — Self-invite to the Patreon VRChat group (Tier 2 / 3)
- **`/xp`** · **`/leaderboard`** · **`/xp-silent`** — XP and rank-up notification settings

---

## 🛠️ Staff Commands

### `/say` {#say}

<Card title="/say" status="info" icon="💬">
  <p><strong>Usage:</strong> <code>/say [message] [channel?]</code></p>
  <p><strong>Who can use it:</strong> Eden staff (Moderators, Cutie Helpers, Hosts, Security, High Staff, Admins, and related staff roles).</p>
  <p>Makes Hephia send a <strong>plain text</strong> message in a channel. You get a private confirmation (<code>Sent.</code>); the message itself is public.</p>
  <ul>
    <li><code>message</code> (required) — The text Hephia should post</li>
    <li><code>channel</code> (optional) — Target <strong>text channel</strong>. If omitted, Hephia posts in the channel where you ran the command</li>
  </ul>
</Card>

:::tip
Use `/say` when you want the message to come from the bot instead of your own account. It does not support embeds — plain text only.
:::

---

### Check Linking Status (context menu)

<Card title="Check Linking Status" status="success" icon="🔗">
  <p><strong>How to use:</strong> Right-click a member → <strong>Apps</strong> → <strong>Check Linking Status</strong></p>
  <p><strong>Who can use it:</strong> Eden staff (same staff role set as <code>/say</code>).</p>
  <p>Shows a private embed with everything Hephia knows about that person's Discord ↔ VRChat link, including:</p>
  <ul>
    <li>Linked / not linked, and link date</li>
    <li>Discord verified / Patreon / staff status (if they are still in the server)</li>
    <li>VRChat group membership and Verified / Patreon / Staff group roles</li>
    <li>World whitelist access level, world verified/Patreon flags, and custom jingle ID</li>
    <li>VRChat user ID and last known trust rank</li>
  </ul>
  <p style={{fontSize: '0.9em', color: '#888', marginTop: '0.5em'}}>Works even if the person has left the server (with fewer Discord fields). Reply is always private to you.</p>
</Card>

---

### `/vrchat` group tools

These subcommands need Discord **Manage Roles**. They only work in Eden (or the test server).

#### `/vrchat join-requests`

<Card title="/vrchat join-requests" status="info" icon="📥">
  <p><strong>Usage:</strong> <code>/vrchat join-requests</code></p>
  <p><strong>Who can open it:</strong> Anyone with <strong>Manage Roles</strong>.</p>
  <p>Opens a private, paginated list of pending VRChat group join requests. Each page shows:</p>
  <ul>
    <li>VRChat display name and user ID</li>
    <li>Linked Discord account (or “not linked”)</li>
    <li>When they requested to join</li>
  </ul>
  <p>Action buttons on each request:</p>
  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "0.75rem 0" }}>
    <DiscordButton type="success">Accept</DiscordButton>
    <DiscordButton type="secondary">Deny</DiscordButton>
    <DiscordButton type="error">Block</DiscordButton>
  </div>
  <p><strong>Accept / Deny / Block require Administrator</strong> — Manage Roles alone can browse the queue, but cannot act on requests.</p>
</Card>

#### `/vrchat group-stats`

<Card title="/vrchat group-stats" status="info" icon="📊">
  <p><strong>Usage:</strong> <code>/vrchat group-stats</code></p>
  <p><strong>Who can use it:</strong> Anyone with <strong>Manage Roles</strong>.</p>
  <p>Shows a private snapshot of the Eden VRChat group:</p>
  <ul>
    <li>Member count and online count</li>
    <li>Role count</li>
    <li>Pending join requests</li>
    <li>Join state and privacy</li>
    <li>Whether Discord join logging and auto-accept are configured / enabled</li>
  </ul>
</Card>

---

## 👥 Member-Facing Commands

Staff often walk members through these. Anyone in the server can run them (with the extra restrictions noted below).

### VRChat linking & perks

<CardGrid columns={2}>
  <Card title="/linkvrc" status="success" icon="🔗">
    <p><strong>Usage:</strong> <code>/linkvrc [input]</code></p>
    <p>Links a VRChat account to the member's Discord account.</p>
    <ul>
      <li><code>input</code> (required) — VRChat <strong>username</strong>, <strong>user ID</strong>, or <strong>profile URL</strong></li>
    </ul>
    <p>Reply is private. Guild-only (cannot be used in DMs).</p>
    <p style={{fontSize: '0.9em', color: '#888', marginTop: '0.5em'}}>If the VRChat linker is rate-limited, the command temporarily refuses new links — ask them to try again later.</p>
  </Card>

  <Card title="/setjingle" status="info" icon="🎵">
    <p><strong>Usage:</strong> <code>/setjingle [id]</code></p>
    <p>Sets the custom join jingle used when entering Eden worlds.</p>
    <ul>
      <li><code>id</code> (required) — Number from <strong>0</strong> to <strong>8</strong>. <code>0</code> = no jingle</li>
    </ul>
    <p><strong>Restriction:</strong> Patreon supporters or staff only, and the account must already be VRChat-linked.</p>
    <p style={{fontSize: '0.9em', color: '#888', marginTop: '0.5em'}}>10-second cooldown between uses.</p>
  </Card>
</CardGrid>

<Card title="/invitemepatreongroup" status="info" icon="💜">
  <p><strong>Usage:</strong> <code>/invitemepatreongroup</code> (no options)</p>
  <p>Sends the member a VRChat invite to the <strong>Patreon-exclusive</strong> group.</p>
  <p><strong>Requirements:</strong></p>
  <ul>
    <li>Patreon Tier <strong>2</strong> or <strong>3</strong> on Eden</li>
    <li>VRChat account already linked via <code>/linkvrc</code></li>
    <li>Not already in the Patreon group</li>
  </ul>
  <p>Reply is private. If they are not linked, Hephia tells them to run <code>/linkvrc</code> first.</p>
</Card>

---

### XP commands

These show the member's own XP progress. Replies are private. Short cooldown (~10 seconds) on `/xp` and `/leaderboard`.

<CardGrid columns={2}>
  <Card title="/xp" status="info" icon="⭐">
    <p><strong>Usage:</strong> <code>/xp</code></p>
    <p>Shows the member's XP, rank, and level in this server.</p>
  </Card>
  <Card title="/leaderboard" status="info" icon="🏆">
    <p><strong>Usage:</strong> <code>/leaderboard</code></p>
    <p>Shows the XP leaderboard plus the member's own XP and rank.</p>
  </Card>
</CardGrid>

<Card title="/xp-silent" status="info" icon="🔕">
  <p><strong>Usage:</strong> <code>/xp-silent</code></p>
  <p>Toggles whether the member receives <strong>rank-up notifications</strong> from the XP system. Running it again flips the setting back.</p>
</Card>

:::note Hephia V1.2 also has XP commands
V1.2 exposes older `/exp-v1` / `/leaderboard-v1` (and beta picture-card variants). The live XP system members use day to day is on **Hephia V2** (`/xp`, `/leaderboard`, `/xp-silent`). See [Hephia V1.2](/docs/general-handbook/hephia-bot/hephia-bot-v1-2#experience--leaderboard) for the V1.2 variants.
:::

---

## 📚 Related

- [Hephia Bot overview](/docs/general-handbook/hephia-bot)
- [Hephia V1.2 Commands](/docs/general-handbook/hephia-bot/hephia-bot-v1-2) — moderation, timeouts, `/info`, and server utilities
- [Hephia Event System](/docs/event-staff-handbook/hephia-event-system) — event signups, voting, and feedback
- [VRChat Linking Troubleshooting](/docs/server-staff-handbook/verification-process/vrchat-linking-troubleshooting)
