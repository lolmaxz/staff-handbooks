---
id: completion-of-verification
title: Second Verification
---

import RoleBadge from "@site/src/components/RoleBadge";
import DiscordButton from "@site/src/components/DiscordButton";
import Tooltip from "@site/src/components/Tooltip";
import SlashCommand from "@site/src/components/SlashCommand";
import StepTimeline from "@site/src/components/StepTimeline";
import DiscordMessage, { DiscordEmbed, DiscordActionRow, DiscordRowButton } from "@site/src/components/DiscordMessage";
import Link from "@docusaurus/Link";

# Second Verification

:::info Moderators only
The second verification is done by a <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> who did **not** do the first check. If a Moderator did the first check, a **different** Moderator does the second one — Orion refuses <code>/verify</code> from the same person.
:::

The first check (by a <RoleBadge role="Cutie Helper" badgeIcon="cutie_helper_role_icon.png" color="#38c8e8" /> or Moderator) is covered in <Link to="/docs/server-staff-handbook/verification-process/verification-requirements">How To Verify Members</Link>. By the time you arrive, the member already has <RoleBadge role="Eden Verified" color="#00ff00" /> and Orion's welcome message is in the ticket.

<StepTimeline
  title="Second verification"
  size="sm"
  accentColor="#e68027"
  steps={[
    { label: "Review", detail: "Images + roles", recap: "Re-check the images with the checklist, and the member's roles." },
    { label: "Remind", detail: "Up to 2 pings", recap: "If roles aren't picked yet, ping with /reminder (max 2)." },
    { label: "/verify", detail: "Final check", recap: "Run /verify again. Orion posts the final message." },
    { label: "Auto-close", detail: "1 hour", recap: "The ticket closes itself after 1 hour and the images are deleted." },
  ]}
/>

---

## 1. Review the Ticket

- Re-check the images with the <Link to="/docs/server-staff-handbook/verification-process/verification-requirements#verification-checklist">verification checklist</Link>.
- The member has <RoleBadge role="Eden Verified" color="#00ff00" />, and <RoleBadge role="Unverified" badgeIcon="unverified_role_icon.png" color="#de0000" /> is <Tooltip tip="Orion removes the Unverified role on its own when the member has Eden Verified." bubbleColor="#d255ec" width="20rem" labelColor="#e68027">gone</Tooltip>.
- The member picked their roles, and the age role/tag they picked matches their age (to prevent faking ages — check it when possible, we don't enforce it).

:::danger The member deleted their images
Ask them to repost the images so you can double-check. If they don't comply in a timely manner, give back their <RoleBadge role="Unverified" color="#ff0000" /> role and tell them their verification is temporarily revoked.

**Do not** remove <RoleBadge role="Eden Verified" color="#00ff00" /> by hand. <RoleBadge role="Unverified" color="#ff0000" /> alone is enough to block verified channels. Unverified can only be removed by hand when the member already has a verification role (a protection; only admins can bypass it).
:::

## 2. Remind the Member (if needed)

- Send up to <Tooltip tip="Cooldown and who gets pinged: Slash Commands — /reminder." bubbleColor="#d255ec" width="18rem" labelColor="#e68027">**2 reminder pings**</Tooltip> with <code>/reminder</code> in the ticket. See [Slash Commands — /reminder](/docs/general-handbook/orion-board/orion-board-commands).
- If no roles are picked after **48 hours**, you may finish the verification anyway when everything else is good (optional).

## 3. Run `/verify` Again

<SlashCommand
  command="verify"
  description="Verify a member's ID verification ticket"
  bot="Orion Board"
  avatar={require("@site/static/img/orion-board-profile.png").default}
  plus
/>

Or press <DiscordButton type="success" emoji="✅">Verify</DiscordButton> on the ticket in the Orion Board (Verifications → click the ticket).

<div style={{ maxWidth: "600px" }}>
  <img src={require("@site/static/img/orion-verify-button-ticket.png").default} alt="Verify button on verification ticket page" style={{ width: "100%", display: "block" }} />
  <p style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", margin: "0.15rem 0 0", padding: "0.35rem 0.5rem", backgroundColor: "var(--ifm-color-emphasis-200)", textAlign: "center" }}>Verify button on the verification ticket page.</p>
</div>

Orion replies to you privately with **✅ Final verification completed successfully!** and posts this in the ticket:

<DiscordMessage
  username="Orion Board"
  avatar={require("@site/static/img/orion-board-profile.png").default}
  timestamp="Today at 4:05 PM"
  app
>
  <DiscordEmbed
    accent={false}
    description={"✅ Second verification completed by <@Moderator>. This ticket will automatically close in 1 hour, and all attachments will be deleted."}
  />
  <DiscordActionRow>
    <DiscordRowButton type="danger">Close Ticket Now</DiscordRowButton>
  </DiscordActionRow>
</DiscordMessage>

- The ticket **closes itself after 1 hour**. The member can close it sooner with **Close Ticket Now**.
- **No closing reason is needed** anymore (the old "Verification Complete - [Name] Closed By- [Name]"). Orion Board tracks who did what.

:::warning Orion says "This looks like a first-check fix"
Orion refuses the final <code>/verify</code> when the member still has <RoleBadge role="Unverified" color="#ff0000" />, or posted new pictures after the first check. Send the ticket back to the first check with <code>/unverify</code> (reason optional). It also removes the member's <RoleBadge role="Eden Verified" color="#00ff00" />. The next <code>/verify</code> is then a first check again.
:::

---

## No Response Cases

Close the ticket with these reasons:

| Situation | Reason |
| --- | --- |
| No reply or no ID after **72 hours** | `No Response >72hrs` |
| No post at all for verification after **48 hours** | `No Verification in >48hrs` |

## Related

- [How To Verify Members](/docs/server-staff-handbook/verification-process/verification-requirements)
- [Orion Board: Verification](/docs/general-handbook/orion-board/orion-board-verification)
