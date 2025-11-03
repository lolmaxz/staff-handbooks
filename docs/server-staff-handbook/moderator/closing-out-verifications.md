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
- Verify the age role/tag they selected matches the age of the member to prevent members from faking their age. (When possible)

---

### Reminder Pings

- Send up to <Tooltip tip="~24 hours between reminders" bubbleColor="#d255ec" width="13rem" labelColor="#e68027"> **2 reminder pings** </Tooltip> after the welcome message.
- If no roles are selected after **48 hours**, you may proceed to close the ticket if verification is satisfactory.

---

### Closing the Ticket

- Use the <DiscordButton type="error" emoji="🔒">Close With Reason</DiscordButton> button of the ticket bot. _(It should be at the top of the ticket)_
- The reason should be: `"Verification Complete - [Name of staff member who did verification] Closed By- [Name of staff member who performed the second check]"`
  <div style={{ marginTop: "0.5rem" }} />
  :::note Example - HOW TO
  "Verification Complete - Del Closed By- Solii"
  :::
  :::warning Always Include a Reason
  All tickets must be closed with a reason. The reason must clearly state **who handled the verification** and **who closed the ticket**. Tickets should never be closed without a reason attached.
  :::
  :::info Let's stay organized!
  Properly closing out tickets ensures accurate record-keeping and helps maintain an organized verification process.
  :::

---

### No Response Cases

- If the user hasn't responded or provided an ID after **72 hours**, you can close the ticket with the reason: `"No Response >72hrs"`
- For tickets without any post from the user for verification after **48 hours**, use: `"No Verification in >48hrs"`

:::danger HEPHIA IS OFFLINE
When closing verification tickets; <u>**double check that hephia is online first!!**</u> If Hephia is <u>**offline**</u> you will have to manually delete the verification threads after closing with the bot.
:::

## Related

- [Completion of Verification](./verification-process/completion-of-verification)
- [Verification Checklist](./verification-process/verification-checklist)
- [GitHub Records](./github-records)
