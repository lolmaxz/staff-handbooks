import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  handbookSidebar: [
    {
      type: "doc",
      id: "new-component",
      label: "New Component!",
    },
    {
      type: "doc",
      id: "intro",
      label: "Introduction",
    },
    {
      type: "category",
      label: "General Handbook",
      link: {
        type: "doc",
        id: "general-handbook/introduction",
      },
      collapsed: true,
      items: [
        {
          type: "category",
          label: "All Staff Roles",
          link: {
            type: "doc",
            id: "general-handbook/staff-roles/staff-positions",
          },
          collapsed: true,
          items: [
            // "general-handbook/staff-roles/lewd-governor",
            // "general-handbook/staff-roles/horny-resources",
            {
              type: "doc",
              label: "Server Staff Roles",
              id: "general-handbook/staff-roles/server-positions/server-positions",
              // link: {
              //   type: "doc",
              //   id: "general-handbook/staff-roles/server-side/server-positions",
              // },
              // items: [
              //   "general-handbook/staff-roles/server-side/head-moderator",
              //   "general-handbook/staff-roles/server-side/server-committee",
              //   "general-handbook/staff-roles/server-side/moderator",
              //   "general-handbook/staff-roles/server-side/cutie-helper",
              //   "general-handbook/staff-roles/server-side/server-chat-moderator",
              // ],
            },
            {
              type: "doc",
              label: "Event Staff Roles",
              id: "general-handbook/staff-roles/event-positions/event-positions",
              // link: {
              //   type: "doc",
              //   id: "general-handbook/staff-roles/event-side/event-positions",
              // },
              // items: [
              //   "general-handbook/staff-roles/event-side/event-team-head",
              //   "general-handbook/staff-roles/event-side/head-of-security",
              //   "general-handbook/staff-roles/event-side/event-committee",
              //   "general-handbook/staff-roles/event-side/senior-event-team",
              //   "general-handbook/staff-roles/event-side/event-trial",
              //   "general-handbook/staff-roles/event-side/event-host",
              //   "general-handbook/staff-roles/event-side/event-security",
              // ],
            },
            // {
            //   type: "doc",
            //   label: "Media Staff Roles",
            //   id: "general-handbook/staff-roles/media-positions/media-positions",
            //   /* link: {
            //      type: "doc",
            //      id: "general-handbook/staff-roles/social-media-side/media-positions",
            //    },
            //    items: [{type: "doc", id: "general-handbook/staff-roles/social-media-side/social-media-team"}], */
            // },
          ],
        },
        "general-handbook/staff-channels",
        "general-handbook/staff-voting-explained",
        "general-handbook/staff-hiatus",
        {
          type: "category",
          label: "Joining-Staff",
          link: {
            type: "doc",
            id: "general-handbook/joining-staff/staff-applications",
          },
          collapsed: true,
          items: ["general-handbook/joining-staff/headhunting"],
        },
        {
          type: "category",
          label: "Staff-Perks",
          link: {
            type: "doc",
            id: "general-handbook/staff-perks/staff-perks",
          },
          collapsed: true,
          items: ["general-handbook/staff-perks/staff-emeritus"],
        },
      ],
    },
    {
      type: "category",
      label: "Server Staff Handbook",
      link: {
        type: "doc",
        id: "server-staff-handbook/introduction",
      },
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Training",
          link: {
            type: "generated-index",
            image: "./static/img/docusaurus.png",
          },
          items: [
            // "server-staff-handbook/training/going-on-off-call",
            //"server-staff-handbook/training/enabling-developer-mode",
            "server-staff-handbook/training/getting-discord-user-id",
          ],
        },
        {
          type: "category",
          label: "Verification Process",
          link: {
            type: "generated-index",
          },
          items: [
            "server-staff-handbook/verification-process/timeframe-for-verification",
            "server-staff-handbook/verification-process/acceptable-forms-of-id",
            // "server-staff-handbook/verification-check",
            "server-staff-handbook/verification-process/camera-verification",
            "server-staff-handbook/verification-process/completion-of-verification",
            "server-staff-handbook/verification-process/verification-requirements",
          ],
        },
        "server-staff-handbook/closing-out-verifications",
        {
          type: "category",
          label: "Chat Moderation",
          link: {
            type: "generated-index",
          },
          items: [
            "server-staff-handbook/chat-moderation/cutie-helper-chat-moderation",
            "server-staff-handbook/chat-moderation/moderator-chat-moderation",
          ],
        },
        "server-staff-handbook/server-rule-violations",
        "server-staff-handbook/staff-talk-tickets",
        "server-staff-handbook/mod-on-call",
        {
          type: "category",
          label: "Ban Procedures",
          link: {
            type: "generated-index",
          },
          items: [
            "server-staff-handbook/ban-votes/ban-votes-for-members",
            "server-staff-handbook/ban-votes/boardroom-ban-vote",
            "server-staff-handbook/ban-votes/emergency-ban-vote",
          ],
        },
        "server-staff-handbook/github-records",
      ],
    },

    {
      type: "category",
      label: "Event Staff Handbook",
      link: {
        type: "doc",
        id: "event-staff-handbook/introduction",
      },
      items: [
        "event-staff-handbook/Hosts/hosting-requirements",
        "event-staff-handbook/event-rules",
        "event-staff-handbook/event-team-channels",
        "event-staff-handbook/event-roles",
        {
          type: "category",
          label: "Event Hosts",
          link: {
            type: "generated-index",
          },
          items: [
            "event-staff-handbook/Hosts/how-to-host-an-event",
            "event-staff-handbook/Hosts/scheduling-procedures",
            "event-staff-handbook/Hosts/host-discretion-list",
          ],
        },
        {
          type: "category",
          label: "Event Security",
          link: {
            type: "doc",
            id: "event-staff-handbook/Security/Introduction",
          },
          items: ["event-staff-handbook/Security/how-to-be-security", "event-staff-handbook/Security/incident-management-guidelines"],
        },
        "event-staff-handbook/github-records",
      ],
    },
  ],
};

export default sidebars;
