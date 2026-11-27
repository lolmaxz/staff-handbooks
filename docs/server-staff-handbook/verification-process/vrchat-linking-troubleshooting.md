---
id: vrchat-linking-troubleshooting
title: VRChat Linking & Troubleshooting
---

import ChannelBadge from "@site/src/components/ChannelBadge";
import RoleBadge from "@site/src/components/RoleBadge";
import DiscordButton from '@site/src/components/DiscordButton';
import DiscordConversation, { DiscordMessage } from "@site/src/components/DiscordConversation";
import ContextMenuChain, { ContextMenuItem } from "@site/src/components/ContextMenuItem";
import CardGrid, { Card } from '@site/src/components/CardGrid';
import Link from "@docusaurus/Link";

# VRChat Linking & Troubleshooting

Members link their VRChat account to Discord in <ChannelBadge label="📱｜linking-with-vrchat" link="https://discord.com/channels/734595073920204940/1228159292306362368"/>. This page helps staff check a member's link and fix the most common problems.

:::note Not a verification method
VRChat cross verification no longer grants server access. For members asking about access, see <Link to="/docs/server-staff-handbook/verification-process/verification-requirements#troubleshooting">How To Verify Members — Troubleshooting</Link>.
:::

## What Linking Is For

<CardGrid columns={3}>
  <Card title="NSFW World Access" icon="🔞">
    <p>Adult content in our VRChat worlds.</p>
  </Card>
  <Card title="After Parties & Events" icon="🎉">
    <p>Joining events and exclusive VRChat afterparties.</p>
  </Card>
  <Card title="Group Instances" icon="🏠">
    <p>Creating their own instances in our VRChat group.</p>
  </Card>
</CardGrid>

:::warning Linking Rules
- **One-to-one**: each Discord account can link to only **one** VRChat account, and each VRChat account to only **one** Discord account.
- **No sharing**: once a VRChat account is linked, no other Discord account can link to it.
- **New accounts**: if someone has a new Discord or VRChat account and wants to link it to their existing counterpart, **pinging <RoleBadge role="maxbunni" color="#ff6b6b" /> is 100% required**.
:::

---

## Check Linking Status

Any staff member can check a member's link. **Always start here** when someone reports a linking issue.

**Desktop:** right-click the member's profile picture or username, then:

<ContextMenuChain>
  <ContextMenuItem label="Apps" />
  <ContextMenuItem label="Hephia V2" image={require("@site/static/img/sandbox/hephia-v2-avatar.png").default} />
  <ContextMenuItem label="Check Linking Status" />
</ContextMenuChain>

**Mobile:** tap the member's profile, tap the **3 dots** in the corner, then the same path: **Apps** → **Hephia V2** → **Check Linking Status**.

<div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
  <div style={{ flex: 1, minWidth: '14rem' }}>
    <p>It shows:</p>
    <ul>
      <li>Whether they're linked</li>
      <li>Which VRChat account they're linked to</li>
      <li>Their verification status on Discord</li>
      <li>Their Patreon status on Discord</li>
      <li>Their VRChat group status</li>
    </ul>
  </div>
  <div style={{ flex: 1, textAlign: 'center', minWidth: '14rem' }}>
    <img src={require("@site/static/img/vrchat-link-status-demo.png").default} alt="VRChat link status result" width="60%" />
  </div>
</div>

<details>
<summary><strong>📱 Mobile screenshots</strong></summary>

<div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
  <img src={require("@site/static/img/mobile-check-linking-status-1.jpg").default} alt="Mobile step 1 - Tap the profile and the 3 dots" width="30%" />
  <img src={require("@site/static/img/mobile-check-linking-status-2.jpg").default} alt="Mobile step 2 - Apps then Check Linking Status" width="30%" />
</div>

</details>

---

## Common Problems

<details>
<summary><strong>The bot isn't accepting the friend request</strong></summary>

- The bot only **detects** friend requests; it never accepts them.
- Common causes: the request was sent too late, the account is already linked, or an old request is still pending.
- **Fix:** cancel any pending requests, wait for the **Send Friend Request** button to reappear, then send a fresh request.

</details>

<details>
<summary><strong>Can't join afterparties</strong></summary>

The member is linked but missing their VRChat group permissions. In <ChannelBadge label="🪄events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781"/>, have them click <DiscordButton type="primary" emoji="🔃">Click Here To Update VRC Group Roles</DiscordButton>.

</details>

<details>
<summary><strong>A Patreon supporter doesn't show in the VRChat world</strong></summary>

They are linked as Patreon, but their name doesn't appear in the world.

1. **Ask:** did they recently change their VRChat username?
2. **If yes:** have them click <DiscordButton type="success" emoji="💾">Update Display Name</DiscordButton> in <ChannelBadge label="📱｜linking-with-vrchat" link="https://discord.com/channels/734595073920204940/1228159292306362368"/>.
3. **Wait** about 5 minutes, then rejoin the world.
4. **Still not working?** Ping <RoleBadge role="maxbunni" color="#ff6b6b" />.

</details>

### Example

<DiscordConversation id="vrchat-linking-ticket" title="VRChat Linking Ticket">
  <DiscordMessage name="Member 1" color="#5865f2" message="Hi! I'm trying to link my VRChat account but the bot isn't accepting my friend request." />
  <DiscordMessage name="Cutie Helper 1" color="#38c8e8" message="I can help with that! Let me check your linking status first. [Checking status...]" />
  <DiscordMessage
    name="Cutie Helper 1"
    color="#38c8e8"
    message="I see you already have a pending friend request. The bot only detects requests, it doesn't accept them. Please cancel any pending requests and wait for the 'Send Friend Request' button to reappear in the linking channel."
  />
  <DiscordMessage name="Member 1" color="#5865f2" message="Oh I see! I cancelled it. Now I'll wait for the button to come back." />
  <DiscordMessage
    name="Cutie Helper 1"
    color="#38c8e8"
    message="Perfect! Once you send a fresh request, it should process automatically. Let me know if you still have issues after that."
  />
</DiscordConversation>

---

## Still Stuck? Escalate

1. **Document the problem** with specific details.
2. **Ping <RoleBadge role="maxbunni" color="#ff6b6b" />** for technical help, and include:
   - The member's Discord username
   - What they're trying to do
   - Any error messages they see
   - The result of **Check Linking Status**

**Useful channels:** <ChannelBadge label="📱｜linking-with-vrchat" link="https://discord.com/channels/734595073920204940/1228159292306362368"/> <ChannelBadge label="🪄events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781"/> <ChannelBadge label="🔗-vrchat-age-logs" link="https://discord.com/channels/734595073920204940/1319750107859779725"/> <ChannelBadge label="🎫open-a-ticket" link="https://discord.com/channels/734595073920204940/1106413750975746070"/>
