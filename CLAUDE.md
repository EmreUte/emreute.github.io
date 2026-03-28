# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website (emreute.github.io) built with vanilla HTML, CSS, and JavaScript — no framework, no build tool, no dependencies. Hosted on GitHub Pages.

## Development

No build step. To preview locally:

```bash
python3 -m http.server 8000
# or
npx serve .
```

There are no tests, linters, or package managers configured.

## Architecture

Three files make up the entire site:

- **`index.html`** — All page structure: navbar, hero, about, education, experience timeline, projects, skills, and contact sections
- **`style.css`** — Dark theme with CSS custom properties (`--bg`, `--accent`, `--accent2`, `--text`), responsive layout (breakpoint: 768px), and animation keyframes
- **`script.js`** — Navbar scroll effects, hamburger menu toggle, typed text rotation (hero tagline), and Intersection Observer–based scroll-triggered fade-ins

## Theming

Colors are defined as CSS variables at the `:root` level in `style.css`. The primary accent is blue (`#5b8fff`, `--accent`) with a purple secondary (`#a78bfa`, `--accent2`). Fonts loaded from Google Fonts: Inter (body) and JetBrains Mono (code/mono elements).
