---
id: scheduling-procedures
title: Scheduling Procedures
sidebar_position: 7
---

import CardGrid, { Card } from "@site/src/components/CardGrid";
import RoleBadge from "@site/src/components/RoleBadge";
import ChannelBadge from "@site/src/components/ChannelBadge";

# Scheduling Procedures
:::note
Event schedules run from *Monday to Sunday!*
:::

## Weekly Scheduling

### Wednesday/Thursday

- An <RoleBadge role="Event Committee" color="#db1cb8" /> member will post a new scheduling thread in <ChannelBadge variant="post" label="📆event-scheduling" link="https://discord.com/channels/734595073920204940/1024399192300454029" /> for the next week's schedule.
- As a <RoleBadge role="Event Host" color="#f75edb" /> or <RoleBadge role="Event Trial" color="#f75edb" />, you are expected to fill out the availability template with your desired time slots, listing them in order of preference.

### Saturday

- A rough draft of the schedule will be posted in the scheduling thread.
- The <RoleBadge role="Event Committee" color="#db1cb8" /> will ensure everyone is scheduled correctly and fairly.
- <RoleBadge role="Event Trial" color="#f75edb" /> may request training sessions with <RoleBadge role="Senior Event Team" color="#3fa7ff" /> members.

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

### Request Escalation Path

1. **All <RoleBadge role="Event Host" color="#f75edb" />** / **<RoleBadge role="Senior Event Team" color="#3fa7ff" />** → Request from <RoleBadge role="Event Security" color="#3fa7ff" />
2. If no Security → Request from <RoleBadge role="Server Moderator" color="#e68027" /> or <RoleBadge role="Senior Event Team" color="#3fa7ff" />
3. **<RoleBadge role="Server Moderator" color="#e68027" />** support → Proceed with event
4. **<RoleBadge role="Senior Event Team" color="#3fa7ff" />** support → <RoleBadge role="Senior Event Team" color="#3fa7ff" /> can solo host*
5. If no support available → Follow event type rules above

:::note
*<RoleBadge role="Senior Event Team" color="#3fa7ff" />* can solo host Classic and Popup events when no security or support is available. Special events always require security or must be cancelled.
:::

## Related

- [How to Host an Event](./how-to-host-an-event)
- [Security Requirements](../Security/security-requirements)
- [Event Team Channels](../event-team-channels)
