---
id: orion-board-server-mail
title: Server Mail
---

import CommandCard from "@site/src/components/CommandCard";
import DiscordButton from "@site/src/components/DiscordButton";
import CardGrid, { Card } from "@site/src/components/CardGrid";
import StepTimeline from "@site/src/components/StepTimeline";

# Server Mail

Server mail is a post in the mail channel that pings one member. The post does not contain the message. They press <DiscordButton type="primary" emoji="📬">Open Mail</DiscordButton> and read it in a private reply. Only that member can open it. Anyone else who clicks is told the mail is not for them.

<CardGrid columns={2}>
  <Card title="Warning mail" status="warning" icon="⚠️">
    Sent from a warning command. The member can acknowledge it or ask for help. See [Sending a warning as mail](#warning-server-mail).
  </Card>
  <Card title="Custom mail" status="info" icon="✉️">
    Sent with <code>/server-mail</code>. Staff only, until further notice. It is not a warning, so there is no Acknowledge button and no ticket button. See [Custom server mail](#server-mail).
  </Card>
</CardGrid>

---

## Sending a warning as mail {#warning-server-mail}

Each warning command has an optional <code>server_mail</code>. It defaults to off.

<CardGrid columns={2}>
  <Card title="server_mail on" status="success" icon="📬">
    The warning is posted to the mail channel right away. <DiscordButton type="primary" emoji="🎫">Open Ticket</DiscordButton> and <DiscordButton type="secondary">Link Current Ticket</DiscordButton> still show. If mail cannot be sent, the warning is still saved and the reply says so.
  </Card>
  <Card title="server_mail off" status="info" icon="🔘">
    The reply includes the two buttons below. Only the staff member who issued the warning can press them.
  </Card>
</CardGrid>

<p>
  <DiscordButton type="success">Send in server mail</DiscordButton>{" "}
  <DiscordButton type="secondary">Send server mail with custom message</DiscordButton>
</p>

<DiscordButton type="success">Send in server mail</DiscordButton> sends the warning as it is. The title matches the warning (formal or informal, server or event), and the message is the warning reason. If the event warning also created an event ban, that result is included under the reason.

<DiscordButton type="secondary">Send server mail with custom message</DiscordButton> opens a form already filled in with that title and reason. Change them if you want the member to read something else, and attach up to 10 files. Those files are added to the evidence already on the warning. The warning saved in Orion stays the same, and staff notes are not included. If you replace the message, include the event ban yourself when you still want them to see it.

One mail per warning. After it sends, both buttons go away.

:::tip If they already left
The mail is still posted. The ping may not reach them. <DiscordButton type="primary" emoji="🎫">Open Ticket</DiscordButton> is not shown when they were not in the server.
:::

---

## How the member acknowledges {#warning-acknowledgement}

Acknowledging does **not** close the ticket.

The warning ticket name shows " **🟠❌** " until they acknowledge the warning, then " **🟠✅** " when a warning is acknowledged.

<StepTimeline
direction="vertical"
size="sm"
accentColor="#e68027"
steps={[
{
label: "Mail",
detail: "Acknowledge, or ask for help",
recap: "Acknowledge takes their name off the channel post. That post is deleted 6 hours later. Need More Help or View Ticket stays.",
},
{
label: "Ticket already open",
detail: "Notice in the ticket",
recap: "A green notice is posted. They can close the ticket or leave it open.",
},
{
label: "Ticket opened later",
detail: "Already acknowledged, or a button",
recap: "The first message shows when they acknowledged, or an Acknowledge warning button only they can press.",
},
]}
/>

In Orion, the warning shows **Never Acknowledged**, or **Yes** and the date. A mail icon on the warning shows when it was sent, opened, and acknowledged.

<DiscordButton type="primary">Need More Help</DiscordButton> opens a staff talk ticket for a server warning, or an event report for an event warning. The ticket says it was opened from server mail and quotes the text they were shown. If a ticket is already linked, the button is <DiscordButton type="link">View Ticket</DiscordButton> instead, and that is not recorded as a request for help. Asking for help does not remove the channel post. They can still acknowledge afterward.

`/reminder` in a warning ticket pings the **warned member** when you do not pick a user. Options and cooldown: [Slash Commands — /reminder](/docs/general-handbook/orion-board/orion-board-commands).

### If they never acknowledge {#ignored-warning}

Bot settings → **Reminder Settings** can restrict access when a warning ticket sits unacknowledged.

<StepTimeline
direction="vertical"
size="sm"
accentColor="#e87878"
steps={[
{
label: "Timer starts",
detail: "Warning ticket opens, and they have not acknowledged",
},
{
label: "It stops",
detail: "One reply from that member, or an acknowledgement",
},
{
label: "It fires",
detail: "They get Restricted Access, and the ticket is pinged with Acknowledge",
},
]}
/>

Manual restrict and grant: [Restricted Access](/docs/general-handbook/orion-board/orion-board-moderation-and-warnings#restricted-access).

---

## Custom server mail {#server-mail}

Staff only, until further notice.

<CommandCard cmd="/server-mail" perms="Staff" cardColor="purple">
  Custom mail, not a warning. No slash options. The modal asks for the member, title, message, up to 10 files, and a checkbox to show your name. Leave it unchecked to send it anonymously.
</CommandCard>

<CardGrid columns={2}>
  <Card title="What they see" status="info" icon="📬">
    The channel post says they have mail, pings them, and has <DiscordButton type="primary" emoji="📬">Open Mail</DiscordButton>. After they open it, their name comes off that post. If you showed your name, the private reply ends with who sent it.
  </Card>
  <Card title="What you can check" status="success" icon="🗂️">
    Right-click the channel post for <strong>Mail Details</strong>. Server admins can check server mail in Orion.
  </Card>
</CardGrid>

An acknowledged **warning** mail leaves the channel after 6 hours. Custom mail stays unless bot settings are set to delete mail after a number of hours.
