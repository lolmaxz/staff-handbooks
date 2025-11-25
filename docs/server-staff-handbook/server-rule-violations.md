---
id: server-rule-violations
title: Server Rule Violations
---

import ChannelBadge from "@site/src/components/ChannelBadge";
import RoleBadge from "@site/src/components/RoleBadge";
import DiscordConversation, { DiscordMessage } from "@site/src/components/DiscordConversation";
import CardGrid, { Card } from "@site/src/components/CardGrid";

# Server Rule Violations

When a member breaks a server rule, follow these steps to ensure proper handling and documentation.

## Role-Specific Responsibilities

<CardGrid columns={2}>
  <Card title="Cutie Helper (Trainee)" status="info">
    <p><RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" /></p>
    <ul>
      <li>Screenshot the violation</li>
      <li>Delete the violating message</li>
      <li>Report in <ChannelBadge label="📙moderator-only" link="https://discord.com/channels/734595073920204940/943466763314663474"/></li>
      <li><strong>Cannot issue warnings or punishments</strong></li>
    </ul>
  </Card>
  
  <Card title="Moderator" status="success">
    <p><RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /></p>
    <ul>
      <li>All of the above, plus:</li>
      <li>Open Staff-Talk tickets</li>
      <li>Issue formal warnings</li>
      <li>Apply punishments</li>
      <li>Log to GitHub Warning Book</li>
    </ul>
  </Card>
</CardGrid>

## Reporting Process

### Staff Reporting

- <RoleBadge role="Chat Moderator" color="#ff6b6b" /> and any other members of the <RoleBadge role="Event Breed" badgeIcon="event_host_role_icon.png" color="#f75edb" /> report issues in <ChannelBadge label="⭕server-chat-reports" link="https://discord.com/channels/734595073920204940/1234567890123456789"/>
- <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" /> and <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> report in <ChannelBadge label="📙moderator-only" link="https://discord.com/channels/734595073920204940/943466763314663474"/>

### Member Reports

- If a member reports an issue in a ticket, a <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> handles it
- <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" /> may observe these tickets as part of their training
- Gather essential details: **Who**, **Where**, and **When**
- Don't just thank them; ask for necessary information

## Documentation Requirements

When documenting a rule violation:

1. **Screenshot** the violation
2. **Specify** which rule was broken
3. **Delete** the violating post from the channel
4. **Record** all relevant details
5. **Report** to the appropriate channel

### Example: Reporting a Rule Violation

Here's an example of how staff should document and report a rule violation:

<DiscordConversation title="Rule Violation Report">
  <DiscordMessage
    name="Cutie Helper 1"
    color="#38c8e8"
    message="Reporting a rule violation in general-chat"
  />
  <DiscordMessage
    name="Cutie Helper 1"
    color="#38c8e8"
  >
    **Details:**
    - **Who:** @MemberName
    - **Where:** #general-chat
    - **When:** Just now
    - **Rule Broken:** Respectful communication (hate speech)
    - **Action Taken:** Message deleted
    - **[Screenshot attached]**
  </DiscordMessage>
  <DiscordMessage
    name="Moderator 1"
    color="#e68027"
    message="Thanks for the report! I'll handle the formal warning in a staff-talk ticket."
  />
</DiscordConversation>

## Moderation Process

:::warning Cutie Helpers
<RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" /> should document and report violations but **cannot** open punishment tickets or issue warnings. A <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> will handle the formal action.
:::

1. **Document** the violation (screenshot, delete, report)
2. **Moderator opens** a Staff-Talk ticket for formal action
3. **Discuss** appropriate punishment in <ChannelBadge label="📙moderator-only" link="https://discord.com/channels/734595073920204940/943466763314663474"/> following the Server Guidelines

:::tip Fair Enforcement
Always aim for fair and consistent enforcement of rules to maintain community trust.
:::

## Related

- [Ban Types Overview](./ban-votes/ban-types-overview) *(Moderators only)*
- [Ban Votes for Members](./ban-votes/ban-votes-for-members) *(Moderators only)*
- [GitHub Records](./moderator/github-records) *(Moderators only)*
- [Staff-Talk Tickets](./moderator/staff-talk-tickets) *(Moderators only)*
