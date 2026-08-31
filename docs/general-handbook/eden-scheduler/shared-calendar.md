---
id: eden-scheduler-shared-calendar
title: Shared Calendar
---

import ResponsiveScreenshot from "@site/src/components/ResponsiveScreenshot";
import SegmentToggle from "@site/src/components/SegmentToggle";
import MultiSegmentToggle from "@site/src/components/MultiSegmentToggle";

# Shared Calendar

The shared **Calendar** shows the current draft or published week for everyone who can log in.

**How to get here:** Click **Calendar** in the main navigation (top bar on desktop, bottom bar on phone). This is the site-wide calendar — not the personal **Calendar** button on the [Host dashboard](/docs/general-handbook/eden-scheduler/eden-scheduler-host-dashboard).

<MultiSegmentToggle
  segments={[
    { label: "Day", icon: "layout-list", iconColor: "#a259f7", href: "#day-view" },
    { label: "Week", icon: "calendar-days", iconColor: "#a259f7", href: "#week-view-published" },
    { label: "Month", icon: "layout-grid", iconColor: "#a259f7", href: "#month-view" },
  ]}
  fullWidth
  wide
  size="sm"
  visualBox={{
    label: "View — jump to an example",
    labelColor: "var(--ifm-color-emphasis-700)",
  }}
/>

<SegmentToggle
  left={{ label: "Local", activeBackground: "#a259f7", activeColor: "#ffffff" }}
  right={{ label: "EST/EDT", activeBackground: "#a259f7", activeColor: "#ffffff" }}
  value="left"
  size="sm"
  visualBox={{
    label: "Timezone — your local time or Eastern",
    labelColor: "var(--ifm-color-emphasis-700)",
  }}
/>

Managers can open the [Schedule Builder](/docs/general-handbook/eden-scheduler/eden-scheduler-schedule-builder) from **Edit** on this page when viewing a week or day.

---

## Week View — Draft {#week-view-draft}

A mostly empty draft week before events are placed.

<ResponsiveScreenshot
  src="scheduler/24-calendar-week-empty"
  alt="Shared calendar week view with an empty draft week"
/>

## Week View — Published {#week-view-published}

A published week with events across the grid.

<ResponsiveScreenshot
  src="scheduler/24-calendar-week-filled"
  alt="Shared calendar week view filled with scheduled events"
/>

## Day View {#day-view}

Useful for seeing everything on a single day.

<ResponsiveScreenshot
  src="scheduler/24-calendar-day-filled"
  alt="Shared calendar day view with multiple events"
/>

## Month View {#month-view}

Overview of the whole month at a glance.

<ResponsiveScreenshot
  src="scheduler/24-calendar-month-filled"
  alt="Shared calendar month view for August"
/>

Hosts can also use the [Host Calendar](/docs/general-handbook/eden-scheduler/eden-scheduler-host-calendar) for a personal Events vs Availability split.
