---
id: mod-on-call
title: Mod on Call
---

import ChannelBadge from "@site/src/components/ChannelBadge";
import RoleBadge from "@site/src/components/RoleBadge";
import Tooltip from "@site/src/components/Tooltip";

# Mod on Call (Moderators Only)

The **Mod on Call** is responsible for closing out tickets and updating the GitHub records for the week.

## Selection Process

- **Every Friday**, a member of the <RoleBadge role="Server Committee" badgeIcon="server_committee_role_icon.webp" color="#db1cb8" /> or the <RoleBadge role="Head Moderator 🔰" badgeIcon="" color="#db1cb8" /> opens a thread in <ChannelBadge label="📗helper-chat" link="https://discord.com/channels/734595073920204940/1234567890123456789"/>.
- <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> roll a die using `/roll sides20` with YAGPDB bot.
- In true D&D fashion, the Mod with the **lowest roll** becomes the Mod on Call until the next Friday!

  - In case of a tie, previous week's Mod on Call wins the tie.
  - Other Mods who tie will roll again.

  - **Advantage for GitHub logger**: If a moderator handled the **GitHub Records** logging duties during the previous week, they may roll **with advantage** (roll twice, keep the highest roll). This rewards recent workload while keeping the system fair.

  - **Volunteer option**: Any <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> may volunteer to take Mod on Call for the week. If a volunteer steps up before or during the roll, they can be assigned the duty (especially helpful when the dice hasn’t favored someone for multiple weeks).

- If the <RoleBadge role="Head Moderator 🔰" badgeIcon="" color="#db1cb8" /> or <RoleBadge role="Server Committee" badgeIcon="server_committee_role_icon.webp" color="#db1cb8" /> member doesn't start the roll thread by **midnight EST**, they will take over the duties by default.

::::note Card Naming Format (GitHub)
When creating a new member record in the GitHub Warning Book, the card/issue title must be formatted as:

<strong>DiscordTag [DiscordID]</strong>

Example: <code>FictionalUser [123456789012345678]</code>

Include the profile screenshot in the body of the card. See the GitHub Records page for the full logging template.
::::
