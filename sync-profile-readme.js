/* Regenerates the project table for the GitHub profile README from projects.js.
   Usage:  node sync-profile-readme.js ../astrodil-profile/README.md
   Rewrites everything between the <!--projects--> and <!--/projects--> markers. */
const fs = require("fs");
const src = fs.readFileSync(`${__dirname}/projects.js`, "utf8");
eval(src.replace("const PROJECTS", "global.PROJECTS"));

const slug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const site = "https://astrodil-git.github.io";
const short = b => {
  let t = b.split(/(?<=\.)\s/)[0].replace(/\s+/g, " ").replace(/\.$/, "");
  if (t.length <= 88) return t;
  t = t.slice(0, 88);
  return t.slice(0, t.lastIndexOf(" ")).replace(/[,:—-]$/, "") + "…";
};

const rows = PROJECTS.map(
  p => `| [**${p.title}**](${site}/#${slug(p.title)}) | ${short(p.blurb)} | ${(p.stack || []).slice(0, 3).join(" · ")} |`
).join("\n");

const table = `<!--projects-->\n\n| Project | What it is | Stack |\n|---|---|---|\n${rows}\n\n<!--/projects-->`;

const target = process.argv[2];
const out = fs.readFileSync(target, "utf8").replace(/<!--projects-->[\s\S]*?<!--\/projects-->/, table);
fs.writeFileSync(target, out);
console.log(`updated ${target} with ${PROJECTS.length} projects`);
