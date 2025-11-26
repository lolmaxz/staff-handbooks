---
id: boardroom-ban-vote
title: All Heads Ban Vote (Committees Only)
---

import RoleBadge from "@site/src/components/RoleBadge";
import DiscordConversation, { DiscordMessage } from "@site/src/components/DiscordConversation";

# All Heads Ban Vote

An All Heads Ban Vote involves higher-level staff for severe cases.

## Criteria for Initiation

- **4-6 rule breaks** based on severity between server and event issues.
- **Two reported consent breaks** within a **48-hour** period.
- Any ticket involving **threats of physical harm** to self or others.
- **Three instances** of drama or violence reported against a person within a week.

## Voting Process

- Involves:

  - <RoleBadge role="HR" color="#ff6b6b" />
  - <RoleBadge role="Event Head" color="#f75edb" />
  - <RoleBadge role="Head Moderator" color="#e68027" />
  - <RoleBadge role="Server Committee Member" badgeIcon="server_committee_role_icon.webp" color="#db1cb8" />
  - <RoleBadge role="Head of Security" color="#ff0000" />
  - <RoleBadge role="Event Committee" color="#f75edb" />

- The ban vote lasts **12 hours** or until unanimous decision is reached
- All Committee Members are required to vote or provide a reason for abstaining

:::note
Once all votes are cast, the ban may be carried out without waiting for the full 12 hours.
:::

## Example: Boardroom Ban Vote Thread

Here's an example of how a boardroom ban vote thread should be structured:

<DiscordConversation id="boardroom-ban-vote" title="All Heads Ban Vote - Started by Head Moderator 1">
  <DiscordMessage
    name="Head Moderator 1"
    color="#e68027"
    message="Vote here within next 12hrs on all heads ban of [MemberName]."
    reactions={[
      { emoji: "✅", count: 5, selected: true },
      { emoji: "❌", count: 0 },
    ]}
  />
  <DiscordMessage
    name="Head Moderator 1"
    color="#e68027"
  >
    [MemberName] has accumulated multiple rule violations:
    - 5 rule breaks (3 server, 2 event) over the past month
    - Two reported consent breaks within 48 hours
    - Pattern of escalating behavior despite multiple warnings
  </DiscordMessage>
  <DiscordMessage
    name="Head Moderator 1"
    color="#e68027"
    message="@Moderator"
  />
</DiscordConversation>

## Related

- [Ban Types Overview](./ban-types-overview)
- [Server Rule Violations](../server-rule-violations)
- [GitHub Records](../moderator/github-records)
