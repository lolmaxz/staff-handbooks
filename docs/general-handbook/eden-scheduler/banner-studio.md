---
id: eden-scheduler-banner-studio
title: Banner Studio
---

import ResponsiveScreenshot from "@site/src/components/ResponsiveScreenshot";
import StepTimeline from "@site/src/components/StepTimeline";

# Banner Studio

Optional editor for **SFW event type images**. Banners show in your Event Library, on the calendar after Committee **Push**, and on Discord scheduled events. You can still upload a plain image instead (JPEG, PNG, WebP, or GIF, up to **5 MB**). Canvas is **800×320**.

**How to get here:** **Host** → **Event Library** → New or edit an event type → **Design in Banner Studio**.

<ResponsiveScreenshot
  src="scheduler/banner_studio_demo"
  alt="Banner Studio with layers, text tools, and the canvas"
  caption="On phone, landscape is easier to use — portrait still works."
/>

---

## Design a Banner

<StepTimeline
  title="Design a banner"
  size="sm"
  accentColor="#a259f7"
  steps={[
    {
      label: "Event Library",
      detail: "Host dashboard",
      recap: "On Host, open Event Library and create or edit an event type. You can also upload a plain SFW image here without opening the studio.",
    },
    {
      label: "Banner Studio",
      detail: "Layers · text · FX",
      recap: "Add Image, Text, Emoji, or Stickers. Drag and scale on the canvas. On phone, use the Layers / Text / FX dock.",
    },
    {
      label: "Save banner",
      detail: "Writes to the event type",
      recap: "Save banner stores the image on that event type. If you started from New Event Type, type a name first — save creates the type (default duration 2 hours; edit the rest in the Event Type modal).",
    },
  ]}
/>

From the Event Type modal you can also **replace**, **download**, or **remove** the image. **Back** returns you to the [Host Dashboard](/docs/general-handbook/eden-scheduler/eden-scheduler-host-dashboard).

:::warning Replacing a studio banner
Uploading a plain file over a studio banner **deletes the Banner Studio project**. You keep the new flat image, but you cannot re-open the old layers.
:::

---

## What You Can Edit

- **Image / Text / Emoji / Stickers** — add layers from the toolbar
- **Background and framing** — presets, your uploads, or none
- **Layers** — reorder, hide, or delete (background and framing stay locked)
- **Text** — content, font, bold/italic/underline, color, size
- **FX** — color & transparency, drop shadow, border, transform

**Save banner** when you are done — it does not auto-save.

After save, set **duration**, **description** (SFW — used on Discord events), and collections from the Event Type modal. Use those types on [Host Availability](/docs/general-handbook/eden-scheduler/eden-scheduler-host-availability) with **Specific** or **Any from**.
