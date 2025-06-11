---
id: new-component
title: New Components Explained!
sidebar_position: 9
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

# New Components Explained

This page provides examples and clear explanations for all our custom components, so everyone understands their functionality and usage.

---

## Text With Button

**Component:** `TextWithButton`  
**Description:** Displays a text prompt with an actionable button that links to a resource. Perfect for highlighting downloadable files or external links.

**Live Example:**

<TextWithButton
  text="Need the quick-reference PDF version of the Incident‑Response Cheat‑Sheet?"
  buttonLabel="Download PDF"
  buttonHref="/files/incident-cheatsheet.pdf"
/>

```jsx title="TextWithButton Usage Code Example:"
<TextWithButton
  text="Need the quick-reference PDF version of the Incident‑Response Cheat‑Sheet?"
  buttonLabel="Download PDF"
  buttonHref="/files/incident-cheatsheet.pdf"
/>
```

---

## Role Badge

**Component:** `RoleBadge`  
**Description:** Renders a badge showing a role’s name along with optional icons and colors. Use it to visually represent staff roles or permissions.

**Live Example:**

<RoleBadge role="Potato" badgeIcon="admin_role_icon.png" color="#db1cb8" />
<br/>
<br/>
```jsx title="RoleBadge Usage Code Example:"
<RoleBadge role="Potato" badgeIcon="admin_role_icon.png" color="#db1cb8" />
```

---

## Channel Badge

**Component:** `ChannelBadge`  
**Description:** Creates a clickable badge that links to a specific channel and supports variants to visually distinguish between channel types.

**Live Example:**

Make sure to read the <ChannelBadge label="Rules" link="link_here" /> channel rules before posting in the <ChannelBadge variant="post" label="introductions" link="link_here" /> channel.

Here are some examples of Channel Tags:

<ChannelBadge label="Rules" link="link_here" />
<ChannelBadge variant="thread" label="ticket‑9876" link="link_here" color="#248046" />
<ChannelBadge variant="post" label="introductions" link="link_here" />
<ChannelBadge variant="vc" label="💦 Horny Time" link="link_here" />
<br/>
<br/>
```jsx title="ChannelBadge Usage Code Example:"
// Regular channel badge
<ChannelBadge
  label="Rules"
  link="link_here"
/>

// Variant badge for posts
<ChannelBadge
  variant="post"
  label="introductions"
  link="link_here"
/>

// Ticket (Thread) example
<ChannelBadge
  variant="thread"
  label="ticket‑9876"
  link="link_here"
  color="#248046"
/>

// Voice Chat example
<ChannelBadge
  variant="vc"
  label="💦 Horny Time"
  link="link_here"
/>

````

---

## Checklist

**Component:** `Checklist`
**Description:** Organizes a list of checklist items for process verification or step-by-step tasks. In addition to styling individual items, the Checklist supports a custom color option that affects the border, checkboxes, and filling bar.

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
<Checklist.Item id="selfie-one-id">Selfie with one ID <u>Test</u></Checklist.Item>
<Checklist.Item id="id-issuer-visible">• Issuer (government / state / country) is visible</Checklist.Item>
<Checklist.Item id="id-dob-visible">• DOB is visible</Checklist.Item>
</Checklist>
</>
);
}

<LiveColourChecklist />


```jsx title="Checklist Usage Code Example:"
<Checklist checklistId="demo" title="ID & Selfie Verification" borderColor="#800080">
  <Checklist.Item id="selfie-one-id">Selfie with one ID</Checklist.Item>
  <Checklist.Item id="id-issuer-visible">• Issuer (government / state / country) is visible</Checklist.Item>
  <Checklist.Item id="id-dob-visible">• DOB is visible</Checklist.Item>
  {/* Additional checklist items */}
</Checklist>
````

---

## Tooltip

**Component:** `Tooltip`  
**Description:** Wraps text to provide additional hover information. Customizable colors and an option to remove default text decorations enhance clarity.

**Usage Examples:**

1. **Without Decoration:**

Live Example:

<Tooltip bubbleColor="blue" noDecoration="true" tip="Text Decoration is optional, but turned on by default!">Underlined Text</Tooltip>
<br/>
<br/>

```jsx title="Tooltip Usage Code Example:"
<Tooltip bubbleColor="blue" noDecoration="true" tip="Text Decoration is optional, but turned on by default!">
  Underlined Text
</Tooltip>
```

2. **Colored Tooltip and Text:**

Live Example:

Amazing <Tooltip tip="The Color of the Text and the bubble can be customized independently." bubbleColor="#248046" labelColor="#34d399">colored text</Tooltip> can be used.

```jsx title="Colored Tooltip Usage Code Example:"
<Tooltip tip="The Color of the Text and the bubble can be customized independently." bubbleColor="#248046" labelColor="#34d399">
  colored text
</Tooltip>
```

3. **Default Tooltip:**

Live Example:

Default <Tooltip tip="Simply specify the tip and the default color (#5865F2) will be applied."> Text bubble</Tooltip>

```jsx title="Default Tooltip Usage Code Example:"
<Tooltip tip="Simply specify the tip and the default color (#5865F2) will be applied.">Text bubble</Tooltip>
```

---

## Command Card

**Component:** `CommandCard`  
**Description:** Displays a card containing detailed information about a command, including required permissions and tooltip information.

**Live Example:**

<CommandCard cmd="/ban" perms="Moderator" cardColor="indigo">
  Bans the mentioned user and deletes their last 24 h of messages.
  *Note: Ensure that the permission provided is valid for the icon to appear.*
</CommandCard>

```jsx title="CommandCard Usage Code Example:"
<CommandCard cmd="/ban" perms="Moderator" cardColor="indigo">
  Bans the mentioned user and deletes their last 24 h of messages.
</CommandCard>
```

---

## Audit Flag

**Component:** `AuditFlag`  
**Description:** Marks recent updates or audit events with a flag indicator. It supports three types of flags: **NEW** (items recently added), **CHANGED** (modified items), and **DEPRECATED** (items no longer recommended or to be removed).

**Live Examples:**

1. **New Audit:**  
   <AuditFlag type="NEW" /> Slash‑command bulk‑ban added.

2. **Changed Audit:**  
   <AuditFlag type="CHANGED" /> Updated user permission hierarchy.

3. **Deprecated Audit:**  
   <AuditFlag type="DEPRECATED" /> The old moderator panel is now deprecated.

```jsx title="AuditFlag Usage Code Example:"
// New Audit
<AuditFlag type="NEW" />

// Changed Audit
<AuditFlag type="CHANGED" />

// Deprecated Audit
<AuditFlag type="DEPRECATED" />
```

---

## Role Matrix

**Component:** `RoleMatrix`  
**Description:** Presents a matrix that compares various roles and the actions/permissions they have. It is especially useful for quickly understanding role responsibilities.

**Live Example:**

<RoleMatrix
actions={["Pin", "Ban", "Mute"]}
data={[
{ role: "Helper", actions: ["Pin"] },
{ role: "Mod", actions: ["Pin", "Mute"] },
{ role: "Admin", actions: ["Pin", "Ban", "Mute"] },
]}
/>

```jsx title="RoleMatrix Usage Code Example:"
<RoleMatrix
  actions={["Pin", "Ban", "Mute"]}
  data={[
    { role: "Helper", actions: ["Pin"] },
    { role: "Mod", actions: ["Pin", "Mute"] },
    { role: "Admin", actions: ["Pin", "Ban", "Mute"] },
  ]}
/>
```

---

## Timestamp

**Component:** `Timestamp`  
**Description:**  
Converts a Unix timestamp following Discord's exact format to a human-readable date/time format. It adjusts to the reader’s local time, continuously refreshes for authenticity, and mimics Discord’s dynamic timestamp design.  
Any timestamp created with the website [hammertime](https://hammertime.cyou/) is also compatible. You can use strings like `<t:1747208640:F>` for a full date/time format or `<t:1747208640:R>` for a relative time format.

**Live Examples:**

The full event time: <Timestamp value="<t:1747208640:F>" />

Time since event: <Timestamp value="<t:1747208640:R>" />

Time since event: <Timestamp value="<t:1747254420:R>" />

```jsx title="Timestamp Usage Code Example:"
// Full date/time format
<Timestamp value="<t:1747208640:F>" />

// Relative time format
<Timestamp value="<t:1747208640:R>" />

<Timestamp value="<t:1747254420:R>" />
```

---

Each section above shows a live example alongside a code snippet, making it easy to see how each component can be used in your project.
