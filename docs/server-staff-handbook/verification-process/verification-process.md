---
id: verification-process
title: Verification Process
slug: /server-staff-handbook/verification-process
---

import ChannelBadge from "@site/src/components/ChannelBadge";
import RoleBadge from "@site/src/components/RoleBadge";
import DiscordButton from '@site/src/components/DiscordButton';
import Tooltip from '@site/src/components/Tooltip';
import CardGrid, { Card } from '@site/src/components/CardGrid';
import DiscordConversation, { DiscordMessage } from "@site/src/components/DiscordConversation";

import { IdCard } from 'lucide-react';
import { RectangleGoggles } from 'lucide-react';

# Verification Process

## Overview

The verification process is how we confirm members are 18+ to access our adult content and features. Members initiate verification through <ChannelBadge label="🎫open-a-ticket" link="https://discord.com/channels/734595073920204940/1106413750975746070"/> by selecting <DiscordButton type="success" emoji="✅">Age Verification</DiscordButton>.

### Example: Initial Verification Request

Here's how a typical verification ticket starts:

<DiscordConversation id="verification-ticket-age" title="Verification Ticket - Age Verification">
  <DiscordMessage
    name="Member 1"
    color="#5865f2"
    message="Hi! I'd like to get verified so I can access the adult channels."
  />
  <DiscordMessage
    name="Cutie Helper 1"
    color="#38c8e8"
  >
    Hi! I can help you with that. The verification steps were auto-posted in this ticket when it opened — please follow those.

    You will need to upload <strong>2 images</strong>:
    - <strong>Image 1:</strong> Your government ID (clear, all 4 corners, DOB visible)
    - <strong>Image 2:</strong> A selfie holding the same ID (face clearly visible, matches the ID photo)

    If you have any questions, let me know and I’ll assist.

  </DiscordMessage>
  <DiscordMessage
    name="Member 1"
    color="#5865f2"
    message="Got it! Let me get those ready."
  />
  <DiscordMessage
    name="Member 1"
    color="#5865f2"
    message="There you go! [2 images attached]"
  />
  <DiscordMessage
    name="Cutie Helper 1"
    color="#38c8e8"
    message="Perfect! I can see your ID clearly. Give me a moment to review everything."
  />
</DiscordConversation>

:::info Staff Training
This process ensures only verified adults can access <Tooltip tip="Channels like Bios, Kink Sharing, VR name sharing, Lewd VR Pics, Avatar Creators content, and more">exclusive channels</Tooltip> and participate in adult events.
:::

## Verification Methods

<CardGrid columns={2}>
  <Card title="Standard ID Verification" icon={<IdCard size={20} />}>
    <p><strong>Preferred method</strong> - <Tooltip tip="Driving licenses, passports, identity cards, military IDs, and government-issued insurance/medication IDs">Government-issued ID</Tooltip> with selfie</p>
    <ul>
      <li>Must show: date of birth, expiry date, issuing body, all four corners</li>
      <li>Sunglasses allowed in selfie, eyes on ID can be censored</li>
    </ul>
  </Card>
  
  <Card title="VRChat Age Verification" icon={<RectangleGoggles size={20} />}>
    <p><strong>Alternative method</strong> - Using VRChat's age verification system</p>
    <ul>
      <li>Requires active <Tooltip tip="VRC+ is VRChat's paid subscription service that provides additional features. Generally costs $10 per month">VRC+ subscription</Tooltip></li>
      <li>See <ChannelBadge label="📱｜linking-with-vrchat" link="https://discord.com/channels/734595073920204940/1228159292306362368"/> for details</li>
    </ul>
  </Card>
</CardGrid>

## Timeframe for Verification

Verifying members should ideally be done within the first **12 hours** of the member posting their ID, but no later than **24 hours**. We generally try to get verification sorted under **36 hours**.

- <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" /> are responsible for the initial verification.
- After the **10-hour** mark, <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> can step in, but it's preferable for <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" /> to handle initial verifications to gain experience.
- A single staff member (<RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />/<RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" />) should **not** perform both the initial verification and the final ticket closure.

:::tip
Prompt verification ensures new members can engage with the community quickly while maintaining security protocols.
:::

## Key Requirements

<CardGrid columns={2}>
  <Card title="Accepted Documents" status="success">
    <ul>
      <li><Tooltip tip="Most common and preferred form of identification">Driving Licenses, Identity Cards, Passports</Tooltip></li>
      <li>Military IDs (discouraged), Insurance/Medication IDs (if government-issued)</li>
      <li><Tooltip tip="Must not be expired for more than one year and photo must match the selfie">Expired IDs (up to 1 year)</Tooltip> with matching photo</li>
    </ul>
  </Card>
  
  <Card title="Not Accepted" status="error">
    <ul>
      <li><Tooltip tip="Unless provided by a government body">School IDs</Tooltip>, Birth Certificates (as primary), Digital IDs</li>
      <li>Private organization IDs, Temporary paper IDs</li>
    </ul>
  </Card>
</CardGrid>

### Safety Protocol

- Initial verification by <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" /> or <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />
- Second review by <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> only
- Complete data deletion after verification
- Text-only transcript sent to member

:::info
For detailed verification steps and document requirements, see the [Verification Requirements](./verification-process/verification-requirements) page.
:::
