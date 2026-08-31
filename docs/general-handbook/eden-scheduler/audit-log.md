---
id: eden-scheduler-audit-log
title: Audit Log
---

import ResponsiveScreenshot from "@site/src/components/ResponsiveScreenshot";
import RoleBadge from "@site/src/components/RoleBadge";
import ChannelBadge from "@site/src/components/ChannelBadge";

# Audit Log

The **Audit Log** is for <RoleBadge role="Event Committee" color="#db1cb8" /> and managers. It records logins, availability changes, publishes, banner / event-type updates, and other scheduler actions — so hosts do not need to ping Committee when they edit availability in the portal.

**How to get here:** Click **Audit** in the main navigation. Only manager and admin roles see this link.

## Recent Activity

<ResponsiveScreenshot
  src="scheduler/26-audit-log"
  alt="Audit log showing recent scheduler activity"
/>

## Filter by Availability

Open the type filter and choose the **Availability** group to see only availability edits.

<ResponsiveScreenshot
  src="scheduler/27-audit-availability-filter"
  alt="Audit log type filter with Availability group selected"
/>

:::tip Replaces Discord pings
When a host updates slots before lock, managers can review changes here instead of relying on edited Discord messages in <ChannelBadge variant="post" label="📆event-scheduling" link="https://discord.com/channels/734595073920204940/1024399192300454029" />.
:::

Related: [Manager Dashboard](/docs/general-handbook/eden-scheduler/eden-scheduler-manager-dashboard) · [Banner Studio](/docs/general-handbook/eden-scheduler/eden-scheduler-banner-studio)
