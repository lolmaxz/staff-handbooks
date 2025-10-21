---
id: vrchat-linking-troubleshooting
title: VRChat Linking & Cross Verification Troubleshooting
sidebar_position: 3
---

import ChannelBadge from "@site/src/components/ChannelBadge";
import RoleBadge from "@site/src/components/RoleBadge";
import Tooltip from '@site/src/components/Tooltip';
import DiscordButton from '@site/src/components/DiscordButton';

# VRChat Linking & Cross Verification Troubleshooting

:::info Staff Training
This guide helps staff troubleshoot VRChat account linking and cross age verification issues. Understanding these systems is crucial for providing effective member support.
:::

## Understanding VRChat Linking

VRChat linking is required for several important features:

- **Cross Age Verification** - Using VRChat's age verification system
- **NSFW World Access** - Access to adult content in our VRChat worlds
- **After Party Participation** - Joining exclusive VRChat events
- **Group Instance Creation** - Creating your own instances in our VRChat group

### Linking Rules

:::warning Important

- **One-to-One Relationship**: Each Discord account can only link to ONE VRChat account
- **No Sharing**: If a VRChat account is linked to a Discord account, no other Discord account can link to it
- **Bidirectional**: The same rule applies in reverse - one VRChat account per Discord account
- **New Discord Accounts**: If someone has a new Discord/VRChat account and wants to link to their existing Discord/VRChat counterpart account, **pinging <RoleBadge role="lolmaxz" color="#ff6b6b" /> is 100% required**
  :::

## Staff Tools

### Check Linking Status

All staff members can check a member's linking status:

<div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
  <div style={{ flex: 1 }}>
    **Desktop:**

    1. **Right-click** on their profile picture or username
    2. Go to **Apps** → **Check Linking Status**

    This shows:

    - Whether they're linked
    - Which VRChat account they're linked to
    - Verification status on Discord
    - Patreon status on Discord
    - VRChat group status

  </div>
  <div style={{ flex: 1, textAlign: 'center' }}>
    <img src={require("@site/static/img/vrchat-link-status-demo.png").default} alt="VRChat link status result" width="60%" />
  </div>
</div>

<div style={{ textAlign: 'center' }}>
  <img src={require("@site/static/img/Apps-check-linking-status-demo.png").default} alt="How to access Check Linking Status on desktop" width="40%" />
</div>

<details>
<summary><strong>📱 Mobile Instructions</strong></summary>

**Mobile:**

1. **Click** on someone's profile
2. Tap the **3 dots** in the corner
3. Select **Apps** → **Check Linking Status**

<div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
  <img src={require("@site/static/img/mobile-check-linking-status-1.jpg").default} alt="Mobile step 1 - Click profile and 3 dots" width="30%" />
  <img src={require("@site/static/img/mobile-check-linking-status-2.jpg").default} alt="Mobile step 2 - Select Apps and Check Linking Status" width="30%" />
</div>

</details>

:::tip Pro Tip
This tool is **essential** for troubleshooting - always check this first when members report linking issues!
:::

## Quick Troubleshooting

**Bot not accepting friend requests?**

- Our bot only **detects** requests, doesn't accept them
- Common causes: request sent too late, already linked, or old pending request exists
- **Fix**: Cancel any pending requests and wait for "Send Friend Request" button to reappear

**Can't join after parties?**

- Member is linked but missing VRChat group permissions
- Go to <ChannelBadge label="🪄events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781"/>
- Click <DiscordButton type="primary" emoji="🔃">Click Here To Update VRC Group Roles</DiscordButton>

**Missing verified role after linking?**

- User claims they linked and verified but no role assigned
- Check <ChannelBadge label="🔗-vrchat-age-logs" link="https://discord.com/channels/734595073920204940/1319750107859779725"/>
- If user is listed as verified, manually assign <RoleBadge role="VRC Verified" color="#00ff00" />

**Patreon supporter not showing in VRChat World?**

- User is correctly linked as Patreon but name doesn't appear in VRChat World
- **Ask**: Did they recently change their VRChat username?
- **If yes**: Have them click <DiscordButton type="success" emoji="💾">Update Display Name</DiscordButton> in <ChannelBadge label="📱｜linking-with-vrchat" link="https://discord.com/channels/734595073920204940/1228159292306362368"/>
- **Wait**: ~5 minutes, then rejoin the world
- **Still not working?** Ping <RoleBadge role="lolmaxz" color="#ff6b6b" />

## Escalation Process

If none of the above solutions resolve the issue:

1. **Document the problem** with specific details
2. **Ping <RoleBadge role="lolmaxz" color="#ff6b6b" />** for technical assistance
3. **Include**:
   - Member's Discord username
   - What they're trying to do
   - What error messages they're seeing
   - Results from "Check Linking Status"

## Additional Resources

- **VRChat Linking Channel**: <ChannelBadge label="📱｜linking-with-vrchat" link="https://discord.com/channels/734595073920204940/1228159292306362368"/>
- **Events Attendees**: <ChannelBadge label="🪄events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781"/>
- **VRChat Age Logs**: <ChannelBadge label="🔗-vrchat-age-logs" link="https://discord.com/channels/734595073920204940/1319750107859779725"/>

:::info
For more detailed information about the VRChat verification process, see the [Verification Requirements](./verification-requirements) page.
:::
