---
id: orion-board-server-mail
title: Server Mail
---

import CommandCard from "@site/src/components/CommandCard";
import DiscordButton from "@site/src/components/DiscordButton";
import CardGrid, { Card } from "@site/src/components/CardGrid";
import StepTimeline from "@site/src/components/StepTimeline";
import ContextMenuChain, { ContextMenuItem } from "@site/src/components/ContextMenuItem";
import DiscordMessage, { DiscordEmbed, DiscordActionRow, DiscordRowButton } from "@site/src/components/DiscordMessage";
import SlashCommand from "@site/src/components/SlashCommand";

# Server Mail

Server mail is a post in the mail channel that pings one member. The post does not contain the message. They press <DiscordButton type="primary" emoji="📬">Open Mail</DiscordButton> and read it in a private reply. Only that member can open it. Anyone else who clicks is told the mail is not for them. After they open it, the ping comes off and the post says a user received mail.

The channel post looks like this:

<DiscordMessage
  username="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  timestamp="2026-10-15 11:24 AM"
  app
>
  <DiscordEmbed
    color="#a955f7"
    thumbnail={require("@site/static/img/you-got-mail.png").default}
    description={"<@Maxie The Bunni>\n📬 **You have mail.**\nOpen it to read the message. Only you can open it."}
  >
    <DiscordActionRow>
      <DiscordRowButton type="primary" emoji="📬">Open Mail</DiscordRowButton>
    </DiscordActionRow>
  </DiscordEmbed>
</DiscordMessage>

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

---

### If they never acknowledge {#ignored-warning}

A warning ticket that sits unacknowledged can lead to Restricted Access. When that happens follows the bot’s settings.

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

If the warning was sent as server mail and they never acknowledge that mail, they can also get Restricted Access after the set time, even when no ticket is open. They can still open the mail.

---

## If the mail goes unanswered 🆕 {#unanswered-mail}

When mail stays unanswered, staff are pinged in a staff channel. Who is pinged, and how long they wait, follow the bot’s settings.

The notice can include:

<p>
  <DiscordButton type="primary">Resend server mail</DiscordButton>{" "}
  <DiscordButton type="secondary">Send DM</DiscordButton>{" "}
  <DiscordButton type="secondary">Create warning ticket</DiscordButton>{" "}
  <DiscordButton type="secondary">Remind in a week</DiscordButton>
</p>

- <DiscordButton type="primary">Resend server mail</DiscordButton> deletes the old channel post and sends the same mail again. The warning record and its date stay the same.
- <DiscordButton type="secondary">Send DM</DiscordButton> is for warnings. It sends the warning itself: title, text, when it was issued, and the files, with <DiscordButton type="success">Acknowledge</DiscordButton> and <DiscordButton type="primary">Open ticket</DiscordButton>. The button hides after a DM has been tried. If they are no longer in the server, opening a ticket from that DM tells them they cannot, because they are not in the server.
- <DiscordButton type="secondary">Create warning ticket</DiscordButton> opens a warning ticket with <DiscordButton type="success">Acknowledge warning</DiscordButton> inside.
- <DiscordButton type="secondary">Remind in a week</DiscordButton> snoozes the follow-up.
- <DiscordButton type="secondary">Check content</DiscordButton> shows what was sent. Warnings also have <DiscordButton type="link">Open warning details on dashboard</DiscordButton>.

---

## Custom server mail {#server-mail}

Staff only, until further notice.

The command looks like this:

<SlashCommand
  command="server-mail"
  description="Send server mail. The member and message are added in the next step."
  bot="Orion Board"
  avatar={require("@site/static/img/orion-board-message-avatar.png").default}
  plus
/>

<CommandCard cmd="/server-mail" perms="Staff" cardColor="purple">
  Custom mail, not a warning. No slash options. The modal asks for the member, title, message, up to 10 files, and a checkbox to show your name. Leave it unchecked to send it anonymously.
</CommandCard>

<CardGrid columns={2}>
  <Card title="What they see" status="info" icon="📬">
    The channel post pings them and has <DiscordButton type="primary" emoji="📬">Open Mail</DiscordButton>. If you showed your name, the private reply ends with who sent it.
  </Card>
  <Card title="What you can check" status="success" icon="🗂️">
    Server admins can check server mail in Orion. Mail Details is on the mail message.
  </Card>
</CardGrid>

Right-click the mail message, then:

<ContextMenuChain>
  <ContextMenuItem label="Apps" />
  <ContextMenuItem label="Orion Board" image={require("@site/static/img/orion-board-profile.png").default} />
  <ContextMenuItem label="Mail Details" />
</ContextMenuChain>

An acknowledged **warning** mail leaves the channel after 6 hours. Custom mail stays unless deletion follows the bot’s settings.
