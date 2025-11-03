---
id: ban-votes-for-members
title: Ban Votes for Members (Mods Only)
---

import RoleBadge from "@site/src/components/RoleBadge";
import ChannelBadge from "@site/src/components/ChannelBadge";
import DiscordConversation, { DiscordMessage } from "@site/src/components/DiscordConversation";

# Ban Votes for Members (Moderators Only)

:::warning
All ban votes are held in <ChannelBadge label="📙moderator-only" link="https://discord.com/channels/734595073920204940/943466763314663474"/> and last **24 hours**.
:::

## Initiating a Ban Vote

- Any <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> can initiate a ban vote in accordance with the **Server Guidelines**
- Create a **thread** in <ChannelBadge label="📙moderator-only" link="https://discord.com/channels/734595073920204940/943466763314663474"/> to discuss:
  - The rule(s) broken
  - Why the member deserves a ban

### Example: Ban Vote Thread

Here's an example of how a ban vote thread should be structured:

<DiscordConversation title="Server ban vote - Started by Moderator 1">
  <DiscordMessage
    name="Moderator 1"
    color="#8b5cf6"
    message="Vote here within next 24hrs on server ban of [MemberName]."
    timestamp="11/17/2022 6:35 PM"
    reactions={[
      { emoji: "✅", count: 9, selected: true },
      { emoji: "❌", count: 1 },
    ]}
  />
  <DiscordMessage
    name="Moderator 1"
    color="#8b5cf6"
  >
    [MemberName] has committed following problems within the server and events:
    - Non sexual consent break
    - Over intoxication in several events
    - Talking to self while isolating in events
    - Making people uncomfortable with complaints of work and politics in events and VC
    - Made several complaints toward staff over non-issue with technical bugs that happened at an event
    - Not accepting staff decisions and lying to staff about contacting HR
  </DiscordMessage>
  <DiscordMessage
    name="Moderator 1"
    color="#8b5cf6"
    message="@Moderator"
  />
</DiscordConversation>

## Voting Process

- The thread is open for **24 hours**
- All <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> must:

  - Cast their vote
  - Provide input or reasoning
  - State if they are abstaining and why

- If a <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> is unavailable due to IRL commitments, inform the <RoleBadge role="Head Moderator" color="#e68027" />

## After the Vote

- Once the **24-hour** period is over, the outcome is carried out
- If the ban is approved:
  - Bring the member into a ticket to inform them
  - Proceed with the ban following proper procedures

## Using the Voting Bot

- Use the command `>votereact [message ID]` to create a vote
- **Copy the message ID** by right-clicking the message and selecting **"Copy ID"**

:::note
Ensure Developer Mode is enabled to access the "Copy ID" option.
:::

## Related

- [Ban Types Overview](./ban-types-overview)
- [Server Rule Violations](../server-rule-violations)
- [GitHub Records](../moderator/github-records)
