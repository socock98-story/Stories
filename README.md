# Story Site — Jekyll + GitHub Pages

A dark, elegant story website featuring:
- Homepage with search + genre/tag filters, rounded cards, and "Load more"
- One-shot and Series support
- Series hub with chapter list (newest first): `Chapter X — date`, then description
- Chapter reader with prev/back/next navigation
- "NEW" badge when posted within the last 7 days (client-side)
- Centered layout (~60% width)

## Quick Start

1. Push to GitHub on branch `main` (dotfiles included).
2. In your repo: **Settings → Pages → Source: GitHub Actions**.
3. The included workflow builds and deploys.

### Local preview (optional)
Install Ruby & Bundler, then:
```bash
bundle install
bundle exec jekyll serve
```
Visit http://localhost:4000

## Content authoring

- Stories live in `_stories/<slug>.md` with front matter:
  - `title`, `slug`, `type: series|one-shot`, `genre`, `tags: [..]`, `cover`, `summary`
- Chapters live in `_chapters/<slug>/ch/<n>.md` with front matter:
  - `story: <slug>`, `chapter: <n>`, `description`, `posted_at: YYYY-MM-DD`

URLs:
- `/` — homepage
- `/stories/<slug>/` — story hub page
- `/stories/<slug>/ch/<n>/` — chapter page

## Customize
- Title: `_config.yml` → `title`
- Pen name: edit the footer text in `_layouts/base.html`
- Styling: `assets/css/styles.css`
- JS (filters/infinite scroll/NEW): `assets/js/main.js`
