---
id: eden-scheduler-host-availability
title: Host Availability
---

import ResponsiveScreenshot from "@site/src/components/ResponsiveScreenshot";
import SegmentToggle from "@site/src/components/SegmentToggle";
import StepTimeline from "@site/src/components/StepTimeline";
import CardGrid, { Card } from "@site/src/components/CardGrid";

# Host Availability

Submit and edit your weekly availability here. Trials use the **same form** as full hosts; training trials see an in-training banner on Host pages.

**How to get here:** From **Home** or the **Host** dashboard, click **Add Availabilities**, **Add Availability**, or **Edit Availabilities** on the week card. You can also click **Recurring** in the navigation and return via **Back to Host dashboard** on the availability page.

## Open the Form

<StepTimeline
  title="Submit availability"
  size="sm"
  steps={[
    {
      label: "Quota",
      detail: "Max events this week",
      recap: "Set how many events you want that week first — scheduling tries not to exceed this number.",
    },
    {
      label: "Days",
      detail: "Which days you can host",
      recap: "Select the days you are available. You can add multiple slots on the same day.",
    },
    {
      label: "Time",
      detail: "Range + 12h/24h + Local/EST",
      recap: "Pick start/end, then choose 12h or 24h display and Local vs EST/EDT for how you enter times.",
    },
    {
      label: "Event mode",
      detail: "Specific, Any, or Any from",
      recap: "Specific locks an event type; Any means flexible; Any from limits to a subset. Add notes for training prefs or special requests.",
    },
    {
      label: "Submit",
      detail: "Add more slots if needed",
      recap: "Submit the slot, then add more if you have other windows. Edit later until portal lock rules apply.",
    },
  ]}
/>

Set **quota for that week** first, then add one or more slots. This is separate from **Weekly quota** on [Recurring](/docs/general-handbook/eden-scheduler/eden-scheduler-host-recurring) — per-week edits here override the recurring default for that week only.

<ResponsiveScreenshot
  src="scheduler/11-host-availability-empty"
  alt="Empty host availability form with quota field"
/>

## Add a Slot

For each slot after **quota**, use the toggles below for **time** fields, then pick **event mode** and optional **notes**:

<SegmentToggle
  left={{ label: "12h", activeBackground: "#a259f7", activeColor: "#ffffff" }}
  right={{ label: "24h", activeBackground: "#a259f7", activeColor: "#ffffff" }}
  value="left"
  size="sm"
  visualBox={{
    label: "On each slot — how times appear in the picker (follows Settings by default)",
    labelColor: "var(--ifm-color-emphasis-700)",
  }}
/>

<SegmentToggle
  left={{ label: "Local", activeBackground: "#a259f7", activeColor: "#ffffff" }}
  right={{ label: "EST/EDT", activeBackground: "#a259f7", activeColor: "#ffffff" }}
  value="left"
  size="sm"
  visualBox={{
    label: "Per slot — your local timezone or Eastern",
    labelColor: "var(--ifm-color-emphasis-700)",
  }}
/>

- **Event mode** and optional notes (see [Event Modes](#event-modes) below)

<ResponsiveScreenshot
  src="scheduler/11-host-availability-add-slot"
  alt="Host availability form with Friday and Saturday selected and time range filled in"
/>

## Event Modes

Expand **How event modes work** on the form for details. In short:

<CardGrid columns={3}>
  <Card title="Specific" status="info">
    You name the event type(s) you will run.
  </Card>
  <Card title="Any" status="success">
    Committee chooses the event type from your slot.
  </Card>
  <Card title="Any from" status="warning">
    You pick a collection; Committee picks inside it.
  </Card>
</CardGrid>

:::info Mutually exclusive
Each of these types are mutually exclusive — you can only select one. Either you specify your event types, or you can select a collection of event types or leave it to Committee to choose.
:::

Manage the types themselves on the [Host Dashboard](/docs/general-handbook/eden-scheduler/eden-scheduler-host-dashboard) **Event Library**. Optional SFW banners: [Banner Studio](/docs/general-handbook/eden-scheduler/eden-scheduler-banner-studio).

<ResponsiveScreenshot
  src="scheduler/11-host-availability-event-mode"
  alt="Expanded event mode help section on the availability form"
/>

## After Submit

Saved rows appear under your week. You can add more slots until lock rules apply (see [Introduction — lock rules](/docs/general-handbook/eden-scheduler#weekly-lock-rules)).

<ResponsiveScreenshot
  src="scheduler/11-host-availability-filled"
  alt="Host availability form with saved Friday and Saturday slots"
/>

:::tip Training preference
There is no separate “willing to train” toggle. Put training notes in the **notes** field or coordinate with trainers in Discord.
:::

Next: [Recurring Availability](/docs/general-handbook/eden-scheduler/eden-scheduler-host-recurring)
