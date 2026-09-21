/* =============================================================
   THE ONLY FILE YOU NEED TO EDIT TO ADD A PROJECT.

   Copy a block, change the fields, save, commit. That's it.

   fields:
     title    - name of the thing
     org      - "viaNexus" | "Personal" | "Research" | "Open source"
     year     - string, shown on the card
     tags     - array, powers the filter chips at the top
     blurb    - 1-3 sentences. what it is and what it does.
     result   - optional. the number or outcome. shown in bold.
     stack    - array of tech, shown as small text
     media    - optional. { type: "video" | "image", src: "assets/...", alt: "..." }
     links    - array of { label, href }
   ============================================================= */

const PROJECTS = [
  {
    title: "viaNexus MCP Server",
    org: "viaNexus",
    year: "2025—present",
    tags: ["AI", "Infrastructure"],
    blurb:
      "The connector that lets Claude, ChatGPT and Cursor pull live market data — prices, fundamentals, estimates, news, symbology, macro — through the Model Context Protocol. I built the tool surface, the auth layer, and the deploy path across two production targets.",
    result: "Live in the Claude connector directory",
    stack: ["Python", "MCP", "OAuth", "Cloud Run", "GKE"],
    media: { type: "video", src: "assets/media/claude-mcp-connector.mp4", alt: "Claude pulling live market data through the viaNexus MCP connector" },
    links: [
      { label: "Claude directory", href: "https://claude.ai/directory" },
      { label: "Docs", href: "https://docs.vianexus.com" }
    ]
  },
  {
    title: "OpenBB × viaNexus Agent",
    org: "viaNexus",
    year: "2025",
    tags: ["AI", "Dashboards"],
    blurb:
      "A multi-agent research workflow inside OpenBB Workspace. Ask a question in plain English, the agent routes it across viaNexus datasets, and the answer comes back as a live widget rather than a wall of text.",
    stack: ["Python", "FastAPI", "OpenBB", "LLM routing"],
    media: { type: "video", src: "assets/media/openbb-dashboard.mp4", alt: "OpenBB dashboard driven by the viaNexus agent" },
    links: [{ label: "OpenBB app marketplace", href: "https://openbb.co" }]
  },
  {
    title: "Agentic Workflow Architecture",
    org: "viaNexus",
    year: "2025",
    tags: ["AI", "Infrastructure"],
    blurb:
      "The design behind the agent stack: modular workers that each own one job — fetch, classify, summarize, alert — composed into workflows instead of one monolithic prompt. Easier to test, cheaper to run, and you can see where an answer came from.",
    stack: ["Python", "Redis", "Kafka", "LLMs"],
    media: { type: "image", src: "assets/img/agentic-architecture.png", alt: "Diagram of the modular agentic workflow" }
  },
  {
    title: "SEC 8-K Classifier",
    org: "viaNexus",
    year: "2025",
    tags: ["Pipelines", "AI"],
    blurb:
      "Rewrote 8-K classification to read the filing's own declared item codes from EDGAR instead of guessing with an LLM over scraped HTML. Same job, deterministic, and it stopped silently mislabeling filings.",
    result: "Replaced LLM guessing with the source of truth",
    stack: ["Python", "Airflow", "EDGAR", "Redis"],
    links: []
  },
  {
    title: "Earnings Calendar Pipeline",
    org: "viaNexus",
    year: "2025",
    tags: ["Pipelines"],
    blurb:
      "Untangled a calendar that was quietly freezing: symbols stuck on stale predicted dates, missing pre/post-market sessions, hundreds of orphaned rows. Traced it end to end, shipped the fixes, and backfilled the history.",
    result: "467 symbols with confirmed sessions, up from 230",
    stack: ["Python", "Airflow", "SingleStore", "SEC 8-K"],
    media: { type: "image", src: "assets/img/earnings-calendar.png", alt: "Earnings calendar widget" },
    links: [{ label: "Demo", href: "https://astrodil-git.github.io/dilpreet.kaur.earningCalDemo.github.io/" }]
  },
  {
    title: "Financial Chat Agent",
    org: "viaNexus",
    year: "2025",
    tags: ["AI"],
    blurb:
      "A chat agent that watches the market and emails you when something you care about happens — a death cross, an earnings move, a momentum break. Built the detection logic, the alert delivery, and the conversational front end.",
    stack: ["Python", "Redis", "LLMs", "SMTP"],
    media: { type: "video", src: "assets/media/paygentic-agent.mp4", alt: "Financial chat agent answering a market question" },
    links: []
  },
  {
    title: "RSI-14 Momentum Screener",
    org: "viaNexus",
    year: "2025",
    tags: ["Pipelines", "Dashboards"],
    blurb:
      "Added a computed RSI-14 field to the company stats pipeline and shipped the screener that sits on top of it — sort the whole universe by momentum, in the browser, off live data.",
    result: "Live in production",
    stack: ["Python", "SingleStore", "JavaScript"],
    media: { type: "video", src: "assets/media/rsi-screener.mp4", alt: "RSI-14 momentum screener" },
    links: []
  },
  {
    title: "Claude Skills for Market Data",
    org: "Open source",
    year: "2025",
    tags: ["AI", "Open source"],
    blurb:
      "Seven open-source Claude skills that turn the viaNexus API into things people actually want: a live market dashboard, an RSI screener, an earnings calendar, a portfolio monitor, a newswire analyst, transcript analysis, and a research agent.",
    stack: ["Markdown", "Python", "Claude Skills"],
    media: { type: "video", src: "assets/media/finchat-dashboard.mp4", alt: "Live market dashboard generated by a Claude skill" },
    links: []
  },
  {
    title: "Cursor Plugin",
    org: "viaNexus",
    year: "2025",
    tags: ["AI", "Open source", "Infrastructure"],
    blurb:
      "Packaged the MCP server as a Cursor plugin so developers can query market data without leaving the editor. Shipped the listing and an upstream fix to the community registry's renderer along the way.",
    stack: ["TypeScript", "MCP"],
    links: [{ label: "cursor.directory", href: "https://cursor.directory" }]
  },
  {
    title: "Data Platform Deploys",
    org: "viaNexus",
    year: "2025",
    tags: ["Infrastructure", "Pipelines"],
    blurb:
      "Airflow on GCP: Cloud Build triggers, containerized DAG deploys, and the unglamorous work of making a deploy step fail loudly instead of silently succeeding.",
    stack: ["GCP", "Cloud Build", "Kubernetes", "Docker", "Airflow"],
    media: { type: "video", src: "assets/media/deploying-airflow.mp4", alt: "Airflow deploy" }
  },
  {
    title: "Market News Bot",
    org: "Personal",
    year: "2025",
    tags: ["AI"],
    blurb:
      "An hourly bot that reads the newswire, decides what's actually breaking, and posts a one-line take. The hard part wasn't posting — it was teaching it to stay quiet when nothing happened.",
    result: "Running hourly in production",
    stack: ["Python", "X API", "LLMs", "Cloud Scheduler"],
    links: []
  },
  {
    title: "Access Ticket Rewrite",
    org: "viaNexus",
    year: "2026",
    tags: ["Infrastructure"],
    blurb:
      "Dataset URLs used to carry long-lived API keys in the query string, which meant every key was sitting in access logs and browser history. Replaced them with short-lived, scoped access tickets minted per request.",
    result: "Long-lived keys out of URLs entirely",
    stack: ["Node.js", "GCP", "Redis"],
    links: []
  },
  {
    title: "CityFalcon News Pipeline",
    org: "viaNexus",
    year: "2026",
    tags: ["Pipelines"],
    blurb:
      "Built the ingestion for a news provider from scratch, then split it into three clean datasets — articles, sentiment, and classification — so consumers could subscribe to what they actually needed instead of parsing one fat blob.",
    stack: ["Python", "Airflow", "SingleStore"],
    links: []
  },
  {
    title: "MT Newswires Feed",
    org: "viaNexus",
    year: "2026",
    tags: ["Pipelines", "Infrastructure"],
    blurb:
      "FTP ingestion for a global newswire: batch loading with retries and fresh connections, a configurable backfill path staged through GCS, and cleanup that fails gracefully instead of taking the whole task down.",
    stack: ["Python", "Airflow", "FTP", "GCS"],
    links: []
  },
  {
    title: "Exchange Symbology",
    org: "viaNexus",
    year: "2026",
    tags: ["Pipelines"],
    blurb:
      "Newswire tickers arrived with provider-specific exchange suffixes that quietly mapped to the wrong markets — Frankfurt, Madrid and Istanbul all landing somewhere else. Replaced the hardcoded table with a database-driven MIC lookup so the mapping has one source of truth.",
    stack: ["Python", "SingleStore", "ISO 10383"],
    links: []
  },
  {
    title: "Transcripts & Events Pipeline",
    org: "viaNexus",
    year: "2026",
    tags: ["Pipelines"],
    blurb:
      "Earnings call transcripts and corporate events from Aiera. Most of the work was learning the API's undocumented edges — a hard eight-week date ceiling and a page-size cap — and making the DAG respect them instead of silently truncating.",
    stack: ["Python", "Airflow", "REST"],
    links: []
  },
  {
    title: "MCP Monitoring & Alerting",
    org: "viaNexus",
    year: "2026",
    tags: ["Infrastructure"],
    blurb:
      "Synthetic monitoring that actually exercises the MCP proxy end to end, plus health probes for the classifier agent. Also fixed the alerting itself, which was paging for days off a single failed run.",
    stack: ["Python", "GCP Monitoring", "Terraform"],
    links: []
  },
  {
    title: "MCP Error Semantics",
    org: "viaNexus",
    year: "2026",
    tags: ["AI", "Infrastructure"],
    blurb:
      "A run of fixes so the connector tells the truth: a missing dataset returns not-found instead of permission-denied, a subscription gap reads differently from an auth failure, and a truncated response says it was truncated. Small changes that stop an AI assistant from confidently reporting the wrong thing.",
    stack: ["Python", "MCP", "OAuth"],
    links: []
  },
  {
    title: "AI Crawler & SEO Work",
    org: "viaNexus",
    year: "2026",
    tags: ["Infrastructure"],
    blurb:
      "Made the marketing site legible to machines as well as people: an llms.txt route, a robots.txt tuned for AI crawlers, and a sweep of the Search Console 404s that were bleeding link equity.",
    stack: ["Ghost", "Handlebars", "Search Console"],
    links: [{ label: "vianexus.com", href: "https://vianexus.com" }]
  },
  {
    title: "Stellar Spectra Analysis",
    org: "Research",
    year: "2021—2023",
    tags: ["Research"],
    blurb:
      "M.S. thesis work on APOGEE survey data: modeled synthetic stellar spectra, built the cleaning and validation pipeline for large astronomical datasets, and presented the results at astrophysics conferences. Same problem as market data, different sky.",
    stack: ["Python", "NumPy", "Matplotlib", "scikit-learn"],
    media: { type: "image", src: "assets/img/perf-chart.png", alt: "Time series analysis chart" },
    links: [{ label: "ORCiD", href: "https://orcid.org/0009-0005-8998-5049" }]
  }
];
