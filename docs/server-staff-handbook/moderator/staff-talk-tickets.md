---
id: staff-talk-tickets
title: Staff-Talk Tickets
---

import RoleBadge from "@site/src/components/RoleBadge";
import ChannelBadge from "@site/src/components/ChannelBadge";
import Tooltip from "@site/src/components/Tooltip";
import TextWithButton from "@site/src/components/TextWithButton";
import DiscordButton from '@site/src/components/DiscordButton';
import DiscordConversation, { DiscordMessage } from "@site/src/components/DiscordConversation";
import CardGrid, { Card } from "@site/src/components/CardGrid";

# Staff-Talk Tickets

:::warning Moderators Only
This page covers procedures for <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> only. <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" /> **cannot** open or manage Staff-Talk tickets independently.

Cutie Helpers may observe these tickets as part of their training but cannot issue warnings, mutes, or punishments.
:::

:::info
**For the first 2 months** as a <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />, draft your messages in <ChannelBadge label="📙moderator-only" link="https://discord.com/channels/734595073920204940/943466763314663474" /> and get approval from a <RoleBadge role="Server Committee Member" badgeIcon="server_committee_role_icon.webp" color="#db1cb8" /> before opening tickets.
:::

## Important Guidelines

- **Punishment/Action Tickets**

  - Punishment tickets <u>**must**</u> be opened by **Moderators only**.
  - <u>**Only**</u> **1** staff member may talk within a ticket at a time. <u>Do not dogpile into the ticket</u>
  - Do **not** give out any punishments in tickets started by a member.

:::danger Never Start with Punishment
**Never start the ticket by stating the punishment.** This is critical - always begin with a respectful conversation, explain the situation, and then discuss consequences.

While these tickets will be used to dish out a punishment, we still want to treat members with respect. Starting directly with punishment creates a hostile environment and damages trust.
:::

<CardGrid columns={2}>
  <Card title="What NOT to do" status="error" icon="❌">
    <ul>
      <li>You're being given a 3-day timeout for breaking the rules.</li>
      <li>You violated [rule] and are being warned.</li>
      <li>Here's your punishment: [punishment type].</li>
    </ul>
  </Card>

  <Card title="What TO do" status="success" icon="✅">
    <ul>
      <li>Start with a polite request for their time</li>
      <li>Share evidence before discussing consequences</li>
      <li>Explain the rule violation clearly</li>
      <li>Allow the member to respond and explain</li>
      <li>Only then discuss the punishment</li>
      <li>Maintain a respectful, professional tone throughout</li>
    </ul>
  </Card>
</CardGrid>

## Example: Professional Ticket Opening

Here's an example of how to properly handle a staff-talk ticket from start to finish:

<DiscordConversation title="Staff-Talk Ticket Example">
  <DiscordMessage
    name="Moderator 1"
    color="#e68027"
    message="Hi Username, do you have a moment to chat? I'd like to discuss something that happened in general-chat."
  />
  <DiscordMessage
    name="Member 1"
    color="#5865f2"
    message="Sure, what's up?"
  />
  <DiscordMessage
    name="Moderator 1"
    color="#e68027"
    message="I wanted to bring this to your attention. [Screenshot attached]"
  />
  <DiscordMessage
    name="Moderator 1"
    color="#e68027"
    message="This message violates our server rules regarding respectful communication. Can you help me understand what happened here?"
  />
  <DiscordMessage
    name="Member 1"
    color="#5865f2"
    message="Oh, I see. I got a bit heated during the discussion. I apologize, that wasn't okay."
  />
  <DiscordMessage
    name="Moderator 1"
    color="#e68027"
    message="I appreciate you acknowledging that. Based on our staff guidelines, this will result in a formal warning. Do you understand the warning and what you did wrong?"
  />
  <DiscordMessage
    name="Member 1"
    color="#5865f2"
    message="Yes, I understand. I should have kept the discussion respectful even when I disagreed."
  />
  <DiscordMessage
    name="Moderator 1"
    color="#e68027"
    message="Thank you for understanding. This warning will be logged. Please remember to keep discussions respectful going forward."
  />
</DiscordConversation>

**Key points from this example:**

1. ✅ Starts with a polite request for their time
2. ✅ Shares evidence before discussing consequences
3. ✅ Explains the rule violation clearly
4. ✅ Allows the member to respond and explain
5. ✅ Acknowledges their response respectfully
6. ✅ Only then discusses the punishment
7. ✅ Confirms understanding before closing
8. ✅ Maintains a respectful, professional tone throughout

---

## Setting up a Ticket

1. Go to <ChannelBadge label="🎫𝘖pen-a-𝘛icket" link="https://discord.com/channels/734595073920204940/1106413750975746070" /> and select <DiscordButton type="secondary" emoji="☎️">Talk to a Staff</DiscordButton> button.
2. Rename the ticket using `/rename` to: `Stafftalk-Username`.

- Note: `/rename` has a short cooldown. If it fails due to cooldown or permissions, you can rename the ticket thread title manually.

3. Add the user to the ticket with `/add`.

---

## Communicating with the Member

Use a calm, professional tone. Keep messages short, clear, and focused on facts.

- Start by politely asking for their time
- Share the evidence first (screenshots/links)
- State the specific rule and how it was broken
- Ask for their perspective; avoid arguing or debating
- Explain the outcome and next steps
- Thank them for their time and confirm understanding

If it becomes too much to handle, request help from another <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> in <ChannelBadge label="📙moderator-only" link="https://discord.com/channels/734595073920204940/943466763314663474"/>.
:::warning Don't Stress!
Remain calm and objective! If you feel yourself getting frustrated, please step away and ask for help.
:::

### Short Example

<DiscordConversation title="Ticket - Respectful Communication">
  <DiscordMessage
    name="Moderator 1"
    color="#e68027"
    message="Hi @Member, do you have a moment? I'd like to discuss a message from general-chat."
  />
  <DiscordMessage
    name="Member 1"
    color="#5865f2"
    message="Sure."
  />
  <DiscordMessage
    name="Moderator 1"
    color="#e68027"
  >
    Here's the message in question (screenshot attached). It conflicts with our rule on respectful communication.
    Could you share what was going on from your perspective?
  </DiscordMessage>
  <DiscordMessage
    name="Member 1"
    color="#5865f2"
    message="I got frustrated and I shouldn't have said that. Sorry."
  />
  <DiscordMessage
    name="Moderator 1"
    color="#e68027"
  >
    Thank you for acknowledging. We'll issue a formal warning so we can move forward. Please keep discussions respectful going forward.
    Do you understand the warning?
  </DiscordMessage>
  <DiscordMessage
    name="Member 1"
    color="#5865f2"
    message="Yes, I understand."
  />
</DiscordConversation>

<details>
<summary> **Issuing Punishments** </summary>
<p>
  - Inform them of the punishment according to the **Staff Guidelines** and ask them to acknowledge the punishment.
  :::warning

**Do not remove the member before they have acknowledged the punishment.** We need explicit acknowledgement to confirm they read and understood the rule break and the action taken.

While waiting for acknowledgement, **ping the member every ~24 hours** to bring the ticket back to their attention. If they remain unresponsive for <u>two weeks</u> (or are clearly active elsewhere while ignoring the ticket), you may request to **temporarily remove their verification until they respond** in <ChannelBadge label="📙moderator-only" link="https://discord.com/channels/734595073920204940/943466763314663474"/> by adding back the <RoleBadge role="Unverified Role" badgeIcon="unverified_role_icon.png" color="#de0000" />.

If this still does not work, the <RoleBadge role="Head Moderator" color="#e68027" /> may decide to close the ticket and log it as "unresponsive".
:::

- Remove the member from the ticket after member acknowledges the warning/punishment using `/remove` ticket bot command.
</p>
</details>

## Logging the Ticket

- A <RoleBadge role="Server Committee Member" badgeIcon="server_committee_role_icon.webp" color="#db1cb8" /> will guide you on how to log the ticket into the **GitHub Warning Book**.

<TextWithButton
  text="Dont forget to make a GitHub account and request access!"
  buttonLabel="GitHub Warning Book"
  buttonHref="https://github.com/users/lolmaxz/projects/3/"
/>

:::info
Properly handling tickets ensures transparency and fairness for members involved!
:::

## Training Cutie Helpers

As a <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />, you are expected to assist and train <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" />. When handling Staff-Talk tickets:

- Allow Cutie Helpers to **observe** the ticket process
- Explain your reasoning and approach
- Answer their questions in <ChannelBadge label="📙moderator-only" link="https://discord.com/channels/734595073920204940/943466763314663474"/>
- Remember: they cannot issue punishments themselves, but learning by observation is valuable
