---
id: how-to-be-security
title: How to be Security
---

import RoleBadge from "@site/src/components/RoleBadge";
import ChannelBadge from "@site/src/components/ChannelBadge";
import Tooltip from "@site/src/components/Tooltip";
import CardGrid, { Card } from "@site/src/components/CardGrid";
import StepTimeline from "@site/src/components/StepTimeline";
import Link from "@docusaurus/Link";
import DiscordButton from "@site/src/components/DiscordButton";

# How to be Security 🛡️

Volunteering at an event as <RoleBadge role="Event Security" color="#3fa7ff" /> involves several key steps:

<StepTimeline
  title="Security at an event"
  size="sm"
  accentColor="#3fa7ff"
  steps={[
    {
      label: "Sign up",
      detail: "Security Signup",
      recap: "Press Security Signup on the Staff Attendees Panel. Trials use that same button. Do not use the public Sign Up button.",
    },
    {
      label: "Starting",
      detail: "Introduced by the host",
      recap: "Introduce yourself to new members so they know who to go to. The host should name active security in the VR announcement.",
    },
    {
      label: "During event",
      detail: "Support host · rounds",
      recap: "Help the host keep flow, welcome late joiners, and make rounds — you do not re-announce full rules to every late arrival.",
    },
    {
      label: "If needed",
      detail: "Incidents → guidelines",
      recap: "If something breaks rules, warn, move people aside privately, document, and log in #events-incidents per the incident guidelines.",
    },
  ]}
/>

## 📝 Sign Up for the Event

You cover the event with the <RoleBadge role="Event Host" color="#f75edb" />. Default length is **2 hours**. The exact length is on the Staff Attendees Panel (**Duration:** line), so check it there.

On the Staff Attendees Panel in <ChannelBadge label="🪄｜events-attendees" link="https://discord.com/channels/734595073920204940/1233592478909726781" />, press:

<div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "0.75rem 0" }}>
  <DiscordButton type="secondary" emoji="🛡️">Security Signup</DiscordButton>
</div>

Full security and shadowing use that same button. If you have the Event Trial role, Hephia adds *(Training)* next to your name. Stay with your mentor in <ChannelBadge label="📘events-organization" link="https://discord.com/channels/734595073920204940/741166096421486645" /> or the event voice channel.

Do not press the public <DiscordButton type="success" emoji="📩">Sign Up</DiscordButton> button. That one is for attendees.

- If the event has a **roleplay** vote, Hephia asks you to pick a role before you are added. You may skip the world and basic votes.
- Pressing <DiscordButton type="secondary" emoji="🛡️">Security Signup</DiscordButton> again removes you.
- Once signed up, the Public Sign-Up Post shows you on its 🛡️ **Security** line, and **List of Attendees** shows you every attendee's VRChat name.
- If nobody signs up as security, the Public Sign-Up Post lists the host as **Host &amp; Security** once the event starts.

| On the Staff Attendees Panel | Can security use it? |
| --- | --- |
| <DiscordButton type="secondary" emoji="⏱️">Delay start</DiscordButton> | Yes |
| **Update event status…** and <DiscordButton type="secondary" emoji="📣">1h reminder</DiscordButton> | No — host, signed-up co-host, or admin |
| <DiscordButton type="error" emoji="🛑">Cancel Event</DiscordButton> / <DiscordButton type="error" emoji="🛑">End Event Now</DiscordButton> | No — the host who created it, or an admin |

More on the Staff Attendees Panel: <Link to="/docs/event-staff-handbook/hephia-event-system#the-staff-attendees-panel-co-hosts--security">Hephia Event System</Link>.

## 👋 Introduce Yourself to New Members

<Card title="First Impressions Matter" status="success">
  <p>You will often meet new people, so it's important that you introduce yourself to help event goers find a <Tooltip tip="A welcoming environment where attendees feel comfortable and safe" bubbleColor="#d255ec" labelColor="#e68027">safe space</Tooltip>.</p>
  <p>Try your best to ensure no one stays in their corner alone and feeling excluded. While the <RoleBadge role="Event Host" color="#f75edb" /> is also encouraged to prevent this while entertaining members, as security you play a crucial role in creating an inclusive atmosphere.</p>
</Card>

## 🎉 Keep the Party Going!

<CardGrid columns={2}>
  <Card title="Support the Host" icon="🤝">
    <ul>
      <li>Assist the <RoleBadge role="Event Host" color="#f75edb" /> in ensuring the event runs smoothly</li>
      <li>Help maintain a positive experience for all attendees</li>
      <li>Welcome joining players during the event to make them feel included</li>
      <li>You do <strong>not</strong> need to re-announce the full event rules to late joiners — welcome them, and point them to the Discord event post / rules if they ask</li>
    </ul>
  </Card>
  
  <Card title="Team Support" icon="👥">
    <p>Provide support to other <RoleBadge role="Event Security" color="#3fa7ff" /> team members when incidents occur.</p>
  </Card>
</CardGrid>

:::info Private rooms may be locked
Attendees may lock or leave private rooms unlocked. Do <strong>not</strong> force rooms open. If someone has a problem in a locked room, they should come to you or open an Event‑Talk ticket — respond when issues are reported. Etiquette for joining a room: ring the bell once; leave them alone if there is no answer or a “no.”
:::

<div style={{ marginTop: "1.5rem" }} />

:::danger ⚠️ Vigilance Required!
**Always** prioritize the reporting event goers' safety. You're the most important person to any attendee with a problem, and we want to show the love! 💜
:::

<div style={{ marginTop: "1.5rem" }} />

## 🚨 Incident Management

<Card title="Handling Incidents" status="warning">
  <p>If an incident occurs, follow the guidelines outlined in the <Link to="/docs/event-staff-handbook/Security/incident-management-guidelines">Incident Management Guidelines</Link> section.</p>
</Card>

## Related

- [Hephia Event System](/docs/event-staff-handbook/hephia-event-system)
- [Security Requirements](/docs/event-staff-handbook/Security/security-requirements)
- [Incident Management Guidelines](/docs/event-staff-handbook/Security/incident-management-guidelines)
- [Security Introduction](/docs/event-staff-handbook/Security/Introduction)
