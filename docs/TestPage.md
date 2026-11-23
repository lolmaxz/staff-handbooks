---
id: new-component
title: New Components Explained!
---

import React, { useState } from 'react';
import Checklist from '@site/src/components/Checklist';
import TextWithButton from "@site/src/components/TextWithButton";
import RoleBadge from "@site/src/components/RoleBadge";
import ChannelBadge from "@site/src/components/ChannelBadge";
import Tooltip from "@site/src/components/Tooltip";
import CommandCard from '@site/src/components/CommandCard';
import AuditFlag from '@site/src/components/AuditFlag';
import RoleMatrix from '@site/src/components/RoleMatrix';
import Timestamp from '@site/src/components/Timestamp';
import DiscordButton from '@site/src/components/DiscordButton';
import CardGrid, { Card } from '@site/src/components/CardGrid';
import Spoiler from '@site/src/components/Spoiler';
import DiscordConversation, { DiscordMessage } from '@site/src/components/DiscordConversation';
import ContentWithThumbnail from '@site/src/components/ContentWithThumbnail';
import ResponsiveScreenshot from '@site/src/components/ResponsiveScreenshot';
import SegmentToggle from '@site/src/components/SegmentToggle';
import MultiSegmentToggle from '@site/src/components/MultiSegmentToggle';
import StepTimeline from '@site/src/components/StepTimeline';
import ContextMenuChain, { ContextMenuItem } from '@site/src/components/ContextMenuItem';
import EmbedMessage, { DiscordEmbed, DiscordField, DiscordActionRow, DiscordRowButton, DiscordSelect } from '@site/src/components/DiscordMessage';
import SlashCommand from '@site/src/components/SlashCommand';
import VideoCarousel from '@site/src/components/VideoCarousel';

# New Components Explained

This page provides examples and clear explanations for all our custom components, so everyone understands their functionality and usage.

---

## Text With Button

**Component:** `TextWithButton`  
**Description:** Displays a text prompt with an actionable button that links to a resource. Perfect for highlighting downloadable files or external links.

**Required Import:**

```jsx
import TextWithButton from "@site/src/components/TextWithButton";
```

**Live Example:**

<TextWithButton
  text="Need the quick-reference PDF version of the Incident‑Response Cheat‑Sheet?"
  buttonLabel="Download PDF"
  buttonHref="#"
/>

<details>
<summary>Show code</summary>

```jsx
<TextWithButton
  text="Need the quick-reference PDF version of the Incident‑Response Cheat‑Sheet?"
  buttonLabel="Download PDF"
  buttonHref="#"
/>
```

</details>

---

## Role Badge

**Component:** `RoleBadge`  
**Description:** Renders a badge showing a role's name along with optional icons and colors. Use it to visually represent staff roles or permissions. **NEW:** Now includes automatic color presets for common roles!

**Required Import:**

```jsx
import RoleBadge from "@site/src/components/RoleBadge";
```

**Live Examples:**

**With Custom Color:**
<RoleBadge role="Potato" badgeIcon="admin_role_icon.png" color="#db1cb8" />

<details>
<summary>Show code</summary>

```jsx
<RoleBadge role="Potato" badgeIcon="admin_role_icon.png" color="#db1cb8" />
```

</details>

**With Auto Color Presets:**
<RoleBadge role="Moderator" />
<RoleBadge role="Helper" />
<RoleBadge role="Admin" />
<RoleBadge role="Event Host" />
<RoleBadge role="lolmaxz" />

<details>
<summary>Show code</summary>

```jsx
<RoleBadge role="Moderator" />
<RoleBadge role="Helper" />
<RoleBadge role="Admin" />
<RoleBadge role="Event Host" />
<RoleBadge role="lolmaxz" />
```

</details>

**Available Preset Colors:**

- **Department Positions**: Lewd Governor (#db1cb8), Admin (#db1cb8), HR (#2a6eef), Committee Members (#db1cb8), Event Committee (#00e6c3)
- **Event Team Heads**: Event Team Head (#f75edb), Head Moderator (#db1cb8), Head of Security (#3fa7ff)
- **Event Team**: Senior Event Team (#ffc857), Event Host (#a259f7), Event Security (#ff5e5b), Event Team Trial (#3fa7ff)
- **Staff Roles**: Moderator (#e68027), Helper (#38c8e8)
- **Staff Members**: lolmaxz, krenki, s4.ryn, Solii, verbaldrop, nightmarediztydoo, defovr, zerohour1998, cobramaia, vervacious\_ (#00B9ff)

A preset color can still be overridden:

<RoleBadge role="Moderator" color="#ff0000" />

<details>
<summary>Show code</summary>

```jsx
<RoleBadge role="Moderator" color="#ff0000" />
```

</details>

---

## Channel Badge

**Component:** `ChannelBadge`  
**Description:** Creates a clickable badge that links to a specific channel and supports variants to visually distinguish between channel types.

Leave out `link` when you don't have the real channel ID yet. The badge then shows without a link, instead of sending people to the wrong channel.

**Required Import:**

```jsx
import ChannelBadge from "@site/src/components/ChannelBadge";
```

**Live Example:**

Make sure to read the <ChannelBadge label="Rules" link="#" /> channel rules before posting in the <ChannelBadge variant="post" label="introductions" link="#" /> channel.

Here are some examples of Channel Tags:

<ChannelBadge label="Rules" link="#" />
<ChannelBadge variant="thread" label="ticket‑9876" link="#" color="#248046" />
<ChannelBadge variant="post" label="introductions" link="#" />
<ChannelBadge variant="vc" label="💦 Horny Time" link="#" />

<details>
<summary>Show code</summary>

```jsx
<ChannelBadge label="Rules" link="#" />

<ChannelBadge variant="post" label="introductions" link="#" />

<ChannelBadge variant="thread" label="ticket‑9876" link="#" color="#248046" />

<ChannelBadge variant="vc" label="💦 Horny Time" link="#" />
```

</details>

---

## Checklist

**Component:** `Checklist`
**Description:** Organizes a list of checklist items for process verification or step-by-step tasks. In addition to styling individual items, the Checklist supports a custom color option that affects the border, checkboxes, and filling bar.

**Required Import:**
```jsx
import Checklist from '@site/src/components/Checklist';
```

**Live Example with Color Picker (see below):**

export function LiveColourChecklist() {
const [color, setColor] = useState('#800080');
return (
<>
<input
type="color"
value={color}
onChange={e => setColor(e.target.value)}
style={{ marginBottom: '1rem' }}
/>
<Checklist
        checklistId="demo"
        title="ID & Selfie Verification"
        borderColor={color}
      >
<Checklist.Item id="a">Demo item</Checklist.Item>
<Checklist.Item id="b">Another item</Checklist.Item>
<Checklist.Item id="c">Another item</Checklist.Item>
<Checklist.Item id="selfie-one-id">Selfie with one ID <u>Test</u></Checklist.Item>
<Checklist.Item id="id-issuer-visible">• Issuer (government / state / country) is visible</Checklist.Item>
<Checklist.Item id="id-dob-visible">• DOB is visible</Checklist.Item>
</Checklist>
</>
);
}

<LiveColourChecklist />

<details>
<summary>Show code</summary>

```jsx
<Checklist checklistId="demo" title="ID & Selfie Verification" borderColor="#800080">
  <Checklist.Item id="selfie-one-id">Selfie with one ID</Checklist.Item>
  <Checklist.Item id="id-issuer-visible">• Issuer (government / state / country) is visible</Checklist.Item>
  <Checklist.Item id="id-dob-visible">• DOB is visible</Checklist.Item>
</Checklist>
```

</details>

---

## Tooltip

**Component:** `Tooltip`  
**Description:** Wraps text to provide additional hover information. Customizable colors and an option to remove default text decorations enhance clarity.

**Required Import:**

```jsx
import Tooltip from "@site/src/components/Tooltip";
```

**Usage Examples:**

1. **Without Decoration:**

Live Example:

<Tooltip bubbleColor="blue" noDecoration="true" tip="Text Decoration is optional, but turned on by default!">Underlined Text</Tooltip>

<details>
<summary>Show code</summary>

```jsx
<Tooltip bubbleColor="blue" noDecoration="true" tip="Text Decoration is optional, but turned on by default!">
  Underlined Text
</Tooltip>
```

</details>

2. **Colored Tooltip and Text:**

Live Example:

Amazing <Tooltip tip="The Color of the Text and the bubble can be customized independently." bubbleColor="#248046" labelColor="#34d399">colored text</Tooltip> can be used.

<details>
<summary>Show code</summary>

```jsx
<Tooltip tip="The Color of the Text and the bubble can be customized independently." bubbleColor="#248046" labelColor="#34d399">
  colored text
</Tooltip>
```

</details>

3. **Default Tooltip:**

Live Example:

Default <Tooltip tip="Simply specify the tip and the default color (#5865F2) will be applied."> Text bubble</Tooltip>

<details>
<summary>Show code</summary>

```jsx
<Tooltip tip="Simply specify the tip and the default color (#5865F2) will be applied.">Text bubble</Tooltip>
```

</details>

---

## Command Card

**Component:** `CommandCard`  
**Description:** Displays a card containing detailed information about a command, including required permissions and tooltip information.

**Required Import:**

```jsx
import CommandCard from "@site/src/components/CommandCard";
```

**Live Example:**

<CommandCard cmd="/ban" perms="Moderator" cardColor="indigo">
  Bans the mentioned user and deletes their last 24 h of messages.
  *Note: Ensure that the permission provided is valid for the icon to appear.*
</CommandCard>

<details>
<summary>Show code</summary>

```jsx
<CommandCard cmd="/ban" perms="Moderator" cardColor="indigo">
  Bans the mentioned user and deletes their last 24 h of messages.
</CommandCard>
```

</details>

---

## Audit Flag

**Component:** `AuditFlag`  
**Description:** Marks recent updates or audit events with a flag indicator. It supports three types of flags: **NEW** (items recently added), **CHANGED** (modified items), and **DEPRECATED** (items no longer recommended or to be removed).

**Required Import:**

```jsx
import AuditFlag from "@site/src/components/AuditFlag";
```

**Live Examples:**

1. **New Audit:**  
   <AuditFlag type="NEW" /> Slash-command bulk-ban added.

<details>
<summary>Show code</summary>

```jsx
<AuditFlag type="NEW" /> Slash-command bulk-ban added.
```

</details>

2. **Changed Audit:**  
   <AuditFlag type="CHANGED" /> Updated user permission hierarchy.

<details>
<summary>Show code</summary>

```jsx
<AuditFlag type="CHANGED" /> Updated user permission hierarchy.
```

</details>

3. **Deprecated Audit:**  
   <AuditFlag type="DEPRECATED" /> The old moderator panel is now deprecated.

<details>
<summary>Show code</summary>

```jsx
<AuditFlag type="DEPRECATED" /> The old moderator panel is now deprecated.
```

</details>

---

## Role Matrix

**Component:** `RoleMatrix`  
**Description:** Presents a matrix that compares various roles and the actions/permissions they have. It is especially useful for quickly understanding role responsibilities.

**Required Import:**

```jsx
import RoleMatrix from "@site/src/components/RoleMatrix";
```

**Live Example:**

<RoleMatrix
actions={["Pin", "Ban", "Mute"]}
data={[
{ role: "Helper", actions: ["Pin"] },
{ role: "Mod", actions: ["Pin", "Mute"] },
{ role: "Admin", actions: ["Pin", "Ban", "Mute"] },
]}
/>

<details>
<summary>Show code</summary>

```jsx
<RoleMatrix
  actions={["Pin", "Ban", "Mute"]}
  data={[
    { role: "Helper", actions: ["Pin"] },
    { role: "Mod", actions: ["Pin", "Mute"] },
    { role: "Admin", actions: ["Pin", "Ban", "Mute"] },
  ]}
/>
```

</details>

---

## Timestamp

**Component:** `Timestamp`  
**Description:**  
Converts a Unix timestamp following Discord's exact format to a human-readable date/time format. It adjusts to the reader's local time, continuously refreshes for authenticity, and mimics Discord's dynamic timestamp design.  
Any timestamp created with the website [hammertime](https://hammertime.cyou/) is also compatible. You can use strings like `<t:1747208640:F>` for a full date/time format or `<t:1747208640:R>` for a relative time format.

**Required Import:**

```jsx
import Timestamp from "@site/src/components/Timestamp";
```

**Live Examples:**

The full event time: <Timestamp value="<t:1747208640:F>" />

<details>
<summary>Show code</summary>

```jsx
<Timestamp value="<t:1747208640:F>" />
```

</details>

Time since event: <Timestamp value="<t:1747208640:R>" />

<details>
<summary>Show code</summary>

```jsx
<Timestamp value="<t:1747208640:R>" />
```

</details>

Time since event: <Timestamp value="<t:1747254420:R>" />

<details>
<summary>Show code</summary>

```jsx
<Timestamp value="<t:1747254420:R>" />
```

</details>

---

## DiscordButton

**Component:** `DiscordButton`
**Description:** Inline Discord-style buttons for actions, links, and more. Supports type, color, emoji, link, and disabled states. Color option can be added on any buttons, it will override the default color of the type of button.

**Required Import:**

```jsx
import DiscordButton from "@site/src/components/DiscordButton";
```

**Live Examples:**

<DiscordButton type="primary" emoji="🎉">Primary Button</DiscordButton>

<details>
<summary>Show code</summary>

```jsx
<DiscordButton type="primary" emoji="🎉">Primary Button</DiscordButton>
```

</details>

<DiscordButton type="success" emoji="✅">Success Button</DiscordButton>

<details>
<summary>Show code</summary>

```jsx
<DiscordButton type="success" emoji="✅">Success Button</DiscordButton>
```

</details>

<DiscordButton type="secondary" emoji="💬">Secondary Button</DiscordButton>

<details>
<summary>Show code</summary>

```jsx
<DiscordButton type="secondary" emoji="💬">Secondary Button</DiscordButton>
```

</details>

<DiscordButton type="destructive" emoji="⚠️">Destructive Button</DiscordButton>

<details>
<summary>Show code</summary>

```jsx
<DiscordButton type="destructive" emoji="⚠️">Destructive Button</DiscordButton>
```

</details>

<DiscordButton type="link" href="https://example.com" emoji="🔗">Link Button</DiscordButton>

<details>
<summary>Show code</summary>

```jsx
<DiscordButton type="link" href="https://example.com" emoji="🔗">Link Button</DiscordButton>
```

</details>

<DiscordButton color="#ff00ff" emoji="✨">Custom Color</DiscordButton>

<details>
<summary>Show code</summary>

```jsx
<DiscordButton color="#ff00ff" emoji="✨">Custom Color</DiscordButton>
```

</details>

<DiscordButton type="primary" emoji="⏳" disabled>Disabled Button</DiscordButton>

<details>
<summary>Show code</summary>

```jsx
<DiscordButton type="primary" emoji="⏳" disabled>Disabled Button</DiscordButton>
```

</details>

---

## CardGrid & Card System 🆕

**Components:** `CardGrid` & `Card`  
**Description:** A flexible system for displaying content in organized cards. Cards can be used individually or grouped in grids for side-by-side layouts.

<Card title="When to Use Each Component" status="info" icon="ℹ️">
- **Single Card**: Use `<Card>` alone for individual content blocks (stretches a single card to the width of the page)
- **Multiple Cards**: Use `<CardGrid>` to arrange 2-4 cards side by side
- **Grid Required**: Only needed when you want cards on the same line
</Card>

<details>
<summary>Show code</summary>

```jsx
<Card title="When to Use Each Component" status="info" icon="ℹ️">
  - **Single Card**: Use `<Card>` alone for individual content blocks
  - **Multiple Cards**: Use `<CardGrid>` to arrange 2-4 cards side by side
  - **Grid Required**: Only needed when you want cards on the same line
</Card>
```

</details>

**Required Import:**

```jsx
import CardGrid, { Card } from "@site/src/components/CardGrid";
```

---

<span style={{fontSize: '2em', fontWeight: 'bold', display: 'block', marginBottom: '1rem'}}>Basic Usage</span>

**Single Card (No Grid Needed):**
<Card title="Single Card" icon="📝">

  <p>This card works perfectly on its own without any grid container!</p>
</Card>

<details>
<summary>Show code</summary>

```jsx
<Card title="Single Card" icon="📝">
  <p>This card works perfectly on its own without any grid container!</p>
</Card>
```

</details>

**Simple 2-Column Comparison:** `columns={2}`
<CardGrid columns={2}>
<Card title="Accepted Documents" status="success" icon="✅">

  <ul>
    <li>Driver's License</li>
    <li>Passport</li>
    <li>State ID</li>
  </ul>
</Card>
<Card title="Not Accepted" status="error" icon="❌">
  <ul>
    <li>Student ID</li>
    <li>Work Badge</li>
    <li>Library Card</li>
  </ul>
</Card>
</CardGrid>

<details>
<summary>Show code</summary>

```jsx
<CardGrid columns={2}>
  <Card title="Accepted Documents" status="success" icon="✅">
    <ul>
      <li>Driver's License</li>
      <li>Passport</li>
      <li>State ID</li>
    </ul>
  </Card>
  <Card title="Not Accepted" status="error" icon="❌">
    <ul>
      <li>Student ID</li>
      <li>Work Badge</li>
      <li>Library Card</li>
    </ul>
  </Card>
</CardGrid>
```

</details>

**3-Column Process Steps:** `columns={3}`
<CardGrid columns={3}>
<Card title="Step 1" icon="📝">

  <p>Upload your documents</p>
</Card>
<Card title="Step 2" icon="⏳">
  <p>Wait for review (36 hours)</p>
</Card>
<Card title="Step 3" icon="✅">
  <p>Get verified!</p>
</Card>
</CardGrid>

<details>
<summary>Show code</summary>

```jsx
<CardGrid columns={3}>
  <Card title="Step 1" icon="📝">
    <p>Upload your documents</p>
  </Card>
  <Card title="Step 2" icon="⏳">
    <p>Wait for review (36 hours)</p>
  </Card>
  <Card title="Step 3" icon="✅">
    <p>Get verified!</p>
  </Card>
</CardGrid>
```

</details>

**4-Column Status Types:** `columns={4}`
<CardGrid columns={4}>
<Card title="Success" status="success">

  <p>Approved items</p>
</Card>
<Card title="Error" status="error">
  <p>Rejected items</p>
</Card>
<Card title="Warning" status="warning">
  <p>Needs attention</p>
</Card>
<Card title="Info" status="info">
  <p>Helpful tips</p>
</Card>
</CardGrid>

<details>
<summary>Show code</summary>

```jsx
<CardGrid columns={4}>
  <Card title="Success" status="success">
    <p>Approved items</p>
  </Card>
  <Card title="Error" status="error">
    <p>Rejected items</p>
  </Card>
  <Card title="Warning" status="warning">
    <p>Needs attention</p>
  </Card>
  <Card title="Info" status="info">
    <p>Helpful tips</p>
  </Card>
</CardGrid>
```

</details>

:::info Status Types & What They Do

**Status Types:**

- `success` - Green checkmark (✓)
- `error` - Red X (✗)
- `warning` - Yellow warning (⚠)
- `info` - Blue info (ℹ)

**❓ What Status Cards Do:**
Status cards automatically add color and icon indicators with styling to show different states. No need to specify an emoji, it will be added automatically.

:::

**Clickable Card Example:**
<Card title="Clickable Card" href="/docs/server-staff-handbook" icon="🔗">

  <p><strong>Entire card is clickable!</strong> Click anywhere to navigate.</p>
</Card>

<details>
<summary>Show code</summary>

```jsx
<Card title="Clickable Card" href="/docs/server-staff-handbook" icon="🔗">
  <p><strong>Entire card is clickable!</strong> Click anywhere to navigate.</p>
</Card>
```

</details>

---

<span style={{fontSize: '2em', fontWeight: 'bold', display: 'block', marginBottom: '1rem'}}>Card Options</span>

**Icons & Status**

- **Custom Icon**: `<Card title="My Card" icon="📝">` - Shows your emoji
- **Status Only**: `<Card title="Success" status="success">` - Shows automatic ✓
- **Custom + Status**: `<Card title="Warning" status="warning" icon="⚠️">` - Custom overrides auto

---

## Quick Templates

**Single Card (No Grid):**

<Card title="My Card" icon="📝">
  <p>Single card content</p>
</Card>

<details>
<summary>Show code</summary>

```jsx
<Card title="My Card" icon="📝">
  <p>Single card content</p>
</Card>
```

</details>

**2-Column Comparison:**

<CardGrid columns={2}>
  <Card title="Good Option" status="success" icon="✅">
    <p>Your content here</p>
  </Card>
  <Card title="Bad Option" status="error" icon="❌">
    <p>Your content here</p>
  </Card>
</CardGrid>

<details>
<summary>Show code</summary>

```jsx
<CardGrid columns={2}>
  <Card title="Good Option" status="success" icon="✅">
    <p>Your content here</p>
  </Card>
  <Card title="Bad Option" status="error" icon="❌">
    <p>Your content here</p>
  </Card>
</CardGrid>
```

</details>

**3-Column Process Steps:**

<CardGrid columns={3}>
  <Card title="Step 1" icon="1️⃣">
    First step
  </Card>
  <Card title="Step 2" icon="2️⃣">
    Second step
  </Card>
  <Card title="Step 3" icon="3️⃣">
    Third step
  </Card>
</CardGrid>

<details>
<summary>Show code</summary>

```jsx
<CardGrid columns={3}>
  <Card title="Step 1" icon="1️⃣">
    First step
  </Card>
  <Card title="Step 2" icon="2️⃣">
    Second step
  </Card>
  <Card title="Step 3" icon="3️⃣">
    Third step
  </Card>
</CardGrid>
```

</details>

**4-Column Status Types:**

<CardGrid columns={4}>
  <Card title="Success" status="success">
    <p>Approved items</p>
  </Card>
  <Card title="Error" status="error">
    <p>Rejected items</p>
  </Card>
  <Card title="Warning" status="warning">
    <p>Needs attention</p>
  </Card>
  <Card title="Info" status="info">
    <p>Helpful tips</p>
  </Card>
</CardGrid>

<details>
<summary>Show code</summary>

```jsx
<CardGrid columns={4}>
  <Card title="Success" status="success">
    <p>Approved items</p>
  </Card>
  <Card title="Error" status="error">
    <p>Rejected items</p>
  </Card>
  <Card title="Warning" status="warning">
    <p>Needs attention</p>
  </Card>
  <Card title="Info" status="info">
    <p>Helpful tips</p>
  </Card>
</CardGrid>
```

</details>

**Clickable Cards:**

<CardGrid columns={2}>
  <Card title="Documentation" href="/docs/new-component#quick-templates" icon="📚">
    <p>Read the full guide</p>
  </Card>
  <Card title="Support" href="/docs/new-component#quick-templates" icon="💬">
    <p>Get help here</p>
  </Card>
</CardGrid>

<details>
<summary>Show code</summary>

```jsx
<CardGrid columns={2}>
  <Card title="Documentation" href="/docs/new-component#quick-templates" icon="📚">
    <p>Read the full guide</p>
  </Card>
  <Card title="Support" href="/docs/new-component#quick-templates" icon="💬">
    <p>Get help here</p>
  </Card>
</CardGrid>
```

</details>

---

Each example on this page has its code folded directly underneath. Open **Show code** to copy it.

---

## Spoiler (Discord‑style) 🆕

**Component:** `Spoiler`
**Description:** Hides inline text with a black background until clicked (or toggled with Space/Enter). When revealed, a faint grey background remains to indicate it was spoilered. Width stays stable so layout doesn’t shift.

**Required Import:**

```jsx
import Spoiler from "@site/src/components/Spoiler";
```

**Live Examples:**

Default hidden, click to reveal:

This message contains a <Spoiler>secret detail</Spoiler> you can reveal.

<details>
<summary>Show code</summary>

```jsx
This message contains a <Spoiler>secret detail</Spoiler> you can reveal.
```

</details>

Pre‑revealed (start open):

<Spoiler revealed>already visible but still marked</Spoiler>

<details>
<summary>Show code</summary>

```jsx
<Spoiler revealed>already visible but still marked</Spoiler>
```

</details>

Custom colors (optional):

<Spoiler background="rgba(0,0,0,.9)" color="#fff">high contrast spoiler</Spoiler>

<details>
<summary>Show code</summary>

```jsx
<Spoiler background="rgba(0,0,0,.9)" color="#fff">high contrast spoiler</Spoiler>
```

</details>

---

## Discord Conversation 🆕

**Components:** `DiscordConversation` & `DiscordMessage`  
**Description:** Creates a Discord-style chat interface perfect for showing example conversations, ticket interactions, or ban vote threads. Automatically handles message grouping, timestamps, reactions, mentions, and highlights.

**Required Import:**

```jsx
import DiscordConversation, { DiscordMessage } from "@site/src/components/DiscordConversation";
```

**Live Examples:**

**Basic Conversation:**
<DiscordConversation id="test-basic-conversation" title="Example Conversation">
<DiscordMessage
    name="Moderator 1"
    color="#e68027"
    message="Hi there! How can I help you today?"
  />
<DiscordMessage
    name="Member 1"
    color="#5865f2"
    message="I have a question about the server rules."
  />
<DiscordMessage
    name="Moderator 1"
    color="#e68027"
    message="Of course! What would you like to know?"
  />
</DiscordConversation>

<details>
<summary>Show code</summary>

```jsx
<DiscordConversation id="test-basic-conversation" title="Example Conversation">
  <DiscordMessage name="Moderator 1" color="#e68027" message="Hi there! How can I help you today?" />
  <DiscordMessage name="Member 1" color="#5865f2" message="I have a question about the server rules." />
  <DiscordMessage name="Moderator 1" color="#e68027" message="Of course! What would you like to know?" />
</DiscordConversation>
```

</details>

**With Reactions:**
<DiscordConversation id="test-ban-vote-discussion" title="Ban Vote Discussion">
<DiscordMessage
name="Moderator 1"
color="#8b5cf6"
message="Vote here within next 24hrs on server ban of [MemberName]."
reactions={[
{ emoji: "✅", count: 9, selected: true },
{ emoji: "❌", count: 1 },
]}
/>
</DiscordConversation>

<details>
<summary>Show code</summary>

```jsx
<DiscordConversation id="test-ban-vote-discussion" title="Ban Vote Discussion">
  <DiscordMessage
    name="Moderator 1"
    color="#8b5cf6"
    message="Vote here within next 24hrs on server ban of [MemberName]."
    reactions={[
      { emoji: "✅", count: 9, selected: true },
      { emoji: "❌", count: 1 },
    ]}
  />
</DiscordConversation>
```

</details>

**Multi-line Content (Lists Auto-detected):**
<DiscordConversation id="test-ban-reasons" title="Ban Reasons">
<DiscordMessage
name="Moderator 1"
color="#8b5cf6"

>

    [MemberName] has committed following problems:
    - Non sexual consent break
    - Over intoxication in several events
    - Making people uncomfortable

  </DiscordMessage>
</DiscordConversation>

<details>
<summary>Show code</summary>

```jsx
<DiscordConversation id="test-ban-reasons" title="Ban Reasons">
  <DiscordMessage name="Moderator 1" color="#8b5cf6">
    [MemberName] has committed following problems:
    - Non sexual consent break
    - Over intoxication in several events
    - Making people uncomfortable
  </DiscordMessage>
</DiscordConversation>
```

</details>

**Auto-highlighted @Moderator mentions:**
<DiscordConversation id="test-staff-mention" title="Staff Mention">
<DiscordMessage
    name="Moderator 1"
    color="#8b5cf6"
    message="@Moderator please review this case."
  />
</DiscordConversation>

<details>
<summary>Show code</summary>

```jsx
<DiscordConversation id="test-staff-mention" title="Staff Mention">
  <DiscordMessage name="Moderator 1" color="#8b5cf6" message="@Moderator please review this case." />
</DiscordConversation>
```

</details>

**Key Features:**

- **Auto-timestamps**: Automatically generates realistic timestamps if not provided
- **Message grouping**: Messages from the same author automatically group together (no avatar/timestamp repeated)
- **List detection**: Lines starting with `- ` automatically become bullet lists
- **Mention styling**: `@mentions` are automatically styled in Discord blue
- **Auto-highlight**: Messages containing `@Moderator` are automatically highlighted
- **Reactions**: Support up to 4 reactions with emoji, count, and selected state
- **Discord fonts**: Uses Discord's official font stack for authentic appearance

**Available Props:**

**DiscordConversation:**

- `title` (optional): Header text for the conversation

**DiscordMessage:**

- `name` (required): Username to display
- `color` (optional): Username color (default: white)
- `message` (optional): Message content (use this OR `children`)
- `children` (optional): Message content as children (preferred for multi-line)
- `timestamp` (optional): Custom timestamp string
- `minutesOffset` (optional): Auto-generate timestamp X minutes ago
- `reactions` (optional): Array of reaction objects `{ emoji, count, selected? }`
- `highlighted` (optional): Force highlight on/off (auto-detected for @Moderator)
- `avatar` (optional): Custom avatar URL

---

## Content With Thumbnail 🆕

**Component:** `ContentWithThumbnail`  
**Description:** Displays content alongside a thumbnail image in a side-by-side layout. Perfect for showcasing screenshots, diagrams, or visual examples alongside explanatory text. Automatically stacks vertically on mobile devices for better responsiveness.

**Required Import:**

```jsx
import ContentWithThumbnail from "@site/src/components/ContentWithThumbnail";
```

**Live Examples:**

**Basic Usage:**
<ContentWithThumbnail thumbnail="docusaurus.png" thumbnailAlt="Docusaurus logo">

  <p>This component displays content alongside a thumbnail image. The content area is flexible and can contain any React elements, including text, lists, and other components.</p>
  <p>The thumbnail appears on the right side (or bottom on mobile) and automatically scales to fit while maintaining its aspect ratio.</p>
</ContentWithThumbnail>

<details>
<summary>Show code</summary>

```jsx
<ContentWithThumbnail thumbnail="docusaurus.png" thumbnailAlt="Docusaurus logo">
  <p>This component displays content alongside a thumbnail image. The content area is flexible and can contain any React elements, including text, lists, and other components.</p>
  <p>The thumbnail appears on the right side (or bottom on mobile) and automatically scales to fit while maintaining its aspect ratio.</p>
</ContentWithThumbnail>
```

</details>

**With List Content:**
<ContentWithThumbnail thumbnail="logo.svg" thumbnailAlt="Site logo">

  <p><strong>Key Features:</strong></p>
  <ul>
    <li>Responsive layout that stacks on mobile</li>
    <li>Automatic image sizing and border styling</li>
    <li>Flexible content area for any React content</li>
    <li>Clean, professional appearance</li>
  </ul>
</ContentWithThumbnail>

<details>
<summary>Show code</summary>

```jsx
<ContentWithThumbnail thumbnail="logo.svg" thumbnailAlt="Site logo">
  <p><strong>Key Features:</strong></p>
  <ul>
    <li>Responsive layout that stacks on mobile</li>
    <li>Automatic image sizing and border styling</li>
    <li>Flexible content area for any React content</li>
    <li>Clean, professional appearance</li>
  </ul>
</ContentWithThumbnail>
```

</details>

**Available Props:**

- `thumbnail` (required): Path to the thumbnail image relative to `static/img/` directory
- `thumbnailAlt` (optional): Alt text for the thumbnail image (default: empty string)
- `children` (required): Content to display alongside the thumbnail (can be any React elements)

**Layout Behavior:**

- **Desktop**: Content on the left, thumbnail on the right (200px width)
- **Mobile**: Stacks vertically with thumbnail on top, content below
- **Image**: Automatically maintains aspect ratio and includes border styling

---

## Responsive Screenshot

**Component:** `ResponsiveScreenshot`  
**Description:** Displays handbook screenshots with a **Desktop | Mobile** toggle. Paths are relative to `static/img/` (use slashes for subfolders). On page load, the initial view follows the visitor's viewport (`max-width: 768px` → mobile when a mobile image exists).

**Required Import:**

```jsx
import ResponsiveScreenshot from "@site/src/components/ResponsiveScreenshot";
```

**Live Example:**

<ResponsiveScreenshot
  src="scheduler/11-host-availability-add-slot"
  alt="Host availability form with days and time range"
  caption="Example screenshot with viewport toggle. Mobile view renders smaller."
/>

<details>
<summary>Show code</summary>

```jsx
<ResponsiveScreenshot
  src="scheduler/11-host-availability-add-slot"
  alt="Host availability form with days and time range"
  caption="Example screenshot with viewport toggle. Mobile view renders smaller."
/>

// Explicit desktop and mobile paths, when the mobile file is not named `{src}_mobile.webp`
<ResponsiveScreenshot
  src="orion/dashboard-overview"
  mobileSrc="orion/dashboard-overview-phone"
  alt="Orion dashboard overview"
/>
```

</details>

**Available Props:**

| Prop | Required | Description |
| --- | --- | --- |
| `src` | Yes | Desktop image path relative to `static/img/` without extension (e.g. `scheduler/11-host-availability-add-slot`) |
| `mobileSrc` | No | Explicit mobile path (same rules). If omitted, `{src}_mobile.webp` is used when present |
| `alt` | Yes | Accessible alt text for the active image |
| `caption` | No | Optional figcaption below the image |
| `className` | No | Extra CSS class on the figure wrapper |
| `forceView` | No | `"desktop"` or `"mobile"` — TestPage demos only; hides toggle and skips auto-detect |

**Notes:**

- Images must be `.webp` under `static/img/` (any subfolder). Run `npm run convert-scheduler-images` after adding scheduler PNG pairs.
- If only desktop exists, **Mobile** appears in red and is not clickable; the desktop image is shown.
- If only mobile exists, **Desktop** appears in red and is not clickable; the mobile image is shown.
- Mobile images render at a smaller max width (320px) than desktop (full width).
- A one-frame swap on load is expected to avoid SSR hydration issues.

---

## Segment Toggle (Two-Way Switch)

**Component:** `SegmentToggle`  
**Description:** A compact two-option segmented switch for handbook docs. Each side can use its own active background and text color — useful to mirror in-app toggles (e.g. Host Calendar **Events** / **Availability**). Use `interactive` to allow clicking, `semiInteractive` for hover-only demos with no default selection, or leave both off for fully static examples.

**Required Import:**

```jsx
import SegmentToggle from "@site/src/components/SegmentToggle";
```

**Live Example (static — Host Calendar style with visual box):**

<SegmentToggle
  left={{ label: "Events", activeBackground: "#a259f7", activeColor: "#ffffff" }}
  right={{ label: "Availability", activeBackground: "#22d3ee", activeColor: "#071018" }}
  value="left"
  size="sm"
  visualBox={{
    label: "Visual only — not a working toggle on this handbook page",
    background: "#f4f0fa",
    labelColor: "#6b5b7a",
  }}
/>

<details>
<summary>Show code</summary>

```jsx
<SegmentToggle
  left={{ label: "Events", activeBackground: "#a259f7", activeColor: "#ffffff" }}
  right={{ label: "Availability", activeBackground: "#22d3ee", activeColor: "#071018" }}
  value="left"
  size="sm"
  visualBox={{
    label: "Visual only — not a working toggle on this handbook page",
    background: "#f4f0fa",
    labelColor: "#6b5b7a",
  }}
/>
```

</details>

**Live Example (semi-interactive — hover only, no selection):**

<SegmentToggle
  left={{
    label: "My Events",
    icon: "calendar-days",
    iconColor: "#a259f7",
    activeBackground: "var(--ifm-color-emphasis-200)",
    activeColor: "var(--ifm-font-color-base)",
  }}
  right={{
    label: "My Availabilities",
    icon: "calendar-clock",
    iconColor: "#22d3ee",
    activeBackground: "var(--ifm-color-emphasis-200)",
    activeColor: "var(--ifm-font-color-base)",
  }}
  semiInteractive
  fullWidth
  size="sm"
  visualBox={{
    label: "Semi-interactive — hover works, nothing stays selected",
    labelColor: "var(--ifm-color-emphasis-700)",
  }}
/>

<details>
<summary>Show code</summary>

```jsx
<SegmentToggle
  left={{
    label: "My Events",
    icon: "calendar-days",
    iconColor: "#a259f7",
    activeBackground: "var(--ifm-color-emphasis-200)",
    activeColor: "var(--ifm-font-color-base)",
  }}
  right={{
    label: "My Availabilities",
    icon: "calendar-clock",
    iconColor: "#22d3ee",
    activeBackground: "var(--ifm-color-emphasis-200)",
    activeColor: "var(--ifm-font-color-base)",
  }}
  semiInteractive
  fullWidth
  size="sm"
  visualBox={{
    label: "Semi-interactive — hover works, nothing stays selected",
    labelColor: "var(--ifm-color-emphasis-700)",
  }}
/>
```

</details>

**Live Example (interactive — click to select):**

export function LiveSegmentToggleDemo() {
  const [side, setSide] = useState("left");
  return (
    <SegmentToggle
      left={{ label: "On", activeBackground: "#22c55e", activeColor: "#ffffff" }}
      right={{ label: "Off", activeBackground: "#64748b", activeColor: "#ffffff" }}
      value={side}
      interactive
      onChange={setSide}
      ariaLabel="Demo two-way switch"
    />
  );
}

<LiveSegmentToggleDemo />

<details>
<summary>Show code</summary>

```jsx
export function LiveSegmentToggleDemo() {
  const [side, setSide] = useState("left");
  return (
    <SegmentToggle
      left={{ label: "On", activeBackground: "#22c55e", activeColor: "#ffffff" }}
      right={{ label: "Off", activeBackground: "#64748b", activeColor: "#ffffff" }}
      value={side}
      interactive
      onChange={setSide}
      ariaLabel="Demo two-way switch"
    />
  );
}
```

</details>

**Available Props:**

| Prop | Required | Description |
| --- | --- | --- |
| `left` | Yes | `{ label, activeBackground?, activeColor?, inactiveColor?, icon?, iconColor? }` |
| `right` | Yes | Same shape as `left` |
| `value` | No | `"left"` or `"right"` — selected side (controlled) |
| `defaultValue` | No | Initial side when uncontrolled (default `"left"`) |
| `interactive` | No | When `true`, click to select a side (default `false`) |
| `semiInteractive` | No | Hover brighten only — no default selection, clicks do not stick |
| `onChange` | No | `(side) => void` when the user picks a side (`interactive` only) |
| `inactiveColor` | No | Text color for the inactive segment |
| `trackBackground` | No | Background of the outer track |
| `trackBorder` | No | Border color of the outer track |
| `visualBox` | No | `{ label, background?, labelColor?, borderColor? }` — tinted box + small caption for static UI references |
| `fullWidth` | No | Equal-width segments (matches Home shortcut bar) |
| `size` | No | `"sm"` or `"md"` (default `"md"`) |
| `className` | No | Extra CSS class on the wrapper |
| `ariaLabel` | No | Accessible label when `interactive` (default `"Two-way toggle"`) |

**Side object fields:**

| Field | Description |
| --- | --- |
| `label` | Button text |
| `icon` | `"calendar-days"` or `"calendar-clock"` (Lucide icon before label) |
| `iconColor` | Icon color only — label stays muted unless active or hovered |
| `inactiveColor` | Label color when this side is not selected (default: muted) |
| `activeBackground` | Background when this side is selected |
| `activeColor` | Label color when this side is selected |

**Notes:**

- Default styling uses handbook theme colors when active colors are omitted.
- Use `interactive={false}` (default) on procedure pages for fully static visuals (`value` pins which side looks selected).
- Use `semiInteractive` when both options should look equal (e.g. Home shortcuts) — hover works, nothing stays selected.
- When `interactive` is true, inactive segments brighten on hover; the active segment gets a subtle brightness bump.
- Use `iconColor` for accent icons; keep labels muted via default styling unless `activeColor` / hover applies.
- `size="sm"` matches the compact Host Calendar control in the scheduler app.

---

## Multi Segment Toggle (Three-or-More Switch)

**Component:** `MultiSegmentToggle`  
**Description:** Same look as `SegmentToggle`, but for **three or more** options. Use it for in-app view switches (e.g. Calendar **Day / Week / Month**) or to jump between screenshot examples on a page. Each segment can be a clickable selection, hover-only, or an in-page `#anchor` link.

**Required Import:**

```jsx
import MultiSegmentToggle from "@site/src/components/MultiSegmentToggle";
```

**Live Example (static — Calendar view style with visual box):**

<MultiSegmentToggle
  segments={[
    { label: "Day", icon: "layout-list", iconColor: "#a259f7", activeBackground: "#a259f7", activeColor: "#ffffff" },
    { label: "Week", icon: "calendar-days", iconColor: "#a259f7", activeBackground: "#a259f7", activeColor: "#ffffff" },
    { label: "Month", icon: "layout-grid", iconColor: "#a259f7", activeBackground: "#a259f7", activeColor: "#ffffff" },
  ]}
  value={1}
  size="sm"
  visualBox={{
    label: "Visual only — Week selected in the scheduler app",
    labelColor: "var(--ifm-color-emphasis-700)",
  }}
/>

<details>
<summary>Show code</summary>

```jsx
<MultiSegmentToggle
  segments={[
    { label: "Day", icon: "layout-list", iconColor: "#a259f7", activeBackground: "#a259f7", activeColor: "#ffffff" },
    { label: "Week", icon: "calendar-days", iconColor: "#a259f7", activeBackground: "#a259f7", activeColor: "#ffffff" },
    { label: "Month", icon: "layout-grid", iconColor: "#a259f7", activeBackground: "#a259f7", activeColor: "#ffffff" },
  ]}
  value={1}
  size="sm"
  visualBox={{
    label: "Visual only — Week selected in the scheduler app",
    labelColor: "var(--ifm-color-emphasis-700)",
  }}
/>
```

</details>

**Live Example (interactive — click to select):**

export function LiveMultiSegmentToggleDemo() {
  const [index, setIndex] = useState(0);
  return (
    <MultiSegmentToggle
      segments={[
        { label: "Needs availability", activeBackground: "#a259f7", activeColor: "#ffffff" },
        { label: "Submitted", activeBackground: "#a259f7", activeColor: "#ffffff" },
        { label: "Upcoming events", activeBackground: "#a259f7", activeColor: "#ffffff" },
      ]}
      value={index}
      interactive
      fullWidth
      size="sm"
      onChange={setIndex}
      ariaLabel="Demo three-way switch"
    />
  );
}

<LiveMultiSegmentToggleDemo />

<details>
<summary>Show code</summary>

```jsx
export function LiveMultiSegmentToggleDemo() {
  const [index, setIndex] = useState(0);
  return (
    <MultiSegmentToggle
      segments={[
        { label: "Needs availability", activeBackground: "#a259f7", activeColor: "#ffffff" },
        { label: "Submitted", activeBackground: "#a259f7", activeColor: "#ffffff" },
        { label: "Upcoming events", activeBackground: "#a259f7", activeColor: "#ffffff" },
      ]}
      value={index}
      interactive
      fullWidth
      size="sm"
      onChange={setIndex}
      ariaLabel="Demo three-way switch"
    />
  );
}
```

</details>

**Live Example (anchor links — jump to a heading):**

<MultiSegmentToggle
  segments={[
    { label: "Day", icon: "layout-list", iconColor: "#a259f7", href: "#day-view-demo" },
    { label: "Week", icon: "calendar-days", iconColor: "#a259f7", href: "#week-view-demo" },
    { label: "Month", icon: "layout-grid", iconColor: "#a259f7", href: "#month-view-demo" },
  ]}
  fullWidth
  wide
  size="sm"
  visualBox={{
    label: "View — jump to an example",
    labelColor: "var(--ifm-color-emphasis-700)",
  }}
/>

<details>
<summary>Show code</summary>

```jsx
<MultiSegmentToggle
  segments={[
    { label: "Day", icon: "layout-list", iconColor: "#a259f7", href: "#day-view-demo" },
    { label: "Week", icon: "calendar-days", iconColor: "#a259f7", href: "#week-view-demo" },
    { label: "Month", icon: "layout-grid", iconColor: "#a259f7", href: "#month-view-demo" },
  ]}
  fullWidth
  wide
  size="sm"
  visualBox={{
    label: "View — jump to an example",
    labelColor: "var(--ifm-color-emphasis-700)",
  }}
/>
```

</details>

#### Day view {#day-view-demo}

Anchor target for the **Day** segment.

#### Week view {#week-view-demo}

Anchor target for the **Week** segment.

#### Month view {#month-view-demo}

Anchor target for the **Month** segment.

**Available Props:**

| Prop | Required | Description |
| --- | --- | --- |
| `segments` | Yes | Array of `{ label, activeBackground?, activeColor?, inactiveColor?, icon?, iconColor?, href? }` |
| `value` | No | Selected index (controlled). Ignored when segments use `href` unless you pass `value` yourself |
| `defaultValue` | No | Initial index when uncontrolled (default `0`) |
| `interactive` | No | When `true`, click to select an index (default `false`). Ignored if any segment has `href` |
| `semiInteractive` | No | Hover brighten only — no default selection, clicks do not stick |
| `onChange` | No | `(index) => void` when the user picks a segment (`interactive` only) |
| `inactiveColor` | No | Fallback text color for inactive segments |
| `trackBackground` | No | Background of the outer track |
| `trackBorder` | No | Border color of the outer track |
| `visualBox` | No | `{ label, background?, labelColor?, borderColor? }` — tinted box + small caption |
| `fullWidth` | No | Equal-width segments |
| `wide` | No | Wider visual box and track (use with `fullWidth` for Calendar view switches) |
| `size` | No | `"sm"` or `"md"` (default `"md"`) |
| `className` | No | Extra CSS class on the wrapper |
| `ariaLabel` | No | Accessible label when interactive (default `"Multi-way toggle"`) |

**Segment object fields:**

| Field | Description |
| --- | --- |
| `label` | Button text |
| `icon` | `"calendar-days"`, `"calendar-clock"`, `"layout-list"`, or `"layout-grid"` |
| `iconColor` | Icon color only — label stays muted unless active or hovered |
| `inactiveColor` | Label color when this segment is not selected |
| `activeBackground` | Background when this segment is selected |
| `activeColor` | Label color when this segment is selected |
| `href` | In-page anchor (e.g. `#day-view`) — renders as a link instead of a button |

**Notes:**

- Prefer `SegmentToggle` for exactly two options; use this for three or more.
- If any segment has `href`, the control becomes a jump bar (no sticky selection) and `interactive` is ignored.
- `wide` + `fullWidth` matches the Shared Calendar **Day / Week / Month** control.
- Same hover / visual-box behavior as `SegmentToggle`.

---

## Step Timeline (Workflow Bubbles)

**Component:** `StepTimeline`  
**Description:** Numbered bubbles connected by lines — good for short workflows (e.g. Schedule Builder **Add Event** steps). Horizontal by default; stacks vertically on narrow screens.

**Required Import:**

```jsx
import StepTimeline from "@site/src/components/StepTimeline";
```

**Live Example (horizontal — Schedule Builder add slot):**

<StepTimeline
  title="Add an event"
  size="sm"
  steps={[
    {
      label: "Day + region",
      detail: "Tab → Add AU, EU, or NA slot",
      recap: "Tap or click any step that has a recap to open a short popover. Steps without recap stay plain text.",
    },
    {
      label: "Host",
      detail: "From that day's availability",
      recap: "Choose a host who submitted availability for that day. Missing someone? Check the Manager dashboard.",
    },
    { label: "Time", detail: "30-min steps · conflicts disabled" },
    { label: "Event type", detail: "Chips or free text" },
    { label: "Add Event", detail: "Save to the grid" },
  ]}
/>

<details>
<summary>Show code</summary>

```jsx
<StepTimeline
  title="Add an event"
  size="sm"
  steps={[
    {
      label: "Day + region",
      detail: "Tab → Add AU, EU, or NA slot",
      recap: "Tap or click any step that has a recap to open a short popover. Steps without recap stay plain text.",
    },
    {
      label: "Host",
      detail: "From that day's availability",
      recap: "Choose a host who submitted availability for that day. Missing someone? Check the Manager dashboard.",
    },
    { label: "Time", detail: "30-min steps · conflicts disabled" },
    { label: "Event type", detail: "Chips or free text" },
    { label: "Add Event", detail: "Save to the grid" },
  ]}
/>
```

</details>

**Live Example (vertical — compact publish flow):**

<StepTimeline
  direction="vertical"
  size="sm"
  accentColor="#db1cb8"
  steps={[
    {
      label: "Build grid",
      detail: "Assign hosts on the builder",
      recap: "Place every event on the Schedule Builder grid before you publish — same recap popover works on vertical timelines.",
    },
    {
      label: "Fix warnings",
      detail: "Resolve conflicts before Push",
      recap: "Clear builder warnings and time conflicts first. Push should not go out with unresolved problems.",
    },
    {
      label: "Push",
      detail: "Discord + listings",
      recap: "Push publishes to Discord schedule channels and listings. On mobile the popover spans the screen width between margins.",
    },
  ]}
/>

<details>
<summary>Show code</summary>

```jsx
<StepTimeline
  direction="vertical"
  size="sm"
  accentColor="#db1cb8"
  steps={[
    {
      label: "Build grid",
      detail: "Assign hosts on the builder",
      recap: "Place every event on the Schedule Builder grid before you publish — same recap popover works on vertical timelines.",
    },
    {
      label: "Fix warnings",
      detail: "Resolve conflicts before Push",
      recap: "Clear builder warnings and time conflicts first. Push should not go out with unresolved problems.",
    },
    {
      label: "Push",
      detail: "Discord + listings",
      recap: "Push publishes to Discord schedule channels and listings. On mobile the popover spans the screen width between margins.",
    },
  ]}
/>
```

</details>

**Props:**

| Prop | Required | Description |
| --- | --- | --- |
| `steps` | Yes | `{ label, detail?, recap? }[]` — one bubble per step. Add `recap` to make a step clickable (popover on tap/click) |
| `title` | No | Small uppercase caption above the timeline |
| `direction` | No | `"horizontal"` (default) or `"vertical"` |
| `size` | No | `"sm"` or `"md"` (default `"md"`) |
| `accentColor` | No | Bubble border/fill accent (default Eden purple `#a259f7`) |
| `className` | No | Extra CSS class on the wrapper |
| `ariaLabel` | No | Accessible name for the step list (default `"Workflow steps"`) |

**Notes:**

- Horizontal timelines **wrap to the next line** on narrow screens (~two steps per row on phones). Each step keeps its → arrow; no forced vertical stack.
- Vertical timelines stay a single column with ↓ arrows under each bubble. **`recap` works on vertical and horizontal** — only steps with `recap` are clickable.
- Keep `detail` lines short — they sit under each step label.
- Optional **`recap`** on a step: desktop shows a light hover hint; mobile shows a faint corner mark. Tap/click opens a popover with the recap text (only steps with `recap` are interactive).

---

## Context Menu Path 🆕

**Components:** `ContextMenuItem` and `ContextMenuChain`  
**Description:** A Discord right-click menu row, and a chain of those rows for a click path such as Apps → Orion Board → Mail Details. The chain stays on one line, with a small arrow between steps. The last step uses Discord’s thick submenu chevron.

**Required Import:**

```jsx
import ContextMenuChain, { ContextMenuItem } from "@site/src/components/ContextMenuItem";
```

**Live Example (one row):**

<ContextMenuItem label="Apps" />

<ContextMenuItem label="Orion Board" image={require("@site/static/img/orion-board-profile.png").default} />

<ContextMenuItem label="Mail Details" arrow="thick" />

<ContextMenuItem label="No arrow" arrow={false} />

<details>
<summary>Show code</summary>

```jsx
<ContextMenuItem label="Apps" />

<ContextMenuItem label="Orion Board" image={require("@site/static/img/orion-board-profile.png").default} />

<ContextMenuItem label="Mail Details" arrow="thick" />

<ContextMenuItem label="No arrow" arrow={false} />
```

</details>

**Live Example (a click path):**

<ContextMenuChain>
  <ContextMenuItem label="Apps" />
  <ContextMenuItem label="Orion Board" image={require("@site/static/img/orion-board-profile.png").default} />
  <ContextMenuItem label="Mail Details" />
</ContextMenuChain>

<details>
<summary>Show code</summary>

```jsx
<ContextMenuChain>
  <ContextMenuItem label="Apps" />
  <ContextMenuItem label="Orion Board" image={require("@site/static/img/orion-board-profile.png").default} />
  <ContextMenuItem label="Mail Details" />
</ContextMenuChain>
```

</details>

**ContextMenuItem props:**

| Prop | Required | Description |
| --- | --- | --- |
| `label` | Yes | Text on the row |
| `image` | No | Icon on the left, usually a bot avatar. Pass an imported image |
| `arrow` | No | `true` (default) shows the thin chevron. `"thick"` shows Discord’s heavy submenu chevron. `false` leaves that space empty |

**ContextMenuChain props:**

| Prop | Required | Description |
| --- | --- | --- |
| `children` | Yes | The `ContextMenuItem` rows in order. A small arrow is inserted between them. The last item gets the thick chevron unless that item sets `arrow={false}` |

**Notes:**

- Use one `ContextMenuItem` for a single menu row. Use `ContextMenuChain` when you are showing the path someone clicks through.
- Images come from `static/img/`: `image={require("@site/static/img/your-image.png").default}`

---

## Discord Message Embed 🆕

**Components:** `DiscordMessage`, `DiscordEmbed`, `DiscordField`, `DiscordActionRow`, `DiscordRowButton`, `DiscordSelect`  
**Description:** Draws one Discord post — display name, avatar, time, APP badge, and an embed — so a handbook page can show the message instead of a screenshot. This is separate from [Discord Conversation](#discord-conversation-), which is a thread of short chat lines.

The live posts on this page use the name `EmbedMessage` so they do not clash with the conversation component above. On a handbook page, import and use `DiscordMessage`.

**Required Import:**

```jsx
import DiscordMessage, {
  DiscordEmbed,
  DiscordField,
  DiscordActionRow,
  DiscordRowButton,
  DiscordSelect,
} from "@site/src/components/DiscordMessage";
```

**Live Example (embed, thumbnail, button inside the embed):**

<EmbedMessage
  username="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  timestamp="2026-10-15 11:24 AM"
  app
>
  <DiscordEmbed
    color="#a955f7"
    thumbnail={require("@site/static/img/you-got-mail.png").default}
    thumbnailAlt="You got mail"
    description={"<@Maxie The Bunni>\n📬 **You have mail.**\nOpen it to read the message. Only you can open it."}
  >
    <DiscordActionRow>
      <DiscordRowButton type="primary" emoji="📬">Open Mail</DiscordRowButton>
    </DiscordActionRow>
  </DiscordEmbed>
</EmbedMessage>

<details>
<summary>Show code</summary>

```jsx
<DiscordMessage
  username="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  timestamp="2026-10-15 11:24 AM"
  app
>
  <DiscordEmbed
    color="#a955f7"
    thumbnail={require("@site/static/img/you-got-mail.png").default}
    thumbnailAlt="You got mail"
    description={"<@Maxie The Bunni>\n📬 **You have mail.**\nOpen it to read the message. Only you can open it."}
  >
    <DiscordActionRow>
      <DiscordRowButton type="primary" emoji="📬">Open Mail</DiscordRowButton>
    </DiscordActionRow>
  </DiscordEmbed>
</DiscordMessage>
```

</details>

**Live Example (author, title, markdown, fields, and button colors):**

<EmbedMessage username="Orion Board" timestamp="Today at 4:12 PM" app>
  <DiscordEmbed
    authorName="Server Mail"
    authorUrl="https://example.com"
    authorIcon={require("@site/static/img/orion-board-profile.png").default}
    title="Mail from staff"
    titleUrl="https://example.com"
    description={"<@Alex> You have **mail**.\nOpen the *message*, or read the ||hidden note||.\n> Only you can open it."}
  >
    <DiscordField name="From" value="Staff" inline />
    <DiscordField name="Kind" value="Custom" inline />
    <DiscordField name="What they can do" value={"- Open the mail\n- Ask for help"} />
    <DiscordActionRow>
      <DiscordRowButton type="primary" emoji="📬">Open</DiscordRowButton>
      <DiscordRowButton type="secondary">Dismiss</DiscordRowButton>
      <DiscordRowButton type="success">Done</DiscordRowButton>
      <DiscordRowButton type="danger">Delete</DiscordRowButton>
      <DiscordRowButton type="link" href="https://example.com">Docs</DiscordRowButton>
    </DiscordActionRow>
  </DiscordEmbed>
</EmbedMessage>

<details>
<summary>Show code</summary>

```jsx
<DiscordMessage username="Orion Board" timestamp="Today at 4:12 PM" app>
  <DiscordEmbed
    authorName="Server Mail"
    authorUrl="https://example.com"
    authorIcon={require("@site/static/img/orion-board-profile.png").default}
    title="Mail from staff"
    titleUrl="https://example.com"
    description={"<@Alex> You have **mail**.\nOpen the *message*, or read the ||hidden note||.\n> Only you can open it."}
  >
    <DiscordField name="From" value="Staff" inline />
    <DiscordField name="Kind" value="Custom" inline />
    <DiscordField name="What they can do" value={"- Open the mail\n- Ask for help"} />
    <DiscordActionRow>
      <DiscordRowButton type="primary" emoji="📬">Open</DiscordRowButton>
      <DiscordRowButton type="secondary">Dismiss</DiscordRowButton>
      <DiscordRowButton type="success">Done</DiscordRowButton>
      <DiscordRowButton type="danger">Delete</DiscordRowButton>
      <DiscordRowButton type="link" href="https://example.com">Docs</DiscordRowButton>
    </DiscordActionRow>
  </DiscordEmbed>
</DiscordMessage>
```

</details>

**Live Example (no accent, full image, select, and a row under the embed):**

<EmbedMessage
  username="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  timestamp="Today at 4:20 PM"
>
  <DiscordEmbed
    accent={false}
    image={require("@site/static/img/you-got-mail.png").default}
    imageAlt="You got mail"
    description="The sticker sits under the text when you pass image."
  >
    <DiscordActionRow>
      <DiscordSelect placeholder="Choose a follow-up" />
    </DiscordActionRow>
  </DiscordEmbed>
  <DiscordActionRow>
    <DiscordRowButton type="secondary" disabled>Remind later</DiscordRowButton>
  </DiscordActionRow>
</EmbedMessage>

<details>
<summary>Show code</summary>

```jsx
<DiscordMessage
  username="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  timestamp="Today at 4:20 PM"
>
  <DiscordEmbed
    accent={false}
    image={require("@site/static/img/you-got-mail.png").default}
    imageAlt="You got mail"
    description="The sticker sits under the text when you pass image."
  >
    <DiscordActionRow>
      <DiscordSelect placeholder="Choose a follow-up" />
    </DiscordActionRow>
  </DiscordEmbed>
  <DiscordActionRow>
    <DiscordRowButton type="secondary" disabled>Remind later</DiscordRowButton>
  </DiscordActionRow>
</DiscordMessage>
```

</details>

**DiscordMessage props:**

| Prop | Required | Description |
| --- | --- | --- |
| `username` | Yes | Display name above the embed |
| `avatar` | No | Profile picture to the left of the message |
| `timestamp` | No | Time text beside the display name. Shown as written |
| `app` | No | Shows the APP badge beside the display name |
| `channel` | No | Channel name shown in a Discord-style header bar above the message, e.g. `"🪄｜events-attendees"`. A leading `#` is removed |
| `children` | No | One or more `DiscordEmbed`s, plus up to 5 `DiscordActionRow`s under them |

**DiscordEmbed props:**

| Prop | Required | Description |
| --- | --- | --- |
| `color` | No | Left accent color. Default is Discord blurple `#5865F2` |
| `accent` | No | `false` removes the left bar |
| `authorName` | No | Name inside the embed, above the title |
| `authorUrl` | No | Makes the author name a link. `https://` or a site path starting with `/` |
| `authorIcon` | No | Small picture beside the author name |
| `title` | No | Embed title |
| `titleUrl` | No | Makes the title a link. Same URL rules as `authorUrl` |
| `description` | No | Body text. Discord markdown, written as a string |
| `thumbnail` | No | Small image at the top right |
| `thumbnailAlt` | No | Alt text for the thumbnail |
| `image` | No | Full-width image under the text |
| `imageAlt` | No | Alt text for that image |
| `children` | No | `DiscordField`s and `DiscordActionRow`s. A plain text child is used as the description when `description` is omitted |

**DiscordField props:**

| Prop | Required | Description |
| --- | --- | --- |
| `name` | Yes | Field label |
| `value` | No | Text under the label. Discord markdown. Line breaks stay on their own lines |
| `inline` | No | Half width. Two inline fields sit on one row. A field without `inline` spans the row |

**DiscordActionRow props:**

| Prop | Required | Description |
| --- | --- | --- |
| `children` | Yes | 1–5 `DiscordRowButton`s, or one `DiscordSelect`. A select in the row replaces any buttons in that same row |

**DiscordRowButton props:**

| Prop | Required | Description |
| --- | --- | --- |
| `type` | No | `primary` (default), `secondary`, `success`, `danger`, or `link`. `error` is the same as `danger` |
| `emoji` | No | Emoji shown before the label |
| `href` | No | Used by `link` buttons. `https://` or a site path starting with `/` |
| `disabled` | No | Greys the button out |
| `children` | No | Button label |

**DiscordSelect props:**

| Prop | Required | Description |
| --- | --- | --- |
| `placeholder` | No | Text on the closed menu. Default is “Make a selection” |
| `disabled` | No | Greys the menu out |
| `options` | No | List of `{ label, emoji?, description? }`. Makes the menu clickable to show them. Display only: picking one does nothing |

**Live Example (channel header and a clickable menu):**

<EmbedMessage channel="🪄｜events-attendees" username="Hephia V2" avatar={require("@site/static/img/sandbox/hephia-v2-avatar.png").default} timestamp="Today at 7:00 PM" app>
  <DiscordEmbed accent={false} description="# 📅 Friday Lewd Social">
    <DiscordActionRow>
      <DiscordSelect
        placeholder="Update event status…"
        options={[
          { label: "Door Open", emoji: "🚪" },
          { label: "Instance Full", emoji: "🚫" },
          { label: "Custom", emoji: "📝", description: "Write your own status" },
        ]}
      />
    </DiscordActionRow>
  </DiscordEmbed>
</EmbedMessage>

<details>
<summary>Show code</summary>

```jsx
<DiscordMessage channel="🪄｜events-attendees" username="Hephia V2" avatar={...} timestamp="Today at 7:00 PM" app>
  <DiscordEmbed accent={false} description="# 📅 Friday Lewd Social">
    <DiscordActionRow>
      <DiscordSelect
        placeholder="Update event status…"
        options={[
          { label: "Door Open", emoji: "🚪" },
          { label: "Instance Full", emoji: "🚫" },
          { label: "Custom", emoji: "📝", description: "Write your own status" },
        ]}
      />
    </DiscordActionRow>
  </DiscordEmbed>
</DiscordMessage>
```

</details>

**Notes:**

- Put Discord markdown in the `description` string or a field `value` string. Write a mention as `` `<@Name>` ``, a role as `` `<@&Role>` ``, a channel as `` `<#channel>` ``, plus `@everyone` and `@here`. A raw mention in the page would be read as a component.
- Markdown that works in those strings: bold, italic, underline, strike, inline code, code blocks, quotes, lists, headings, links, and spoilers. A spoiler reveals on click.
- A row placed inside `DiscordEmbed` renders inside the embed, under the text and image. A row placed as a child of `DiscordMessage` renders under the embed.
- At most 5 action rows are drawn, and at most 5 buttons per row.
- The buttons and the select are pictures of the Discord controls. They do not run the action.
- Leave `color` off for blurple. Set `color` for a custom accent. Set `accent={false}` when the embed should have no bar.

---

## Slash Command 🆕

**Component:** `SlashCommand`  
**Description:** A Discord chat-bar picture of a slash command. Use it when a page needs to show how to run a command. Leave `options` off for the command picker. Pass `options` for the layout that appears once the command is selected. The leading slash is added for you. Without `interactive`, it does not accept clicks. `interactive` lets the reader type in the bar.

**Required Import:**

```jsx
import SlashCommand from "@site/src/components/SlashCommand";
```

**Live Example (command picker):**

<SlashCommand
  command="server-mail"
  description="Send server mail. The member and message are added in the next step."
  bot="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  plus
/>

<details>
<summary>Show code</summary>

```jsx
<SlashCommand
  command="server-mail"
  description="Send server mail. The member and message are added in the next step."
  bot="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  plus
/>
```

</details>

**Live Example (options on a selected command):**

<SlashCommand
  command="config"
  description="Configure persona, behavior, channel, permission, and model settings."
  bot="Sample"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  options={[
    { name: "page", description: "Page to open the panel on." },
    { name: "persona", description: "Persona to select when the panel opens." },
  ]}
/>

<details>
<summary>Show code</summary>

```jsx
<SlashCommand
  command="config"
  description="Configure persona, behavior, channel, permission, and model settings."
  bot="Sample"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  options={[
    { name: "page", description: "Page to open the panel on." },
    { name: "persona", description: "Persona to select when the panel opens." },
  ]}
/>
```

</details>

**Live Example (placeholder avatar, list longer than 7):**

`avatar="placeholder"` draws Discord’s blue default bot picture, with the grey ring. A picture that cannot be loaded uses the same picture. The list shows 7 options, then scrolls.

<SlashCommand
  command="config"
  description="Configure persona, behavior, channel, permission, and model settings."
  bot="Sample"
  avatar="placeholder"
  options={[
    { name: "page", description: "Page to open the panel on." },
    { name: "persona", description: "Persona to select when the panel opens." },
    { name: "channel", description: "Channel the setting applies to." },
    { name: "role", description: "Role allowed to use the setting." },
    { name: "model", description: "Model used for replies." },
    { name: "tone", description: "How formal the replies sound." },
    { name: "language", description: "Language used in replies." },
    { name: "memory", description: "How much earlier chat to keep." },
  ]}
/>

<details>
<summary>Show code</summary>

```jsx
<SlashCommand
  command="config"
  description="Configure persona, behavior, channel, permission, and model settings."
  bot="Sample"
  avatar="placeholder"
  options={[
    { name: "page", description: "Page to open the panel on." },
    { name: "persona", description: "Persona to select when the panel opens." },
    { name: "channel", description: "Channel the setting applies to." },
    { name: "role", description: "Role allowed to use the setting." },
    { name: "model", description: "Model used for replies." },
    { name: "tone", description: "How formal the replies sound." },
    { name: "language", description: "Language used in replies." },
    { name: "memory", description: "How much earlier chat to keep." },
  ]}
/>
```

</details>

**Live Example (an option waiting for a value):**

<SlashCommand
  command="transfer"
  description="Transfer user data from one user to another"
  bot="Sample"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  options={[
    { name: "apply", description: "Apply the transfer (false = preview only)", focused: true, choices: ["True", "False"] },
    { name: "from", description: "User to copy from" },
    { name: "to", description: "User to copy to" },
    { name: "reason", description: "Why this transfer is happening" },
  ]}
/>

<details>
<summary>Show code</summary>

```jsx
<SlashCommand
  command="transfer"
  description="Transfer user data from one user to another"
  bot="Sample"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  options={[
    { name: "apply", description: "Apply the transfer (false = preview only)", focused: true, choices: ["True", "False"] },
    { name: "from", description: "User to copy from" },
    { name: "to", description: "User to copy to" },
    { name: "reason", description: "Why this transfer is happening" },
  ]}
/>
```

</details>

**Live Example (longest Discord path — command, group, subcommand, option):**

<SlashCommand
  command="events"
  group="channel"
  subcommand="set"
  description="Set the staff-only channel used for event attendee listings."
  bot="Hephia"
  options={[
    {
      name: "channel",
      description: "The channel where staff will see the list of attendees for each event.",
      focused: true,
    },
  ]}
/>

<details>
<summary>Show code</summary>

```jsx
<SlashCommand
  command="events"
  group="channel"
  subcommand="set"
  description="Set the staff-only channel used for event attendee listings."
  bot="Hephia"
  options={[
    {
      name: "channel",
      description: "The channel where staff will see the list of attendees for each event.",
      focused: true,
    },
  ]}
/>
```

</details>

**Live Example (required field, nothing typed yet):**

The other options stay hidden until `name` has a value. The chat bar is its own rounded box. A list, when there is one, sits above it.

<SlashCommand
  command="start-event"
  description="Start a new event signup post."
  bot="Hephia"
  options={[
    { name: "name", description: "The name of the event.", required: true, requiredWarning: true, active: true },
    { name: "duration", description: "How long the event will last. Defaults to 2 hours if omitted." },
    { name: "start-time", description: "Unix seconds or a Discord timestamp. If omitted, your last timestamp post is used." },
    { name: "roleplay-options", description: "Comma-separated roleplay roles attendees can pick." },
    { name: "world-vote", description: "Parse your announcement for VRChat world links to vote on." },
    { name: "voting-basic", description: "Comma-separated basic vote options." },
    { name: "allow-vote-skip", description: "Let attendees finish signup without voting. Defaults to false." },
    { name: "world-multi-vote", description: "Allow multiple world selections. Defaults to false." },
    { name: "roleplay-multi-vote", description: "Allow multiple roleplay roles, including alongside a world vote. Defaults to false." },
    { name: "basic-multi-vote", description: "Allow multiple basic vote options. Defaults to false." },
    { name: "custom-vote-text", description: "Text shown when asking attendees to pick vote options." },
    { name: "is-patreon", description: "Patreon-only event. High Patreon can bring a +1." },
    { name: "signup-role", description: "Also allow this role to sign up." },
    { name: "use-volunteers-list", description: "Pull confirmed volunteers from one of your upcoming volunteer events." },
  ]}
/>

<details>
<summary>Show code</summary>

```jsx
<SlashCommand
  command="start-event"
  description="Start a new event signup post."
  bot="Hephia"
  options={[
    { name: "name", description: "The name of the event.", required: true, requiredWarning: true, active: true },
    { name: "duration", description: "How long the event will last. Defaults to 2 hours if omitted." },
    { name: "start-time", description: "Unix seconds or a Discord timestamp. If omitted, your last timestamp post is used." },
    { name: "roleplay-options", description: "Comma-separated roleplay roles attendees can pick." },
    { name: "world-vote", description: "Parse your announcement for VRChat world links to vote on." },
    { name: "voting-basic", description: "Comma-separated basic vote options." },
    { name: "allow-vote-skip", description: "Let attendees finish signup without voting. Defaults to false." },
    { name: "world-multi-vote", description: "Allow multiple world selections. Defaults to false." },
    { name: "roleplay-multi-vote", description: "Allow multiple roleplay roles, including alongside a world vote. Defaults to false." },
    { name: "basic-multi-vote", description: "Allow multiple basic vote options. Defaults to false." },
    { name: "custom-vote-text", description: "Text shown when asking attendees to pick vote options." },
    { name: "is-patreon", description: "Patreon-only event. High Patreon can bring a +1." },
    { name: "signup-role", description: "Also allow this role to sign up." },
    { name: "use-volunteers-list", description: "Pull confirmed volunteers from one of your upcoming volunteer events." },
  ]}
/>
```

</details>

**Live Example (animated when the page loads):**

It types the command, pauses, then a space brings in every required option at once. Each `input` is typed in order. The caret pauses in the next field before it starts typing. The chat bar stays put while the list above changes size. After it finishes, the small circle on the right fills for 10 seconds and the animation starts over. Use `animate="hover"` to wait until the pointer is over it.

<SlashCommand
  animate="load"
  channel="event-announcements"
  command="start-event"
  description="Start a new event signup post."
  bot="Hephia"
  avatar="placeholder"
  plus
  options={[
    { name: "name", description: "The name of the event.", required: true, input: "Friday Social" },
    { name: "duration", description: "How long the event will last.", required: true, input: "2h" },
    { name: "world-vote", description: "Parse your announcement for VRChat world links to vote on." },
  ]}
/>

<details>
<summary>Show code</summary>

```jsx
<SlashCommand
  animate="load"
  channel="event-announcements"
  command="start-event"
  description="Start a new event signup post."
  bot="Hephia"
  avatar="placeholder"
  plus
  options={[
    { name: "name", description: "The name of the event.", required: true, input: "Friday Social" },
    { name: "duration", description: "How long the event will last.", required: true, input: "2h" },
    { name: "world-vote", description: "Parse your announcement for VRChat world links to vote on." },
  ]}
/>
```

</details>

**Live Example (one filled option, one focused and empty):**

<SlashCommand
  command="transfer"
  description="Transfer user data from one user to another"
  bot="Sample"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  options={[
    { name: "apply", description: "Apply the transfer (false = preview only)", value: "True" },
    { name: "from", description: "User to copy from", focused: true },
    { name: "to", description: "User to copy to" },
    { name: "reason", description: "Why this transfer is happening" },
  ]}
/>

<details>
<summary>Show code</summary>

```jsx
<SlashCommand
  command="transfer"
  description="Transfer user data from one user to another"
  bot="Sample"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  options={[
    { name: "apply", description: "Apply the transfer (false = preview only)", value: "True" },
    { name: "from", description: "User to copy from", focused: true },
    { name: "to", description: "User to copy to" },
    { name: "reason", description: "Why this transfer is happening" },
  ]}
/>
```

</details>

**Props:**

| Prop | Required | Description |
| --- | --- | --- |
| `command` | Yes | Command name without the slash |
| `group` | No | Subcommand group. One at most, and only between the command and the subcommand |
| `subcommand` | No | Subcommand name. Sits after the command, or after the group |
| `description` | No | Line under the command. In the options layout it also fills the dark bar fused to the top of the chat bar |
| `bot` | Yes | Bot name on the right of the command row |
| `avatar` | No | Bot profile picture. `"placeholder"` is Discord’s blue default, with the grey ring. A picture that cannot be loaded uses that same default. In the options layout it also sits on the left of the chat bar |
| `plus` | No | Shows the non-functional + on the left of the chat bar. Command picker only |
| `options` | No | List of option objects. Passing at least one switches to the Options layout. The chat bar shows `+N options` until one is in the bar, then `+N more` for the ones still not shown |
| `animate` | No | `"load"` plays as soon as the page loads. `"hover"` waits until the pointer is over the component. It then loops |
| `channel` | No | Shows a dimmed `Message #name` in the chat bar until typing starts |
| `demoLabel` | No | Pill at the top left. Defaults to `Example`, or `Try it` when `interactive` is set. Pass an empty string to hide it |
| `interactive` | No | The reader types in the chat bar. The option list filters as they type. Enter or click selects. A reset button sits at the right of the chat bar |
| `start` | No | Interactive only. `command` (default) starts with the slash command written. `empty` starts from a blank bar. Type the command to bring it up |

**Option fields:**

| Field | Description |
| --- | --- |
| `name` | Option name |
| `description` | Shown on the right of the list, and on the dark bar while this option is `active` |
| `choices` | Values listed under Options while this option is `active`. The first is highlighted, or the one that matches `value` |
| `active` | This option is waiting for input. It is placed in the chat bar |
| `required` | While this option is empty and has no `choices`, the options list stays hidden. The chat bar still shows `+N more` |
| `focused` | Blue border on this pill. No other pill gets the blue border |
| `requiredWarning` | Optional. Desktop uses a light red border on that pill. Mobile colors that option’s label, including the colon, red |
| `selected` | Place this option in the chat bar |
| `value` | Text in the grey zone on the right of the option label. Also places the option in the bar |
| `input` | Text the animation types into this option. Options with `input` play in the order they are listed |
| `type` | Interactive picker. `user` lists up to 3 members. `role` lists up to 3 server roles. `attachment` lists up to 3 files. `boolean` lists True and False. `string` is typed freely |
| `suggestions` | Replaces the built-in member, role, or file names |

**Notes:**

- The picker title is always “Commands matching” plus the command. The options title is always “Options”.
- Discord’s longest command text is the command, one group, and one subcommand, then the option labels. Nothing nests further than that. `/events channel set` with the `channel` option is that full path.
- The options list is a separate box above the chat bar. The chat bar, including its description strip, keeps rounded top corners.
- A required option with nothing typed yet hides that list. `/start-event` does this on `name`, and the bar shows `+13 more`.
- An option already in the chat bar is left out of the list above. Choices for the focused option still show.
- Selected options sit in a row in the chat bar. The one waiting for input has a small grey zone on the right end of its label.
- The chat bar uses Discord’s dark theme. It has no buttons on the right.
- The + does nothing. It is only there when `plus` is set.
- **Example** sits at the top left. **Desktop** and **Mobile** sit at the top right. The first view follows the visitor’s screen. Mobile shows one command pill, then the option chips with the description under them in the same card. Filled options leave that bar. **Optional** sits in dim text just before the optional ones. The chat bar wraps a whole option at a time, and a long value can wrap on its own. A required option that is still empty can use red text. Choice lists show 4 rows, then scroll.
- The options list shows 7 rows. Anything past that scrolls. The scrollbar does not select an option.
- With `animate`, the command is typed one character at a time and the match shows above. It pauses on the finished command, then a space drops every required option into the chat bar together. Each `input` is then typed into its option. After the caret moves into the next option, it pauses before typing. The chat bar stays put. Any spare room for a taller frame sits above the command or options box, so that box stays just above the chat. When other options are still available they stay in the list. When none are, the bar just waits for that answer. After the last input, a small circle on the right fills for 10 seconds and the animation starts again from empty.
- `interactive` ignores `animate`. The chat bar is a real text field. The list stays hidden until the bar is focused. The main bar lists options still to add. An option with choices, members, roles, or files lists those. A plain string shows no list. Enter or a click selects the highlighted row, leaves the caret at the right end, and keeps arrow keys working. Backspace on an empty field removes the last value. Reset clears the bar. While the bar is focused, a gap stays above it so the bar does not jump when the list changes.

**Live Example (interactive):**

Starts with the command written. Click the bar to open the options. Type to filter, then click or press Enter. A string such as reason shows no list. Members, roles, and files offer up to three names. Reset is at the right of the chat bar. `start="empty"` begins from a blank bar instead.

<SlashCommand
  interactive
  command="warn"
  description="Issue a formal warning to a member"
  bot="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  options={[
    { name: "user", description: "The user to warn", type: "user" },
    { name: "reason", description: "Reason for warning", required: true },
    { name: "role", description: "Role related to this warning", type: "role" },
  ]}
/>

---

## Discord Sandbox 🆕

**Component:** `DiscordSandbox`  
**Description:** A fake Discord server where staff can safely try bot commands and buttons. It has channels, members, roles, pings, ephemeral replies, modals, and a reset button. Each sandbox runs a scenario coded in `src/components/DiscordSandbox/scenarios/`. It is too large to demo on this page.

👉 **[Open the Hephia Event Sandbox](/docs/event-staff-handbook/hephia-event-sandbox)**

**Required Import:**

```jsx
import DiscordSandbox from "@site/src/components/DiscordSandbox";
import { hephiaScenarios } from "@site/src/components/DiscordSandbox/scenarios/hephia";

<DiscordSandbox scenarios={hephiaScenarios} layout="compact" />
```

| Prop | Required | Description |
| --- | --- | --- |
| `scenarios` | Yes | One or more scenarios. With several, a picker appears in the top bar |
| `layout` | No | `"compact"` (default) fits a page with other content. `"full"` fills most of the screen. Visitors can switch, and their choice is saved |
| `lockLayout` | No | Hides the Compact / Full switch |
| `centerOnLoad` | No | Scrolls the page so the sandbox sits in the middle of the screen when it loads. Use it on a page that is mostly the sandbox |

---

## Video Carousel 🆕

**Component:** `VideoCarousel`  
**Description:** A full-width card that plays one video at a time. Tabs at the top switch videos, arrows on each side go back and forward, and videos slide in and out. Only the video in view is loaded; the others are unloaded so they don't download or keep playing.

**Required Import:**

```jsx
import VideoCarousel from "@site/src/components/VideoCarousel";
```

**Live Example:**

<VideoCarousel
  heading="🎬 Example"
  videos={[
    { title: "Welcome", src: "/videos/hephia-event-system/01-welcome.mp4" },
    { title: "The /start-event command", src: "/videos/hephia-event-system/02-command.mp4" },
    { title: "Voting", src: "/videos/hephia-event-system/06-voting.mp4" },
  ]}
/>

<details>
<summary>Show code</summary>

```jsx
<VideoCarousel
  heading="🎬 Example"
  videos={[
    { title: "Welcome", src: "/videos/hephia-event-system/01-welcome.mp4" },
    { title: "The /start-event command", src: "/videos/hephia-event-system/02-command.mp4" },
    { title: "Voting", src: "/videos/hephia-event-system/06-voting.mp4" },
  ]}
/>
```

</details>

| Prop | Required | Description |
| --- | --- | --- |
| `videos` | Yes | List of `{ title, src, poster? }`. Put files in `static/` and pass the path without `static`, e.g. `"/videos/intro.mp4"`. Full URLs work too |
| `heading` | No | Text at the top of the card |

**Notes:**

- The left and right arrow keys also switch videos when the card has focus.
- Arrows are disabled on the first and last video.
