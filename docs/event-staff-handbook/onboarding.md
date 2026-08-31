---
id: onboarding
title: Event Onboarding
---

import CardGrid, { Card } from "@site/src/components/CardGrid";
import ChannelBadge from "@site/src/components/ChannelBadge";
import RoleBadge from "@site/src/components/RoleBadge";
import StepTimeline from "@site/src/components/StepTimeline";
import TextWithButton from "@site/src/components/TextWithButton";
import { Dumbbell } from 'lucide-react';

# Event Onboarding 🎯

Thank you for deciding to apply and becoming part of the Eden Apis Event Team! We're excited to have you join us, and we'll go over how training will commence and what will be expected from that training.

:::info Welcome!
All training will be the same regardless if you applied for Host or Security, consisting of training in both roles to:

1. Understand how the team works together better
2. Test you in both roles to see if you're a better fit for one or both
:::

## <Dumbbell size={30} style={{display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem'}} /> Event Trial Training

Once you're accepted, you'll get the <RoleBadge role="Event Trial" color="#f75edb" /> role. **Event Trial Training** is the main handbook page for new event staff — training stages, Eden Scheduler setup, and what seniors look for at each event.

<CardGrid columns={1}>
  <Card title="What's on Event Trial Training" status="success" icon="🎓">
    <ul>
      <li><strong>Getting scheduled</strong> — log in, submit availability, find a trainer</li>
      <li><strong>6-event training path</strong> — security and host stages in order</li>
      <li><strong>Feedback areas</strong> — pings, invites, hosting, worlds, and more</li>
      <li><strong>After trial</strong> — promotion to <RoleBadge role="Event Host" color="#f75edb" /> and/or <RoleBadge role="Event Security" color="#3fa7ff" /></li>
    </ul>
  </Card>
</CardGrid>

<TextWithButton
  text="Start here once you're on the team — full trial guide, scheduling steps, and trainer coordination:"
  buttonLabel="Open Event Trial Training"
  buttonHref="../event-trial-training"
/>

At a glance — **6 events** across **5 stages**:

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

Stage-by-stage detail and scheduling steps are on **Event Trial Training** — use the button above when you're ready.

## Staff Expectations

<CardGrid columns={2}>
  <Card title="Hosts" status="success" icon="🎉">
    <ul>
      <li>Be sociable with everyone</li>
      <li>Try your best to not let people feel unwelcomed or out of the loop</li>
      <li>Host events when planned</li>
      <li>Keep communication up with the <RoleBadge role="Event Committee" color="#db1cb8" /> if unable to host</li>
    </ul>
  </Card>

  <Card title="Security" status="warning" icon="🛡️">
    <ul>
      <li>Keep our events safe, happy, and drama-free</li>
      <li>Uphold the Event and Server rules</li>
      <li>Remain calm and collected</li>
      <li>Report in <ChannelBadge variant="post" label="🔺events-incidents" link="https://discord.com/channels/734595073920204940/741166096421486645" /> when rules are broken</li>
    </ul>
  </Card>
</CardGrid>

<div style={{ marginTop: "1rem" }} />

<Card title="Both Roles" status="info" icon="🤝">
  <ul>
    <li>Keep communication with the team</li>
    <li>Work together for safe and fun events</li>
  </ul>
</Card>

## 📚 Essential Resources

- **[Event Trial Training](../event-trial-training)** — main guide for new staff (scheduling + training)
- **[Event Rules](../event-rules)** — rules specific to events
- **[Event Team Channels](../event-team-channels)** — important channels for the team
- **[How to Host an Event](../Hosts/how-to-host-an-event)** — complete hosting guide
- **[How to be Security](../Security/how-to-be-security)** — security responsibilities
- **[Incident Management Guidelines](../Security/incident-management-guidelines)** — how to handle incidents
- **[Scheduling Procedures](../Hosts/scheduling-procedures)** — weekly schedule workflow (reference after trial setup)

## ⌛ Probation Period

<StepTimeline
  title="Probation overview"
  direction="vertical"
  size="sm"
  accentColor="#f75edb"
  steps={[
    {
      label: "6 weeks",
      detail: "~1 event per week",
      recap: "You have about six weeks to finish all six training events — roughly one event per week on average.",
    },
    {
      label: "Review",
      detail: "Performance + senior vote",
      recap: "When training is done (or the period ends), Seniors review your performance notes from each event.",
    },
    {
      label: "Outcome",
      detail: "Staff · extension · or removal",
      recap: "Seniors vote on promotion to Host and/or Security, a short extension if you are progressing slowly, or removal from trial.",
    },
  ]}
/>

:::warning ⏰ Important Timeline
You will have a **6-week probation period** to finish this training (Average of 1 event per week).

**Note:** Staff in training for event side can still not be accepted at the end of the trial, but we do our best to prepare them.

<span style={{fontSize: '1.1em', fontWeight: 'bold', display: 'block', marginTop: '1em', marginBottom: '0.5em'}}>✅ **Scenario 1: You Completed Your Training Within the 6 Weeks Period**</span>

- Your performance during training will be reviewed.
- The **senior team** will vote on whether to make you full staff.

<span style={{fontSize: '1.1em', fontWeight: 'bold', display: 'block', marginTop: '1em', marginBottom: '0.5em'}}>⚠️ **Scenario 2: Training NOT Completed Within 6 Weeks**</span>

**If Progressing Well, But Slowly:** Extension of **2-3 weeks** may be granted after progress review.

**If Not Progressing Well:** End of probation period and **staff roles will be removed**.
:::

## 🎓 Staff Conduct

:::info Remember
Staff are the face of Eden. You're expected to not only uphold the rules but follow them to the letter yourselves. As such, be aware how you conduct yourself, as any issues that could arise could result in consequences.
:::

---

:::tip TLDR
**Quick Summary:**

- Complete **6 training events** across **5 stages** — see **[Event Trial Training](../event-trial-training)** for the full path and **how to get on the schedule**
- **6-week probation** (~1 event/week); extension possible if progressing slowly
- Be sociable (Hosts), keep events safe (Security), communicate with the team (Both)
- Read the linked resources — start with **Event Trial Training** once you're accepted

For questions, reach out in <ChannelBadge label="📘events-organization" link="https://discord.com/channels/734595073920204940/741166096421486645" /> or ping the <RoleBadge role="Event Committee" color="#db1cb8" /> or <RoleBadge role="Event Team Head" color="#f75edb" />.
:::
