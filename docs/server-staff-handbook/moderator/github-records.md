---
id: github-records
title: GitHub Records
---

import CardGrid, { Card } from "@site/src/components/CardGrid";
import RoleBadge from "@site/src/components/RoleBadge";
import GitHubLogCard from "@site/src/components/GitHubLogCard";

# GitHub Records (Moderators Only)

All moderation actions must be recorded in the **GitHub Warning Book** to keep history consistent and searchable.

:::info Why this matters
Clear records help us make fair decisions, see patterns, and coordinate as a team.
:::

## Step-by-step

1. Close the ticket properly (confirmation, acknowledgement, reason)
2. Open the member's issue in the GitHub Warning Book, or create a new one if none exists
3. Add/update the latest incident log using the template below
4. Apply/update labels for active warnings
5. If appropriate, add the member to the watchlist channel/thread for follow-up visibility

<CardGrid columns={2}>
  <Card title="Access" status="info" icon="🔑">
    <ul>
      <li>Open the GitHub Warning Book (linked in the <strong>mod-special</strong> channel).</li>
      <li>Make sure you are signed in with the correct account.</li>
    </ul>
  </Card>

  <Card title="After Closing a Ticket" status="success" icon="✅">
    <ul>
      <li>The <RoleBadge role="Moderator" badgeIcon="moderator_role_icon.png" color="#e68027" /> on call records the outcome in GitHub.</li>
      <li>Include a brief summary of what happened.</li>
    </ul>
  </Card>

  <Card title="New Issue Naming" status="warning" icon="🆕">
    <ul>
      <li>If the member has no prior record, create a new issue with:</li>
      <li><strong>Discord Tag</strong> + <strong>[Discord ID]</strong> in the title</li>
      <li>Profile screenshot in the body</li>
      <li><em>Example:</em> <code>FictionalUser [123456789012345678]</code></li>
    </ul>
  </Card>

  <Card title="What to Log" status="info" icon="📝">
    <ul>
      <li>Date/time of the incident</li>
      <li>Which rule was broken</li>
      <li>Punishment applied</li>
      <li>Screenshot(s) of the ticket or evidence</li>
    </ul>
  </Card>

  <Card title="Labels" status="info" icon="🏷️">
    <ul>
      <li>Use labels to track number of <strong>active warnings</strong>.</li>
      <li>Warnings are active for <strong>1 week</strong> and stack during that period.</li>
    </ul>
  </Card>

  <Card title="Update Levels" status="warning" icon="📈">
    <ul>
      <li>Move member to the appropriate warning/ban level per Server Guidelines.</li>
      <li>Keep entries concise, factual, and neutral.</li>
    </ul>
  </Card>
</CardGrid>

## Logging Template

Copy and paste this into the GitHub issue body, then replace the bracketed fields:

:::info Card Title Format
The card title must be formatted as:
<strong>DiscordTag [DiscordID]</strong>
Example: <code>FictionalUser [123456789012345678]</code>
:::

```
When: [YYYY-MM-DD HH:mm TZ]
Why: [Short reason / rule broken]
Result: [Warning issued / Ticket closed with reason / Timeout Xh / Ban vote opened]
Logged By: [Your Mod Name]

Evidence:
- [Link to ticket screenshot]
- [Second link if applicable]

Notes:
- [Optional notes]
```

:::tip Watchlist
If this member needs continued visibility, add a brief summary in the **watchlist** channel/thread after logging the incident. Keep it factual and short.
:::

## Visual Example

<GitHubLogCard
  title="FictionalUser [123456789012345678]"
  when="When: 2024-06-16"
  why="Why: Oversharing/Negativity in public channels."
  result="Result: No acknowledgement from user, informal warning issued."
  loggedBy="Logged By: Moderator 1"
  avatarUrl="https://cdn.discordapp.com/embed/avatars/4.png"
  note="Profile screenshot placed here to match GitHub entry."
/>

:::warning Keep it accurate
Accurate record‑keeping is essential for consistency and fairness across cases.
:::

## Related

- [Server Rule Violations](../server-rule-violations)
- [Ban Types Overview](../ban-votes/ban-types-overview)
- [Mod on Call](./mod-on-call)
