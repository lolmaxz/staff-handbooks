---
id: onboarding
title: Staff Onboarding
sidebar_position: 0
---

import RoleBadge from "@site/src/components/RoleBadge";
import ChannelBadge from "@site/src/components/ChannelBadge";
import Tooltip from "@site/src/components/Tooltip";
import CardGrid, { Card } from "@site/src/components/CardGrid";
import DiscordButton from "@site/src/components/DiscordButton";
import { Settings } from 'lucide-react';

# Staff Onboarding Guide 🎯

Welcome to the Eden Apis staff team! This comprehensive guide will help you understand your role, responsibilities, and the tools available to you.

:::info Getting Started
Take your time to familiarize yourself with all sections. Don't hesitate to ask questions in <ChannelBadge label="📗helper-chat" link="https://discord.com/channels/734595073920204940/1234567890123456789"/> or <ChannelBadge label="📙moderator-only" link="https://discord.com/channels/734595073920204940/943466763314663474"/>.
:::

## Your Role & Responsibilities

<CardGrid columns={2}>
  <Card title="Cutie Helper" icon={<RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" />} status="info" href="/docs/general-handbook/server-positions/#cutie-helpers">
    <p><strong>Entry-level staff position</strong></p>
    <ul>
      <li>Handle verification processes</li>
      <li>Chat moderation and guidance</li>
      <li>Template enforcement</li>
      <li>Minor infraction handling</li>
    </ul>
  </Card>
  
  <Card title="Moderator" icon={<RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />} status="success" href="/docs/general-handbook/server-positions/#moderators">
    <p><strong>Advanced staff position</strong></p>
    <ul>
      <li>De-escalation and formal moderation</li>
      <li>Timeout and warning authority</li>
      <li>Ban vote participation</li>
      <li>Staff-talk ticket handling</li>
    </ul>
  </Card>
</CardGrid>

## Essential Channels

<CardGrid columns={3}>
  <Card title="Communication" status="info">
    <ul>
      <li><ChannelBadge label="📗helper-chat" link="https://discord.com/channels/734595073920204940/1234567890123456789"/></li>
      <li><ChannelBadge label="📙moderator-only" link="https://discord.com/channels/734595073920204940/943466763314663474"/></li>
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
      <li>Reply to member's messages with <RoleBadge role=" ON" color="#3b82f6" /> (not <RoleBadge role=" OFF" color="#6b7280" />) in case of error(s) in the verification process</li>
      <li>Handle minor infractions directly or ask for help from other <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> when necessary</li>
      <li>Screenshot and delete rule violations</li>
    </ul>
  </Card>
  
  <Card title="Moderator Chat Moderation" status="success" href="./chat-moderation/moderator-chat-moderation">
    <ul>
      <li>De-escalate arguments and heated discussions</li>
      <li>Issue 1-hour timeouts for cooling off members when necessary</li>
      <li>Clean up drama related messages</li>
      <li>Consult with other <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> when unsure</li>
    </ul>
  </Card>
</CardGrid>

### Ban Procedures

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
- **Vote Bot**: `>votereact [message ID]` for ban votes
- **Ticket Commands**: <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> only - `/rename`, `/add`, `/remove` for ticket management
- **Developer Mode**: <DiscordButton type="link" emoji="⚙️" href="./training/getting-discord-user-id">Enable Developer Mode</DiscordButton> (required for copying User IDs)

### Key Guidelines

:::warning Important Rules

- **Verification**: Complete within 12-24 hours (ideally under 36 hours)
- **Documentation**: Always screenshot violations before deletion
- **Collaboration**: Ask for help when unsure - don't guess
- **Professionalism**: Remain calm and objective in all interactions
  :::

## Getting Help

### When You Need Assistance

1. **General Questions**: Ask in <ChannelBadge label="📗helper-chat" link="https://discord.com/channels/734595073920204940/1234567890123456789"/>
2. **Moderator Issues**: Consult in <ChannelBadge label="📙moderator-only" link="https://discord.com/channels/734595073920204940/943466763314663474"/>
3. **Technical Problems**: Ping <RoleBadge role="lolmaxz" color="#ff6b6b" /> for bot/linking issues
4. **Staff-Talk Tickets**: Use <ChannelBadge label="🎫open-a-ticket" link="https://discord.com/channels/734595073920204940/1106413750975746070"/> → "Talk to a Staff"

### Documentation Resources

- **Verification Process**: <DiscordButton type="link" emoji="📋" href="./verification-process/verification-process">Detailed steps and requirements</DiscordButton>
- **Chat Moderation**: <DiscordButton type="link" emoji="💬" href="./chat-moderation/chat-moderation-overview">Role-specific guidelines and procedures</DiscordButton>
- **Ban Procedures**: <DiscordButton type="link" emoji="⚖️" href="./ban-votes/ban-types-overview">Different vote types and criteria</DiscordButton>
- **VRChat Linking**: <DiscordButton type="link" emoji="🔗" href="./verification-process/vrchat-linking-troubleshooting">Troubleshooting and technical support</DiscordButton>

:::tip Success Tips

- **Read thoroughly**: Take time to understand each process
- **Ask questions**: Better to ask than make mistakes
- **Stay updated**: Check for policy changes regularly
- **Be patient**: Learning takes time - we're here to help!
  :::

Welcome to the team! 🎉
