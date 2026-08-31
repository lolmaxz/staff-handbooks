---
id: eden-scheduler-login
title: Login
---

import TextWithButton from "@site/src/components/TextWithButton";
import RoleBadge from "@site/src/components/RoleBadge";
import ResponsiveScreenshot from "@site/src/components/ResponsiveScreenshot";
import StepTimeline from "@site/src/components/StepTimeline";
import Tooltip from "@site/src/components/Tooltip";

# Login

Open [schedule.theedenapis.com](https://schedule.theedenapis.com) and choose **Log in with Discord**. There is no password — access is gated by your Discord roles.

<StepTimeline
  direction="vertical"
  size="sm"
  steps={[
    {
      label: "Open portal",
      detail: "schedule.theedenapis.com",
      recap: "Go to the production scheduler URL in your browser — bookmark it if you submit availability every week.",
    },
    {
      label: "Log in with Discord",
      detail: "Staff Discord account",
      recap: "Use Log in with Discord with the same account you use for Eden staff channels. No separate password.",
    },
    {
      label: "Home",
      detail: "Check the week prompt",
      recap: "After login you land on Home — check whether the week needs availability or already shows upcoming assignments.",
    },
  ]}
/>

<TextWithButton
  text="Production scheduler:"
  buttonLabel="Log in with Discord"
  buttonHref="https://schedule.theedenapis.com/login"
/>

<ResponsiveScreenshot
  src="scheduler/00-login"
  alt="Eden Scheduler login page with Log in with Discord button"
/>

## Who Can Access

You need an <Tooltip tip="Event Host, Event Trial, Senior Event Team, or Event Committee">**Event Team**</Tooltip> role that grants scheduler access — typically <RoleBadge role="Event Host" />, <RoleBadge role="Event Trial" />, <RoleBadge role="Senior Event Team" />, or <RoleBadge role="Event Committee" />. If login succeeds but pages look empty or blocked, ask <RoleBadge role="Event Committee" /> to confirm your roles.

:::info Same Discord account
Use the Discord account linked to your Eden staff roles. Switching accounts will not carry your availability over.
:::

## Next Steps

After login you land on **Home**. Hosts and trials should click **Host** in the navigation (or follow the **Add Availabilities** prompt on Home) to check whether the upcoming week still needs availability.
