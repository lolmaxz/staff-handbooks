---
id: eden-scheduler-introduction
title: Eden Scheduler
slug: /general-handbook/eden-scheduler
---

import TextWithButton from "@site/src/components/TextWithButton";
import CardGrid, { Card } from "@site/src/components/CardGrid";
import ChannelBadge from "@site/src/components/ChannelBadge";
import ResponsiveScreenshot from "@site/src/components/ResponsiveScreenshot";
import SegmentToggle from "@site/src/components/SegmentToggle";
import StepTimeline from "@site/src/components/StepTimeline";

# Eden Scheduler

The Eden Scheduler is our web portal for weekly event availability and publishing. It replaced the old Discord paste-templates in <ChannelBadge variant="post" label="📆event-scheduling" link="https://discord.com/channels/734595073920204940/1024399192300454029" /> **and** the unofficial Google Sheet the Event Committee used behind the scenes.

<TextWithButton
  text="Log in with Discord (Event Host, Trial, Senior, or Committee access required):"
  buttonLabel="Open Eden Scheduler"
  buttonHref="https://schedule.theedenapis.com"
/>

<ResponsiveScreenshot
  src="scheduler/00-login"
  alt="Eden Scheduler login page with Log in with Discord button"
/>

---

## What Changed (and What Did Not)

<CardGrid columns={2}>
  <Card title="Now on the portal" status="success" icon="📅">
    <ul>
      <li>Submit and edit availability (days, times, quota, event mode)</li>
      <li>Recurring availability rules</li>
      <li>Host dashboard, calendars, assigned events, and Banner Studio for event type images</li>
      <li>Committee dashboard, schedule builder, audit log, and Push to publish</li>
    </ul>
  </Card>
  <Card title="Still on Discord" status="info" icon="💬">
    <ul>
      <li>Day-of hosting, security requests, and escalation</li>
      <li>Special-event planning threads</li>
      <li>Trial trainer outreach (“reach out to trainers unless they do first”)</li>
      <li>Reading the published schedule in <ChannelBadge variant="post" label="📆event-scheduling" link="https://discord.com/channels/734595073920204940/1024399192300454029" /> (staff — including the <ChannelBadge variant="thread" label="📋CURRENT WEEK'S SCHEDULE" link="https://discord.com/channels/734595073920204940/1208883577643597834" /> thread for a quick look at the week and copy-ready hammertime) and <ChannelBadge variant="text" label="📆｜events-schedule" link="https://discord.com/channels/734595073920204940/820927836411002890" /> (public)</li>
    </ul>
  </Card>
</CardGrid>

Weeks still run **Monday → Sunday**. Event Committee still builds the grid and publishes it — they just do that in the portal instead of a Sheet.

---

## Weekly Lock Rules

These replace the old “thread opens Wednesday / paste by Friday / draft Saturday / final Sunday” Discord workflow:

- **Draft week:** fully editable until the end of **Monday Eastern**.
- **Within 24 hours of a slot start:** hosts can edit **notes only** (unless a manager/admin bypasses the lock).
- **After publish:** availability locks after **Sunday 00:00 UTC** (same 24-hour notes-only rule still applies).
- **Managers and admins** can bypass host week-lock in the availability UI when needed.

Saturday “rough draft in the thread” is now an unpublished draft on the builder / shared calendar. Sunday “final paste” is **Push** — which posts to Discord, Discord Scheduled Events, and our published schedule channels.

---

## Key Vocabulary

| Term                    | Meaning                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------- |
| **Availability / slot** | A day + time range you are willing to host (or be trained)                                           |
| **Week quota**          | Max events for **one week** on the [Host Availability](/docs/general-handbook/eden-scheduler/eden-scheduler-host-availability) form — the old “Max Event Willing to Host this Week” |
| **Recurring rule**    | Repeating days/times on [Recurring](/docs/general-handbook/eden-scheduler/eden-scheduler-host-recurring); auto-fill starts **next week**, ~**2 months** ahead by default (may change) |
| **Recurring weekly quota** | Default max events **per week** on [Recurring](/docs/general-handbook/eden-scheduler/eden-scheduler-host-recurring) — applied when rules auto-fill future weeks; overrides and per-week form edits can differ |
| **Event mode**          | **Specific** (you name the type), **Any** (Committee picks), or **Any from** (you pick a collection) |
| **Local vs EST/EDT**  | Each availability slot can use your local timezone or Eastern — EST-only paste syntax is retired       |
| **Draft vs Published**  | Unpublished weeks on the builder; **Push** publishes the final week                                  |
| **Audit log**           | Managers see availability edits without needing a Discord ping                                       |

<SegmentToggle
  left={{ label: "Local", activeBackground: "#a259f7", activeColor: "#ffffff" }}
  right={{ label: "EST/EDT", activeBackground: "#a259f7", activeColor: "#ffffff" }}
  value="left"
  size="sm"
  visualBox={{
    label: "On the availability form — per-slot timezone",
    labelColor: "var(--ifm-color-emphasis-700)",
  }}
/>

If you still need to note training preference, use the **notes** field on your availability or coordinate in Discord — there is no separate “No Training” toggle on the form.

---

## Finding Pages in the Portal

After login, use the main navigation — **top bar on desktop**, **bottom bar on phone**:

| Click | Who sees it | What it opens |
| --- | --- | --- |
| **Home** | Everyone | Landing summary and upcoming-week prompts |
| **Host** | Hosts and trials | Host dashboard, availability buttons, upcoming events |
| **Recurring** | Hosts and trials | Recurring quota + rules (auto-fill from **next week**, ~2 months ahead) |
| **Manager** | Committee / managers | Host overview and link to Schedule Builder |
| **Calendar** | Everyone | Shared calendar (day / week / month) |
| **Audit** | Committee / managers | Audit log |

**Also on screen (not in the main nav bar):**

- **Add Availabilities** / **Edit Availabilities** — on Home and Host week cards → availability form
- **Calendar** button on the Host page → your personal host calendar (Events vs Availability tabs)
- **Event Library** on the Host page → saved event types and [Banner Studio](/docs/general-handbook/eden-scheduler/eden-scheduler-banner-studio)
- **Open Schedule Builder for this week** — on the Manager dashboard
- **Schedule History** icon — top-left of the shared Calendar page *(legacy; see [Schedule History](/docs/general-handbook/eden-scheduler/eden-scheduler-schedule-history) — posterity only, may be removed)*
- **Settings** — click your avatar (top-right) → **Settings**

---

## Settings

Click your **avatar** in the top-right corner, then choose **Settings** from the menu. There you can switch **light/dark theme** and **12-hour vs 24-hour** time display. This applies across the portal.

<SegmentToggle
  left={{ label: "12h (1:00 PM)", activeBackground: "#a259f7", activeColor: "#ffffff" }}
  right={{ label: "24h (13:00)", activeBackground: "#a259f7", activeColor: "#ffffff" }}
  value="left"
  size="sm"
  visualBox={{
    label: "Settings — portal-wide time display",
    labelColor: "var(--ifm-color-emphasis-700)",
  }}
/>

<ResponsiveScreenshot
  src="scheduler/02-settings"
  alt="Scheduler settings page with theme and time format options"
  caption="Theme and time format — available from the gear icon after login."
/>

---

## Who Should Read What

**Hosts and Trials**

<StepTimeline
  direction="vertical"
  size="sm"
  steps={[
    {
      label: "Login",
      detail: "Discord → Home",
      recap: "Start at schedule.theedenapis.com → Log in with Discord → land on Home to see the week status.",
    },
    {
      label: "Host",
      detail: "Week card + availability",
      recap: "Open Host to submit or edit availability on the week card — quota first, then slots.",
    },
    {
      label: "Recurring",
      detail: "Optional auto-fill rules",
      recap: "Optional: set recurring rules and weekly quota defaults so future weeks auto-fill (starts next week).",
    },
    {
      label: "Host Calendar",
      detail: "Your events + slots",
      recap: "Use the Calendar button on the Host page (not main nav Calendar) for your personal week view.",
    },
    {
      label: "Banner Studio",
      detail: "Event type images",
      recap: "Optional: design SFW banners for saved event types from Event Library on the Host page.",
    },
  ]}
/>

Full weekly workflow from an Event Staff angle: [Scheduling Procedures](/docs/event-staff-handbook/Hosts/scheduling-procedures). Pages: [Host Dashboard](/docs/general-handbook/eden-scheduler/eden-scheduler-host-dashboard), [Host Availability](/docs/general-handbook/eden-scheduler/eden-scheduler-host-availability), [Banner Studio](/docs/general-handbook/eden-scheduler/eden-scheduler-banner-studio).

**Event Committee / managers**

<StepTimeline
  direction="vertical"
  size="sm"
  accentColor="#db1cb8"
  steps={[
    {
      label: "Manager",
      detail: "Who submitted · filling bars",
      recap: "Manager dashboard shows submission progress and who still needs to add availability.",
    },
    {
      label: "Schedule Builder",
      detail: "Place events on the grid",
      recap: "Build the week: host → slot time → event type → region, with optional co-hosts.",
    },
    {
      label: "Push",
      detail: "Publish to Discord + listings",
      recap: "Push replaces the old Sunday paste — publishes to Discord channels and external listings.",
    },
    {
      label: "Audit",
      detail: "Edits + publish trail",
      recap: "Audit Log records availability edits, logins, and publish actions for troubleshooting.",
    },
  ]}
/>

Pages: [Manager Dashboard](/docs/general-handbook/eden-scheduler/eden-scheduler-manager-dashboard), [Schedule Builder](/docs/general-handbook/eden-scheduler/eden-scheduler-schedule-builder), [Audit Log](/docs/general-handbook/eden-scheduler/eden-scheduler-audit-log). Optional legacy: [Schedule History](/docs/general-handbook/eden-scheduler/eden-scheduler-schedule-history) *(posterity — not maintained)*.

---

## Quick Links

- [Login](/docs/general-handbook/eden-scheduler/eden-scheduler-login)
- [Home](/docs/general-handbook/eden-scheduler/eden-scheduler-home)
- [Host Dashboard](/docs/general-handbook/eden-scheduler/eden-scheduler-host-dashboard)
- [Host Availability](/docs/general-handbook/eden-scheduler/eden-scheduler-host-availability)
- [Recurring Availability](/docs/general-handbook/eden-scheduler/eden-scheduler-host-recurring)
- [Host Calendar](/docs/general-handbook/eden-scheduler/eden-scheduler-host-calendar)
- [Banner Studio](/docs/general-handbook/eden-scheduler/eden-scheduler-banner-studio)
- [Manager Dashboard](/docs/general-handbook/eden-scheduler/eden-scheduler-manager-dashboard)
- [Schedule Builder](/docs/general-handbook/eden-scheduler/eden-scheduler-schedule-builder)
- [Shared Calendar](/docs/general-handbook/eden-scheduler/eden-scheduler-shared-calendar)
- [Schedule History](/docs/general-handbook/eden-scheduler/eden-scheduler-schedule-history) *(legacy / posterity)*
- [Audit Log](/docs/general-handbook/eden-scheduler/eden-scheduler-audit-log)
