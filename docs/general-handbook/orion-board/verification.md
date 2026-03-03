---
id: orion-board-verification
title: Verification
---

import RoleBadge from "@site/src/components/RoleBadge";
import CommandCard from "@site/src/components/CommandCard";
import DiscordButton from "@site/src/components/DiscordButton";
import CardGrid, { Card } from "@site/src/components/CardGrid";
import Tooltip from "@site/src/components/Tooltip";

# Verification in Orion Board

Verification confirms members are 18+ to access adult content. Members open verification tickets from the ticket panel. Staff complete verification using <code>/verify</code> or the Verify button on the Orion Board.

---

## Verification Panel Options

When members open a verification ticket, they choose from:

| Option                      | Description                                                                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Regular ID**              | Government-issued ID with selfie. Handled by the ticket bot.                                                                                  |
| **VRChat Age Verification** | Uses <Tooltip tip="Hephia V2 is used for our VRChat age verification system">Hephia V2</Tooltip> only. Handled by Hephia, not the ticket bot. |
| **Fansly Age Verification** | If enabled. Handled by the ticket bot.                                                                                                        |

---

## /verify is the ONLY Way to Verify

:::danger
**Staff cannot manually assign the Verified role.** You must use one of these:
:::

1. **<code>/verify</code>** — Run in the verification ticket thread in Discord. No options; just run the command.
2. **Verify button** — On the Orion Board: Verifications → click the ticket → click the Verify button.

<CommandCard cmd="/verify" perms="Cutie Helper, Moderator" cardColor="green">
  Completes verification. Cutie Helper: initial only. Moderator: initial or final (a different person must do final). Must be in the verification ticket thread.
</CommandCard>

<DiscordButton type="success" emoji="✅">Verify</DiscordButton> — Click this on the verification ticket page in Orion Board to complete verification.

---

## Hephia and Role Rules

- **Hephia** removes the Unverified role when verification completes. Staff do not assign roles manually.
- **Unverified** can be removed manually **only** when the user already has a verification role. It cannot be removed otherwise—this is a protection measure.
- **Only admins** can bypass and make manual changes without Hephia rollback.

---

## Important Behaviors

- No more than 1 verification ticket per user at a time
- Only 1 verification type per member (<RoleBadge role="VRC Verified" color="#00ff00" /> OR regular <RoleBadge role="Verified" color="#00ff00" />, not both)
- **Verified elsewhere while ticket is open:** If a user has an open verification ticket and gets verified through another means (e.g., VRChat/Hephia), the system detects it. The ticket receives a message with a button for the opener to **close the ticket**. If they do nothing, the ticket is auto-deleted 24 hours after that message.
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
