---
id: closing-out-verifications
title: Closing Out Verifications
---

import RoleBadge from "@site/src/components/RoleBadge";
import ChannelBadge from "@site/src/components/ChannelBadge";
import Tooltip from "@site/src/components/Tooltip";
import DiscordButton from '@site/src/components/DiscordButton';

# Closing Out Verifications

A second check of the verification ticket is required:

- Any <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> will perform this step for <RoleBadge role="Cutie Helpers" badgeIcon="cutie_helper_role_icon.png" color="#308027" /> initial verifications.
- If a <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> did the initial verification, a separate second moderator shall close out the ticket.

## Procedure

---

### Role Selection

- Ensure the <RoleBadge role="Unverified" badgeIcon="unverified_role_icon.png" color="#de0000" /> is <Tooltip tip="Hephia will automatically remove the unverified role when a member is granted the verified role." bubbleColor="#d255ec" width="20rem" labelColor="#e68027"> removed </Tooltip> from the member and <RoleBadge role="Verified" color="#008800" /> has been given to the member.
- Ensure the member has selected appropriate roles.
- Verify the age role/tag they selected matches the age of the member to prevent members from faking their age. (When possible, we don't enforce this)

---

### Reminder Pings

- Send up to <Tooltip tip="Reminders can only be sent 24h apart and at least 12h after the ticket was opened." bubbleColor="#d255ec" width="20rem" labelColor="#e68027"> **2 reminder pings** </Tooltip> after the welcome message. Use <code>/reminder</code> in the ticket—optional custom message, or use the default.
- If no roles are selected after **48 hours**, you may proceed to close the ticket if verification is satisfactory. (optional)

---

### Closing the Ticket

Verification completion is done via **<code>/verify</code>** in the ticket thread or the <DiscordButton type="success" emoji="✅">Verify</DiscordButton> button on the Orion Board (Verifications → click the ticket). After verification, close the ticket.

:::tip No reason required
**You no longer need to specify a reason** when closing verification tickets. This was previously required (e.g. "Verification Complete - [Name] Closed By- [Name]")—it is **no longer needed**. Orion Board tracks who did what automatically.
:::

<div style={{ maxWidth: "600px" }}>
  <img src={require("@site/static/img/orion-verify-button-ticket.png").default} alt="Verify button on verification ticket page" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Verify button on the verification ticket page.</p>
</div>

---

### No Response Cases

- If the user hasn't responded or provided an ID after **72 hours**, you can close the ticket with the reason: `"No Response >72hrs"`
- For tickets without any post from the user for verification after **48 hours**, use: `"No Verification in >48hrs"`

## Related

- [Completion of Verification](/docs/server-staff-handbook/verification-process/completion-of-verification)
- [Orion Board: Verification](/docs/general-handbook/orion-board/orion-board-verification)
