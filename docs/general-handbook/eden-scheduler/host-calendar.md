---
id: eden-scheduler-host-calendar
title: Host Calendar
---

import ResponsiveScreenshot from "@site/src/components/ResponsiveScreenshot";
import SegmentToggle from "@site/src/components/SegmentToggle";

# Host Calendar

Your personal calendar on the Host side has two tabs: **Events** (what you are assigned to host) and **Availability** (when you said you can host). This page covers both views.

**How to get here:** On the **Host** dashboard, click the **Calendar** button at the top right of the page. This is separate from **Calendar** in the main navigation, which opens the [Shared Calendar](/docs/general-handbook/eden-scheduler/eden-scheduler-shared-calendar) for everyone.

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
ariaLabel="Home shortcuts to Host Calendar"
visualBox={{
    label: "On Home — You can access the Host Calendar from here",
    labelColor: "var(--ifm-color-emphasis-700)",
  }}
/>

Once you are on Host Calendar, switch views with this tab control at the top of the page — **Events** is purple when active; **Availability** is cyan when active:

<SegmentToggle
left={{ label: "Events", activeBackground: "#a259f7", activeColor: "#ffffff" }}
right={{ label: "Availability", activeBackground: "#22d3ee", activeColor: "#071018" }}
value="left"
size="sm"
visualBox={{
    label: "These are the tabs you can switch between on the Host Calendar page",
    labelColor: "var(--ifm-color-emphasis-600)",
  }}
/>

---

## Events Tab

Use **Events** to see assigned events on a month or day view — “what am I hosting this week?”

<SegmentToggle
left={{ label: "Events", activeBackground: "#a259f7", activeColor: "#ffffff" }}
right={{ label: "Availability", activeBackground: "#22d3ee", activeColor: "#071018" }}
value="left"
size="sm"
visualBox={{
    label: "This is the Events tab you can switch to on the Host Calendar page",
    labelColor: "#7c3aed",
  }}
/>

### Empty Months

:::warning Empty Months
By default this view may look empty, until managers assign you, months may show no events.
:::

<ResponsiveScreenshot
  src="scheduler/15-host-calendar-events-empty"
  alt="Host calendar Events tab with empty months"
/>

### Assigned Events

Once the builder has slots with your name, events appear on the calendar.

<ResponsiveScreenshot
  src="scheduler/15-host-calendar-events-filled"
  alt="Host calendar Events tab with an assigned event on the day view"
/>

---

## Availability Tab

Switch to the **Availability** tab at the top of the host calendar to see which days you submitted and open day details.

<SegmentToggle
left={{ label: "Events", activeBackground: "#a259f7", activeColor: "#ffffff" }}
right={{ label: "Availability", activeBackground: "#22d3ee", activeColor: "#071018" }}
value="right"
size="sm"
visualBox={{
    label: "This is the Availability tab you can switch to on the Host Calendar page",
    labelColor: "#0e7490",
  }}
/>

### Empty Overlay

<ResponsiveScreenshot
  src="scheduler/16-host-calendar-availability-empty"
  alt="Host calendar Availability tab with no highlighted days"
/>

### Filled Week

Highlighted days open a detail sheet with your saved slots for that date.

<ResponsiveScreenshot
  src="scheduler/16-host-calendar-availability-filled"
  alt="Host calendar Availability tab with a day detail sheet open"
/>

---

## Related

- Edit availability: [Host Availability](/docs/general-handbook/eden-scheduler/eden-scheduler-host-availability)
- Everyone’s published week: [Shared Calendar](/docs/general-handbook/eden-scheduler/eden-scheduler-shared-calendar)
