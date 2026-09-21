/* Renders the project grid from projects.js. No build step, no dependencies. */

const grid = document.getElementById("grid");
const filters = document.getElementById("filters");

const allTags = [...new Set(PROJECTS.flatMap(p => p.tags))].sort();
let active = "All";

function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
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

function slug(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
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
      ${links ? `<div class="card-links">${links}</div>` : ""}
      <p class="stack">${(p.stack || []).map(esc).join(" · ")}</p>
    </div>
  </article>`;
}

function render() {
  const shown = active === "All" ? PROJECTS : PROJECTS.filter(p => p.tags.includes(active));
  grid.innerHTML = shown.map(cardHTML).join("");
  wireVideos();
}

function renderFilters() {
  filters.innerHTML = ["All", ...allTags]
    .map(t => `<button class="chip" aria-pressed="${t === active}" data-tag="${esc(t)}">${esc(t)}</button>`)
    .join("");
}

filters.addEventListener("click", e => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  active = btn.dataset.tag;
  renderFilters();
  render();
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

renderFilters();
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
