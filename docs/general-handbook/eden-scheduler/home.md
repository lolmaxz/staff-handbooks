---
id: eden-scheduler-home
title: Home
---

import ResponsiveScreenshot from "@site/src/components/ResponsiveScreenshot";
import StepTimeline from "@site/src/components/StepTimeline";

# Home

The home page is your landing view after login — click **Home** in the main navigation (top bar on desktop, bottom bar on phone). It summarizes the current week, whether you still need to submit availability, and any upcoming assigned events.

## Before You Submit Availability

When the upcoming week has no submission yet, Home prompts you to add availability.

<ResponsiveScreenshot
  src="scheduler/01-home-empty"
  alt="Scheduler home page showing that availability is still needed for the week"
  caption="If desktop looks like a filled week, switch to Mobile — the empty state is clearer on phone viewports."
/>

## After the Week Is Live

Once hosts have submitted and managers have started building, Home shows the active week and your upcoming assignments.

<ResponsiveScreenshot
  src="scheduler/01-home-filled"
  alt="Scheduler home page with live week summary and upcoming events"
/>

## What to Do Here

<StepTimeline
  title="After login"
  size="sm"
  steps={[
    {
      label: "Check banner",
      detail: "Still need availability?",
      recap: "Home shows whether you still owe availability for the upcoming week — act on the banner if it appears.",
    },
    {
      label: "Add slots",
      detail: "Banner or Host dashboard",
      recap: "Use the banner shortcut or go to Host → Add Availabilities on the week card to open the form.",
    },
    {
      label: "Calendar",
      detail: "Shared week view",
      recap: "Open Calendar in the main nav to see the draft or published week everyone shares — not your personal Host calendar button.",
    },
  ]}
/>

Committee members also use **Manager** and **Audit** in the nav when their role includes those pages.

Next: [Host Dashboard](/docs/general-handbook/eden-scheduler/eden-scheduler-host-dashboard)
