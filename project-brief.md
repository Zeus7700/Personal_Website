# Minimal Personal Website — Project Brief

## Goal
Build a fast, minimalist personal website with:
- Landing page (about me + links)
- Projects page (list of projects)
- Blog (MDX/Markdown posts)
- Contact page (email + links)

Style: clean, readable, similar to **tommytrinh.me** and **liyuxuan.dev**.

---

## Tech Stack
- **Next.js 14+** (App Router) + **TypeScript**
- **Tailwind CSS** + `@tailwindcss/typography`
- **MDX** for blog posts
- **Zod** for content validation
- **Vercel** for deployment

---

## Structure

app/
(site)/
layout.tsx
page.tsx
projects/page.tsx
blog/page.tsx
blog/[slug]/page.tsx
contact/page.tsx
sitemap.ts
robots.ts
api/rss/route.ts

components/
header.tsx
footer.tsx
container.tsx
prose.tsx

content/
blog/ # .mdx posts with frontmatter
projects/ # projects.json

lib/
posts.ts # load + parse MDX frontmatter
projects.ts # load projects.json


---

## Features
- Blog from `.mdx` files with `title`, `date`, `description` frontmatter.
- Projects pulled from `content/projects/projects.json`.
- Tailwind Typography for readable posts.
- Minimal header/footer and simple nav.
- `sitemap.ts`, `robots.ts`, and RSS at `/api/rss`.

---

## Design Guidelines
- Max width ~`max-w-3xl`, generous whitespace.
- Semantic HTML; underlined, accessible links.
- No heavy animations or flashy UI.

---

## Setup & First Run (Terminal)
> Run these in the project root (same folder as `package.json`).

```bash
# 0) (if not already) scaffolded via create-next-app and installed deps

# 1) Approve native build scripts (pnpm security prompt)
pnpm approve-builds   # press 'a' to approve all, then Enter

# 2) Install deps (now the native modules will build)
pnpm install

# 3) Dev server
pnpm dev
# open http://localhost:3000

Add Content

    New blog post: create content/blog/my-post.mdx

---
title: Hello World
description: Why I built this site.
date: 2025-08-09
---
First post! MDX supports **markdown** and components.

New project: edit content/projects/projects.json

[
  {
    "slug": "arm-bot",
    "title": "Desktop 6-Axis Robotic Arm",
    "url": "https://github.com/yourhandle/arm-bot",
    "summary": "Printed, desktop-sized arm lifting ~1.5 lb.",
    "tech": ["Fusion 360", "STM32", "C++"]
  }
]