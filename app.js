/* Renders the project sections from projects.js. No build step, no dependencies. */

const grid = document.getElementById("grid");
const groupnav = document.getElementById("groupnav");

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
      ${p.scale ? `<p class="scale">${esc(p.scale)}</p>` : ""}
      <p>${esc(p.blurb)}</p>
      ${p.result ? `<p class="result">${esc(p.result)}</p>` : ""}
      ${(p.details || []).length ? `<details class="detail">
        <summary>What it covers</summary>
        <ul>${p.details.map(d => `<li>${esc(d)}</li>`).join("")}</ul>
      </details>` : ""}
      ${p.extra ? `<figure class="extra"><img src="${esc(p.extra.src)}" alt="${esc(p.extra.alt || "")}" loading="lazy"></figure>` : ""}
      ${links ? `<div class="card-links">${links}</div>` : ""}
      <p class="stack">${(p.stack || []).map(esc).join(" · ")}</p>
    </div>
  </article>`;
}

function groupsPresent() {
  return GROUP_ORDER.filter(g => PROJECTS.some(p => p.group === g));
}

let activeGroup = "all";

function render() {
  const shown = groupsPresent().filter(g => activeGroup === "all" || slug(g) === activeGroup);
  grid.innerHTML = shown.map(g => {
    const items = PROJECTS.filter(p => p.group === g);
    return `<section class="group" id="${slug(g)}">
      <header class="group-head">
        <h2>${esc(g)}<span class="group-count">${items.length}</span></h2>
        <p>${esc(GROUP_NOTE[g] || "")}</p>
      </header>
      <div class="group-grid">${items.map(cardHTML).join("")}</div>
    </section>`;
  }).join("");
  layout();
  wireVideos();
}

/* True masonry: CSS grid leaves holes under short cards, and CSS columns strand
   space when a tall card won't fit. So place each card into whichever column is
   currently shortest, and redo it when widths or image heights change. */
function layout() {
  grid.querySelectorAll(".group-grid").forEach(wrap => {
    const cards = [...wrap.querySelectorAll(".card")];
    if (!cards.length) return;

    const fit = Math.max(1, Math.min(3, Math.floor(wrap.clientWidth / 330))) || 1;
    const n = Math.min(fit, cards.length); // never leave an empty column
    wrap.innerHTML = "";
    const cols = Array.from({ length: n }, () => {
      const d = document.createElement("div");
      d.className = "masonry-col";
      wrap.appendChild(d);
      return d;
    });

    cards.forEach(card => {
      const shortest = cols.reduce((a, b) => (a.offsetHeight <= b.offsetHeight ? a : b));
      shortest.appendChild(card);
    });
  });
}

/* images settle after layout runs, so measure again once they have */
function relayoutWhenSettled() {
  const imgs = [...grid.querySelectorAll("img")].filter(i => !i.complete);
  let left = imgs.length;
  if (!left) return;
  imgs.forEach(i => i.addEventListener("load", () => { if (--left === 0) layout(); },
                                        { once: true }));
  imgs.forEach(i => i.addEventListener("error", () => { if (--left === 0) layout(); },
                                        { once: true }));
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(layout, 150);
});

function renderNav(active) {
  groupnav.innerHTML = [["all", "All"], ...groupsPresent().map(g => [slug(g), g])]
    .map(([id, label]) => {
      const n = id === "all" ? PROJECTS.length : PROJECTS.filter(p => slug(p.group) === id).length;
      return `<button class="group-chip" data-target="${id}" aria-pressed="${id === active}">${esc(label)}<span>${n}</span></button>`;
    }).join("");
}

/* The nav selects which section is on the page. "All" shows every one. */
groupnav.addEventListener("click", e => {
  const btn = e.target.closest(".group-chip");
  if (!btn) return;
  activeGroup = btn.dataset.target;
  renderNav(activeGroup);
  render();
  document.querySelector(".controls").scrollIntoView({ behavior: "smooth", block: "start" });
});

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

renderNav("all");
render();
relayoutWhenSettled();

/* Cards are rendered by JS, so the browser has already given up on any #anchor
   in the URL by the time they exist. Re-resolve it after the first render —
   this is what the deep links in the GitHub profile README rely on. */
if (location.hash) {
  const wanted = decodeURIComponent(location.hash.slice(1));
  const owner = PROJECTS.find(p => slug(p.title) === wanted);
  if (owner) {
    activeGroup = slug(owner.group);
    renderNav(activeGroup);
    render();
  }
  const target = document.getElementById(wanted);
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
