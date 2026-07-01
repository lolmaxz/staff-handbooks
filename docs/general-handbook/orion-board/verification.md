---
id: orion-board-verification
title: Verification
---

import RoleBadge from "@site/src/components/RoleBadge";
import ChannelBadge from "@site/src/components/ChannelBadge";
import CommandCard from "@site/src/components/CommandCard";
import DiscordButton from "@site/src/components/DiscordButton";
import CardGrid, { Card } from "@site/src/components/CardGrid";
import Tooltip from "@site/src/components/Tooltip";

# Verification in Orion Board

Verification confirms members are 18+ to access adult content. Members open verification tickets from <ChannelBadge label="🎫open-a-ticket" link="https://discord.com/channels/734595073920204940/1106413750975746070"/>. Staff complete verification using <code>/verify</code> or the Verify button on the Orion Board.

:::warning VRChat Cross Verification Retired — July 1, 2026
As of **July 1, 2026 at 2:00 PM EST**, VRChat age cross verification **no longer grants server access**. Members can still cross-verify through VRChat (button: **VRChat (Temp Disabled)**), but this is preserved only in case we revert the decision. Cross-verifying assigns <RoleBadge role="Blocked VRC Verified ❌" color="#d61717" /> instead of unlocking the server.
:::

---

## Verification Panel Options

When members open a verification ticket, they choose from:

| Option                      | Description                                                                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Regular ID**              | Government-issued ID with selfie. Handled by the ticket bot. Grants <RoleBadge role="Eden Verified" color="#00ff00" /> when completed by staff. |
| **VRChat (Temp Disabled)**  | Uses <Tooltip tip="Hephia V2 is used for our VRChat age verification system">Hephia V2</Tooltip>. **Does not grant server access.** Handled by Hephia, not the ticket bot. Assigns <RoleBadge role="Blocked VRC Verified ❌" color="#d61717" />. |
| **Verify Using Fansly**     | Fansly creator cross verification. Handled by the ticket bot. Requires a verified Fansly creator account (blue checkmark on profile). Does not grant <RoleBadge role="Eden Verified" color="#00ff00" /> on its own — members still need a verification ticket for full access. |

### Fansly Cross Verification

To use Fansly cross verification from the ticket panel:

1. Create a Fansly account at [fansly.com](https://fansly.com) and complete **creator verification**.
2. A **blue checkmark** on their Fansly profile means they are ready to use our system.
3. Creator verification typically takes **1 hour to a few hours**.
4. Once verified on Fansly, they can use **Verify Using Fansly** from the ticket panel.

### Upgrading to Eden Verified

Members with <RoleBadge role="VRC Verified" color="#00ff00" /> or Fansly verification can gain full server access by:

- **Regular ID verification** — open a verification ticket in Eden, or
- **Fansly cross verification** — via the ticket panel, then complete Eden verification if needed

**VRC Verified and Fansly Verified members can now open verification tickets** to obtain the <RoleBadge role="Eden Verified" color="#00ff00" /> role (this was not possible before).

---

## /verify is the ONLY Way to Verify

:::danger
**Staff cannot manually assign the Eden Verified role.** You must use one of these:
:::

1. **<code>/verify</code>** — Run in the verification ticket thread in Discord. No options; just run the command.
2. **Verify button** — On the Orion Board: Verifications → click the ticket → click the Verify button.

<CommandCard cmd="/verify" perms="Cutie Helper, Moderator" cardColor="green">
  Completes verification. Cutie Helper: initial only. Moderator: initial or final (a different person must do final). Must be in the verification ticket thread. When verifying a member who had <RoleBadge role="VRC Verified" color="#00ff00" /> or <RoleBadge role="Blocked VRC Verified ❌" color="#d61717" />, Orion automatically removes those roles and grants <RoleBadge role="Eden Verified" color="#00ff00" />.
</CommandCard>

<DiscordButton type="success" emoji="✅">Verify</DiscordButton> — Click this on the verification ticket page in Orion Board to complete verification.

---

## Hephia, Orion, and Role Rules

- **Hephia/Orion** removes the Unverified role when verification completes. Staff do not assign roles manually.
- **Unverified** can be removed manually **only** when the user already has a verification role. It cannot be removed otherwise—this is a protection measure.
- **Only admins** can bypass and make manual changes without Hephia rollback.
- **Upgrading VRC Verified members:** When staff complete ID verification for a member with <RoleBadge role="VRC Verified" color="#00ff00" /> or <RoleBadge role="Blocked VRC Verified ❌" color="#d61717" />, Orion removes those roles and grants <RoleBadge role="Eden Verified" color="#00ff00" /> automatically. No manual role changes needed.
- **Second verification fix:** If a member needs to fix their verification on the second review, Orion now removes the <RoleBadge role="Unverified" color="#ff0000" /> role automatically when <RoleBadge role="Eden Verified" color="#00ff00" /> is still present—moderators no longer need to remove Unverified manually.

---

## Important Behaviors

- No more than 1 verification ticket per user at a time
- <RoleBadge role="Eden Verified" color="#00ff00" /> is the role that grants full server access (formerly called "Verified")
- **VRChat verify while ticket is open:** If a user has an open verification ticket and cross-verifies with VRChat, the system **warns them that it is not enough**. The ticket is **not** scheduled for auto-deletion.
- **Verified elsewhere while ticket is open (Eden Verified):** If a user has an open verification ticket and becomes fully verified through another valid means, the system detects it. The ticket receives a message with a button for the opener to **close the ticket**. If they do nothing, the ticket is auto-deleted 24 hours after that message.
- Verification tickets are auto-deleted 1 min after close when the opener sent attachments or image links (sensitive content removal)
- If the user leaves the server, tickets auto-close
- **<code>/reminder</code>** — Use to ping the ticket opener when it's been over 24h since the last reply request. Reminders can only be sent **24h apart** and **at least 12h after the ticket was opened**. Optional custom message; a default reminder is available.
- <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" />: initial verification only
- <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" />: final verification (a different person must do final). A Moderator cannot verify if they did the initial verification.

---

<div style={{ maxWidth: "800px", marginBottom: "2rem" }}>
  <img src={require("@site/static/img/orion-verification-ticket-page.png").default} alt="Verification ticket page with Verify button" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Verification ticket detail page with Verify button.</p>
</div>

<div style={{ maxWidth: "600px" }}>
  <img src={require("@site/static/img/orion-verify-command-discord.png").default} alt="/verify command in Discord ticket" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Using /verify in a Discord ticket thread.</p>
</div>
