---
id: scheduling-procedures
title: Scheduling Procedures
---

import CardGrid, { Card } from "@site/src/components/CardGrid";
import RoleBadge from "@site/src/components/RoleBadge";
import ChannelBadge from "@site/src/components/ChannelBadge";
import TextWithButton from "@site/src/components/TextWithButton";
import ResponsiveScreenshot from "@site/src/components/ResponsiveScreenshot";
import SegmentToggle from "@site/src/components/SegmentToggle";
import StepTimeline from "@site/src/components/StepTimeline";
import MultiSegmentToggle from "@site/src/components/MultiSegmentToggle";
import DiscordConversation, { DiscordMessage } from "@site/src/components/DiscordConversation";

# Scheduling Procedures

:::note
Event schedules run from _Monday to Sunday!_
:::

## Weekly Scheduling (Portal)

Availability and publishing now happen on the **Eden Scheduler** at [schedule.theedenapis.com](https://schedule.theedenapis.com) — not by pasting templates in Discord or a Google Sheet.

<TextWithButton
  text="Open the scheduler (Discord login required):"
  buttonLabel="Eden Scheduler"
  buttonHref="https://schedule.theedenapis.com"
/>

Full portal walkthroughs live in the [Eden Scheduler](/docs/general-handbook/eden-scheduler) section of the General Handbook. This page covers the weekly workflow from an Event Staff perspective.

### For Hosts and Trials

<StepTimeline
  title="Weekly host workflow"
  size="sm"
  accentColor="#a259f7"
  steps={[
    {
      label: "Log in",
      detail: "Eden Scheduler",
      recap: "Sign in at schedule.theedenapis.com with Discord, then open Host (or follow the prompt on Home).",
    },
    {
      label: "Add availability",
      detail: "Quota + slots",
      recap: "On the week card, set quota for that week, then add slots with times, timezone, event mode, and optional notes.",
    },
    {
      label: "Optional recurring",
      detail: "Default quota & rules",
      recap: "Recurring rules auto-fill future weeks (starting next week). Weekly quota on Recurring is separate from per-week quota on the Host dashboard.",
    },
    {
      label: "After Push",
      detail: "Calendar & Discord",
      recap: "Once Committee Push publishes the week, check Upcoming Events on Host, your Host calendar, or the shared Calendar — plus the Discord schedule channels.",
    },
  ]}
/>

1. **Log in** at [schedule.theedenapis.com](https://schedule.theedenapis.com) and choose **Log in with Discord** → [Login guide](/docs/general-handbook/eden-scheduler/eden-scheduler-login).
2. Click **Host** in the navigation and check whether the upcoming week still needs availability ([Host Dashboard](/docs/general-handbook/eden-scheduler/eden-scheduler-host-dashboard)). You may also see a prompt on **Home**.

<MultiSegmentToggle
  segments={[
    { label: "Needs availability", activeBackground: "#a259f7", activeColor: "#ffffff", href: "#host-dashboard-empty" },
    { label: "Submitted", activeBackground: "#a259f7", activeColor: "#ffffff", href: "#host-dashboard-filled" },
    { label: "Upcoming events", activeBackground: "#a259f7", activeColor: "#ffffff", href: "#host-dashboard-upcoming" },
  ]}
  fullWidth
  size="sm"
  visualBox={{
    label: "Host dashboard — jump to an example",
    labelColor: "var(--ifm-color-emphasis-700)",
  }}
/>

#### Needs availability {#host-dashboard-empty}

<ResponsiveScreenshot
  src="scheduler/10-host-dashboard-empty"
  alt="Host dashboard with empty week and Add Availabilities button"
  caption="Empty week — click **Add Availabilities** on the week card to open the form."
/>

#### Submitted for the week {#host-dashboard-filled}

<ResponsiveScreenshot
  src="scheduler/10-host-dashboard-filled"
  alt="Host dashboard showing quota and submitted availability slots"
  caption="After you submit — your **quota** and saved slots appear on the week card."
/>

#### Upcoming events {#host-dashboard-upcoming}

<ResponsiveScreenshot
  src="scheduler/10-host-dashboard-upcoming"
  alt="Host dashboard scrolled to Upcoming Events after the week is published"
  caption="After Committee **Push** — assigned events show under **Upcoming Events**."
/>

3. On the Host page, click **Add Availabilities** (or **Edit Availabilities**) on the week card. Set your **quota for that week** first — max events that week (the old “Max Event Willing to Host this Week”). This is **not** the same as **Weekly quota** on the Recurring page (see below).
4. On the availability form ([Host Availability](/docs/general-handbook/eden-scheduler/eden-scheduler-host-availability)), add slots: days, start/end, timezone and time format, event mode, optional notes. Submit.

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

5. Optional: click **Recurring** in the navigation to set **Weekly quota** (default max events for auto-filled weeks) and repeating **availability rules** ([Recurring Availability](/docs/general-handbook/eden-scheduler/eden-scheduler-host-recurring)). Rules fill **when** you can host; recurring quota caps **how many** events per auto-filled week. Recurring fill starts **next week** (not the current week) and only covers about the **next two months** by default.
6. Optional: on **Host**, use **Event Library** to save event types and SFW banners ([Banner Studio](/docs/general-handbook/eden-scheduler/eden-scheduler-banner-studio)). You can still upload a plain image instead of using the studio.
7. After managers **Push** the week, check **Upcoming Events** on the Host page, your personal calendar via the **Calendar** button on Host ([Host Calendar](/docs/general-handbook/eden-scheduler/eden-scheduler-host-calendar)), or the shared view via main nav **Calendar** ([Shared Calendar](/docs/general-handbook/eden-scheduler/eden-scheduler-shared-calendar)).

<ResponsiveScreenshot
  src="scheduler/11-host-availability-add-slot"
  alt="Host availability form with days and time range selected"
  caption="Trials use the same form as full hosts."
/>

**Trials:** you still **reach out to trainers** to get paired unless a trainer contacts you first. If training preference matters, put it in the **notes** field or coordinate in Discord — there is no separate “?No Training” field on the form.

### Lock Rules (Replace Old Discord Deadlines)

Do not wait for a Wednesday/Thursday thread to open. Instead, follow these portal locks (see also [Introduction — lock rules](/docs/general-handbook/eden-scheduler#weekly-lock-rules)):

<StepTimeline
  title="Portal lock timeline"
  direction="vertical"
  size="sm"
  accentColor="#a259f7"
  steps={[
    {
      label: "Draft week",
      detail: "Editable until Monday Eastern end",
      recap: "The upcoming week stays fully editable on the portal until Monday ends in Eastern time — replace the old Wed/Thu thread opening.",
    },
    {
      label: "Within 24h of slot",
      detail: "Notes only (managers bypass)",
      recap: "Inside 24 hours of a slot start, hosts can only edit notes on that slot. Managers and admins can still change more if needed.",
    },
    {
      label: "After publish",
      detail: "Locks Sunday 00:00 UTC",
      recap: "Once the week is published, it locks after Sunday 00:00 UTC. The same 24-hour notes-only rule still applies near slot start.",
    },
  ]}
/>

- **Draft week:** fully editable until the end of **Monday Eastern**.
- **Within 24 hours of slot start:** **notes only** (managers/admins can bypass).
- **After publish:** locks after **Sunday 00:00 UTC** (same 24-hour notes rule).

:::tip 💖 Managing Availability
You can list many slots, but scheduling tries to limit you to the **week quota** you set for that week. If recurring rules auto-fill other weeks, those use your **recurring weekly quota** default unless you override them — see [Recurring — Weekly quota](/docs/general-handbook/eden-scheduler/eden-scheduler-host-recurring#weekly-quota).
:::

### Reading the Published Schedule

After Committee **Push**es, the finalized week appears in:

- <ChannelBadge variant="post" label="📆event-scheduling" link="https://discord.com/channels/734595073920204940/1024399192300454029" /> (staff) — including the <ChannelBadge variant="thread" label="📋CURRENT WEEK'S SCHEDULE" link="https://discord.com/channels/734595073920204940/1208883577643597834" /> thread for quick access and hammertime ready to copy into event posts
- <ChannelBadge variant="text" label="📆｜events-schedule" link="https://discord.com/channels/734595073920204940/820927836411002890" /> (public)
- [Eden Scheduler](/docs/general-handbook/eden-scheduler) calendars

Those Discord places are for **reading** the published output and copying hammertime — not for submitting availability.

---

## For Event Committee

Committee replaces the old Sheet + Saturday draft thread workflow:

<StepTimeline
  title="Committee publish workflow"
  direction="vertical"
  size="sm"
  accentColor="#db1cb8"
  steps={[
    {
      label: "Manager dashboard",
      detail: "Who submitted · who's empty",
      recap: "Open Manager to see submission status, filling bars, and who still needs to add availability before you build.",
    },
    {
      label: "Host overview",
      detail: "Review live availability",
      recap: "Click a host card to see their live slots — this replaces the old Google Sheet view of who is free when.",
    },
    {
      label: "Schedule builder",
      detail: "Place hosts · co-hosts · types",
      recap: "Assign host → time slot → event type → region on the grid. Add up to two co-hosts per event when needed.",
    },
    {
      label: "Push",
      detail: "Publish to Discord",
      recap: "Push publishes the finalized week to staff and public Discord schedule channels, plus listings — replaces the Sunday paste.",
    },
    {
      label: "Audit log",
      detail: "Edits · logins · publishes",
      recap: "Use Audit to review availability edits, logins, and publish history if you need to trace what changed.",
    },
  ]}
/>

1. Click **Manager** in the navigation → [Manager Dashboard](/docs/general-handbook/eden-scheduler/eden-scheduler-manager-dashboard) — who submitted, who is empty, who is awaiting.
2. In **Host Overview**, click a host card or row → live availability (what the Sheet used to hold).
3. Click **Open Schedule Builder for this week** on the Manager dashboard → [Schedule Builder](/docs/general-handbook/eden-scheduler/eden-scheduler-schedule-builder) — place host → availability slot → event type → region; up to two co-hosts.
4. **Push** when ready — see [Push conditions and during-publish behavior](/docs/general-handbook/eden-scheduler/eden-scheduler-schedule-builder#push-publish) (handbook does not instruct clicking Push on production as a tutorial).
5. Click **Audit** in the navigation → [Audit Log](/docs/general-handbook/eden-scheduler/eden-scheduler-audit-log) — availability edits, logins, publishes.

:::note Schedule History (optional)
The portal also has a read-only **Schedule History** view (icon top-left on shared **Calendar**). It is **legacy documentation only** — not part of the core workflow, may be removed, and is not kept up to date. See [Schedule History](/docs/general-handbook/eden-scheduler/eden-scheduler-schedule-history) if you need the screenshot.
:::

<RoleBadge role="Event Trial" color="#f75edb" /> may still request training sessions with <RoleBadge role="Senior Event Team" color="#3fa7ff" /> members during the week.

---

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

<DiscordConversation id="security-request" title="Security Request - Classic Event Tonight 9pm EST">
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
    message="Thank you! Don't forget to add `(security)` in the signup thread next to your name — and I'll add you on the public event post (or update TBD). 😊"
  />
</DiscordConversation>

If no security responds 1 hour prior, follow the escalation path below.

### Request Escalation Path

<StepTimeline
  title="No security? Escalate in order"
  direction="vertical"
  size="sm"
  accentColor="#3fa7ff"
  ariaLabel="Security request escalation"
  steps={[
    {
      label: "Event Security",
      detail: "First request",
      recap: "Ping @Event Security when you post the announcement (classic) or 24–48h ahead (special). Ask early so someone can confirm.",
    },
    {
      label: "Moderator or Senior",
      detail: "If no security",
      recap: "If nobody from Security responds by the deadline, request backup from a Server Moderator or Senior Event Team member.",
    },
    {
      label: "Proceed or solo",
      detail: "Per event type rules",
      recap: "Moderator or Senior support lets you proceed. Seniors may solo-host Classic or Popup if rules allow — see event type cards above.",
    },
    {
      label: "Cancel if required",
      detail: "Special events need security",
      recap: "Special events must have security or support — if none is available, cancel rather than running without coverage.",
    },
  ]}
/>

1. **All <RoleBadge role="Event Host" color="#f75edb" />** / **<RoleBadge role="Senior Event Team" color="#3fa7ff" />** → Request from <RoleBadge role="Event Security" color="#3fa7ff" />
2. If no Security → Request from <RoleBadge role="Server Moderator" color="#e68027" /> or <RoleBadge role="Senior Event Team" color="#3fa7ff" />
3. **<RoleBadge role="Server Moderator" color="#e68027" />** support → Proceed with event
4. **<RoleBadge role="Senior Event Team" color="#3fa7ff" />** support → <RoleBadge role="Senior Event Team" color="#3fa7ff" /> can solo host\*
5. If no support available → Follow event type rules above

:::note
_<RoleBadge role="Senior Event Team" color="#3fa7ff" />_ can solo host Classic and Popup events when no security or support is available. Special events always require security or must be cancelled.
:::

## Related

- [Eden Scheduler (General Handbook)](/docs/general-handbook/eden-scheduler)
- [How to Host an Event](/docs/event-staff-handbook/Hosts/how-to-host-an-event)
- [Security Requirements](/docs/event-staff-handbook/Security/security-requirements)
- [Event Team Channels](/docs/event-staff-handbook/event-team-channels)

<details>
<summary>Deprecated: Discord paste templates (historical reference only)</summary>

Before the Eden Scheduler, hosts pasted EST-only templates in `#event-scheduling`. That workflow is **retired** — use the portal instead. Old template syntax (`8pm + Classic Event`, `Max Event Willing to Host this Week`, etc.) maps to **quota**, **slots**, and **event modes** on [Host Availability](/docs/general-handbook/eden-scheduler/eden-scheduler-host-availability).

</details>
