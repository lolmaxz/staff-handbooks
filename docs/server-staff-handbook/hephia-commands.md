---
id: hephia-commands
title: Hephia V1.2 Info71 and Commands
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
- **`/mute`** - Mute/unmute a member in voice channels
- **`/deafen`** - Deafen/undeafen a member in voice channels
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
    <p><strong>Usage:</strong> <code>/ban [user] [reason?]</code></p>
    <p>Ban a member from the server. Works with both <strong>userID</strong> and <strong>mention</strong> (tagging).</p>
    <p style={{fontSize: '0.9em', color: '#888', marginTop: '0.5em'}}>Reason is optional. Also supports Discord's built-in ban system and logs to <ChannelBadge label="🟩-kicks-bans-logs" link="https://discord.com/channels/734595073920204940/781628317925244978" />.</p>
  </Card>

  <Card title="/unban" status="success" icon="🔓">
    <p><strong>Usage:</strong> <code>/unban [userID] [reason?]</code></p>
    <p>Unban a member from the server. <strong>Only supports userID</strong> (user isn't in server, so can't be mentioned).</p>
    <p style={{fontSize: '0.9em', color: '#888', marginTop: '0.5em'}}>Reason is optional. Supports regular unban from Discord UI and logs to <ChannelBadge label="🟩-kicks-bans-logs" link="https://discord.com/channels/734595073920204940/781628317925244978" />.</p>
  </Card>
</CardGrid>

<CardGrid columns={2}>
  <Card title="/kick" status="warning" icon="👢">
    <p><strong>Usage:</strong> <code>/kick [user] [reason?]</code></p>
    <p>Kick a member from the server. Works with both <strong>userID</strong> and <strong>mention</strong> (tagging).</p>
    <p style={{fontSize: '0.9em', color: '#888', marginTop: '0.5em'}}>Reason is optional. Supports Discord's built-in kick system and logs to <ChannelBadge label="🟩-kicks-bans-logs" link="https://discord.com/channels/734595073920204940/781628317925244978" />.</p>
  </Card>

  <Card title="/timeout" status="info" icon="⏳">
    <p><strong>Usage:</strong> <code>/timeout [user] [duration] [reason]</code></p>
    <p>Temporarily restrict a member from sending messages or speaking in voice channels for a set duration.</p>
    <p>Use for de-escalation or temporary rule enforcement.</p>
  </Card>
</CardGrid>

<CardGrid columns={2}>
  <Card title="/mute" status="info" icon="🔇">
    <p><strong>Usage:</strong> <code>/mute [user] [true|false]</code></p>
    <p><strong>New command!</strong> Mute or unmute a member in voice channels.</p>
    <ul>
      <li><code>true</code> - Mute the member</li>
      <li><code>false</code> - Unmute the member</li>
    </ul>
    <p style={{fontSize: '0.9em', color: '#888', marginTop: '0.5em'}}>If the member is not currently in a voice channel, the action will be scheduled. <a href="#voice-channel-vc-actions">Learn more about scheduled events</a>.</p>
  </Card>

  <Card title="/deafen" status="info" icon="🔇">
    <p><strong>Usage:</strong> <code>/deafen [user] [true|false]</code></p>
    <p><strong>New command!</strong> Deafen or undeafen a member in voice channels.</p>
    <ul>
      <li><code>true</code> - Deafen the member</li>
      <li><code>false</code> - Undeafen the member</li>
    </ul>
    <p style={{fontSize: '0.9em', color: '#888', marginTop: '0.5em'}}>If the member is not currently in a voice channel, the action will be scheduled. <a href="#voice-channel-vc-actions">Learn more about scheduled events</a>.</p>
  </Card>
</CardGrid>

---

## 🎤 Voice Channel (VC) Actions {#voice-channel-vc-actions}

Hephia now supports voice channel moderation through both slash commands and context menu options.

### Slash Commands

The VC moderation commands are listed above in the [Moderation Commands](#-moderation-commands) section:

- **`/mute [user] [true|false]`** - Mute or unmute a member in voice channels
- **`/deafen [user] [true|false]`** - Deafen or undeafen a member in voice channels

### Context Menu Options

You can also use voice channel moderation through Discord's context menu:

1. **Right-click** on a member in a voice channel (or in member list)
2. Select **Apps** (or **Hephia**)
3. Choose from the following options:
   - **Mute** - Server mute the member
   - **Unmute** - Remove server mute from the member
   - **Deafen** - Server deafen the member
   - **Undeafen** - Remove server deafen from the member

:::tip Quick Access
Context menu options are faster for quick VC moderation actions! Just right-click and select the action you need.
:::

:::info Important Notes
**Scheduled Actions:**

- If a member is **not currently in a voice channel** when you use `/mute`, `/deafen`, or the context menu options, the action will be **scheduled** and automatically applied when they join a VC next.
  :::

<details>
<summary style={{fontSize: '0.9em', color: '#888'}}><strong>Mutual Exclusivity</strong></summary>
<p style={{fontSize: '0.9em', color: '#888', marginTop: '0.5em'}}>
- **Mute and Unmute** are mutually exclusive - you cannot mute and unmute a member at the same time.<br/>
- **Deafen and Undeafen** are mutually exclusive - you cannot deafen and undeafen a member at the same time.<br/>
- However, you **can** combine mute with deafen/undeafen (e.g., mute and deafen, or mute and undeafen).
</p>
</details>

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
    <p><strong>Usage:</strong> <code>/addgreeting [message] [confirm: true]</code></p>
    <p><strong>Restriction:</strong> Can be used by <strong>anyone</strong>!</p>
    <p>Add a greeting message to the server. You must set <code>confirm</code> to <code>true</code> if you understand what you are doing.</p>
    <p>Logs who added it, and it has a chance to appear as soon as it's added! 💜</p>
    <p style={{fontSize: '0.9em', color: '#888', marginTop: '0.5em'}}><em>Note: All greeting submissions are logged. Inappropriate greetings can be traced back to the submitter.</em></p>
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

<details>
<summary><strong>🚫 Deprecated Commands</strong></summary>

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

</details>

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
- **Nickname changes** (logged in <ChannelBadge label="⏹️-role-changes" link="https://discord.com/channels/734595073920204940/944749246584872980" />)
- **Username changes** (logged in <ChannelBadge label="⏹️-role-changes" link="https://discord.com/channels/734595073920204940/944749246584872980" />)

All logs now include **who made the change** for better tracking!
:::

:::info Voice Channel (VC) Logging
Hephia now monitors and logs voice channel activity! Most VC logs go to <ChannelBadge label="🔊-vc-logs" link="https://discord.com/channels/734595073920204940/1442671108913631252" /> to keep <ChannelBadge label="🟩-staff-logs" link="https://discord.com/channels/734595073920204940/741167289813958718" /> less cluttered.

**VC Activity Logged:**

- Members joining/leaving voice channels
- Members switching between voice channels
- Members muting/unmuting themselves
- Members deafening/undeafening themselves
- **Moderative actions** (server mute/unmute/deafen/undeafen) - These go to <ChannelBadge label="🟩-staff-logs" link="https://discord.com/channels/734595073920204940/741167289813958718" />
- Force disconnects from VCs (coming soon)

**Pop-up VC Transcripts:**

- Full transcripts are automatically created when pop-up VCs disappear
- Includes all messages, edited versions, and deleted messages
- Transcripts are **persistent** even if Hephia restarts! 💜
- Example: <a href="https://discord.com/channels/734595073920204940/1442671108913631252/1442726474741452800" target="_blank">View Example Transcript</a>
  :::

:::info GIF Limiting System
Hephia automatically monitors GIF messages in configured channels to prevent spam and reduce lag. The system uses two independent monitoring methods:

**Time-Based Monitoring:**

- Tracks GIFs within a specific time window (e.g., 10 GIFs in 2 minutes)
- If the limit is exceeded, the triggering GIF is deleted and a warning is sent

**Message-Based Monitoring:**

- Tracks GIFs within the last X messages (e.g., 10 GIFs in the last 50 messages)
- Maintains a rolling history to prevent GIF spam over time
- If the limit is exceeded, the triggering GIF is deleted and a warning is sent

**How It Works:**

- Both monitoring systems can be active simultaneously
- When either limit is exceeded, the GIF message is automatically deleted
- A warning message is sent to the channel (auto-deleted after 1 minute)
- The system resets after a short cooldown period

**Why It Exists:**
GIF spam can cause performance issues and lag for other members. This system helps maintain a smooth chat experience for everyone by preventing excessive GIF posting in monitored channels.

**Note:** Bot messages are not tracked, and the system only monitors channels <Tooltip tip="This information is undisclosed to prevent users from circumventing the GIF limiting system">where it has been specifically configured</Tooltip>.
:::

<details>
<summary><strong>📋 Complete Logging Capabilities</strong></summary>

Hephia v1.2 logs the following server actions:

**Moderation Actions:**

- Bans and unbans
- Kicks
- Timeouts
- Server mutes/unmutes (VC)
- Server deafens/undeafens (VC)

**User Activity:**

- User joins and leaves
- Username changes
- Nickname changes

**Channel Management:**

- Channel creation, editing, and deletion
- Channel permission changes (logs who made the change)
- Thread creation, updates, deletion, and archival
- Voice channel creation, editing, and deletion

**Role Management:**

- Role creation, editing, and deletion (logs who made the change)
- Role permission changes (logs who made the change)
- Role assignments and removals (also logs who made the change, if done by a staff member)

**Voice Channel Activity:**

- Members joining/leaving voice channels
- Members switching between voice channels
- Members muting/unmuting themselves
- Members deafening/undeafening themselves
- Force disconnects from VCs (coming soon)

**Message Activity:**

- Message edits
- Message deletions (also logs who deleted)

**Pop-up VC Transcripts:**

- Full transcripts automatically created when pop-up VCs disappear
- Includes all messages, edited versions, and deleted messages

**Other:**

- Greeting message submissions (who added them)

All logs include **who made the change** or **who performed the action** for better tracking and accountability.

</details>

:::warning Role Protection
Hephia v1.2 now **refuses to let anyone** (besides Administrators) manually remove the unverified role if the verified role isn't present. If someone attempts to remove it manually, Hephia will revert it back immediately. Verification is only supposed to be done by **giving the verified role**, and Hephia ensures this!

Additionally, Hephia will **prevent both Verified and VRC Verified roles from being present at the same time**. If someone tries to add one when the other is already present, Hephia will automatically roll back the change and inform the Administrators. Members should only have **one form of verification** at a time.
:::

---

## 📚 Related Resources

- [Server Channels](./server-channels) - Learn about staff channels
- [Staff Onboarding](./onboarding) - Getting started guide
- [Hephia V1.2 Update Notes](https://notes.theedenapis.com/s/23400282-07da-4f8f-be84-9c9d18ef8c96/doc/update-notes-49mPiOzp7x) - Full update documentation
