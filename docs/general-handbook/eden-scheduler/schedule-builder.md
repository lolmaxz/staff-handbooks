---
id: eden-scheduler-schedule-builder
title: Schedule Builder
---

import ResponsiveScreenshot from "@site/src/components/ResponsiveScreenshot";
import StepTimeline from "@site/src/components/StepTimeline";
import RoleBadge from "@site/src/components/RoleBadge";

# Schedule Builder

Build the weekly grid: host → availability slot → event type → region (**NA** / **EU** / **AU**), with up to **two co-hosts** optional.

**How to get here:** **Manager** dashboard → **Open Schedule Builder for this week**, or **Calendar** → **Edit** (managers).

---

## On the Page

- **Week selector** and **Builder / Preview** toggle (Preview is read-only).
- **Day tabs** — pick the day; past days are muted and cannot get new slots.
- **AU / EU / NA** panels — each region for that day; **Add … slot** opens the drawer.
- **`N events · M possible`** — placed events vs hosts still schedulable (under quota, no time clash).

<ResponsiveScreenshot
  src="scheduler/22-manager-schedule-builder-empty"
  alt="Empty schedule builder with day tabs and Add slot buttons"
  caption="Draft week — first Push unlocks after Sunday 12:00 AM Eastern (see below)."
/>

---

## Adding a Slot

<StepTimeline
title="Workflow"
size="sm"
steps={[
  {
    label: "Day + region",
    detail: "Tab → Add AU, EU, or NA slot",
    recap: "Pick the day tab, then Add slot for the region (AU, EU, or NA) you are placing. Past days are muted.",
  },
  {
    label: "Host",
    detail: "Who submitted availability that day",
    recap: "Choose from hosts who submitted live availability for that day — if someone is missing, check the Manager dashboard.",
  },
  {
    label: "Time",
    detail: "From their slots · conflicts greyed out",
    recap: "Pick a time from their submitted slots. Conflicting times are greyed out.",
  },
  {
    label: "Event type",
    detail: "Suggested chips or type a name",
    recap: "Select a suggested chip or type a custom event type name.",
  },
  {
    label: "Add Event",
    detail: "Optional VR/Discord, Patreon, co-hosts",
    recap: "Optionally set VRChat/Discord links, Patreon flags, and up to two co-hosts, then Add Event to place it on the grid.",
  },
]}
/>

**Add Event** stays disabled until host, time, and a valid event type are set. The builder only shows hosts and times from live [Host Availability](/docs/general-handbook/eden-scheduler/eden-scheduler-host-availability) — check the [Manager Dashboard](/docs/general-handbook/eden-scheduler/eden-scheduler-manager-dashboard) if someone is missing.

<ResponsiveScreenshot
  src="scheduler/23-manager-add-event-modal"
  alt="Add Event drawer at the host selection step"
/>

Placed events show on the grid with **Edit** / **Delete**. Same drawer for edits.

<ResponsiveScreenshot
  src="scheduler/22-manager-schedule-builder-filled"
  alt="Schedule builder with events placed across the week"
/>

---

## Before You Push

Fix highlighted problems first — **Push** stays disabled until they are gone:

- **Availability conflict** — host removed that day’s availability after assignment.
- **Missing event type** — host deleted or renamed a type still on the grid.
- **`!` on a card** — Discord Scheduled Event was removed manually; re-push after the grid is correct.

---

## Push (Publish)

<StepTimeline
direction="vertical"
size="sm"
accentColor="#db1cb8"
steps={[
  {
    label: "Build grid",
    detail: "Assign hosts on the builder",
    recap: "Place all events for the week on the Schedule Builder grid before publishing.",
  },
  {
    label: "Fix warnings",
    detail: "Resolve conflicts first",
    recap: "Clear builder warnings and conflicts — Push may be blocked or risky if problems remain.",
  },
  {
    label: "Push",
    detail: "Discord + listings",
    recap: "Push publishes to Discord schedule channels, Scheduled Events, Gist, and site listings. First publish is after Sunday 12:00 AM Eastern for that week.",
  },
]}
/>

<RoleBadge role="Event Committee" color="#db1cb8" /> **Push** publishes the week (replaces the old Sunday paste) to staff + public Discord, Discord Scheduled Events, GitHub Gist, and website listings.

**When Push works**

- **First publish:** after **Sunday 12:00 AM Eastern** for that week, then anytime.
- **Draft, no blockers:** **Push Schedule**.
- **Already published, with edits:** **Update / Re-Push** (amber card lists what changed).
- **Already published, no edits:** disabled until you change the grid.
- **One publish at a time** portal-wide; **5-minute cooldown** after a publish finishes (non-admins).

:::info Safe while Push runs
Publish shows a progress panel — you can **keep editing**, switch pages, or leave the tab. The job uses the grid **from when you clicked Push**; changes made during publish need a **second** re-push after it finishes.
:::

---

## Next Steps

- [Shared Calendar](/docs/general-handbook/eden-scheduler/eden-scheduler-shared-calendar)
- [Audit Log](/docs/general-handbook/eden-scheduler/eden-scheduler-audit-log)
