---
id: event-trial-training
title: Event Trial Training
---

import RoleBadge from "@site/src/components/RoleBadge";
import ChannelBadge from "@site/src/components/ChannelBadge";
import SegmentToggle from "@site/src/components/SegmentToggle";
import StepTimeline from "@site/src/components/StepTimeline";
import Tooltip from "@site/src/components/Tooltip";
import CardGrid, { Card } from "@site/src/components/CardGrid";
import Link from "@docusaurus/Link";

# Event Trial Training 🎓

After acceptance as an Event Team member, you will receive the <RoleBadge role="Event Trial" color="#f75edb" /> role and access to event channels. **This page is the main guide for new event staff** — training stages, scheduling, and what to expect at each event.

**On this page**

- [Getting scheduled](#getting-scheduled) — Eden Scheduler, availability, trainers
- [Training path](#training-path) — 6 events across 5 stages
- [Feedback](#feedback) — how seniors evaluate you each event
- [Feedback areas](#feedback-areas) — pings, invites, announcements, hosting, worlds
- [Completion](#completion) — earning Host and/or Security roles

:::note 📝 Trial Requirements
Your trial period requires you to actively staff a minimum of **6 events** in total.
:::

## 📅 Getting Scheduled for Training {#getting-scheduled}

Your first practical step is to get on the weekly schedule so the <RoleBadge role="Event Committee" color="#db1cb8" /> can pair you with a <RoleBadge role="Senior Event Team" color="#3fa7ff" /> trainer. **You are also responsible for reaching out to trainers** unless they contact you first.

<StepTimeline
  title="Getting scheduled"
  size="sm"
  accentColor="#a259f7"
  steps={[
    {
      label: "Log in",
      detail: "Eden Scheduler",
      recap: "Open schedule.theedenapis.com and choose Log in with Discord. Trials use the same Host pages as full hosts.",
    },
    {
      label: "Add availability",
      detail: "Quota + slots",
      recap: "Set your weekly quota first, then add day/time slots with event mode and optional notes (training preferences go in notes).",
    },
    {
      label: "Get paired",
      detail: "Committee + trainer",
      recap: "After Committee Push, Committee pairs you with a Senior whose schedule matches yours. Reach out in #events-organization if you need to coordinate.",
    },
    {
      label: "Train",
      detail: "6 events below",
      recap: "Work through the 5 training stages below — 6 events total from security shadowing through solo host observed.",
    },
  ]}
/>

### 1. Open the Eden Scheduler

- Go to [schedule.theedenapis.com](https://schedule.theedenapis.com) and click **Log in with Discord**
- Click **Host** in the navigation, or use **Add Availabilities** on **Home**
- Full form walkthrough with screenshots: [Host Availability](/docs/general-handbook/eden-scheduler/eden-scheduler-host-availability)

### 2. Submit your availability

- Click **Add Availabilities** (or **Edit Availabilities**) on the week card
- Set your **quota** — max training sessions you want that week
- Add **slots**: days, start/end times, **event mode**, and optional **notes**

On each slot, use the time and timezone toggles:

<SegmentToggle
  left={{ label: "12h", activeBackground: "#a259f7", activeColor: "#ffffff" }}
  right={{ label: "24h", activeBackground: "#a259f7", activeColor: "#ffffff" }}
  value="left"
  size="sm"
/>

<SegmentToggle
  left={{ label: "Local", activeBackground: "#a259f7", activeColor: "#ffffff" }}
  right={{ label: "EST/EDT", activeBackground: "#a259f7", activeColor: "#ffffff" }}
  value="left"
  size="sm"
/>

- In your **solo-host phase**, put your preferred event type in **notes** or use **Specific** event mode
- Training preference (if any) goes in **notes** or Discord — there is no separate training toggle on the form

:::tip 💖 Quota
You can list many slots, but scheduling tries to limit you to the **quota** you set. That helps manage your workload and keeps distribution fair.
:::

### 3. Get paired and coordinate

- The <RoleBadge role="Event Committee" color="#db1cb8" /> pairs you with a <RoleBadge role="Senior Event Team" color="#3fa7ff" /> member whose schedule matches yours
- Training sessions are coordinated from both availabilities — confirm times in Discord when needed

:::tip Finding senior staff
After Committee **Push**es the week, check the <ChannelBadge variant="thread" label="📋CURRENT WEEK'S SCHEDULE" link="https://discord.com/channels/734595073920204940/1208883577643597834" /> thread in <ChannelBadge variant="post" label="📆event-scheduling" link="https://discord.com/channels/734595073920204940/1024399192300454029" />, or **Calendar** in the scheduler ([Shared Calendar](/docs/general-handbook/eden-scheduler/eden-scheduler-shared-calendar)). Look for <RoleBadge role="Senior Event Team" color="#3fa7ff" /> <img src={require("../../static/img/senior_event_team_role_icon.png").default} alt="Senior Event Team Role Icon" width="20" /> or <RoleBadge role="Event Committee" color="#db1cb8" /> <img src={require("../../static/img/event_committee_role_icon.png").default} alt="Event Committee Role Icon" width="20" /> next to names on the schedule.

Once you find an event hosted by Senior staff or Committee, ask in <ChannelBadge label="📘events-organization" link="https://discord.com/channels/734595073920204940/741166096421486645" /> if they can train you during that slot.
:::

Weekly workflow for hosts (including trials): [Scheduling Procedures](../Hosts/scheduling-procedures). Portal overview: [Eden Scheduler](/docs/general-handbook/eden-scheduler).

---

## 🛤️ Training Path {#training-path}

<StepTimeline
  title="Training path (6 events)"
  size="sm"
  accentColor="#f75edb"
  steps={[
    {
      label: "Security shadow",
      detail: "2 events",
      recap: "Follow a Senior through security duties for two events — watch how they welcome members, handle rounds, and de-escalate.",
    },
    {
      label: "Security observed",
      detail: "1 event",
      recap: "You are the main security while a Senior observes. They step in only if you need help or something escalates.",
    },
    {
      label: "Co-host",
      detail: "1 event",
      recap: "Share hosting with a Senior — you practice announcements and flow while they support and coach in real time.",
    },
    {
      label: "Host + co-host",
      detail: "1 event",
      recap: "You lead the event; the Senior acts as co-host backup. This is your first solo-host phase with safety net.",
    },
    {
      label: "Host observed",
      detail: "1 event",
      recap: "Run the event independently while a Senior Host shadows. They evaluate whether you are ready for full Host/Security roles.",
    },
  ]}
/>

Each stage in detail:

1. **🛡️ Security Shadowing (2 Events)**: Observe a <RoleBadge role="Senior Event Team" color="#3fa7ff" /> member performing security duties and learn from their experience.

2. **👁️ Security While Observed (1 Event)**: Act as the main security with oversight from a <RoleBadge role="Senior Event Team" color="#3fa7ff" /> member, who will help with any questions you may have.

3. **🤝 Co-Hosting (1 Event)**: Share hosting responsibilities, applying learned skills while still supported by a <RoleBadge role="Senior Event Team" color="#3fa7ff" /> member.

4. **🎯 Solo Hosting with Co-Host Support (1 Event)**: Lead an event with backup from a <RoleBadge role="Senior Event Team" color="#3fa7ff" /> member as co-host, allowing you to become more confident.

5. **✨ Solo Hosting with Shadowing Host (1 Event)**: Conduct an event independently while a Senior Host observes, demonstrating your full capability in managing an event.

## 📊 Feedback and Evaluation {#feedback}

For each event:

- A <RoleBadge role="Senior Event Team" color="#3fa7ff" /> member will take notes on your performance.
- Feedback will cover key areas such as event announcements, event invites, start-of-event announcements, event hosting, and any other noteworthy aspects.
- Constructive criticism will be provided to help you improve.

:::tip 💡 Pro Tip
We encourage you to add your own flair and personality to events while adhering to standard hosting practices.
:::

## 🎯 Key Areas for Feedback {#feedback-areas}

<CardGrid columns={2}>
  <Card title="Event Pings" icon="📢">
    <p>Sending timely event invites and reminders, including using <Link to="https://hammertime.cyou/">HammerTime</Link> for countdown timers.</p>
    <Tooltip tip="HammerTime is a tool for creating Discord-compatible countdown timers and time displays" bubbleColor="#d255ec" labelColor="#e68027">Learn more about HammerTime</Tooltip>
  </Card>
  
  <Card title="Publish Announcement" icon="📣">
    <p>Clicking the megaphone icon to publish the event for servers following the event announcement channels.</p>
  </Card>
  
  <Card title="Event Invites" icon="✅">
    <p>Accepting friend requests and managing invite requests, ensuring only <Tooltip tip="Coming soon" bubbleColor="#d255ec" labelColor="#e68027">signed-up members</Tooltip> are admitted.</p>
  </Card>
  
  <Card title="Start-of-Event Announcements" icon="🎤">
    <p>Getting everyone's attention for a concise <strong>initial</strong> announcement (introductions and key rules). Late joiners are expected to already know the rules and to have read the Discord event post — you do not re-announce the full rules for every late arrival.</p>
  </Card>
  
  <Card title="Event Hosting" icon="🎉">
    <p>Keeping the event on track, maintaining a positive atmosphere, and including new members.</p>
  </Card>
  
  <Card title="World Selection" icon="🌍">
    <p>Choosing appropriate worlds considering size and environment for the event type.</p>
  </Card>
</CardGrid>

<div style={{ marginTop: "1.5rem" }} />

## 🎊 Completion & Promotion {#completion}

After completing your trial, you will receive the <RoleBadge role="Event Host" color="#f75edb" /> and/or <RoleBadge role="Event Security" color="#3fa7ff" /> role(s), depending on your comfort level and trainer feedback.

<div style={{ marginTop: "1.5rem" }} />

:::info ❓ Questions?
For any questions during your trial, don't hesitate to reach out to your trainers or the <RoleBadge role="Event Committee" color="#db1cb8" />.
:::
