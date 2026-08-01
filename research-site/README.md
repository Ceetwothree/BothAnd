# LA Homelessness Research Site

A static site tracking independent research on homelessness in Los Angeles: the process, the money, the agencies, the tools, what works, and what's been tried.

This is a standalone static site, separate from the main BothAnd app in this repo.

## Structure

- `content/*.md` — page content, written in Markdown with a small frontmatter block (`title`, `description`, `status`, `updated`, `subtitle`)
- `templates/layout.html` — shared page shell (nav, header, footer)
- `assets/style.css` — site styling
- `research-notes/` — raw sourced research notes per topic, used as working material when drafting `content/` pages (not part of the published site)
- `build.mjs` — builds `content/*.md` → `dist/*.html`
- `dist/` — the generated static site; open `dist/index.html` directly in a browser, or deploy the `dist/` folder as-is to any static host

## Build

```sh
npm install
npm run build       # one-time build
npm run watch        # rebuild on change
```

## Page status

Each page's frontmatter `status` is `stub`, `in-progress`, or `researched`, shown as a badge on the page. See `content/sources.md` for the sourcing standard.
