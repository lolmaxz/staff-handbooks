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
import StepTimeline from '@site/src/components/StepTimeline';
import DiscordConversation, { DiscordMessage } from "@site/src/components/DiscordConversation";
import Link from "@docusaurus/Link";
import SlashCommand from "@site/src/components/SlashCommand";
import BotMessage, { DiscordEmbed } from "@site/src/components/DiscordMessage";

import { IdCard } from 'lucide-react';
import { RectangleGoggles } from 'lucide-react';
import { BadgeCheck } from 'lucide-react';

# How To Verify Members 💜

<div style={{ textAlign: 'center' }}>
  <img src={require("@site/static/img/how_to_get_verified.webp").default} alt="How to Get Verified" width="50%" />
</div>

Verification confirms members are **18+** before they can access our adult channels and events. Full server access comes from the <RoleBadge role="Eden Verified" color="#00ff00" /> role (formerly called "Verified"). This page covers everything staff need, from the ticket opening to the ticket closing.

:::warning VRChat Cross Verification Retired — July 1, 2026
Since **July 1, 2026 at 2:00 PM EST**, VRChat age cross verification **no longer grants server access**. Cross-verifying now gives <RoleBadge role="Blocked VRC Verified ❌" color="#d61717" />, and existing VRC Verified members received that role automatically on that date. To get <RoleBadge role="Eden Verified" color="#00ff00" />, members must complete **Regular ID verification** or **Fansly cross verification**.
:::

---

## How It Works

<StepTimeline
title="One verification ticket"
size="sm"
accentColor="#800080"
steps={[
{ label: "Ticket", detail: "Member opens it", recap: "The member picks a verification option in 🎫open-a-ticket. The steps are auto-posted in the ticket." },
{ label: "Images", detail: "ID + selfie", recap: "The member posts their ID and a selfie holding it." },
{ label: "First check", detail: "Cutie Helper", recap: "A Cutie Helper (or a Moderator after 10 hours) reviews the images with the checklist below, then runs /verify. Orion welcomes the member." },
{ label: "Second check", detail: "Moderator", recap: "A different Moderator double-checks and runs /verify again. The ticket closes itself 1 hour later." },
{ label: "Cleanup", detail: "Transcript + delete", recap: "The member gets a text-only transcript and the ticket, with its images, is deleted." },
]}
/>

1. The member opens a ticket in <ChannelBadge label="🎫open-a-ticket" link="https://discord.com/channels/734595073920204940/1106413750975746070"/> and picks **Regular ID**, **VRChat (Temp Disabled)**, or **Verify Using Fansly**.
   - If they see **No Access**, direct them to <ChannelBadge label="💠𝘙ules" link="https://discord.com/channels/734595073920204940/737074569319546921"/>.
   - Members who are **VRC Verified** or **Fansly Verified** can also open a verification ticket to get <RoleBadge role="Eden Verified" color="#00ff00" />.
2. The verification steps are auto-posted in the ticket. The member posts their images there.
3. Staff check the images with the [checklist](#verification-checklist), then [complete the first check](#completing-the-first-check) with <code>/verify</code>.
4. A Moderator does the [Second Verification](/docs/server-staff-handbook/verification-process/completion-of-verification).

<DiscordConversation id="verification-ticket-age" title="Verification Ticket - Age Verification">
  <DiscordMessage name="Member 1" color="#5865f2" message="Hi! I'd like to get verified so I can access the adult channels." />
  <DiscordMessage name="Cutie Helper 1" color="#38c8e8">
    Hi! I can help you with that. The verification steps were auto-posted in this ticket when it opened — please follow those.

    You will need to upload <strong>2 images</strong>:
    - <strong>Image 1:</strong> Your government ID (clear, all 4 corners, DOB visible)
    - <strong>Image 2:</strong> A selfie holding the same ID (face clearly visible, matches the ID photo)

    If you have any questions, let me know and I'll assist.

  </DiscordMessage>
  <DiscordMessage name="Member 1" color="#5865f2" message="Got it! Let me get those ready." />
  <DiscordMessage name="Member 1" color="#5865f2" message="There you go! [2 images attached]" />
  <DiscordMessage name="Cutie Helper 1" color="#38c8e8" message="Perfect! I can see your ID clearly. Give me a moment to review everything." />
</DiscordConversation>

---

## Verification Methods

<CardGrid columns={3}>
  <Card title="Regular ID" icon={<IdCard size={20} />} status="success">
    <p><strong>Preferred method.</strong> A <Tooltip tip="Driving licenses, passports, identity cards, military IDs, and government-issued insurance/medication IDs">government-issued ID</Tooltip> plus a selfie holding it.</p>
    <ul>
      <li>Requirements are in <a href="#documents--image-requirements">Documents &amp; image requirements</a></li>
      <li>Grants <RoleBadge role="Eden Verified" color="#00ff00" /> once staff complete it</li>
    </ul>
  </Card>
  <Card title="Verify Using Fansly" icon={<BadgeCheck size={20} />} status="info">
    <p><strong>Alternative cross verification</strong> through Fansly creator verification.</p>
    <ul>
      <li>The member creates a Fansly account and verifies as a <strong>creator</strong></li>
      <li>A <strong>blue checkmark</strong> on their Fansly profile means they are ready</li>
      <li>Creator verification usually takes <strong>1 hour to a few hours</strong></li>
      <li>Button on the ticket panel: <DiscordButton type="primary" emoji="✅">Verify Using Fansly</DiscordButton></li>
    </ul>
  </Card>
  <Card title="VRChat (Temp Disabled)" icon={<RectangleGoggles size={20} />} status="warning">
    <p><strong>No longer grants server access</strong> — kept in case we revert this decision.</p>
    <ul>
      <li>Needs an active <Tooltip tip="VRChat's paid subscription (about $10 per month). Cross verification needs both VRChat age verification and VRC+">VRC+ subscription</Tooltip> and a linked account (<DiscordButton type="primary" emoji="🔗">Click Here To Link Your VRChat Account</DiscordButton>)</li>
      <li>Button: <DiscordButton type="secondary" emoji="🥽">VRChat (Temp Disabled)</DiscordButton></li>
      <li>Assigns <RoleBadge role="Blocked VRC Verified ❌" color="#d61717" /> — does <strong>not</strong> unlock the server</li>
      <li>Linking details: <ChannelBadge label="📱｜linking-with-vrchat" link="https://discord.com/channels/734595073920204940/1228159292306362368"/></li>
    </ul>
  </Card>
</CardGrid>

If a member is unable to complete the verification in the normal way due to some physical limitation, accomodation in the form of a **video call** is possible as an alternative: see <Link to="/docs/server-staff-handbook/verification-process/camera-verification">Camera Verification</Link>.

---

## Timeframe and Who Does What

- Verify within **12 hours** of the member posting their ID, and no later than **24 hours**. We aim to have every verification fully sorted in under **36 hours**.
- <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" /> handle the **initial** verification. After the **10-hour** mark, <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> can step in, but it's better for Cutie Helpers to handle initial verifications to gain experience.
- The **second review** and the **ticket closure** are done by a <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> only.
- The same staff member must **not** do both the initial verification and the final closure.

:::tip
Prompt verification lets new members join the community quickly while keeping our safety standards.
:::

---

## Verification Checklist

<Checklist checklistId="verification-process" title="Verification Process Steps" borderColor="#800080">
  <Checklist.Item id="check-id">Review submitted ID for validity and required information</Checklist.Item>
  <Checklist.Item id="check-selfie">Verify selfie matches ID and shows required information</Checklist.Item>
  <Checklist.Item id="check-note">Confirm handwritten note with date and username (Usernames are not case sensitive)</Checklist.Item>
  <Checklist.Item id="check-details">Ensure DOB, expiry date, and issuing body are visible</Checklist.Item>
  <Checklist.Item id="check-corners">Verify all four corners of ID are visible</Checklist.Item>
  <Checklist.Item id="verify">Run <code>/verify</code> in the ticket (or press Verify on the Orion Board) — see below</Checklist.Item>
</Checklist>

---

## Completing the First Check

When every item on the checklist is good, run <code>/verify</code> **inside the verification ticket**. It has no options:

<SlashCommand
command="verify"
description="Verify a member's ID verification ticket"
bot="Orion Board"
avatar={require("@site/static/img/orion-board-profile.png").default}
plus
/>

You can also press <DiscordButton type="success" emoji="✅">Verify</DiscordButton> on the ticket in the Orion Board. See [Orion Board: Verification](/docs/general-handbook/orion-board/orion-board-verification).

**What Orion does:**

- Gives the member <RoleBadge role="Eden Verified" color="#00ff00" /> and removes <RoleBadge role="Unverified" color="#ff0000" />. Staff **cannot** assign Eden Verified by hand.
- Removes the old cross-verification roles if the member had them (<RoleBadge role="VRC Verified" color="#00ff00" />, <RoleBadge role="Blocked VRC Verified ❌" color="#d61717" />, Fansly verified).
- Replies to you privately: **✅ Initial verification completed successfully!**
- Posts the **welcome message** in the ticket for the member, so you no longer need to write one:

<BotMessage
username="Orion Board"
avatar={require("@site/static/img/orion-board-profile.png").default}
timestamp="Today at 3:12 PM"
app

> <DiscordEmbed

    color="#57f287"
    description={[
      "## 🎉 Thank you <@Nova_Starling> for getting verified — we appreciate your patience! <:Hephi_heart_love:1220157976103485531>",
      "",
      "### 📝 Helpful Info While You're in **Server**:",
      "",
      "- 📜 **[Read the Rules](https://discord.com/channels/734595073920204940/737074569319546921)**",
      "  Make sure you're familiar with the server guidelines.",
      "- 🎭 **[Customize Your Roles](https://discord.com/channels/734595073920204940/750616586578034688)**",
      "  Set up your roles — including your **[DM Status Role](https://discord.com/channels/734595073920204940/750616586578034688/920152665256783903)**!",
      "- 📩 **Respect DM Boundaries**",
      "  If someone has a “DM Ask First” role, be courteous and **[ask here before DMing](https://discord.com/channels/734595073920204940/770397726101471272)**.",
      "",
      "### 📅 Server Events:",
      "",
      "- 🗓️ **[Check Upcoming Events](https://discord.com/channels/734595073920204940/820927836411002890)**",
      "  Stay updated on all scheduled events.",
      "- ❓ **[How to Join Events](https://discord.com/channels/734595073920204940/980342448712724560)**",
      "  Step-by-step guide to getting involved.",
      "",
      "### ⚠️ **Note:**",
      "",
      "**Please do not delete any images.**",
      "A second verification will be performed by a moderator, then all pictures will be automatically removed when the ticket is closed.",
      "-# First verification completed by <@Pip_CutieHelper>.",
    ].join("\n")}
/>
</BotMessage>

<p style={{ fontSize: "0.85rem", color: "var(--ifm-color-emphasis-600)" }}>Admins can edit this text in Orion's bot settings. The last line names the staff member who did the first check.</p>

<details>
<summary><strong>Orion refused the <code>/verify</code>?</strong></summary>

| Orion says                                                                                                            | Why                                                                             |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| This command can only be used in a ticket thread / in verification tickets.                                           | Run it inside the member's **verification** ticket.                             |
| Ticket opener already has an age verified role                                                                        | The member is already verified.                                                 |
| Ticket opener must have the unverified role, VRChat verified role, Blocked VRC Verified role, or Fansly verified role | The member's roles don't match a pending verification. Ask a Moderator.         |
| Cutie Helpers can only verify tickets with status NEW or ID_RECEIVED…                                                 | The first check is already done. The next step is the Moderator's second check. |
| This verification ticket was closed as incomplete…                                                                    | The member was verified another way; nothing to do.                             |

</details>

---

## Documents & Image Requirements

:::warning Important
Only accept official government-issued identification documents.
:::

<CardGrid columns={2}>
  <Card title="Accepted Documents" status="success">
    <ul>
      <li><strong>Driving Licenses</strong>, <strong>Identity Cards</strong>, <strong>Passports</strong> (most common and preferred)</li>
      <li><strong>Military IDs</strong> (accepted but discouraged due to security concerns)</li>
      <li><strong>Insurance Cards</strong> and <strong>Medication IDs</strong> (only if government-issued and recognized as official ID in that country)</li>
    </ul>
    <h5>Conditionals</h5>
    <ul>
      <li><strong>Expired IDs</strong> are fine if expired for <strong>one year or less</strong> and the photo matches the selfie</li>
      <li><strong>Birth Certificates</strong> only as a supplement to a photo ID that does not show the date of birth, or to an expired ID with a picture (never as the main document)</li>
    </ul>
  </Card>
  <Card title="Not Accepted" status="error">
    <ul>
      <li><strong>Temporary Paper IDs</strong></li>
      <li><strong>Private Organization IDs</strong> (e.g., bus IDs)</li>
      <li><strong>School IDs</strong> (unless provided by a government body)</li>
      <li><strong>IDs without online examples</strong> (we can't check them)</li>
      <li><strong>Birth Certificates</strong> as the main document</li>
      <li><strong>Digital IDs</strong></li>
    </ul>
  </Card>
</CardGrid>

**The images must show:**

- A **selfie holding the ID**, with the face matching the ID photo
- The **date of birth**, **expiry date**, and <Tooltip tip="Country or state, and the ID type (driver license, passport, and so on)">issuing body</Tooltip>
- **All four corners** of the ID
- Sunglasses, or censoring the eyes, are allowed in the **selfie**. The eyes on the **ID** may also be censored.

:::warning Unsure about an ID?
Ask fellow Moderators, or compare it with online examples through a Google search.
:::

<details>
<summary><strong>Example of a valid verification</strong></summary>

![Verification Example](@site/static/img/Verification_Option_1-no_text.webp)

</details>

---

## Privacy & Data Handling

:::note Privacy First
Our members' privacy and security are our top priorities.
:::

- A **text-only transcript** is generated and sent to the member.
- The verification ticket is **completely deleted**, including every attachment.
- No sensitive information is stored outside Discord.

For security-related questions, open a **staff-talk** ticket in <ChannelBadge label="🎫open-a-ticket" link="https://discord.com/channels/734595073920204940/1106413750975746070"/>.

---

## After Verification

<RoleBadge role="Eden Verified" color="#00ff00" /> unlocks the <Tooltip tip="Bios, kink sharing, VR name sharing, lewd VR pics, avatar creators, and more">exclusive channels</Tooltip> and adult events, for example: <ChannelBadge label="📄𝘕𝘚𝘍𝘞-𝘉ios"/> <ChannelBadge label="🔞kink-sharing"/> <ChannelBadge label="🎮vr-name-sharing"/> <ChannelBadge label="📸lewd-vr-pics"/> <ChannelBadge label="👾avatar-creators"/> <ChannelBadge label="🎨avatar-support"/>

<Card title="Next: Second Verification (Moderators)" icon="🛡️" href="/docs/server-staff-handbook/verification-process/completion-of-verification">
    <p>The second check, closing the ticket, reminders, and what to do if images get deleted.</p>
  </Card>

---

## Troubleshooting

<details>
<summary><strong>The member cross-verified with VRChat but has no server access</strong></summary>

This is **expected** since July 1, 2026.

- Check <ChannelBadge label="🔗-vrchat-age-logs" link="https://discord.com/channels/734595073920204940/1319750107859779725"/> to confirm they cross-verified. They should have <RoleBadge role="Blocked VRC Verified ❌" color="#d61717" />.
- Direct them to a verification ticket in <ChannelBadge label="🎫open-a-ticket" link="https://discord.com/channels/734595073920204940/1106413750975746070"/> for **Regular ID verification**, or to **Verify Using Fansly** on the ticket panel.
- **Do not manually assign** <RoleBadge role="VRC Verified" color="#00ff00" /> — that role no longer grants access.

</details>

<details>
<summary><strong>The member has VRC Verified but no access</strong></summary>

Existing VRC Verified members received <RoleBadge role="Blocked VRC Verified ❌" color="#d61717" /> automatically on July 1, 2026. They need Regular ID verification or Fansly cross verification to get <RoleBadge role="Eden Verified" color="#00ff00" />. When you complete their verification, Orion removes the VRC Verified roles on its own.

</details>

<details>
<summary><strong>VRChat linking problems</strong></summary>

See <Link to="/docs/server-staff-handbook/verification-process/vrchat-linking-troubleshooting">VRChat Linking & Troubleshooting</Link>.

</details>
