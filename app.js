/* Renders the project sections from projects.js. No build step, no dependencies. */

const grid = document.getElementById("grid");

/* Section order, and the one-line framing under each heading.
   A project lands in a section via its `group` field in projects.js. */
const GROUP_ORDER = ["AI & Agents", "Data Pipelines", "Platform & Infrastructure", "Research"];

const GROUP_NOTE = {
  "AI & Agents": "Connectors, agents, and the tooling that lets an assistant reach live market data.",
  "Data Pipelines": "Ingestion and derived datasets — filings, newswires, transcripts, calendars, stats.",
  "Platform & Infrastructure": "How it ships, how it's reached, and how it reports on itself.",
  "Research": "Before the markets, the sky.",
};

function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function slug(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function mediaHTML(m) {
  if (!m) return "";
  if (m.type === "video") {
    return `<div class="card-media">
      <video src="${esc(m.src)}" muted loop playsinline preload="none" aria-label="${esc(m.alt || "")}"></video>
    </div>`;
  }
  return `<div class="card-media">
    <img src="${esc(m.src)}" alt="${esc(m.alt || "")}" loading="lazy">
  </div>`;
}

function cardHTML(p) {
  const links = (p.links || [])
    .map(l => `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)}</a>`)
    .join("");

  return `<article class="card${p.media ? " has-media" : ""}" id="${slug(p.title)}">
    ${mediaHTML(p.media)}
    <div class="card-body">
      <div class="card-meta"><span class="org">${esc(p.org)}</span><span>${esc(p.year)}</span></div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.blurb)}</p>
      ${p.result ? `<p class="result">${esc(p.result)}</p>` : ""}
      ${(p.details || []).length ? `<details class="detail">
        <summary>What it covers</summary>
        <ul>${p.details.map(d => `<li>${esc(d)}</li>`).join("")}</ul>
      </details>` : ""}
      ${links ? `<div class="card-links">${links}</div>` : ""}
      <p class="stack">${(p.stack || []).map(esc).join(" · ")}</p>
    </div>
  </article>`;
}

function render() {
  grid.innerHTML = GROUP_ORDER.map(g => {
    const items = PROJECTS.filter(p => p.group === g);
    if (!items.length) return "";
    return `<section class="group" id="${slug(g)}">
      <header class="group-head">
        <h2>${esc(g)}<span class="group-count">${items.length}</span></h2>
        <p>${esc(GROUP_NOTE[g] || "")}</p>
      </header>
      <div class="group-grid">${items.map(cardHTML).join("")}</div>
    </section>`;
  }).join("");
  wireVideos();
}

/* Videos load and play only when scrolled into view, and pause when they leave.
   Keeps the page light on mobile. */
function wireVideos() {
  const vids = grid.querySelectorAll("video");
  if (!vids.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting) {
        if (v.preload === "none") {
          v.preload = "auto";
          // skip the dead black frame most screen recordings open on
          v.addEventListener("loadedmetadata", () => { v.currentTime = v.duration * 0.08; }, { once: true });
        }
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, { threshold: 0.35 });

  vids.forEach(v => io.observe(v));
}

render();

/* Cards are rendered by JS, so the browser has already given up on any #anchor
   in the URL by the time they exist. Re-resolve it after the first render —
   this is what the deep links in the GitHub profile README rely on. */
if (location.hash) {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target) {
    target.scrollIntoView();
    target.classList.add("card--linked");
  }
}

/* ---------- writing ---------- */
const posts = document.getElementById("posts");

if (posts && typeof WRITING !== "undefined") {
  const fmt = d => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", year: "numeric" });
  posts.innerHTML = WRITING.map(w => `<li>
    <a href="${esc(w.href)}" target="_blank" rel="noopener">${esc(w.title)}</a>
    <span class="post-meta">${fmt(w.date)}${w.note ? " · " + esc(w.note) : ""}</span>
  </li>`).join("");
}
