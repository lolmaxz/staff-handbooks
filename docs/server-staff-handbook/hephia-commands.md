---
id: hephia-commands
title: Hephia V1.2 Slash Commands
---

import RoleBadge from "@site/src/components/RoleBadge";
import ChannelBadge from "@site/src/components/ChannelBadge";
import CardGrid, { Card } from "@site/src/components/CardGrid";
import Tooltip from "@site/src/components/Tooltip";

# Hephia V1.2 Slash Commands 🤖

:::warning ⚠️ Important: Command Changes
**Hephia V1.2 uses slash commands!** The old `>old` command system is **no longer available**. All commands must now be used as slash commands (e.g., `/info` instead of `>old`).
:::

## 📋 Quick Reference

### Most Used Commands

- **`/info`** - Get detailed member information (replaces `>old`)
- **`/ban`** - Ban a member (supports userID and mention)
- **`/unban`** - Unban a member (supports userID only)
- **`/kick`** - Kick a member (supports userID and mention)
- **`/votereact`** - Create reaction votes with presets
- **`/help`** - Get help with Hephia commands

---

## 🔍 Member Information

<Card title="/info" status="info" icon="🔍">
  <p><strong>Replaces:</strong> <code>`>old`</code></p>
  <p><strong>Usage:</strong> <code>/info [user]</code></p>
  <p><strong>Description:</strong> Get detailed information about a member, including:</p>
  <ul>
    <li>Join and leave times</li>
    <li>Verification date</li>
    <li>All roles (listed in the same order as in the server)</li>
    <li>Works even for members who left the server</li>
    <li>Best-effort verification status checking</li>
  </ul>
</Card>

---

## 🛡️ Moderation Commands

<CardGrid columns={2}>
  <Card title="/ban" status="error" icon="🔨">
    <p><strong>Usage:</strong> <code>/ban [user] [reason]</code></p>
    <p>Ban a member from the server. Works with both <strong>userID</strong> and <strong>mention</strong> (tagging).</p>
    <p>Also supports Discord's built-in ban system and logs to <ChannelBadge label="🟩-kicks-bans-logs" link="https://discord.com/channels/734595073920204940/781628317925244978" />.</p>
  </Card>

  <Card title="/unban" status="success" icon="🔓">
    <p><strong>Usage:</strong> <code>/unban [userID]</code></p>
    <p>Unban a member from the server. <strong>Only supports userID</strong> (user isn't in server, so can't be mentioned).</p>
    <p>Supports regular unban from Discord UI and logs to <ChannelBadge label="🟩-kicks-bans-logs" link="https://discord.com/channels/734595073920204940/781628317925244978" />.</p>
  </Card>
</CardGrid>

<CardGrid columns={2}>
  <Card title="/kick" status="warning" icon="👢">
    <p><strong>Usage:</strong> <code>/kick [user] [reason]</code></p>
    <p>Kick a member from the server. Works with both <strong>userID</strong> and <strong>mention</strong> (tagging).</p>
    <p>Supports Discord's built-in kick system and logs to <ChannelBadge label="🟩-kicks-bans-logs" link="https://discord.com/channels/734595073920204940/781628317925244978" />.</p>
  </Card>

  <Card title="/timeout" status="info" icon="⏳">
    <p><strong>Usage:</strong> <code>/timeout [user] [duration] [reason]</code></p>
    <p>Temporarily restrict a member from sending messages or speaking in voice channels for a set duration.</p>
    <p>Use for de-escalation or temporary rule enforcement.</p>
  </Card>
</CardGrid>

---

## ⚙️ Utility Commands

<CardGrid columns={2}>
  <Card title="/repair" status="info" icon="🔧">
    <p><strong>Previous name:</strong> <code>`>repairto`</code></p>
    <p><strong>Usage:</strong> <code>/repair [user]</code></p>
    <p><strong>Restriction:</strong> Only usable by staff who can currently change roles.</p>
    <p>Useful to fix the role of someone who may have rejoined while Hephia v1.2 was down!</p>
  </Card>

  <Card title="/addgreeting" status="success" icon="👋">
    <p><strong>Usage:</strong> <code>/addgreeting [message]</code></p>
    <p><strong>Restriction:</strong> Can be used by <strong>anyone</strong>!</p>
    <p>Add a greeting message to the server. Logs who added it, and it has a chance to appear as soon as it's added! 💜</p>
  </Card>
</CardGrid>
<CardGrid columns={2}>
  <Card title="/howmanyroles" status="info" icon="📊">
    <p><strong>Usage:</strong> <code>/howmanyroles</code></p>
    <p>Display statistics about roles on the server.</p>
  </Card>

  <Card title="/howmanychannels" status="info" icon="📈">
    <p><strong>Usage:</strong> <code>/howmanychannels</code></p>
    <p><strong>New command!</strong> Get statistics about the server's channel count and more.</p>
  </Card>
</CardGrid>

---

## 📊 Experience & Leaderboard

<CardGrid columns={2}>
  <Card title="/exp-v1" status="info" icon="⭐">
    <p><strong>Usage:</strong> <code>/exp-v1</code></p>
    <p>Check experience points (V1 version).</p>
  </Card>

  <Card title="/leaderboard-v1" status="info" icon="🏆">
    <p><strong>Usage:</strong> <code>/leaderboard-v1</code></p>
    <p>View the experience leaderboard (V1 version).</p>
  </Card>
</CardGrid>

<CardGrid columns={2}>
  <Card title="/exp-v1-2" status="info" icon="⭐">
    <p><strong>Usage:</strong> <code>/exp-v1-2</code></p>
    <p><strong>Beta version!</strong> Check experience with a picture card.</p>
  </Card>

  <Card title="/leaderboard-v1-2" status="info" icon="🏆">
    <p><strong>Usage:</strong> <code>/leaderboard-v1-2</code></p>
    <p><strong>Beta version!</strong> View the leaderboard with a picture card. 😝</p>
  </Card>
</CardGrid>

---

## 🗳️ Voting & Reactions

<Card title="/votereact" status="success" icon="🗳️">
  <p><strong>Usage:</strong> <code>/votereact [type] [message]</code></p>
  <p><strong>New feature!</strong> Create reaction votes with multiple presets. Supports:</p>
  <ul>
    <li>✅ Check box only</li>
    <li>1️⃣ 2️⃣ 1 and 2</li>
    <li>1️⃣ 2️⃣ 3️⃣ 1, 2 and 3</li>
    <li>1️⃣ 2️⃣ 3️⃣ 4️⃣ 1, 2, 3 and 4</li>
    <li>1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 1, 2, 3, 4 and 5</li>
    <li>✅ ❌ Yes & No</li>
    <li>🌍 Timezones (votes with 3 flags for each timezone for events): </li>
  </ul>
</Card>

---

## 👑 Server Owner & Committee Commands

<CardGrid columns={2}>
  <Card title="/unverifiedauto" status="warning" icon="🔄">
    <p><strong>Usage:</strong> <code>/unverifiedauto</code></p>
    <p><strong>Restriction:</strong> Server owner only.</p>
    <p>Auto-add unverified role to members on join.</p>
  </Card>

  <Card title="/updatelineroles" status="warning" icon="🔧">
    <p><strong>Usage:</strong> <code>/updatelineroles</code></p>
    <p><strong>Restriction:</strong> Server owner only.</p>
    <p>Update line roles separation.</p>
  </Card>
<!-- 
  <Card title="/postapplications" status="warning" icon="📝">
    <p><strong>Usage:</strong> <code>/postapplications</code></p>
    <p><strong>Restriction:</strong> Server owner only.</p>
    <p><strong>New command!</strong> Post the applications buttons. Hephia v1.2 now handles the application system instead of Form Bot - faster, more reliable, and applications are safer!</p>
  </Card>

  <Card title="/postpremiumavatarcreator" status="warning" icon="✨">
    <p><strong>Usage:</strong> <code>/postpremiumavatarcreator</code></p>
    <p><strong>Restriction:</strong> Server owner only.</p>
    <p><strong>New command!</strong> Post the premium avatar creator buttons.</p>
  </Card> -->

</CardGrid>
  <Card title="/transfer" status="danger" icon="🔄">
    <p><strong>Usage:</strong> <code>/transfer [from] [to]</code></p>
    <p><strong>Restriction:</strong> <RoleBadge role="Committee Member" color="#db1cb8" /> only.</p>
    <p>Transfer instantly everything from one account to another, including:</p>
    <ul>
      <li>Roles</li>
      <li>Experience (exp)</li>
      <li>Join count</li>
      <li>Leave count</li>
      <li>And much more!</li>
    </ul>
    <p><strong>Note:</strong> Since it's not Hephia V2, it doesn't support transfer of VRChat account unfortunately.</p>
  </Card>

---

## ❓ Help Command

<Card title="/help" status="info" icon="❓">
  <p><strong>Usage:</strong> <code>/help</code></p>
  <p>Get help with Hephia commands and see available options.</p>
</Card>

---

## 🚫 Deprecated Commands

:::danger ⚠️ These Commands No Longer Exist
The following commands have been **removed** and should **NOT** be used:

- **`>old`** → Now replaced with `/info`
- **`>say`**, **`>sayh`**, **`>sayto`** → All Hephia talking commands exist in V2 now
- **`>prefix`** → No longer needed
- **`>bl`** → Blacklist system replaced with Discord AutoMod
- **`>wl`** → Whitelist system (was never used)
- **`>configrefresh`** → No longer needed
- **`>kinkrefresh`** → Not used for a while
- **`>updateuserstat`**, **`>updatelovensestat`**, **`>updateverifiedstat`**, **`>updatestats`** → Force updating stats channels (not needed atm)
- **`>warningscan`**, **`>legitauto`**, **`>mcwl`**, **`>mcrefresh`** → Old deprecated commands and Minecraft stuff that got replaced
  :::

---

## 💡 Tips & Notes

:::tip Testing Commands
Use the <ChannelBadge label="🟩-test" link="https://discord.com/channels/734595073920204940/737209181945462834" /> channel to test new bot commands and ensure you understand them correctly. It's also perfect for using `/info` to get information about members!
:::

:::info Enhanced Logging
Hephia v1.2 has enhanced logging in <ChannelBadge label="🟩-staff-logs" link="https://discord.com/channels/734595073920204940/741167289813958718" /> with more details, including the list below. <br/>
Role changes specifically are logged in <ChannelBadge label="⏹️-role-changes" link="https://discord.com/channels/734595073920204940/1424116477727866920" />.

- Bans, kicks, unbans
- Channel edits/creation/deletion
- Role edits/creation/deletion
- User joins and leaves
- Threads creation/update/deletion/archival
- VC creation/editing/deletion

All logs now include **who made the change** for better tracking!
:::

:::warning Unverified Role Protection
Hephia v1.2 now **refuses to let anyone** (besides Administrators) manually remove the unverified role if the verified role isn't present. If someone attempts to remove it manually, Hephia will revert it back immediately. Verification is only supposed to be done by **giving the verified role**, and Hephia ensures this!
:::

---

## 📚 Related Resources

- [Server Channels](./server-channels) - Learn about staff channels
- [Staff Onboarding](./onboarding) - Getting started guide
- [Hephia V1.2 Update Notes](https://notes.theedenapis.com/s/23400282-07da-4f8f-be84-9c9d18ef8c96/doc/update-notes-49mPiOzp7x) - Full update documentation
