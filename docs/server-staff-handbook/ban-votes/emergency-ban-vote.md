---
id: emergency-ban-vote
title: Emergency Ban Vote (Admins Only)
---

import RoleBadge from "@site/src/components/RoleBadge";
import DiscordConversation, { DiscordMessage } from "@site/src/components/DiscordConversation";

# Emergency Ban Vote (Admins Only)

In rare cases where a member poses a serious disruption or safety concern.

## Process

- <RoleBadge role="Lewd Governor" color="#ff6b6b" /> and one department head will hold an emergency ban vote
- If an Admin is unavailable, they may appoint a **replacement representative**

### Replacement Representatives

- **Maxie** (<RoleBadge role="Lewd Governor" color="#ff6b6b" />): <RoleBadge role="HR" color="#ff6b6b" />
- **Krenki** (<RoleBadge role="Lewd Governor" color="#ff6b6b" />): <RoleBadge role="Head Moderator" color="#e68027" /> / <RoleBadge role="Event Manager" color="#f75edb" />

## Guidelines

- These ban votes do **not** require a 24-hour wait.
- Immediate action is taken as soon as TWO votes in favor are casted to ensure the safety of the community.

:::danger
Emergency ban votes are only for severe situations requiring swift action.
:::

## Example: Emergency Ban Vote

Here's an example of how an emergency ban vote thread should be structured:

<DiscordConversation id="emergency-ban-vote" title="Emergency Ban Vote - Started by Admin 1">
  <DiscordMessage
    name="Admin 1"
    color="#db1cb8"
    highlighted={true}
    message="🚨 EMERGENCY BAN VOTE - [MemberName]"
    reactions={[
      { emoji: "✅", count: 2, selected: true },
    ]}
  />
  <DiscordMessage
    name="Admin 1"
    color="#db1cb8"
  >
    Immediate action required - serious safety concern:
    - Threats of physical harm reported
    - Pattern of dangerous behavior escalating
    - Community safety at risk
  </DiscordMessage>
  <DiscordMessage
    name="Admin 1"
    color="#db1cb8"
    message="@Moderator"
  />
</DiscordConversation>

**Note:** Emergency bans can be executed as soon as TWO votes in favor are cast, without waiting for a full 24-hour period.

## Related

- [Ban Types Overview](./ban-types-overview)
- [Server Rule Violations](../server-rule-violations)
- [GitHub Records](../moderator/github-records)
