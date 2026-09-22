# astrodil-git.github.io

My portfolio. Plain HTML/CSS/JS, no build step, served by GitHub Pages.

Live at **https://astrodil-git.github.io**

## Adding a project

Everything lives in [`projects.js`](projects.js). Copy an existing block, change the fields, commit.
The filter chips at the top of the page build themselves from whatever `tags` you use.

```js
{
  title: "The Thing",
  org: "viaNexus",              // viaNexus | Personal | Research | Open source
  year: "2025",
  tags: ["AI", "Pipelines"],    // becomes a filter chip automatically
  blurb: "What it is and what it does, in one to three sentences.",
  result: "The number or the outcome.",   // optional, renders highlighted
  stack: ["Python", "Redis"],
  media: { type: "video", src: "assets/media/thing.mp4", alt: "..." },  // optional
  links: [{ label: "Live", href: "https://..." }]
}
```

## Adding a screenshot or demo clip

Drop images in `assets/img/` and clips in `assets/media/`, then point `media.src` at them.

Run raw recordings through `./compress.sh <input> <output-name>` first — it resizes to 1280px wide,
strips audio, and re-encodes to a web-sized mp4. A 76 MB screen-capture GIF comes out around 3 MB.

```bash
./compress.sh ~/Desktop/my-recording.mov new-demo.mp4
```

Videos autoplay muted on scroll and pause when they leave the viewport, so keep them short and loopable.

## Deploying

Push to `main`. GitHub Pages serves it within a minute. No CI, nothing to break.

```bash
git add -A && git commit -m "add project" && git push
```

## Custom domain (optional)

Add a `CNAME` file containing your domain, then point a `CNAME` DNS record at `astrodil-git.github.io`.

## Changing CSS or JS

Run `./bump.sh` before committing. It stamps a version onto the `styles.css` and
`*.js` links in `index.html` so browsers and the GitHub Pages CDN fetch the new
file instead of serving a stale cached copy.
