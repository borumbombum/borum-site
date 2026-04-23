# Borum Site - Technical Guide

## Agent Instructions
- **NEVER** commit/push without explicit user request
- **ALWAYS** prefix commits: `AGENT: [description]`
- **ALWAYS** bump patch version before commit (`npm version patch`)
- Always use plan mode before coding. Ask before commit/push.

## Project Overview
Ultra-light Eleventy SSG. Vanilla JS only. Modular CSS architecture.

## Tech Stack
- Eleventy 2.0.1 (SSG)
- LightningCSS (CSS pipeline)
- Vanilla JavaScript
- Node.js

## Directory Structure

```
src/
├── _data/         # nav.json, site.json, gpxs.json
├── _includes/
│   ├── base.njk, article.njk, page.njk  # Layouts
│   ├── components/                     # nav, footer, social-icons
│   └── macros/                     # lists, heros, gallery, tags, links, author-box
├── assets/
│   ├── css/     # 15 modular files
│   ├── js/      # bundle.js only
│   └── images/
├── blog/        # Blog articles (markdown)
└── pages/      # home, work, biking, tag
```

## Build Commands
- `npm run dev` — Development server (localhost:8081)
- `npm run build` — Production build

## JavaScript Architecture
- Single `bundle.js` (~345 lines vanilla)
- No external JS libraries
- Features: theme toggle, nav toggle, animations, Web Share API

## CSS Architecture
- `base.css`, `resets.css` — Foundation
- `themes.css` — Light/dark mode + CSS variables
- `queries.css` — Responsive + video grid
- `nav.css`, `icons.css`, `tooltips.css` — UI components
- `main.css`, `utilities.css` — Content utilities
- `gallery.css`, `gpx.css`, `profile.css` — Feature styles

## Key Features
| Feature | Trigger |
|---------|--------|
| Theme toggle | `d` key |
| Nav toggle | `m` key |
| Share | Share button / `navigator.share()` |
| Videos | `videos:` frontmatter array |

## Frontmatter Schema
```yaml
---
title: 'Article Title'
description: 'Meta description'
date: 2024-01-01
image: /path/to/image.webp
imageCaption: 'Caption'
draft: false
star: true
videos:
    - https://www.youtube.com/watch?v=VIDEO_ID
audios:
    - /assets/audios/file.mp3
tags:
    - tag1
    - tag2
---
```

## Guidelines
- Vanilla JS only. No frameworks.
- CSS via data URIs for inline icons.
- Use existing CSS patterns before adding new.
- Test responsive before commit.