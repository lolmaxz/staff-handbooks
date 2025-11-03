---
id: scheduling-procedures
title: Scheduling Procedures
---

import CardGrid, { Card } from "@site/src/components/CardGrid";
import RoleBadge from "@site/src/components/RoleBadge";
import ChannelBadge from "@site/src/components/ChannelBadge";
import DiscordConversation, { DiscordMessage } from "@site/src/components/DiscordConversation";

# Scheduling Procedures

:::note
Event schedules run from _Monday to Sunday!_
:::

## Weekly Scheduling

### Wednesday/Thursday

- An <RoleBadge role="Event Committee" color="#db1cb8" /> member will post a new scheduling thread in <ChannelBadge variant="post" label="📆event-scheduling" link="https://discord.com/channels/734595073920204940/1024399192300454029" /> for the next week's schedule.
- As a <RoleBadge role="Event Host" color="#f75edb" /> or <RoleBadge role="Event Trial" color="#f75edb" />, you are expected to fill out the availability template with your desired time slots, listing them in order of preference.

## Availability Templates

### Trial Host Template

If you're a <RoleBadge role="Event Trial" color="#f75edb" />, use the Trial Host Template:

**Instructions:**

- For each day, specify the **times** or **time ranges** you are available to potentially get trained
- Times must be in **EST** (Eastern Standard Time)
- You can provide a time range like `8pm->11pm` (available during that range)
- Use `+` for either time but not in between, like `8pm+11pm` (available at 8pm OR 11pm, not in between)
- If you are on your **second phase for Solo event**, you can also specify your **preferred event type** if you have a preference
- Include how many events you're willing to be trained on that week
- **You will also be responsible to reach out to trainers** to train you unless they do it first

<details>
<summary>📋 Trial Host Template (Click to expand)</summary>

Copy this template (remove the code block markers when posting):

```
## --- My Schedule [TRIAL] ---
### Max Event Willing to Host/Be Trained this Week: [Number]

** --- Monday --- **
-

** --- Tuesday --- **
-

** --- Wednesday --- **
-

** --- Thursday --- **
-

** --- Friday --- **
-

** --- Saturday --- **
-

** --- Sunday --- **
-

### --- END SCHEDULE ---
```

**Example format for a day:**

- `• 8pm + Classic Event (?Event Type Preference)` - Available at 8pm EST, prefers Classic Event type
- `• 9pm->11pm` - Available between 9pm and 11pm EST

</details>

### Host Template (or Trial in Solo Phase)

If you're a <RoleBadge role="Event Host" color="#f75edb" /> or a <RoleBadge role="Event Trial" color="#f75edb" /> in the solo phase, use the Host Template:

**Instructions:**

- For each time you give, you can specify if you are willing to offer training or not
- In case you want to do a special event or really want to host that event yourself without being asked to train on that day/event
- **If omitted, we will assume you don't mind training another Trial Host**
- Times must be in **EST** (Eastern Standard Time)
- You can provide a time range like `8pm->11pm` (available during that range)
- Use `+` for either time but not in between, like `8pm+11pm` (available at 8pm OR 11pm, not in between)
- Include how many events you're willing to host that week

<details>
<summary>📋 Host Template (Click to expand)</summary>

Copy this template (remove the code block markers when posting):

```
## My Schedule --
### Max Event Willing to Host this Week: [Number]

** -- Monday -- **
** -- Tuesday -- **
** -- Wednesday -- **
** -- Thursday -- **
** -- Friday -- **
** -- Saturday -- **
** -- Sunday -- **
### --- END SCHEDULE ---
```

**Example format for a day:**

- `• 8pm + Classic Event + (?No Training)` - Available at 8pm EST for Classic Event, not willing to train that day
- `• 9pm->11pm + Special Event` - Available between 9pm and 11pm EST for Special Events
- `• 7pm` - Available at 7pm EST (willing to train if needed)

</details>

:::tip 💖 Managing Availability
This way you can give many availabilities, but scheduling will try to limit your hosting/training to the amount you specified! This helps manage workload and ensures fair distribution.
:::

---

### Saturday

- A rough draft of the schedule will be posted in the scheduling thread.
- The <RoleBadge role="Event Committee" color="#db1cb8" /> will ensure everyone is scheduled correctly and fairly.
- <RoleBadge role="Event Trial" color="#f75edb" /> may request training sessions with <RoleBadge role="Senior Event Team" color="#3fa7ff" /> members.

---

### Sunday

- Final changes will be made to the schedule around this time.
- The finalized schedule will be published in <ChannelBadge variant="post" label="📆event-scheduling" link="https://discord.com/channels/734595073920204940/1024399192300454029" /> (staff) and <ChannelBadge variant="post" label="📆event-schedule" link="https://discord.com/channels/734595073920204940/1234567890123456789" /> (public).

## Day of the Event

- The main <RoleBadge role="Event Host" color="#f75edb" /> is responsible for pinging the <RoleBadge role="Event Security" color="#3fa7ff" /> role to request security before the event starts.
- <RoleBadge role="Senior Event Team" color="#3fa7ff" /> can host without security (excluding big events).
- <RoleBadge role="Event Host" color="#f75edb" /> without available security may request permission to proceed without one.
- <RoleBadge role="Senior Event Team" color="#3fa7ff" /> or <RoleBadge role="Server Moderator" color="#e68027" /> can act as security if needed.

:::tip Don't Forget!
Communication is key! Ensure you're proactive in coordinating with security and other staff members.
:::

## Security Request Procedure

Follow this flowchart to determine when and how to request security based on your event type:

<CardGrid columns={3}>
  <Card title="Scheduled Classic Events*" status="info">
    <p><strong>START:</strong> Request security when Event Announcement is posted</p>
    <hr style={{margin: "1rem 0"}} />
    <p><strong>IF NO SECURITY 1hr prior:</strong> Request support</p>
    <hr style={{margin: "1rem 0"}} />
    <p><strong>IF NO SUPPORT:</strong> Only <RoleBadge role="Senior Event Team" color="#3fa7ff" /> can solo host*</p>
    <p style={{marginTop: "0.5rem", fontSize: "0.9em", fontStyle: "italic"}}>
      *Solo hosting requires <RoleBadge role="Senior Event Team" color="#3fa7ff" /> status
    </p>
  </Card>
  <Card title="Scheduled Special Events" status="warning">
    <p><strong>START:</strong> Request security <strong>24-48hrs</strong> prior to Event</p>
    <hr style={{margin: "1rem 0"}} />
    <p><strong>IF NO SECURITY DAY OF:</strong> Request support</p>
    <hr style={{margin: "1rem 0"}} />
    <p><strong>IF NO SUPPORT:</strong> <span style={{color: "#dc2626", fontWeight: "bold"}}>CANCEL</span> - Ineligible for solo host</p>
    <p style={{marginTop: "0.5rem", fontSize: "0.9em"}}>
      Special events require security or support
    </p>
  </Card>
  <Card title="Unscheduled Popup Events" status="info">
    <p><strong>START:</strong> Request security <strong>before</strong> Event is requested in chat</p>
    <hr style={{margin: "1rem 0"}} />
    <p><strong>IF NO SECURITY 1hr prior:</strong> Request support</p>
    <hr style={{margin: "1rem 0"}} />
    <p><strong>IF NO SUPPORT:</strong> Only <RoleBadge role="Senior Event Team" color="#3fa7ff" /> can solo host</p>
    <p style={{marginTop: "0.5rem", fontSize: "0.9em", fontStyle: "italic"}}>
      Popup events need advance security confirmation
    </p>
  </Card>
</CardGrid>

### Example: Requesting Security for Your Event

<DiscordConversation title="Security Request - Classic Event Tonight 9pm EST">
  <DiscordMessage
    name="Event Host 1"
    color="#f75edb"
  >
    Hi <span className="mention">@Event Security</span> — I’m hosting a Classic event tonight at <strong>9pm EST</strong>.
    
    Looking for <strong>1 security</strong>. Pretty please! 😊
  </DiscordMessage>
  <DiscordMessage
    name="Event Security 1"
    color="#3fa7ff"
    message="I can cover! I’ll be there 10 minutes early to help with lineup."
  />
  <DiscordMessage
    name="Event Host 1"
    color="#f75edb"
    message="Thank you! Don't forget to add `(security)` in the signup thread next to your name. 😊"
  />
</DiscordConversation>

If no security responds 1 hour prior, follow the escalation path below.

### Request Escalation Path

1. **All <RoleBadge role="Event Host" color="#f75edb" />** / **<RoleBadge role="Senior Event Team" color="#3fa7ff" />** → Request from <RoleBadge role="Event Security" color="#3fa7ff" />
2. If no Security → Request from <RoleBadge role="Server Moderator" color="#e68027" /> or <RoleBadge role="Senior Event Team" color="#3fa7ff" />
3. **<RoleBadge role="Server Moderator" color="#e68027" />** support → Proceed with event
4. **<RoleBadge role="Senior Event Team" color="#3fa7ff" />** support → <RoleBadge role="Senior Event Team" color="#3fa7ff" /> can solo host\*
5. If no support available → Follow event type rules above

:::note
_<RoleBadge role="Senior Event Team" color="#3fa7ff" />_ can solo host Classic and Popup events when no security or support is available. Special events always require security or must be cancelled.
:::

## Related

- [How to Host an Event](./how-to-host-an-event)
- [Security Requirements](../Security/security-requirements)
- [Event Team Channels](../event-team-channels)
