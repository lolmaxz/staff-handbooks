---
id: completion-of-verification
title: Completion Of Verification
---

import RoleBadge from "@site/src/components/RoleBadge";
import ChannelBadge from "@site/src/components/ChannelBadge";

# Initial Verification Process Complete

:::warning MUTUAL EXCLUSIVITY

No member should ever have both the <RoleBadge role="VRC Verified" color="#00ff00" /> role and the regular <RoleBadge role="Verified" color="#00ff00" /> role at the same time. If someone tries to do go through the ID verification process while having the <RoleBadge role="VRC Verified" color="#00ff00" /> role, you may inform them that only one form of verification is needed. If they want to go through the ID verification process, please remove the <RoleBadge role="VRC Verified" color="#00ff00" /> role when you give them the <RoleBadge role="Verified" color="#00ff00" /> role.

:::
Once initial verification meets all required criteria:

1. **Welcome Message**:

   - Send a welcome message to the member.
   - Include important channels and information (see template below).

2. **Adjust Roles**:

   - Assign the <RoleBadge role="Verified" color="#00ff00" /> role.
   - If the bot (Hephia) is down, manually remove the <RoleBadge role="Unverified" color="#ff0000" /> role.

:::danger Verification Image Deletion
If the member deletes their verification images after the initial verification is completed, please ask them to repost the images in order for a moderator to double check the verification. If they do not comply in a timely manner, you are allowed to give back their <RoleBadge role="Unverified" color="#ff0000" /> role and inform them that their verification has been temporarily revoked.
:::

## Welcome Message Template

You can customize the welcome message, but it should include the following:

```markdown
## 🎉 Thank you _@User_ for getting verified — we appreciate your patience! <:Hephi_heart_love:1220157976103485531>

### 📝 Helpful Info While You're in **Server**:

- 📜 **[Read the Rules](https://discord.com/channels/734595073920204940/737074569319546921)**  
  Make sure you're familiar with the server guidelines.
- 🎭 **[Customize Your Roles](https://discord.com/channels/734595073920204940/750616586578034688)**  
  Set up your roles — including your **[DM Status Role](https://discord.com/channels/734595073920204940/750616586578034688/920152665256783903)**!
- 📩 **Respect DM Boundaries**  
  If someone has a “DM Ask First” role, be courteous and **[ask here before DMing](https://discord.com/channels/734595073920204940/770397726101471272)**.

### 📅 Server Events:

- 🗓️ **[Check Upcoming Events](https://discord.com/channels/734595073920204940/820927836411002890)**  
  Stay updated on all scheduled events.
- ❓ **[How to Join Events](https://discord.com/channels/734595073920204940/980342448712724560)**  
  Step-by-step guide to getting involved.

### ⚠️ **Note:**

**Please do not delete any images.**  
They will be automatically removed when the ticket is closed.
```
