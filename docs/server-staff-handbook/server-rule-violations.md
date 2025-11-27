---
id: server-rule-violations
title: Server Rule Violations
---

import ChannelBadge from "@site/src/components/ChannelBadge";
import RoleBadge from "@site/src/components/RoleBadge";
import DiscordConversation, { DiscordMessage } from "@site/src/components/DiscordConversation";
import CardGrid, { Card } from "@site/src/components/CardGrid";
import Checklist from "@site/src/components/Checklist";
import Tooltip from "@site/src/components/Tooltip";
import DiscordButton from "@site/src/components/DiscordButton";

# Server Rule Violations

When a member breaks a server rule, follow these steps to ensure proper handling and documentation.

## Quick Process Overview

<Checklist checklistId="rule-violation-process" title="Rule Violation Process">
  <Checklist.Item id="document"><strong>1. Document</strong> the issue</Checklist.Item>
  <Checklist.Item id="report"><strong>2. Report</strong> through the <Tooltip tip="See the Role-Specific Responsibilities section below to find where to report based on your role/level on the server">appropriate channel</Tooltip></Checklist.Item>
  <Checklist.Item id="moderator-action"><strong>3. <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> reviews</strong> and takes appropriate action</Checklist.Item>
  <Checklist.Item id="log"><strong>4. Action is recorded</strong> for transparency and consistency</Checklist.Item>
</Checklist>

## Role-Specific Responsibilities

<CardGrid columns={2}>
  <Card title={<><RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" /> (Trainee)</>} status="info">
    <p><strong>📍 Report to:</strong> <ChannelBadge label="📙moderators" link="https://discord.com/channels/734595073920204940/943466763314663474"/></p>
    <p><strong>Responsibilities:</strong></p>
    <ul>
      <li>Document violations (screenshot, delete, report)</li>
      <li>Observe Staff-Talk tickets as training</li>
    </ul>
    <p><strong>⚠️ Restrictions:</strong></p>
    <ul>
      <li><strong>Cannot</strong> issue warnings or punishments</li>
      <li><strong>Cannot</strong> open Staff-Talk tickets</li>
      <li>Must escalate to <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> for formal action</li>
    </ul>
  </Card>

<Card title={<RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />} status="success">

<p><strong>📍 Report to:</strong> <ChannelBadge label="📙moderators" link="https://discord.com/channels/734595073920204940/943466763314663474"/></p>
<p><strong>Responsibilities:</strong></p>
<ul>
<li>All Cutie Helper responsibilities, plus:</li>
<li>Open Staff-Talk tickets for formal action</li>
<li>Issue formal warnings</li>
<li>Apply punishments per Server Guidelines</li>
<li>Log actions to GitHub Warning Book</li>
<li>Handle member reports in tickets</li>
</ul>
</Card>
</CardGrid>

<Card title={<><RoleBadge role="Chat Moderator" color="#ff6b6b" /> / <RoleBadge role="Event Breed" badgeIcon="event_host_role_icon.png" color="#f75edb" /></>} status="warning">

  <p><strong>📍 Report to:</strong> <ChannelBadge label="⭕server-chat-reports" link="https://discord.com/channels/734595073920204940/1234567890123456789"/></p>
  <p><strong>Responsibilities:</strong></p>
  <ul>
    <li>Document violations (screenshot, delete, report)</li>
    <li>Report rule violations in the designated channel</li>
    <li>Moderators will handle formal action</li>
  </ul>
</Card>

<div style={{marginTop: '1.5rem'}} />

<Card title="Regular Members" status="info">
  <p><strong>📍 Report via:</strong> <ChannelBadge label="🎫open-a-ticket" link="https://discord.com/channels/734595073920204940/1106413750975746070"/> → <DiscordButton type="secondary" emoji="☎️">Talk to a Staff</DiscordButton></p>
  <p><strong>When reporting an issue:</strong></p>
  <ul>
    <li>Provide essential details: <strong>Who</strong>, <strong>Where</strong>, and <strong>When</strong></li>
    <li>Include <strong>username or user ID</strong> when possible - this helps staff take action quicker</li>
    <li>Include screenshots if possible</li>
    <li>A <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> will handle your report</li>
  </ul>
  <p><strong>💡 Tip:</strong> You can start explaining everything in the ticket before staff responds. This is the <strong>preferred way</strong> to handle tickets and helps staff respond faster!</p>
  <p style={{fontSize: '0.9em', color: '#888', marginTop: '0.5em'}}><em>Note: Screenshots are particularly useful and almost required for cases like harassment, unsolicited DMs, or friend requests—anything that happens outside the server that staff wouldn't be able to see otherwise.</em></p>
</Card>
<br/>
---

## Documentation Steps

When documenting a rule violation, follow these steps:

<Checklist checklistId="documentation-steps" title="Documentation Checklist">
  <Checklist.Item id="screenshot"><strong>1. Screenshot</strong> the violation</Checklist.Item>
  <Checklist.Item id="specify-rule"><strong>2. Specify</strong> which rule was broken</Checklist.Item>
  <Checklist.Item id="delete-message"><strong>3. Delete</strong> the violating message from the channel <Tooltip tip="Only staff members can delete messages from channels">(Staff)</Tooltip></Checklist.Item>
  <Checklist.Item id="record-details"><strong>4. Record</strong> all given relevant details (<strong>Who</strong>, <strong>Where</strong>, <strong>When</strong>, <strong>What rule</strong>)</Checklist.Item>
  <Checklist.Item id="report-channel"><strong>5. Report</strong> to the <Tooltip tip="See the Role-Specific Responsibilities section above to find where to report based on your role/level on the server">appropriate channel</Tooltip></Checklist.Item>
</Checklist>

### Examples: Reporting Rule Violations

#### Staff Reporting Example

Here's an example of how **staff** should document and report a rule violation:

<DiscordConversation id="staff-rule-violation-report" title="Staff Rule Violation Report">
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

#### Member Reporting Example

Here's an example of how a **member** should report an issue through a ticket:

<DiscordConversation id="member-report-unsolicited-dm" title="Member Report - Unsolicited DM">
  <DiscordMessage
    name="MemberUser1"
    color="#5865f2"
    message="Hi, I'd like to report someone who sent me an unsolicited DM"
  />
  <DiscordMessage
    name="MemberUser1"
    color="#5865f2"
  >
    **Who:** @ProblemUser (ID: 987654321098765432)

    **When:** About 30 minutes ago

    **What happened:** They sent me a DM without asking first, even though I have the "DM Ask First" role

<br/>
    **[Screenshot of the DM attached]**

  </DiscordMessage>
  <DiscordMessage
    name="Moderator 1"
    color="#e68027"
    message="Thank you for reporting this! I can see the DM in the screenshot. We'll handle this appropriately."
  />
  <DiscordMessage
    name="Moderator 1"
    color="#e68027"
    message="Is there anything else you'd like to add about this incident?"
  />
  <DiscordMessage
    name="MemberUser1"
    color="#5865f2"
    message="No, that's everything. Thank you for looking into it!"
  />
</DiscordConversation>

## Handling Member Reports

When a member reports an issue in a ticket:

- A <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> handles the report
- <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" /> may observe these tickets as part of their training
- **Always gather essential details**: **Who**, **Where**, and **When**
- Don't just thank them—ask for necessary information if not provided

## Moderation Process

After documentation and reporting:

<Checklist checklistId="moderation-process" title="Moderation Process Checklist">
  <Checklist.Item id="review-report"><strong>1. Moderator reviews</strong> the report in <ChannelBadge label="📙moderators" link="https://discord.com/channels/734595073920204940/943466763314663474"/></Checklist.Item>
  <Checklist.Item id="open-ticket"><strong>2. Moderator opens</strong> a Staff-Talk ticket for formal action (if warranted)</Checklist.Item>
  <Checklist.Item id="discuss-punishment"><strong>3. Moderators discuss</strong> appropriate punishment in <ChannelBadge label="📙moderators" link="https://discord.com/channels/734595073920204940/943466763314663474"/> following the <Tooltip tip="The Server Guidelines are currently under rework and may not be accessible to the public in the near future, as it is a sensitive document and we want to avoid people using it to circumvent rules">Server Guidelines</Tooltip></Checklist.Item>
  <Checklist.Item id="log-action"><strong>4. Moderator logs</strong> the action to GitHub Warning Book</Checklist.Item>
</Checklist>

:::tip Fair Enforcement
Always aim for fair and consistent enforcement of rules to maintain community trust.
:::

## Related

- [Ban Types Overview](./ban-votes/ban-types-overview) _(Moderators only)_
- [Ban Votes for Members](./ban-votes/ban-votes-for-members) _(Moderators only)_
- [GitHub Records](./moderator/github-records) _(Moderators only)_
- [Staff-Talk Tickets](./moderator/staff-talk-tickets) _(Moderators only)_
