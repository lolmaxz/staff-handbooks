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
        "general-handbook/server-hierarchy",
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
            //   // link: {
            //   //   type: "doc",
            //   //   id: "general-handbook/staff-roles/social-media-side/media-positions",
            //   // },
            //   // items: [{type: "doc", id: "general-handbook/staff-roles/social-media-side/social-media-team"}],
            // },
          ],
        },
        "general-handbook/staff-channels",
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
        "server-staff-handbook/references",
        {
          type: "category",
          label: "Training",
          link: {
            type: "generated-index",
            image: "./static/img/docusaurus.png",
          },
          items: [
            "server-staff-handbook/training/going-on-off-call",
            "server-staff-handbook/training/enabling-developer-mode",
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
        "server-staff-handbook/github-records",
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
        "server-staff-handbook/server-votes-explained",
      ],
    },
    {
      type: "category",
      label: "Event Staff Handbook",
      link: {
        type: "doc",
        id: "event-staff-handbook/introduction",
      },
      collapsed: true,
      items: [
        "event-staff-handbook/event-team-channels",
        "event-staff-handbook/event-rules",
        "event-staff-handbook/event-trial-training",
        "event-staff-handbook/senior-team-promotion",
        "event-staff-handbook/how-to-host-an-event",
        "event-staff-handbook/scheduling-procedures",
        "event-staff-handbook/classic-event-types",
        "event-staff-handbook/special-planning-event-types",
        "event-staff-handbook/hosting-requirements",
        "event-staff-handbook/security-requirements",
        "event-staff-handbook/incident-management-guidelines",
        "event-staff-handbook/host-discretion-list",
        "event-staff-handbook/github-records",
        // Add other event staff handbook files here
      ],
    },
    // {
    //   type: "category",
    //   label: "Social Media Handbook",
    //   link: {
    //     type: "doc",
    //     id: "social-media-handbook/introduction",
    //   },
    //   collapsed: true,
    //   items: [
    //     "social-media-handbook/roles-and-responsibilities",
    //     {
    //       type: "category",
    //       label: "Graphics Team",
    //       link: {
    //         type: "generated-index",
    //       },
    //       collapsed: true,
    //       items: ["social-media-handbook/graphics-team/overview", "social-media-handbook/graphics-team/request-guidelines"],
    //     },
    //     {
    //       type: "category",
    //       label: "Social Media Team",
    //       link: {
    //         type: "generated-index",
    //       },
    //       collapsed: true,
    //       items: [
    //         "social-media-handbook/social-media-team/general-requirements",
    //         "social-media-handbook/social-media-team/media-content",
    //         "social-media-handbook/social-media-team/posting-procedure",
    //         "social-media-handbook/social-media-team/weekly-calendar",
    //         "social-media-handbook/social-media-team/consent-procedure",
    //       ],
    //     },
    //     "social-media-handbook/social-networks",
    //   ],
    // },
  ],
};

export default sidebars;
