/* =============================================================
   THE ONLY FILE YOU NEED TO EDIT TO ADD A PROJECT.

   Copy a block, change the fields, save, commit. That's it.

   fields:
     title    - name of the thing
     group    - which section it appears under (see GROUP_ORDER in app.js)
     org      - "viaNexus" | "Personal" | "Research" | "Open source"
     year     - string, shown on the card
     scale    - optional. size of the contribution, e.g. "25 merged PRs"
     blurb    - what it is and how it works. 2-4 sentences.
     result   - optional. a real, checkable outcome. leave it out if you don't
                have one — an empty slot beats a slogan.
     details  - optional. the specific pieces, behind a "What it covers" toggle
     stack    - array of tech, shown as small text
     media    - optional. { type: "video" | "image", src: "assets/...", alt: "..." }
     links    - array of { label, href }
   ============================================================= */

const PROJECTS = [

  /* ---------------- AI & Agents ---------------- */

  {
    title: "viaNexus MCP Server",
    group: "AI & Agents",
    org: "viaNexus",
    year: "2026—present",
    scale: "17 merged PRs",
    blurb:
      "The connector that lets Claude, ChatGPT and Cursor pull live market data — prices, fundamentals, estimates, news, symbology, macro — through the Model Context Protocol. I own the tool surface: how a model finds a dataset, what a fetch returns, and what it's told when something goes wrong. Ships to two production targets.",
    result: "Live in the Claude connector directory",
    details: [
      "Self-service symbol universe tools, so a user can define their own coverage",
      "Workspace resolution, so a fetch reaches the dataset the user actually named",
      "Search tuned to match datasets by the words that describe them",
      "Error semantics: not-found, subscription gap and auth failure each read distinctly",
      "Truncation disclosure when a response is capped to the newest records",
      "Deterministic row caps, and a cached OpenAPI fetch behind search",
    ],
    stack: ["Python", "MCP", "OAuth", "Cloud Run", "GKE"],
    media: { type: "video", src: "assets/media/claude-mcp-connector.mp4", alt: "Claude pulling live market data through the viaNexus MCP connector" },
    links: [
      { label: "Claude directory", href: "https://claude.ai/directory" },
      { label: "Docs", href: "https://console.blueskyapi.com/docs" }
    ]
  },
  {
    title: "8-K Classifier Agent",
    group: "AI & Agents",
    org: "viaNexus",
    year: "2025—2026",
    scale: "19 merged PRs · built from scratch",
    blurb:
      "A real-time classification service for SEC 8-K filings, mine end to end from first commit to production. Every 8-K declares its own item codes — 2.02 for results of operations, 5.02 for director changes — and SEC publishes those as structured metadata, so the agent reads that field directly: no HTML download, no regex, no LLM in the data path. It sweeps the daily index hourly, keys every write to the SEC accession number so reruns can't duplicate, and feeds the earnings calendar through a REST API.",
    result: "Classifies the whole S&P 500 in 30–40 requests per cycle",
    details: [
      "Rate-limited EDGAR client running under SEC's fair-access ceiling",
      "Incremental hourly sweep of the daily index, weekly full sweep for backfill",
      "Accession-keyed writes, so reruns are idempotent",
      "Exponential backoff and retry across the whole symbol universe",
      "REST API over the classified set, consumed by the earnings calendar",
    ],
    stack: ["Python", "FastAPI", "Redis", "Docker", "SEC EDGAR"],
    media: { type: "image", src: "assets/img/8k-classifier-agent.png", alt: "How the 8-K classifier agent decides a filing's type" },
    links: []
  },
  {
    title: "OpenBB × viaNexus Agent",
    group: "AI & Agents",
    org: "viaNexus",
    year: "2026",
    blurb:
      "A research workflow that lives inside OpenBB Workspace. A question asked in plain English routes through viaNexus over vAST, the agent picks the datasets it needs, and the answer comes back as a live widget rather than a wall of text — with the data access paid for autonomously through paygentic rather than a prearranged contract. I built the dynamic widget layer that lets the agent choose its own output format.",
    details: [
      "Dynamic widgets: the agent selects the output format per question",
      "vAST as the access layer, with entitlement-aware auth",
      "Autonomous payment on data delivery via paygentic",
    ],
    stack: ["Python", "FastAPI", "OpenBB", "LLM routing"],
    media: { type: "video", src: "assets/media/openbb-dashboard.mp4", alt: "OpenBB dashboard driven by the viaNexus agent" },
    links: [{ label: "OpenBB app marketplace", href: "https://openbb.co" }]
  },
  {
    title: "Financial Chat Agent",
    group: "AI & Agents",
    org: "viaNexus",
    year: "2026",
    blurb:
      "A chat agent that watches the market and emails you when something you care about happens — a death cross, an earnings move, a momentum break. I built the detection logic, the alert delivery, and the conversational front end.",
    stack: ["Python", "Redis", "LLMs", "SMTP"],
    media: { type: "video", src: "assets/media/paygentic-agent.mp4", alt: "Financial chat agent answering a market question" },
    links: []
  },
  {
    title: "Claude Skills for Market Data",
    group: "AI & Agents",
    org: "Open source",
    year: "2026",
    blurb:
      "Seven open-source Claude skills that turn the viaNexus API into things people actually want: a live market dashboard, an RSI screener, an earnings calendar, a portfolio monitor, a newswire analyst, transcript analysis, and a research agent.",
    stack: ["Claude Skills", "Python", "JavaScript"],
    media: { type: "image", src: "assets/img/claude-skills.png", alt: "How a Claude skill answers a market question" },
    links: []
  },
  {
    title: "Market News Bot",
    group: "AI & Agents",
    org: "Personal",
    year: "2026",
    scale: "5 merged PRs",
    blurb:
      "An automated account that reads the newswire and posts what's actually moving. It traces a causal chain from a news topic to the sectors it touched, confirms the move against price data before it says anything, and restricts breaking one-liners to peak market hours. The hard part wasn't posting — it was teaching it to stay quiet.",
    result: "Running hourly in production",
    details: [
      "Data-confirmed causal chain: topic → affected sectors",
      "End-of-day sector wrap and 200-day moving-average technicals",
      "Breaking one-liners capped at 5/hour, 9am–12pm ET only",
      "Retry on transient API timeouts",
    ],
    stack: ["Python", "X API", "LLMs", "Cloud Scheduler"],
    media: { type: "image", src: "assets/img/market-news-bot.png", alt: "How the bot decides whether to post" },
    links: [{ label: "@viaNexusHQ", href: "https://x.com/viaNexusHQ" }]
  },
  {
    title: "Cursor Plugin",
    group: "AI & Agents",
    org: "viaNexus",
    year: "2026",
    blurb:
      "Packaged the MCP server as a Cursor plugin so developers can query market data without leaving the editor, and submitted it to the community registry. Along the way I filed a fix for two rendering bugs in the registry itself.",
    stack: ["TypeScript", "MCP"],
    media: { type: "image", src: "assets/img/cursor-plugin.png", alt: "The MCP tool surface inside Cursor" },
    links: []
  },

  /* ---------------- Data Pipelines ---------------- */

  {
    title: "MT Newswires Pipeline",
    group: "Data Pipelines",
    org: "viaNexus",
    year: "2025—2026",
    scale: "25 merged PRs · built from scratch",
    blurb:
      "Global newswire ingestion, taken from nothing to production and still mine. Articles arrive over FTP and land as two curated datasets — Global and North America — through a pipeline that validates schema on the way in and on the way out, loads in batches over fresh connections, and normalizes every symbol against reference data before it writes. A separate backfill branch stages through GCS so history can be replayed without touching the live feed.",
    details: [
      "Ingress and egress schema validation with explicit key/subkey",
      "Incremental extraction, plus a configurable GCS-staged backfill branch",
      "Global and North America split into separate curated datasets",
      "Symbol normalization, including US class shares like BRK.B",
      "Exchange suffix resolution moved to a database-driven lookup",
      "Batch loading with timeouts, retries and fresh HTTP connections",
    ],
    stack: ["Python", "Airflow", "FTP", "GCS", "SingleStore"],
    media: { type: "video", src: "assets/media/mt-newswires.mp4", alt: "Querying MT Newswires data through Claude" },
    links: []
  },
  {
    title: "Earnings Calendar",
    group: "Data Pipelines",
    org: "viaNexus",
    year: "2025—2026",
    scale: "18 merged PRs · built from scratch",
    blurb:
      "The pipeline behind CORE/EARNINGS_CALENDAR, built and owned from the first commit. It predicts each company's next report date from its filing cadence, then confirms or corrects that prediction the moment the 8-K agent sees the real filing, tracking whether a date is predicted or actualized and how confident it is. It carries a pre/post-market session indicator, so you know whether a print lands before the open or after the close.",
    result: "467 symbols with confirmed sessions, up from 230",
    details: [
      "Prediction algorithm derived from each company's filing cadence",
      "Status tracking: predicted vs actualized, with a confidence score",
      "Confirmation from the 8-K agent, keyed to the quarterly release item",
      "Pre/post-market session indicator on every record",
      "Roll-forward so a lapsed prediction advances instead of freezing",
    ],
    stack: ["Python", "Airflow", "SingleStore", "Redis", "SEC 8-K"],
    media: { type: "video", src: "assets/media/earnings-calendar.mp4", alt: "Earnings calendar in use" },
    extra: { src: "assets/img/earnings-calendar.png", alt: "How regulatory signals become earnings schedules" },
    links: []
  },
  {
    title: "SEC Company Intelligence",
    group: "Data Pipelines",
    org: "viaNexus",
    year: "2025—2026",
    scale: "18 merged PRs · built from scratch",
    blurb:
      "An extraction pipeline that turns SEC filings into structured company profiles — business summary, CEO, website, employee count — using an LLM for the language work and hard validation for everything else. Built from the first commit, including the quality alerting that flags when S&P 500 coverage drops.",
    details: [
      "Business summary, CEO name, website and employee-count extraction",
      "S&P 500 coverage checks with quality alerting",
      "Schema validation and camelCase normalization on the Record API write",
      "Partial-failure tolerance, so one bad company doesn't end the run",
      "Model migration as upstream models were retired",
    ],
    stack: ["Python", "Airflow", "Gemini", "SEC EDGAR"],
    media: { type: "image", src: "assets/img/sec-company-intelligence.png", alt: "How SEC filings become structured company profiles" },
    links: []
  },
  {
    title: "CityFalcon News Pipeline",
    group: "Data Pipelines",
    org: "viaNexus",
    year: "2026",
    scale: "9 merged PRs · built from scratch",
    blurb:
      "Ingestion for a second news provider, built from scratch and then split into separate datasets for articles, sentiment and classification — so consumers subscribe to what they need instead of parsing one fat blob. Symbols are normalized and filtered on the way in, and every field is always present whether or not the source sent it.",
    details: [
      "Split into three datasets: articles, sentiment and classification",
      "Symbol normalization and ticker filtering on ingest",
      "Schema consistency, so every field is always present",
      "Staging and core workspaces kept separate through the cutover",
    ],
    stack: ["Python", "Airflow", "SingleStore"],
    media: { type: "image", src: "assets/img/cityfalcon-news-pipeline.png", alt: "One news feed split into three datasets" },
    links: []
  },
  {
    title: "Transcripts & Events Pipeline",
    group: "Data Pipelines",
    org: "viaNexus",
    year: "2026",
    scale: "6 merged PRs",
    blurb:
      "Earnings call transcripts and corporate events, ingested from Aiera on a schedule. The DAG paginates inside the API's real limits — a hard eight-week date ceiling and a 100-record page cap — and skips individual missing events rather than failing the batch, so one bad record never costs a full run.",
    stack: ["Python", "Airflow", "REST"],
    media: { type: "image", src: "assets/img/transcripts-events-pipeline.png", alt: "Paginating inside the API's real limits" },
    links: []
  },
  {
    title: "Company Stats & RSI-14",
    group: "Data Pipelines",
    org: "viaNexus",
    year: "2026",
    blurb:
      "A computed RSI-14 momentum field added to the company stats dataset, with seed convergence handled so the first values are correct rather than warming up in public — plus the screener that sits on top of it and sorts the whole universe by momentum off live data.",
    result: "Live in production",
    stack: ["Python", "SingleStore", "JavaScript"],
    media: { type: "video", src: "assets/media/rsi-screener.mp4", alt: "RSI-14 momentum screener" },
    links: []
  },

  /* ---------------- Platform & Infrastructure ---------------- */

  {
    title: "Scoped Access Tickets",
    group: "Platform & Infrastructure",
    org: "viaNexus",
    year: "2026",
    scale: "4 merged PRs",
    blurb:
      "A short-lived ticket system for dataset access. Every request mints a scoped, expiring ticket instead of passing an API key through the URL, which keeps long-lived credentials out of access logs, browser history, and anything else that records a query string.",
    details: [
      "Per-request tickets minted in place of long-lived pk_/sk_ keys",
      "Applied across dataset URLs, logo URLs and earnings prediction sources",
    ],
    stack: ["Node.js", "GCP", "Redis"],
    media: { type: "image", src: "assets/img/scoped-access-tickets.png", alt: "Short-lived tickets in place of long-lived keys" },
    links: []
  },
  {
    title: "Deploy & Observability",
    group: "Platform & Infrastructure",
    org: "viaNexus",
    year: "2026",
    scale: "4 merged PRs",
    blurb:
      "How the data platform ships and how it reports on itself. Airflow DAGs and the agent services build and release through Cloud Build triggers on GCP, and each running service publishes a health signal that synthetic checks exercise on a schedule, so a silent failure surfaces as an alert rather than as stale data nobody noticed.",
    details: [
      "Functional monitoring that exercises the MCP proxy end to end",
      "Health probes and alerting for the 8-K classifier agent",
      "Alert tuning so a single failed run stops paging for days",
      "Cloud Build triggers for build and deploy, separated",
    ],
    stack: ["GCP", "Cloud Build", "Kubernetes", "Docker", "Airflow"],
    media: { type: "image", src: "assets/img/deploy-observability.png", alt: "How the platform ships and reports on itself" },
    links: []
  },
  {
    title: "AI Discoverability & SEO",
    group: "Platform & Infrastructure",
    org: "viaNexus",
    year: "2026",
    scale: "7 merged PRs",
    blurb:
      "Making the platform legible to machines as well as people. A structured description written for AI crawlers tells them what the platform is, what it sells and where its canonical pages live, backed by a robots.txt tuned for the same audience and a sweep of the Search Console 404s that were bleeding link equity.",
    details: [
      "A structured crawler-facing description of products, principles and canonical pages",
      "robots.txt tuned for AI crawlers",
      "Search Console 404 sweep and theme build fixes",
      "Cursor MCP setup documentation",
    ],
    stack: ["Ghost", "Handlebars", "Search Console"],
    media: { type: "image", src: "assets/img/ai-discoverability-seo.png", alt: "Making the platform legible to machines" },
    links: []
  },

  /* ---------------- Research ---------------- */

  {
    title: "Chemical Abundances of Metal-Poor Stars",
    group: "Research",
    org: "Research",
    year: "2021—2023",
    scale: "M.S. thesis · 2 AAS presentations",
    blurb:
      "My master's work: measuring the chemical composition of very metal-poor stars that fall off the edge of the APOGEE survey's model grid. Automated pipelines refuse these stars — there is simply no grid underneath them — so I did the analysis star by star, synthesizing spectra with MOOG and fitting abundances where the survey's machinery gave up. The result is a method for reading the stars a large survey has to skip.",
    details: [
      "Thesis: A Boutique Chemical Abundance Analysis of Metal Poor Stars Beyond the APOGEE Metallicity Grid (2023)",
      "AAS 241: Boutique analysis of some very metal-poor stars off the edge of the APOGEE grid",
      "AAS 242: Working around the edges of Chemical Abundance Surveys using MOOG",
      "Spectral synthesis with MOOG; cleaning and validation of survey-scale spectra",
    ],
    stack: ["Python", "MOOG", "NumPy", "Matplotlib", "APOGEE"],
    media: { type: "image", src: "assets/img/chemical-abundances-of-metal-poor-stars.png", alt: "Analysing stars that fall off the APOGEE model grid" },
    links: [
      { label: "Thesis (DOI)", href: "https://doi.org/10.46569/xk81js97p" },
      { label: "ORCiD", href: "https://orcid.org/0009-0005-8998-5049" }
    ]
  },
  {
    title: "Particle Detector Calibration",
    group: "Research",
    org: "Research",
    year: "2018",
    blurb:
      "Undergraduate research at CSU Stanislaus: calibrating particle detectors with multimeters and oscilloscopes, then writing the Python that turned their raw output into something analyzable. The first time I built a cleaning and validation step because the data demanded one — the same instinct the market data work runs on now.",
    stack: ["Python", "Oscilloscopes", "Data validation"],
    media: { type: "image", src: "assets/img/particle-detector-calibration.png", alt: "Detector calibration and validation pipeline" },
    links: []
  },
];
