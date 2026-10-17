# dok.community

Source for the [Data on Kubernetes Community](https://dok.community) website, built with [Hugo](https://gohugo.io) and [Tailwind CSS](https://tailwindcss.com) and deployed to GitHub Pages.

## Local development

Requirements: Hugo extended `0.154.5+` and Node.js `22+`.

```bash
npm install
npm run dev      # http://localhost:5000
npm run build    # outputs to ./public
```

Or with Docker:

```bash
docker compose up --build   # http://localhost:5003
```

## Structure

| Path | Purpose |
| --- | --- |
| `hugo.toml` | Site config, shared links (`params.links`), header button, menus |
| `content/` | All page copy. Pages are Markdown with a `sections:` list in front matter |
| `content/_index.md` | Home page sections |
| `content/blog/`, `newsroom/`, `dok-events/`, `resources/`, `dok-reports/` | Posts, press releases, events, library items and reports (page bundles with their images) |
| `data/sponsors.yaml` | Sponsor tiers and sponsors (empty list shows a call for sponsors) |
| `i18n/en.yaml` | Interface text (buttons, labels, empty states) |
| `layouts/partials/sections/` | One template per section type |
| `assets/css/main.css` | Tailwind entry point and 2027 brand tokens |
| `assets/images/orbit-hero.png` | Orbit hero visual from the brand kit |
| `hack/wp2hugo/` | One-off WordPress export converter |
| `hack/check_links.py` | Link check and old-URL regression check (runs in CI) |

## Writing pages

Page layouts are built from sections listed in front matter:

```yaml
sections:
  - type: split          # text + image/video, or two text columns
    title: "Monthly town halls"
    content: |
      Markdown goes here.
    video: "https://youtu.be/…"
    buttons:
      - label: "Join the Slack"
        url: "@slack"     # "@key" resolves to params.links in hugo.toml
```

Use `@slack` for every Slack link, never the raw invite URL. Slack invites get regenerated; when that happens, update `params.links.slack` in `hugo.toml` and the whole site follows. For anything outside the site (slides, press releases, newsletters), share `https://dok.community/slack`, which redirects to the current invite (`content/slack/`).

Available types: `hero`, `bento`, `text`, `split`, `tabs`, `banner`, `stats`, `people`, `sponsors`, `resources`, `posts`, `events`. See the comment at the top of each file in `layouts/partials/sections/` for its fields.

Events use `eventStart`/`eventEnd` (`YYYY-MM-DD`) to decide between upcoming and past; the deploy workflow rebuilds daily so the lists stay current.

## Checks

```bash
hugo --gc --minify && python3 hack/check_links.py public
```

The check fails on broken internal links and on any URL from the old WordPress site (`hack/old-urls.txt`) that no longer resolves. Add `aliases:` to a page's front matter to redirect an old URL.

## WordPress migration

Content was converted from the WordPress export with `hack/wp2hugo/wp2hugo.py` (see the script header). The export file contains private data and is git-ignored; do not commit it.

Deployment runs from `.github/workflows/hugo.yaml` on every push to `main`.
