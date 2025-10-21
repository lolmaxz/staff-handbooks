---
id: verification-requirements
title: How To Verify Members
---

import ChannelBadge from "@site/src/components/ChannelBadge";
import RoleBadge from "@site/src/components/RoleBadge";
import Tooltip from "@site/src/components/Tooltip";
import Checklist from '@site/src/components/Checklist';
import DiscordButton from '@site/src/components/DiscordButton';
import CardGrid, { Card } from '@site/src/components/CardGrid';

import { IdCard } from 'lucide-react';
import { RectangleGoggles } from 'lucide-react';

# Age Verification Process Guide 💜

<div style={{ textAlign: 'center' }}>
  <img src={require("@site/static/img/how_to_get_verified.webp").default} alt="How to Get Verified" width="50%" />
</div>

:::info Staff Focus
This guide outlines the verification process for staff members to follow when verifying new members' ages. It's crucial to maintain consistency and security throughout this process.
:::

## Verification Process Overview

The verification process begins when a member requests age verification. This section outlines the initial steps and available verification methods.

1. **Initial Contact**:

   - Member initiates verification in <ChannelBadge label="🎫open-a-ticket" link="https://discord.com/channels/734595073920204940/1106413750975746070"/>
   - They select <DiscordButton type="success" emoji="✅">Age Verification</DiscordButton> option
   - If they see 'No Access', direct them to <ChannelBadge label="💠𝘙ules" link="https://discord.com/channels/734595073920204940/737074569319546921"/>

2. **Verification Methods**:

<CardGrid columns={2}>
  <Card title="Standard ID Verification" icon={<IdCard size={20} />}>
    <p><strong>Preferred method</strong> - Government-issued ID with selfie</p>
    <ul>
      <li>Most common verification method</li>
      <li>Submit government-issued ID and selfie</li>
      <li>Must show DOB, expiry date, issuing body</li>
      <li>All four corners visible</li>
    </ul>
  </Card>
  
  <Card title="VRChat Age Verification" icon={<RectangleGoggles size={20} />}>
    <p><strong>Alternative method</strong> - Using VRChat's verification system</p>
    <ul>
      <li>Requires active <Tooltip tip="VRChat verification requires both age verification on VRChat and an active VRC+ subscription">VRC+ subscription</Tooltip></li>
      <li>Link account: <DiscordButton type="primary" emoji="🔗">Click Here To Link Your VRChat Account</DiscordButton></li>
      <li>Verify age: <DiscordButton type="success" emoji="✅">Cross Verify Your Age From Your VRChat Account</DiscordButton></li>
      <li>See <ChannelBadge label="📱｜linking-with-vrchat" link="https://discord.com/channels/734595073920204940/1228159292306362368"/> for details</li>
    </ul>
  </Card>
</CardGrid>

## Verification Checklist

This checklist ensures all necessary steps are completed during the verification process. Follow each step carefully to maintain verification standards.

<Checklist checklistId="verification-process" title="Verification Process Steps" borderColor="#800080">
  <Checklist.Item id="check-id">Review submitted ID for validity and required information</Checklist.Item>
  <Checklist.Item id="check-selfie">Verify selfie matches ID and shows required information</Checklist.Item>
  <Checklist.Item id="check-note">Confirm handwritten note with date and username</Checklist.Item>
  <Checklist.Item id="check-details">Ensure DOB, expiry date, and issuing body are visible</Checklist.Item>
  <Checklist.Item id="check-corners">Verify all four corners of ID are visible</Checklist.Item>
  <Checklist.Item id="assign-role">Assign <RoleBadge role="Verified" color="#00ff00" /> role</Checklist.Item>
  <Checklist.Item id="remove-role">Remove <RoleBadge role="Unverified" color="#ff0000" /> role **only** if bot is down</Checklist.Item>
  <Checklist.Item id="welcome">Send welcome message with important channel information</Checklist.Item>
</Checklist>

## Verification Documents

:::warning Important
Only accept official government-issued identification documents
:::

<CardGrid columns={2}>
  <Card title="Accepted Documents" status="success">
    <ul>
      <li><strong>Driving Licenses</strong></li>
      <li><strong>Identity Cards</strong></li>
      <li><strong>Passports</strong></li>
      <li><strong>Military IDs</strong> (accepted but discouraged due to security concerns)</li>
      <li><strong>Insurance Cards</strong> and <strong>Medication IDs</strong> (only if government-issued and recognized as official ID in the respective country)</li>
    </ul>
    
    <h5>Conditionals</h5>
    <ul>
      <li><strong>Expired IDs</strong> are acceptable if not expired for more than <strong>one year</strong> and the photo matches the selfie</li>
      <li><strong>Birth Certificates</strong> may only be used as a supplement to a photo ID that does not show the date of birth (not as a primary document)</li>
    </ul>
  </Card>
  
  <Card title="Not Accepted" status="error">
    <ul>
      <li><strong>Temporary Paper IDs</strong></li>
      <li><strong>Private Organization IDs</strong> (e.g., school IDs, bus IDs)</li>
      <li><strong>IDs without online examples</strong> (for verification)</li>
      <li><strong>Birth Certificates</strong> (as a primary document)</li>
      <li><strong>School IDs</strong> (Unless provided by government body)</li>
      <li><strong>Digital IDs</strong></li>
    </ul>
  </Card>
</CardGrid>

:::warning
If you're uncertain about the validity of an ID, consult with fellow Moderators or verify through a Google search.
:::

## Verification Requirements

### 📝 ID Requirements

- Submit a selfie with ID
- Show date of birth, expiry date, and issuing body
- Sunglasses or censoring eyes is allowed in **selfie**
- Eyes on **ID** may be censored
- Birth Certificate can supplement expired ID with picture

## Safety Protocol

:::note Privacy First
Your privacy and security are our top priorities
:::

1. **Verification Process**:

   - Initial verification by a <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" /> or a <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />
   - Second review by <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> only
   - Ticket closure after verification by <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> only

2. **Data Handling**:
   - Text-only transcript generated and sent to member
   - Complete deletion of verification ticket, including any attachments
   - No storage of sensitive information outside Discord

:::tip
For security-related questions, create a staff-talk ticket in <ChannelBadge label="🎫open-a-ticket" link="https://discord.com/channels/734595073920204940/1106413750975746070"/>
:::

## Access Granted After Verification

This section outlines the channels and features that become available to members after successful verification.

### Exclusive Channels

<p> Here's a few channels as example of what gets unlocked once you get verified </p>
<ChannelBadge label="📄𝘕𝘚𝘍𝘞-𝘉ios" link="https://discord.com/channels/734595073920204940/737074569319546921"/> | <ChannelBadge label="🔞kink-sharing" link="https://discord.com/channels/734595073920204940/737074569319546921"/> | <ChannelBadge label="🎮vr-name-sharing" link="https://discord.com/channels/734595073920204940/737074569319546921"/> | <ChannelBadge label="📸lewd-vr-pics" link="https://discord.com/channels/734595073920204940/737074569319546921"/> | <ChannelBadge label="👾avatar-creators" link="https://discord.com/channels/734595073920204940/737074569319546921"/> | <ChannelBadge label="🎨avatar-support" link="https://discord.com/channels/734595073920204940/737074569319546921"/>

<Checklist checklistId="access-granted" title="Additional Features Unlocked" borderColor="#800080">
  <Checklist.Item id="features">Event Participation (Social Lewd nights, Drinking Events, Movie Events)</Checklist.Item>
  <Checklist.Item id="voice">Voice Channel Access</Checklist.Item>
  <Checklist.Item id="threads">Exclusive Threads</Checklist.Item>
  <Checklist.Item id="giveaways">Giveaways</Checklist.Item>
  <Checklist.Item id="worlds">ERP Worlds Links for VRChat</Checklist.Item>
  <Checklist.Item id="roles">Hundreds of Customizable Roles</Checklist.Item>
</Checklist>

## Verification Example

![Verification Example](@site/static/img/Verification_Option_1-no_text.webp)

## Next Steps

Once you've completed the verification process using the checklist above, see the [Completion of Verification](./completion-of-verification) page for proper procedures on how to finalize the verification as a <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" />.
