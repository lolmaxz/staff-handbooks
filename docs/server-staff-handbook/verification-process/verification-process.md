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
import { BadgeCheck } from 'lucide-react';

# Verification Process

## Overview

The verification process is how we confirm members are 18+ to access our adult content and features. Members initiate verification through <ChannelBadge label="🎫open-a-ticket" link="https://discord.com/channels/734595073920204940/1106413750975746070"/> by selecting one of the verification options: **Regular ID** (government ID + selfie), **VRChat (Temp Disabled)**, or **Verify Using Fansly**.

Full server access is granted by the <RoleBadge role="Eden Verified" color="#00ff00" /> role (formerly called "Verified"). Verification is completed using the <code>/verify</code> command in the ticket or the <DiscordButton type="success" emoji="✅">Verify</DiscordButton> button on the Orion Board. See [Orion Board: Verification](/docs/general-handbook/orion-board/orion-board-verification).

:::warning VRChat Cross Verification Retired — July 1, 2026
As of **July 1, 2026 at 2:00 PM EST**, VRChat age cross verification **no longer grants server access**. Members can still cross-verify (button: **VRChat (Temp Disabled)**), but they receive <RoleBadge role="Blocked VRC Verified ❌" color="#d61717" /> instead. Existing VRC Verified members are also assigned this role automatically on that date. Members must complete **Regular ID verification** or **Fansly cross verification** to obtain <RoleBadge role="Eden Verified" color="#00ff00" />.
:::

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

    If you have any questions, let me know and I'll assist.

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
      <li>Grants <RoleBadge role="Eden Verified" color="#00ff00" /> when completed by staff</li>
    </ul>
  </Card>
  
  <Card title="Verify Using Fansly" icon={<BadgeCheck size={20} />}>
    <p><strong>Alternative cross verification</strong> - Fansly creator verification</p>
    <ul>
      <li>Member must create a Fansly account and verify as a <strong>creator</strong></li>
      <li>A <strong>blue checkmark</strong> on their Fansly profile means they are ready</li>
      <li>Creator verification typically takes <strong>1 hour to a few hours</strong></li>
      <li>Available from the ticket panel: <DiscordButton type="primary" emoji="✅">Verify Using Fansly</DiscordButton></li>
      <li>Does not grant full access on its own — member may still need a verification ticket for <RoleBadge role="Eden Verified" color="#00ff00" /></li>
    </ul>
  </Card>

  <Card title="VRChat (Temp Disabled)" icon={<RectangleGoggles size={20} />}>
    <p><strong>No longer grants server access</strong> — preserved in case we revert this decision</p>
    <ul>
      <li>Button label: <DiscordButton type="secondary" emoji="🥽">VRChat (Temp Disabled)</DiscordButton></li>
      <li>Requires active <Tooltip tip="VRC+ is VRChat's paid subscription service that provides additional features. Generally costs $10 per month">VRC+ subscription</Tooltip></li>
      <li>Assigns <RoleBadge role="Blocked VRC Verified ❌" color="#d61717" /> — does <strong>not</strong> unlock the server</li>
      <li>See <ChannelBadge label="📱｜linking-with-vrchat" link="https://discord.com/channels/734595073920204940/1228159292306362368"/> for linking details</li>
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
For detailed verification steps and document requirements, see the [Verification Requirements](./verification-requirements) page.
:::
