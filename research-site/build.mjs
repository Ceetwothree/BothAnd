// Builds content/*.md -> dist/*.html using templates/layout.html
// Frontmatter format (simple key: value pairs between --- lines):
//   title, description, section, status (stub|in-progress|researched), updated (YYYY-MM-DD)
import { readFileSync, writeFileSync, readdirSync, mkdirSync, cpSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { marked } from "marked";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "content");
const DIST_DIR = path.join(__dirname, "dist");
const LAYOUT = readFileSync(path.join(__dirname, "templates", "layout.html"), "utf8");

marked.setOptions({ gfm: true });

// Ordered nav structure. `file` maps to content/<file>.md -> dist/<file>.html
const NAV = [
  { group: "Start Here", items: [
    { file: "index", label: "Home" },
    { file: "sopk", label: "The Analytical Frame" },
    { file: "overview", label: "Scope & Scale" },
  ]},
  { group: "The System", items: [
    { file: "system", label: "Phases of the Process" },
    { file: "agencies", label: "Agencies & NGOs" },
    { file: "tools", label: "Tools & Systems" },
  ]},
  { group: "The Money", items: [
    { file: "money", label: "Where It Comes From, Where It Goes" },
  ]},
  { group: "What Happens", items: [
    { file: "effectiveness", label: "What Works, What Doesn't" },
    { file: "breaks", label: "Where & Why It Breaks" },
    { file: "solutions", label: "Solutions Tried" },
  ]},
  { group: "Research Process", items: [
    { file: "findings", label: "Findings Log" },
    { file: "sources", label: "Sources & Methodology" },
  ]},
];

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta = {};
  for (const line of m[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    meta[key] = val;
  }
  return { meta, body: m[2] };
}

function statusBadge(status) {
  const map = {
    "researched": ["Researched", "status-researched"],
    "in-progress": ["In Progress", "status-in-progress"],
    "stub": ["Stub", "status-stub"],
  };
  const [label, cls] = map[status] || map["stub"];
  return `<span class="status ${cls}">${label}</span>`;
}

function buildNav(activeFile) {
  return NAV.map(({ group, items }) => {
    const links = items.map(({ file, label }) => {
      const cls = file === activeFile ? ' class="active"' : "";
      return `      <li><a href="${file}.html"${cls}>${label}</a></li>`;
    }).join("\n");
    return `    <h3>${group}</h3>\n    <ul>\n${links}\n    </ul>`;
  }).join("\n");
}

function build() {
  mkdirSync(DIST_DIR, { recursive: true });
  mkdirSync(path.join(DIST_DIR, "assets"), { recursive: true });
  cpSync(path.join(__dirname, "assets"), path.join(DIST_DIR, "assets"), { recursive: true });

  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  let built = 0;
  for (const f of files) {
    const slug = f.replace(/\.md$/, "");
    const raw = readFileSync(path.join(CONTENT_DIR, f), "utf8");
    const { meta, body } = parseFrontmatter(raw);
    const htmlBody = marked.parse(body);
    const title = meta.title || slug;
    const description = meta.description || "";
    const status = meta.status || "stub";
    const updated = meta.updated || "";

    const metaRow = `<div class="meta-row">${statusBadge(status)}${updated ? `<span>Last updated ${updated}</span>` : ""}</div>`;

    const pageContent = `<h1>${title}</h1>\n${meta.subtitle ? `<p class="subtitle">${meta.subtitle}</p>` : ""}\n${metaRow}\n${htmlBody}`;

    const nav = buildNav(slug);

    const out = LAYOUT
      .replaceAll("{{TITLE}}", title)
      .replaceAll("{{DESCRIPTION}}", description)
      .replaceAll("{{ROOT}}", "")
      .replaceAll("{{NAV}}", nav)
      .replaceAll("{{CONTENT}}", pageContent);

    writeFileSync(path.join(DIST_DIR, `${slug}.html`), out, "utf8");
    built++;
  }
  console.log(`Built ${built} pages into dist/`);
}

build();

if (process.argv.includes("--watch")) {
  const { watch } = await import("node:fs");
  console.log("Watching content/ and assets/ for changes...");
  watch(CONTENT_DIR, { recursive: true }, () => build());
  watch(path.join(__dirname, "assets"), { recursive: true }, () => build());
}
