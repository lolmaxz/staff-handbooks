---
id: onboarding
title: Staff Onboarding
slug: /server-staff-handbook/onboarding
---

import RoleBadge from "@site/src/components/RoleBadge";
import ChannelBadge from "@site/src/components/ChannelBadge";
import Tooltip from "@site/src/components/Tooltip";
import CardGrid, { Card } from "@site/src/components/CardGrid";
import DiscordButton from "@site/src/components/DiscordButton";
import { Settings } from 'lucide-react';

# Staff Onboarding Guide 🎯

Welcome to the Eden Apis staff team! This comprehensive guide will help you understand your role, responsibilities, and the tools available to you.

::::info Getting Started
Take your time to familiarize yourself with all sections. Don't hesitate to ask questions in <ChannelBadge label="📙moderator-only" link="https://discord.com/channels/734595073920204940/943466763314663474"/>.

**Note:** As a <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" />, you will have access to <ChannelBadge label="📙moderator-only" link="https://discord.com/channels/734595073920204940/943466763314663474"/> for transparency and easier training. Use <ChannelBadge label="💬verification-chat" link="https://discord.com/channels/734595073920204940/1234567890123456789"/> **only** for verification ticket discussions.
::::

## First-Day Quick Start

- Verify a member: [Verification Process](./verification-process) → [Requirements](./verification-process)
- Close a verification: [Closing Out Verifications](./moderator/closing-out-verifications) → [Welcome Template](./verification-process/completion-of-verification)
- Moderate chat: [Chat Moderation Overview](./chat-moderation)
- Handle violations: [Server Rule Violations](./server-rule-violations)
- Open a staff-talk ticket: [Staff-Talk Tickets](./moderator/staff-talk-tickets) *(Moderators only)*
- Record actions: [GitHub Records](./moderator/github-records) *(Moderators only)*
- Review ban process: [Ban Types Overview](./ban-votes/ban-types-overview) *(Moderators only)*
- Mod on Call: [Mod on Call](./moderator/mod-on-call) *(Moderators only)*
- Enable Developer Mode: [Getting Discord User ID](./onboarding/getting-discord-user-id)

## Your Role & Responsibilities

<CardGrid columns={2}>
  <Card title="Cutie Helper (Trainee)" icon={<RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" />} status="info" href="/docs/general-handbook/server-positions/#cutie-helpers">
    <p><strong>Entry-level trainee position (2 months)</strong></p>
    <ul>
      <li>Handle verification tickets (under supervision or independently)</li>
      <li>Chat moderation (simple rule reminders, small disruptions)</li>
      <li>Participate in tickets as observers</li>
      <li>Shadow Moderators to learn workflow</li>
    </ul>
    <p><strong>⚠️ Restrictions:</strong> Cannot issue warnings, mutes, bans, or make final decisions</p>
  </Card>
  
  <Card title="Moderator" icon={<RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />} status="success" href="/docs/general-handbook/server-positions/#moderators">
    <p><strong>Fully trained staff position</strong></p>
    <ul>
      <li>Verification ticket handling</li>
      <li>Full chat moderation authority</li>
      <li>Server side ticket management</li>
      <li>Evidence gathering & ban voting</li>
      <li>Mod on Call (weekly ticket logging)</li>
      <li>Assisting Cutie Helpers with training</li>
    </ul>
  </Card>
</CardGrid>

## Training Path (Cutie Helpers)

As a <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" />, you are expected to:

- Handle verification tickets **on your own** or **together with a Moderator**
- Handle at least **2 training/test tickets**
- Contribute to ongoing Mod discussions

### Promotion to Moderator

After demonstrating the following qualities, you may be promoted via Moderator voting:

- ✅ Good judgment
- ✅ Consistent presence
- ✅ Rule understanding
- ✅ Calm and respectful communication
- ✅ Reliability and no drama involvement

**→ Promotion via Moderator voting after 2 months. 1 month in case of exceptional progress.**

## Essential Channels

<CardGrid columns={3}>
  <Card title="Communication" status="info">
    <ul>
      <li><ChannelBadge label="💬verification-chat" link="https://discord.com/channels/734595073920204940/1234567890123456789"/> - Verification tickets <strong>only</strong></li>
      <li><ChannelBadge label="📙moderator-only" link="https://discord.com/channels/734595073920204940/943466763314663474"/> - All questions, discussions, and issues</li>
      <li><ChannelBadge label="🎫open-a-ticket" link="https://discord.com/channels/734595073920204940/1106413750975746070"/></li>
    </ul>
  </Card>
  
  <Card title="Reporting" status="warning">
    <ul>
      <li><ChannelBadge label="⭕server-chat-reports" link="https://discord.com/channels/734595073920204940/1234567890123456789"/></li>
      <li><ChannelBadge label="🪄events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781"/></li>
      <li><ChannelBadge label="🔗-vrchat-age-logs" link="https://discord.com/channels/734595073920204940/1319750107859779725"/></li>
    </ul>
  </Card>
  
  <Card title="Resources" status="success">
    <ul>
      <li><ChannelBadge label="📱｜linking-with-vrchat" link="https://discord.com/channels/734595073920204940/1228159292306362368"/></li>
      <li><ChannelBadge label="💠𝘙ules" link="https://discord.com/channels/734595073920204940/737074569319546921"/></li>
    </ul>
  </Card>
</CardGrid>

## Core Processes

### Verification System

The verification process ensures only adults can access our community:

<CardGrid columns={2}>
  <Card title="Standard ID Verification" status="success" href="./verification-process/verification-requirements">
    <ul>
      <li>Government-issued ID with selfie</li>
      <li>Must show DOB, expiry date, issuing body</li>
      <li>All four corners visible</li>
      <li><strong>Preferred method</strong></li>
    </ul>
  </Card>
  
  <Card title="VRChat Age Verification" status="info" href="./verification-process/vrchat-linking-troubleshooting">
    <ul>
      <li>Requires active <Tooltip tip="VRC+ subscription costs ~$10/month">VRC+ subscription</Tooltip></li>
      <li>Alternative verification method</li>
      <li>Account linking required</li>
      <li>Cross-verification process</li>
    </ul>
  </Card>
</CardGrid>

### Chat Moderation

Maintain a positive community environment:

<CardGrid columns={2}>
  <Card title="Cutie Helper Chat Moderation" status="info" href="./chat-moderation/cutie-helper-chat-moderation">
    <ul>
      <li>Direct members to appropriate channels</li>
      <li>Simple rule reminders and small disruptions</li>
      <li>Screenshot and delete rule violations</li>
      <li><strong>Cannot issue warnings, mutes, or bans</strong></li>
    </ul>
  </Card>
  
  <Card title="Moderator Chat Moderation" status="success" href="./chat-moderation/moderator-chat-moderation">
    <ul>
      <li>De-escalate arguments and heated discussions</li>
      <li>Issue timeouts for cooling off members when necessary</li>
      <li>Issue formal warnings</li>
      <li>Train and assist Cutie Helpers</li>
    </ul>
  </Card>
</CardGrid>

### Ban Procedures (Moderators Only)

Three types of ban votes based on severity:

<CardGrid columns={3}>
  <Card title="Moderator Ban Vote" status="info" href="./ban-votes/ban-votes-for-members">
    <p><strong>24-hour duration</strong></p>
    <ul>
      <li>Standard rule violations</li>
      <li>All moderators vote</li>
      <li>Thread discussion required</li>
    </ul>
  </Card>
  
  <Card title="All Heads Ban Vote" status="warning" href="./ban-votes/boardroom-ban-vote">
    <p><strong>12-hour duration</strong></p>
    <ul>
      <li>4-6 rule breaks</li>
      <li>Double Consent violations</li>
      <li>Department heads involved</li>
    </ul>
  </Card>
  
  <Card title="Emergency Ban Vote" status="error" href="./ban-votes/emergency-ban-vote">
    <p><strong>Immediate action</strong></p>
    <ul>
      <li>Safety concerns</li>
      <li>Serious disruptions</li>
      <li>Admin-level decision</li>
    </ul>
  </Card>
</CardGrid>

## Important Tools & Commands

### Staff Tools

- **Check Linking Status**: <DiscordButton type="secondary" emoji="🔍">Right Click on the user's avatar / Username → Apps → Check Linking Status</DiscordButton>
- **Vote Bot**: Use Discord's built-in poll feature or Hephia v2 command `/votereact [message ID]` for ban votes *(Moderators only)*
- **Ticket Commands**: <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> only - `/rename`, `/add`, `/remove` for ticket management
  - `/rename` has a brief cooldown. If it fails, you can edit the ticket thread title manually.
  - <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" /> may ask a <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> in <ChannelBadge label="📙moderator-only" link="https://discord.com/channels/734595073920204940/943466763314663474" /> to assist.
- **Developer Mode**: <DiscordButton type="link" emoji="⚙️" href="./onboarding/getting-discord-user-id">Enable Developer Mode</DiscordButton> (required for copying User IDs)

### Key Guidelines

::::warning Important Rules

- **Verification**: Complete within 12-24 hours (ideally under 36 hours)
- **Documentation**: Always screenshot violations before deletion
- **Collaboration**: Ask for help when unsure - don't guess
- **Professionalism**: Remain calm and objective in all interactions
- **Cutie Helper Restrictions**: Do not issue warnings, mutes, bans, or make final decisions - escalate to Moderators
  :::

## Getting Help

### When You Need Assistance

1. **Verification Ticket Discussions**: Ask in <ChannelBadge label="💬verification-chat" link="https://discord.com/channels/734595073920204940/1234567890123456789"/> *(verification only)*
2. **All Other Questions & Issues**: Consult in <ChannelBadge label="📙moderator-only" link="https://discord.com/channels/734595073920204940/943466763314663474"/>
3. **Technical Problems**: Ping <RoleBadge role="lolmaxz" color="#ff6b6b" /> for bot/linking issues
4. **Staff-Talk Tickets**: Use <ChannelBadge label="🎫open-a-ticket" link="https://discord.com/channels/734595073920204940/1106413750975746070"/> → <DiscordButton type="link" emoji="☎️" href="./moderator/staff-talk-tickets">Talk to a Staff</DiscordButton> *(Moderators only)*

### Documentation Resources

- **Verification Process**: <DiscordButton type="link" emoji="📋" href="./verification-process">Detailed steps and requirements</DiscordButton>
- **Chat Moderation**: <DiscordButton type="link" emoji="💬" href="./chat-moderation">Role-specific guidelines and procedures</DiscordButton>
- **Ban Procedures**: <DiscordButton type="link" emoji="⚖️" href="./ban-votes/ban-types-overview">Different vote types and criteria</DiscordButton> *(Moderators only)*
- **VRChat Linking**: <DiscordButton type="link" emoji="🔗" href="./verification-process/vrchat-linking-troubleshooting">Troubleshooting and technical support</DiscordButton>

:::tip Success Tips

- **Read thoroughly**: Take time to understand each process
- **Ask questions**: Better to ask than make mistakes
- **Stay updated**: Check for policy changes regularly
- **Be patient**: Learning takes time - we're here to help!
- **Shadow Moderators**: As a Cutie Helper, observe how Moderators handle situations
  :::

Welcome to the team! 🎉
