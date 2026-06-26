import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const brand = "Sparky's Ready";
const siteUrl = "https://www.sparkysready.com";
const supportEmail = "support@sparkysready.com";
const brandIcon = "assets/brand/sparkys-ready-world-icon.png";
const headerIcon = "assets/brand/sparkys-ready-header-icon.png";

const navItems = [
  ["apprentices", "Apprentices", "apprentices/"],
  ["employers", "Employers", "employers/"],
  ["workflow", "Workflow", "profiling/"],
  ["learning", "Learning", "learning-quizzes/"],
  ["targets", "Targets", "family/"],
  ["pricing", "Pricing", "pricing/"],
];

const utilityItems = [
  ["support", "Support", "support/"],
  ["legal", "Legal", "legal/"],
];

const targets = [
  {
    id: "sparkys-ready-au",
    name: "Capstone Ready",
    region: "Australia",
    status: "Live target",
    pathway: "Australian electrical apprenticeship readiness",
    email: "capstone@sparkysready.com",
    icon: "assets/targets/capstone-ready-icon.png",
    description:
      "The Australia target in the Sparky's Ready family, built for electrical apprenticeship readiness, revision, progress visibility, evidence organisation, and workplace-linked support.",
  },
  {
    id: "am2-ready",
    name: "AM2 Ready",
    region: "United Kingdom",
    status: "Live target",
    pathway: "AM2 and AM2S preparation",
    email: "am2@sparkysready.com",
    icon: "assets/targets/am2-ready-icon.png",
    description:
      "A UK-focused preparation target for learners moving through electrical competence, assessment readiness, revision, and evidence-aware workflows.",
  },
  {
    id: "journeyman-ready",
    name: "Journeyman Ready",
    region: "United States",
    status: "Live target",
    pathway: "Apprentice-to-journeyman progression",
    email: "journeyman@sparkysready.com",
    icon: "assets/targets/journeyman-ready-icon.png",
    description:
      "A US pathway target for exam preparation, apprenticeship progress, documented experience, and practical readiness planning.",
  },
  {
    id: "red-seal-ready",
    name: "Red Seal Ready",
    region: "Canada",
    status: "In build",
    pathway: "Red Seal exam readiness",
    email: "redseal@sparkysready.com",
    icon: "assets/targets/red-seal-ready-icon.png",
    description:
      "A Canadian target shaped around trade exam readiness, evidence confidence, skills review, and clear next steps for learners and supervisors.",
  },
  {
    id: "ewrb-ready",
    name: "EWRB Ready",
    region: "New Zealand",
    status: "In build",
    pathway: "Registration and competence support",
    email: "ewrb@sparkysready.com",
    icon: "assets/targets/ewrb-ready-icon.png",
    description:
      "A New Zealand target designed for registration-aware learning, workplace evidence, compliance confidence, and professional readiness.",
  },
  {
    id: "solas-ready",
    name: "SOLAS Electrical Ready",
    region: "Ireland",
    status: "In build",
    pathway: "Electrical apprenticeship progression",
    email: "solas@sparkysready.com",
    icon: "assets/targets/solas-ready-icon.png",
    description:
      "An Ireland-focused target for apprenticeship learning, on-the-job development, structured progress, and preparation support.",
  },
  {
    id: "sparkys-pro",
    name: "Sparky's Pro",
    region: "Global",
    status: "In build",
    pathway: "Professional development",
    email: "sparkyspro@sparkysready.com",
    icon: "assets/targets/sparkys-pro-icon.png",
    description:
      "A global professional target for electricians who want ongoing skills development, better records, and sharper work-readiness habits.",
  },
];

const screenshots = {
  learn: "assets/screenshots/learn-phone.png",
  quiz: "assets/screenshots/quiz-session-phone.png",
  profile: "assets/screenshots/profiling-tablet.png",
  progress: "assets/screenshots/progress-tablet.png",
  settings: "assets/screenshots/settings-phone.png",
};

function write(file, contents) {
  const fullPath = join(root, file);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, contents);
}

function rel(depth, target = "") {
  const base = "../".repeat(depth);
  return target ? `${base}${target}` : base || "./";
}

function canonical(route = "") {
  return `${siteUrl}/${route}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function navLink(depth, item, active) {
  const [id, label, href] = item;
  const isActive = id === active;
  return `<a class="nav-link${isActive ? " is-active" : ""}" href="${rel(depth, href)}"${
    isActive ? ' aria-current="page"' : ""
  }>${label}</a>`;
}

function targetIconRow(depth) {
  return `<div class="target-icon-row" aria-label="Supported target icons">
    ${targets
      .map(
        (target) => `<figure class="target-icon-tile">
        <img src="${rel(depth, target.icon)}" alt="${escapeHtml(target.name)} icon" />
        <figcaption>${escapeHtml(target.name)}</figcaption>
      </figure>`,
      )
      .join("\n")}
  </div>`;
}

function targetCards(depth) {
  return `<div class="target-grid">
    ${targets
      .map(
        (target) => `<article class="target-card" id="${target.id}">
        <div class="target-card__top">
          <img src="${rel(depth, target.icon)}" alt="${escapeHtml(target.name)} app icon" />
          <div>
            <span class="eyebrow-small">${escapeHtml(target.region)}</span>
            <h3>${escapeHtml(target.name)}</h3>
          </div>
        </div>
        <p>${escapeHtml(target.description)}</p>
        <dl class="target-meta">
          <div><dt>Status</dt><dd>${escapeHtml(target.status)}</dd></div>
          <div><dt>Focus</dt><dd>${escapeHtml(target.pathway)}</dd></div>
          <div><dt>Email</dt><dd><a href="mailto:${target.email}">${escapeHtml(target.email)}</a></dd></div>
        </dl>
      </article>`,
      )
      .join("\n")}
  </div>`;
}

function cardGrid(cards, columns = "three") {
  return `<div class="card-grid card-grid--${columns}">
    ${cards
      .map(
        (card) => `<article class="content-card">
        <span class="eyebrow-small">${escapeHtml(card.kicker)}</span>
        <h3>${escapeHtml(card.title)}</h3>
        <p>${escapeHtml(card.body)}</p>
      </article>`,
      )
      .join("\n")}
  </div>`;
}

function featureList(items) {
  return `<ul class="feature-list">
    ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n")}
  </ul>`;
}

function supportRouteCards() {
  return `<div class="support-grid">
        <article class="support-card support-card--general"><h3>General support</h3><p>For Sparky's Ready account access, website issues, billing questions, privacy routing, and anything that does not fit a single target.</p><a href="mailto:${supportEmail}">${supportEmail}</a></article>
        ${targets
          .map((target) => {
            const regionLabel = target.region === "Global" ? "global" : target.region;
            return `<article class="support-card"><h3>${escapeHtml(target.name)}</h3><p>${escapeHtml(
              `For ${regionLabel} questions about ${target.name}, app access, target availability, and pathway support.`,
            )}</p><a href="mailto:${target.email}">${escapeHtml(target.email)}</a></article>`;
          })
          .join("\n")}
      </div>`;
}

function screenshotPanel(depth, image, title, body, modifier = "") {
  const isPhone = modifier.includes("phone");
  const rows = isPhone
    ? ["Readiness check", "Practice set", "Review notes", "Next action"]
    : ["Evidence record", "Learning progress", "Supervisor review", "Export package", "Readiness signal"];
  return `<figure class="screen-panel ${modifier}">
    <div class="mock-ui ${isPhone ? "mock-ui--phone" : "mock-ui--tablet"}" role="img" aria-label="${escapeHtml(title)}">
      <div class="mock-ui__bar">
        <span></span>
        <strong>Sparky's Ready</strong>
        <em>${isPhone ? "Mobile" : "Workspace"}</em>
      </div>
      <div class="mock-ui__hero">
        <span>${escapeHtml(title)}</span>
        <strong>${isPhone ? "84%" : "Ready"}</strong>
      </div>
      <div class="mock-ui__rows">
        ${rows
          .map(
            (row, index) => `<div class="mock-ui__row">
          <span>${escapeHtml(row)}</span>
          <i style="--row:${index + 1}"></i>
        </div>`,
          )
          .join("\n")}
      </div>
    </div>
    <figcaption>
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(body)}</span>
    </figcaption>
  </figure>`;
}

function section({ tone = "", eyebrow, title, body, content }) {
  return `<section class="section ${tone}">
    <div class="shell">
      <div class="section-header">
        <div>
          <span class="eyebrow">${escapeHtml(eyebrow)}</span>
          <h2>${escapeHtml(title)}</h2>
        </div>
        <p>${escapeHtml(body)}</p>
      </div>
      ${content}
    </div>
  </section>`;
}

function pageHero({ eyebrow, title, body, actions = "" }) {
  return `<section class="page-hero">
    <div class="shell page-hero__inner">
      <span class="eyebrow">${escapeHtml(eyebrow)}</span>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(body)}</p>
      ${actions}
    </div>
  </section>`;
}

function actions(items) {
  return `<div class="action-row">
    ${items
      .map(
        (item, index) =>
          `<a class="button ${index === 0 ? "button--primary" : "button--secondary"}" href="${item.href}">${escapeHtml(
            item.label,
          )}</a>`,
      )
      .join("\n")}
  </div>`;
}

function layout({ file, route = "", depth = 0, active = "", title, description, body, bodyClass = "" }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: brand,
        url: siteUrl,
        email: supportEmail,
      },
      {
        "@type": "WebSite",
        name: brand,
        url: siteUrl,
      },
      ...targets.map((target) => ({
        "@type": "SoftwareApplication",
        name: target.name,
        applicationCategory: "EducationApplication",
        operatingSystem: "iOS",
        description: target.description,
      })),
    ],
  };

  write(
    file,
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="theme-color" content="#111820" />
  <link rel="canonical" href="${canonical(route)}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${brand}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonical(route)}" />
  <meta property="og:image" content="${siteUrl}/${brandIcon}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${siteUrl}/${brandIcon}" />
  <link rel="icon" href="${rel(depth, "favicon.ico")}" sizes="any" />
  <link rel="icon" type="image/png" sizes="32x32" href="${rel(depth, "assets/brand/sparkys-ready-favicon-32.png")}" />
  <link rel="icon" type="image/png" sizes="192x192" href="${rel(depth, "assets/brand/sparkys-ready-icon-192.png")}" />
  <link rel="apple-touch-icon" sizes="180x180" href="${rel(depth, "assets/brand/sparkys-ready-icon-180.png")}" />
  <link rel="stylesheet" href="${rel(depth, "styles.css")}" />
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body class="${bodyClass}">
  <a class="skip-link" href="#content">Skip to content</a>
  <header class="site-header" data-menu-open="false">
    <div class="shell site-header__inner">
      <a class="brand-lockup" href="${rel(depth)}" aria-label="Sparky's Ready home">
        <img class="brand-icon" src="${rel(depth, headerIcon)}" alt="" aria-hidden="true" />
        <span class="brand-copy">
          <strong>Sparky's Ready</strong>
          <span>Global electrical readiness platform</span>
        </span>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <div class="nav-wrap" id="site-nav">
        <nav class="primary-nav" aria-label="Primary">
          <a class="nav-link${active === "home" ? " is-active" : ""}" href="${rel(depth)}"${
            active === "home" ? ' aria-current="page"' : ""
          }>Home</a>
          ${navItems.map((item) => navLink(depth, item, active)).join("\n")}
        </nav>
        <nav class="utility-nav" aria-label="Support and legal">
          ${utilityItems.map((item) => navLink(depth, item, active)).join("\n")}
        </nav>
      </div>
    </div>
  </header>
  <main id="content">
${body}
  </main>
  <footer class="site-footer">
    <div class="shell footer-grid">
      <div class="footer-brand">
        <img class="brand-icon brand-icon--footer" src="${rel(depth, headerIcon)}" alt="" aria-hidden="true" />
        <div>
          <h2>Sparky's Ready</h2>
          <p>Professional learning, evidence, revision, and readiness tools for electrical pathways around the world.</p>
        </div>
      </div>
      <div>
        <h3>Product</h3>
        <a href="${rel(depth, "apprentices/")}">Apprentices</a>
        <a href="${rel(depth, "employers/")}">Employers</a>
        <a href="${rel(depth, "profiling/")}">Workflow</a>
        <a href="${rel(depth, "learning-quizzes/")}">Learning</a>
      </div>
      <div>
        <h3>Company</h3>
        <a href="${rel(depth, "family/")}">Targets</a>
        <a href="${rel(depth, "about/")}">About</a>
        <a href="${rel(depth, "pricing/")}">Pricing</a>
        <a href="${rel(depth, "support/")}">Support</a>
      </div>
      <div>
        <h3>Legal</h3>
        <a href="${rel(depth, "legal/")}">Legal centre</a>
        <a href="${rel(depth, "privacy/")}">Privacy</a>
        <a href="${rel(depth, "terms/")}">Terms</a>
        <a href="${rel(depth, "disclaimer/")}">Disclaimer</a>
      </div>
    </div>
    <div class="shell footer-meta">
      <span>Training, revision, evidence, and workflow support only.</span>
      <span>Official licensing, certification, workplace, and provider decisions remain with the relevant authority.</span>
      <span>Effective website update: 26 June 2026</span>
    </div>
  </footer>
  <script src="${rel(depth, "site.js")}" defer></script>
</body>
</html>
`,
  );
}

function homePage() {
  layout({
    file: "index.html",
    route: "",
    depth: 0,
    active: "home",
    title: "Sparky's Ready | Global electrical readiness platform",
    description:
      "Sparky's Ready brings electrical learning, evidence, revision, progress, and employer-linked readiness tools into one professional global platform family.",
    bodyClass: "page-home",
    body: `
<section class="hero">
  <div class="shell hero__grid">
    <div class="hero__copy">
      <span class="eyebrow">Global electrical readiness</span>
      <h1>Sparky's Ready</h1>
      <p class="hero-lede">A professional platform family for electrical apprentices, learners, supervisors, employers, and training teams across multiple regions.</p>
      ${actions([
        { label: "Explore the targets", href: "family/" },
        { label: "See the workflow", href: "profiling/" },
      ])}
      <div class="hero-proof">
        <span>7 target brands</span>
        <span>Evidence-first workflow</span>
        <span>Built for global pathways</span>
      </div>
    </div>
    <figure class="hero-brand-art" aria-label="Sparky's Ready global target family icon">
      <img src="${rel(0, brandIcon)}" alt="Sparky's Ready Earth icon with target app icons around it" />
    </figure>
  </div>
</section>

<section class="metric-strip">
  <div class="shell metric-grid">
    <div><strong>Global</strong><span>Region-aware product targets</span></div>
    <div><strong>Practical</strong><span>Evidence, revision, progress, and reminders</span></div>
    <div><strong>Professional</strong><span>Clear support, legal, and privacy pathways</span></div>
  </div>
</section>

${section({
  tone: "section--white",
  eyebrow: "What the platform does",
  title: "One product system for the messy middle of electrical training.",
  body:
    "Learners do not just study. They collect evidence, track progress, prepare for assessment, ask for reviews, and try to stay organised while working. The site now presents that complete workflow clearly.",
  content: cardGrid(
    [
      {
        kicker: "Evidence",
        title: "Keep records and supporting material organised",
        body:
          "Evidence workflows help learners and supervisors understand what has been captured, what still needs attention, and where review fits.",
      },
      {
        kicker: "Learning",
        title: "Make revision part of the wider readiness picture",
        body:
          "Learning and quiz flows sit alongside progress and evidence rather than feeling like a disconnected study app.",
      },
      {
        kicker: "Readiness",
        title: "Turn progress into clear next steps",
        body:
          "Dashboard-led guidance, reminders, and employer-linked actions help people return to the right task faster.",
      },
    ],
    "three",
  ),
})}

${section({
  tone: "section--ink",
  eyebrow: "Targets",
  title: "Built for multiple electrical pathways, not one local term.",
  body:
    "The family now supports every current target icon and presents each region with neutral, professional language for an international audience.",
  content: targetCards(0),
})}

<section class="section section--paper">
  <div class="shell split">
    <div>
      <span class="eyebrow">Product experience</span>
      <h2>Designed to feel trustworthy before anyone signs in.</h2>
      <p>The public website should make the product feel serious, practical, and globally understandable. It explains what is available, what is in build, and what the platform does not replace.</p>
      ${featureList([
        "Clear product pages for learners, employers, workflow, learning, pricing, support, and legal.",
        "All target icons appear with fixed, non-cropping image treatment.",
        "Global brand language replaces region-specific terminology across the site.",
        "Legal and support routes are visible, plain, and easy to find.",
      ])}
      ${actions([{ label: "Read about the platform", href: "about/" }, { label: "Open support", href: "support/" }])}
    </div>
    <div class="media-stack">
      ${screenshotPanel(0, screenshots.progress, "Progress visibility", "A clearer way to see movement across learning and workflow.", "screen-panel--tablet")}
      ${screenshotPanel(0, screenshots.settings, "Account control", "Support, settings, and trust pathways stay close to the product.", "screen-panel--phone")}
    </div>
  </div>
</section>

${section({
  tone: "section--white",
  eyebrow: "For every audience",
  title: "Learners, supervisors, employers, and training teams all need a different level of clarity.",
  body:
    "The new site separates the audience stories while keeping one consistent platform message.",
  content: cardGrid(
    [
      {
        kicker: "Apprentices",
        title: "Know what to do next",
        body:
          "Use guided learning, evidence organisation, revision, reminders, and progress signals to stay ready without juggling scattered systems.",
      },
      {
        kicker: "Employers",
        title: "Review work with cleaner context",
        body:
          "Support apprentices with better visibility, practical review flows, and clearer boundaries around formal obligations.",
      },
      {
        kicker: "Training teams",
        title: "Reduce confusion around readiness",
        body:
          "Use a product story that respects regional requirements while staying honest about the app's training and support role.",
      },
    ],
    "three",
  ),
})}

<section class="cta-band">
  <div class="shell">
    <span class="eyebrow">Professional global launch surface</span>
    <h2>Show the whole Sparky's Ready family with confidence.</h2>
    <p>The website now speaks to an international audience, shows every target, and keeps the product promise practical.</p>
    ${actions([{ label: "View the target family", href: "family/" }, { label: "Read the legal centre", href: "legal/" }])}
  </div>
</section>
`,
  });
}

function standardPage({ file, route, depth = 1, active, title, description, hero, sections, cta }) {
  layout({
    file,
    route,
    depth,
    active,
    title,
    description,
    body: `
${pageHero(hero)}
${sections.join("\n")}
${cta || ""}
`,
  });
}

homePage();

standardPage({
  file: "apprentices/index.html",
  route: "apprentices/",
  active: "apprentices",
  title: "For Apprentices | Sparky's Ready",
  description:
    "Sparky's Ready helps electrical apprentices organise evidence, learning, revision, progress, reminders, and workplace-linked readiness.",
  hero: {
    eyebrow: "For apprentices",
    title: "Stay organised while you build real electrical readiness.",
    body:
      "The apprentice experience is built around clarity: what to learn, what to practise, what evidence to keep, and what needs action next.",
    actions: actions([
      { label: "Explore workflow", href: "../profiling/" },
      { label: "See learning", href: "../learning-quizzes/" },
    ]),
  },
  sections: [
    section({
      tone: "section--white",
      eyebrow: "Daily workflow",
      title: "A cleaner place to return to when training gets busy.",
      body:
        "The platform is designed to reduce scattered notes, missed reminders, and uncertainty around readiness.",
      content: cardGrid(
        [
          {
            kicker: "Next step",
            title: "Dashboard-led re-entry",
            body:
              "Return to learning, evidence, progress, or review tasks without hunting through unrelated tools.",
          },
          {
            kicker: "Evidence",
            title: "Keep work records close to readiness",
            body:
              "Evidence support helps learners keep proof, notes, and review context connected to the path they are on.",
          },
          {
            kicker: "Practice",
            title: "Learn and revise in context",
            body:
              "Learning and quiz pathways support preparation without pretending to replace formal instruction or assessment.",
          },
        ],
        "three",
      ),
    }),
    `<section class="section section--paper"><div class="shell split"><div><span class="eyebrow">Apprentice tools</span><h2>Everything points back to momentum.</h2><p>Clear progress matters. The product helps apprentices see what they have done, what needs review, and where to focus next.</p>${featureList([
      "Learning modules and quiz sessions for structured revision.",
      "Evidence and workflow support for records that need review.",
      "Reminders and progress signals that reduce last-minute panic.",
      "Target-specific language for each regional pathway.",
    ])}</div><div class="media-stack">${screenshotPanel(
      1,
      screenshots.learn,
      "Learning on mobile",
      "Topic-based revision designed for apprentices in motion.",
      "screen-panel--phone",
    )}${screenshotPanel(1, screenshots.quiz, "Practice sessions", "Focused checks help learners prepare with intent.", "screen-panel--phone")}</div></div></section>`,
  ],
});

standardPage({
  file: "employers/index.html",
  route: "employers/",
  active: "employers",
  title: "For Employers | Sparky's Ready",
  description:
    "Sparky's Ready gives employers and supervisors clearer ways to support learner progress, evidence review, and readiness conversations.",
  hero: {
    eyebrow: "For employers",
    title: "Support apprentices with clearer context and less admin noise.",
    body:
      "Employers and supervisors need practical visibility, not vague claims. Sparky's Ready helps organise the work around progress, evidence, review, and support.",
    actions: actions([
      { label: "View workflow", href: "../profiling/" },
      { label: "Contact support", href: "../support/" },
    ]),
  },
  sections: [
    section({
      tone: "section--white",
      eyebrow: "Employer value",
      title: "Review and support work with better structure.",
      body:
        "The employer story is built around real-world clarity: what was captured, what needs review, and what the app can and cannot do.",
      content: cardGrid(
        [
          {
            kicker: "Visibility",
            title: "Progress signals that are easier to discuss",
            body:
              "Help learners understand where momentum is building and where a conversation, reminder, or review may be needed.",
          },
          {
            kicker: "Review",
            title: "Evidence-aware workflows",
            body:
              "Keep supporting material and review context closer to the readiness journey.",
          },
          {
            kicker: "Boundaries",
            title: "Formal obligations remain clear",
            body:
              "The product supports training and workflow clarity. It does not replace workplace, provider, regulator, or licensing decisions.",
          },
        ],
        "three",
      ),
    }),
  ],
});

standardPage({
  file: "profiling/index.html",
  route: "profiling/",
  active: "workflow",
  title: "Evidence Workflow | Sparky's Ready",
  description:
    "Explore how Sparky's Ready keeps evidence, records, progress, approvals, and readiness support in one structured electrical training workflow.",
  hero: {
    eyebrow: "Evidence workflow",
    title: "Bring records, evidence, progress, and review into one flow.",
    body:
      "The workflow surface helps learners and supervisors understand what has been captured, what is still draft, and what needs attention next.",
    actions: actions([{ label: "For apprentices", href: "../apprentices/" }, { label: "For employers", href: "../employers/" }]),
  },
  sections: [
    `<section class="section section--paper"><div class="shell split"><div><span class="eyebrow">Workflow design</span><h2>Built for practical evidence and readiness.</h2><p>Records, attachments, review state, reminders, and progress cues should reinforce each other instead of splitting the learner across separate tools.</p>${featureList([
      "Evidence capture and record organisation.",
      "Progress views that separate drafts from completed work.",
      "Support for supervisor and employer-linked review paths.",
      "Export and support pathways where required by the app experience.",
    ])}</div><div class="media-stack">${screenshotPanel(
      1,
      screenshots.profile,
      "Structured evidence workspace",
      "A larger working surface for records, evidence, and progress.",
      "screen-panel--tablet",
    )}</div></div></section>`,
    section({
      tone: "section--white",
      eyebrow: "Trust",
      title: "The workflow supports the process without overclaiming.",
      body:
        "Sparky's Ready is a preparation and organisation tool. It helps people work more clearly while keeping official decisions with the right authority.",
      content: cardGrid(
        [
          {
            kicker: "Clear",
            title: "Draft and completed work should not feel the same",
            body:
              "The product direction keeps formal records, drafts, and progress state understandable.",
          },
          {
            kicker: "Linked",
            title: "Evidence and revision stay connected",
            body:
              "Readiness improves when learners can see how practice, records, and next steps relate.",
          },
          {
            kicker: "Practical",
            title: "Built for site and study pressure",
            body:
              "The product language is direct, trade-aware, and useful for people working while they learn.",
          },
        ],
        "three",
      ),
    }),
  ],
});

standardPage({
  file: "learning-quizzes/index.html",
  route: "learning-quizzes/",
  active: "learning",
  title: "Learning and Practice | Sparky's Ready",
  description:
    "Sparky's Ready connects learning, revision, quizzes, progress, and target-specific readiness support for electrical pathways.",
  hero: {
    eyebrow: "Learning and practice",
    title: "Revision works better when it is connected to the bigger readiness picture.",
    body:
      "Learning and quiz flows help learners focus on the topics that matter while keeping progress, reminders, and target-specific context nearby.",
    actions: actions([{ label: "View pricing", href: "../pricing/" }, { label: "Explore targets", href: "../family/" }]),
  },
  sections: [
    section({
      tone: "section--white",
      eyebrow: "Learning model",
      title: "Structured practice without the generic study-app feel.",
      body:
        "Electrical learners need revision that respects the pathway they are actually preparing for.",
      content: cardGrid(
        [
          {
            kicker: "Modules",
            title: "Learn by topic",
            body:
              "Topic-led learning makes it easier to build confidence before moving into deeper practice.",
          },
          {
            kicker: "Quizzes",
            title: "Practise with purpose",
            body:
              "Quiz sessions support recall, review, and preparation without making unsupported promises.",
          },
          {
            kicker: "Progress",
            title: "Keep feedback visible",
            body:
              "Progress and readiness cues help learners understand what to revisit next.",
          },
        ],
        "three",
      ),
    }),
    `<section class="section section--paper"><div class="shell split"><div><span class="eyebrow">Product preview</span><h2>Mobile-first where learners need it.</h2><p>Learning and practice screens are designed for quick, repeated use, while larger workflows support deeper evidence and progress work.</p></div><div class="media-stack">${screenshotPanel(
      1,
      screenshots.learn,
      "Learning workspace",
      "Modules and topics designed around readiness.",
      "screen-panel--phone",
    )}${screenshotPanel(1, screenshots.quiz, "Quiz session", "Practice flows that support review.", "screen-panel--phone")}</div></div></section>`,
  ],
});

standardPage({
  file: "pricing/index.html",
  route: "pricing/",
  active: "pricing",
  title: "Pricing | Sparky's Ready",
  description:
    "Understand Sparky's Ready free access, optional premium access, regional availability, and app-store billing boundaries.",
  hero: {
    eyebrow: "Pricing",
    title: "Simple access, clear billing boundaries, no inflated promises.",
    body:
      "Pricing and availability can vary by target, platform, region, and release stage. Purchases are handled inside the app through the relevant app-store billing flow.",
    actions: actions([{ label: "Billing terms", href: "../subscriptions/" }, { label: "Get support", href: "../support/" }]),
  },
  sections: [
    section({
      tone: "section--white",
      eyebrow: "Access",
      title: "Start with the product, upgrade only where a premium lane is offered.",
      body:
        "The site explains the model without pretending every target has the same paid catalogue at the same time.",
      content: `<div class="pricing-grid">
        <article class="price-card"><span class="eyebrow-small">Included</span><h3>Free access</h3><p>Core app access, support, legal information, account settings, and available learning or workflow features for the relevant target.</p>${featureList([
          "Use available app features before purchasing.",
          "Support and legal pathways remain accessible.",
          "Availability varies by target and release stage.",
        ])}</article>
        <article class="price-card price-card--featured"><span class="eyebrow-small">Optional</span><h3>Premium access</h3><p>Where offered, premium unlocks additional revision, practice, or readiness features through in-app purchase or subscription.</p>${featureList([
          "Billed by the relevant app store.",
          "Restore and cancellation rules follow store policy.",
          "Content availability may differ across regions.",
        ])}</article>
        <article class="price-card"><span class="eyebrow-small">Teams</span><h3>Employer support</h3><p>Employer and supervisor workflows focus on clearer review and support. Larger team access should be confirmed with support before rollout.</p>${featureList([
          "Contact support for team questions.",
          "No formal outcome is guaranteed.",
          "Official obligations remain external.",
        ])}</article>
      </div>`,
    }),
  ],
});

standardPage({
  file: "family/index.html",
  route: "family/",
  active: "targets",
  title: "Target Family | Sparky's Ready",
  description:
    "See every Sparky's Ready target, including Australia, the United Kingdom, the United States, Canada, New Zealand, Ireland, and global professional development.",
  hero: {
    eyebrow: "Target family",
    title: "One global platform, multiple electrical pathways.",
    body:
      "The target family is built so each region can speak its own training language while still sharing one professional product foundation.",
    actions: actions([{ label: "Contact support", href: "../support/" }, { label: "Read about us", href: "../about/" }]),
  },
  sections: [
    section({
      tone: "section--ink",
      eyebrow: "All targets",
      title: "Every current icon and target is represented.",
      body:
        "The icons are shown with contain-based sizing, fixed dimensions, and no cropping so the full family presents cleanly across screen sizes.",
      content: targetCards(1),
    }),
    section({
      tone: "section--white",
      eyebrow: "Global architecture",
      title: "Region-specific where it matters, consistent where it counts.",
      body:
        "Each target can carry its own pathway, language, and release stage while the website, legal centre, and support model remain coherent.",
      content: cardGrid(
        [
          {
            kicker: "Shared",
            title: "One trust layer",
            body:
              "Privacy, terms, support, billing, and training-use boundaries are easy to reach from every page.",
          },
          {
            kicker: "Regional",
            title: "Local pathway language",
            body:
              "Targets can reflect regional assessment, registration, and apprenticeship structures without forcing one country's terminology on the world.",
          },
          {
            kicker: "Scalable",
            title: "Room for more targets",
            body:
              "The site is structured so future target brands can be added without redesigning the entire public presence.",
          },
        ],
        "three",
      ),
    }),
  ],
});

standardPage({
  file: "about/index.html",
  route: "about/",
  active: "about",
  title: "About | Sparky's Ready",
  description:
    "Learn why Sparky's Ready exists and how it supports electrical readiness, evidence, learning, progress, and employer-linked workflows.",
  hero: {
    eyebrow: "About",
    title: "Built for the people doing the work while they learn.",
    body:
      "Sparky's Ready exists because electrical training is practical, high-pressure, and different across regions. The platform brings learning, evidence, progress, and support into one clearer system.",
    actions: actions([{ label: "View targets", href: "../family/" }, { label: "Open legal centre", href: "../legal/" }]),
  },
  sections: [
    section({
      tone: "section--white",
      eyebrow: "Principles",
      title: "Professional, practical, and honest about boundaries.",
      body:
        "The platform is designed to support readiness while respecting official training, licensing, workplace, and provider responsibilities.",
      content: cardGrid(
        [
          {
            kicker: "Practical",
            title: "Built around work, not just study",
            body:
              "Electrical learners need tools that fit around job sites, supervisors, records, deadlines, and revision.",
          },
          {
            kicker: "Global",
            title: "Multiple pathways, one standard",
            body:
              "The brand needs to make sense to users across regions without leaning on local-only terminology.",
          },
          {
            kicker: "Trustworthy",
            title: "Clear about what the product does",
            body:
              "The site avoids exaggerated outcome claims and keeps legal, support, and privacy pathways visible.",
          },
        ],
        "three",
      ),
    }),
  ],
});

standardPage({
  file: "support/index.html",
  route: "support/",
  active: "support",
  title: "Support | Sparky's Ready",
  description:
    "Get support for Sparky's Ready accounts, billing, privacy requests, evidence uploads, app access, and target-specific questions.",
  hero: {
    eyebrow: "Support",
    title: "Get the right help path without guessing.",
    body:
      "Use support for account access, billing questions, target availability, privacy requests, evidence upload concerns, and app issues.",
    actions: actions([{ label: `Email ${supportEmail}`, href: `mailto:${supportEmail}` }, { label: "Privacy requests", href: "../data-rights/" }]),
  },
  sections: [
    section({
      tone: "section--white",
      eyebrow: "Support routes",
      title: "Send the question to the clearest inbox.",
      body:
        "Each target now has a working Sparky's Ready address. Include the target name, device, app version if available, and a short description of the issue.",
      content: supportRouteCards(),
    }),
    section({
      tone: "section--paper",
      eyebrow: "Before contacting",
      title: "A few details make support much faster.",
      body:
        "Screenshots are useful, but avoid sending sensitive personal, payment, or official identity documents unless support specifically asks through an approved route.",
      content: cardGrid(
        [
          {
            kicker: "Access",
            title: "Sign-in or account issue",
            body:
              "Tell support the email used for the account and the target app you are using.",
          },
          {
            kicker: "Billing",
            title: "Purchase or restore question",
            body:
              "Most billing controls sit with the app store account that made the purchase.",
          },
          {
            kicker: "Evidence",
            title: "Upload or record concern",
            body:
              "Describe the target, record type, and what went wrong without sending unnecessary private material.",
          },
        ],
        "three",
      ),
    }),
  ],
});

function legalSectionsPage({ file, route, active = "legal", title, description, heroTitle, intro, sections }) {
  standardPage({
    file,
    route,
    active,
    title,
    description,
    hero: {
      eyebrow: "Legal and trust",
      title: heroTitle,
      body: intro,
      actions: actions([{ label: "Legal centre", href: "../legal/" }, { label: "Contact support", href: "../support/" }]),
    },
    sections: [
      `<section class="section section--white"><div class="shell legal-copy">${sections
        .map(
          (entry) => `<article class="legal-block"><h2>${escapeHtml(entry.title)}</h2>${entry.paragraphs
            .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
            .join("\n")}</article>`,
        )
        .join("\n")}</div></section>`,
    ],
  });
}

standardPage({
  file: "legal/index.html",
  route: "legal/",
  active: "legal",
  title: "Legal Centre | Sparky's Ready",
  description:
    "Find Sparky's Ready privacy, terms, billing, data rights, uploads, evidence, and training-use legal information.",
  hero: {
    eyebrow: "Legal centre",
    title: "Clear product-aware legal information.",
    body:
      "The legal centre explains privacy, terms, billing, evidence uploads, data rights, and training-use boundaries in one place.",
    actions: actions([{ label: "Privacy", href: "../privacy/" }, { label: "Terms", href: "../terms/" }]),
  },
  sections: [
    section({
      tone: "section--white",
      eyebrow: "Legal pages",
      title: "Everything important stays visible.",
      body:
        "These pages support trust for global visitors without hiding critical terms in tiny footer text.",
      content: `<div class="legal-card-grid">
        ${[
          ["Privacy", "How account, support, app, usage, and request data may be handled.", "../privacy/"],
          ["Terms", "Rules for using the website, apps, accounts, content, and support surfaces.", "../terms/"],
          ["Disclaimer", "Training-use boundaries and what Sparky's Ready does not replace.", "../disclaimer/"],
          ["Billing", "Premium access, app-store billing, restores, cancellations, and availability.", "../subscriptions/"],
          ["Data rights", "How to request access, correction, deletion, or privacy support.", "../data-rights/"],
          ["Uploads and evidence", "Guidance for learner records, files, evidence, and acceptable uploads.", "../uploads-evidence/"],
        ]
          .map(
            ([name, body, href]) =>
              `<article class="content-card"><span class="eyebrow-small">Legal</span><h3>${name}</h3><p>${body}</p><a class="text-link" href="${href}">Read ${name.toLowerCase()}</a></article>`,
          )
          .join("\n")}
      </div>`,
    }),
  ],
});

legalSectionsPage({
  file: "privacy/index.html",
  route: "privacy/",
  title: "Privacy Policy | Sparky's Ready",
  description:
    "Read how Sparky's Ready handles account data, app usage, support requests, evidence workflows, billing state, and privacy requests.",
  heroTitle: "Privacy policy",
  intro:
    "This policy explains how Sparky's Ready handles personal information across the website, apps, support, billing state, and privacy requests.",
  sections: [
    {
      title: "Information we may collect",
      paragraphs: [
        "We may collect account details, support messages, app settings, device and diagnostics information, purchase entitlement state, learning activity, progress signals, and evidence workflow information that you choose to enter or upload.",
        "Do not upload official identity documents, payment details, or highly sensitive files unless the app or support process clearly asks for them through an approved route.",
      ],
    },
    {
      title: "How information is used",
      paragraphs: [
        "Information is used to provide the app, maintain accounts, support learning and readiness workflows, respond to support requests, manage subscriptions or entitlements, improve reliability, and protect the platform from misuse.",
        "The product is not a government, regulator, employer, or training-provider decision system.",
      ],
    },
    {
      title: "Sharing and service providers",
      paragraphs: [
        "Sparky's Ready may rely on hosting, analytics, app-store billing, email, storage, authentication, diagnostics, and support providers. These providers are used to operate the service and are not intended to replace your official training or workplace systems.",
      ],
    },
    {
      title: "Privacy requests",
      paragraphs: [
        `For access, correction, deletion, or privacy support, email ${supportEmail} with the target app name and the account email involved.`,
      ],
    },
  ],
});

legalSectionsPage({
  file: "terms/index.html",
  route: "terms/",
  title: "Terms of Use | Sparky's Ready",
  description:
    "Read the Sparky's Ready terms for website use, app access, accounts, learning content, evidence workflows, support, and acceptable use.",
  heroTitle: "Terms of use",
  intro:
    "These terms apply to the Sparky's Ready website, app family, accounts, support channels, learning content, evidence workflows, and related product surfaces.",
  sections: [
    {
      title: "Training and support use",
      paragraphs: [
        "Sparky's Ready provides learning, revision, evidence organisation, progress, and workflow support. It does not guarantee assessment results, licensing outcomes, employment outcomes, registration, certification, or provider acceptance.",
      ],
    },
    {
      title: "Accounts and acceptable use",
      paragraphs: [
        "You are responsible for keeping account access secure and for using the service lawfully. Do not upload unlawful, misleading, harmful, infringing, or unnecessary sensitive material.",
      ],
    },
    {
      title: "Content and availability",
      paragraphs: [
        "Features, content, pricing, and targets may change by region, release stage, platform, and app-store availability. Some targets or premium lanes may be in build or unavailable.",
      ],
    },
    {
      title: "Support",
      paragraphs: [
        `For support, email ${supportEmail}. Support cannot make official licensing, employer, regulator, or training-provider decisions for you.`,
      ],
    },
  ],
});

legalSectionsPage({
  file: "disclaimer/index.html",
  route: "disclaimer/",
  title: "Disclaimer | Sparky's Ready",
  description:
    "Read the Sparky's Ready training-use disclaimer and limitations around official outcomes, workplace obligations, and regional requirements.",
  heroTitle: "Training-use disclaimer",
  intro:
    "Sparky's Ready helps people prepare, organise, revise, and understand progress. It is not an official decision-maker.",
  sections: [
    {
      title: "No official outcome guarantee",
      paragraphs: [
        "The platform does not guarantee pass results, licensing, registration, employment, certification, credit, sign-off, or acceptance by any authority, provider, employer, or workplace.",
      ],
    },
    {
      title: "Regional requirements vary",
      paragraphs: [
        "Electrical training and assessment requirements differ by country, state, province, provider, employer, and regulator. Always confirm current requirements with the relevant official source.",
      ],
    },
    {
      title: "Workplace safety",
      paragraphs: [
        "The platform does not replace supervision, site rules, electrical safety law, workplace policies, or professional judgement.",
      ],
    },
  ],
});

legalSectionsPage({
  file: "subscriptions/index.html",
  route: "subscriptions/",
  title: "Billing and Entitlements | Sparky's Ready",
  description:
    "Read Sparky's Ready billing, subscription, premium access, restore, cancellation, and regional availability information.",
  heroTitle: "Billing and entitlements",
  intro:
    "Premium access, where offered, is handled through the relevant app-store purchase flow and may vary by target, platform, region, and release stage.",
  sections: [
    {
      title: "Purchases and restores",
      paragraphs: [
        "In-app purchases and subscriptions are controlled by the store account that made the purchase. Use the app restore flow or the relevant app-store account tools if access does not appear correctly.",
      ],
    },
    {
      title: "Cancellations and refunds",
      paragraphs: [
        "Cancellation and refund options are normally handled by the app store or payment provider. Sparky's Ready support can help identify the target and entitlement state, but cannot override store policies.",
      ],
    },
    {
      title: "Availability",
      paragraphs: [
        "Premium content may differ between targets and may change as product releases are updated. If a premium lane is not visible inside your app, contact support before purchasing anything elsewhere.",
      ],
    },
  ],
});

legalSectionsPage({
  file: "data-rights/index.html",
  route: "data-rights/",
  title: "Data Rights | Sparky's Ready",
  description:
    "Request access, correction, deletion, export, or privacy support for Sparky's Ready account and app data.",
  heroTitle: "Data rights",
  intro:
    "You can contact Sparky's Ready for privacy support, data access, correction, deletion, or account-related data questions.",
  sections: [
    {
      title: "Making a request",
      paragraphs: [
        `Email ${supportEmail} with the target app name, account email, request type, and enough detail to locate the relevant account.`,
      ],
    },
    {
      title: "Verification",
      paragraphs: [
        "Support may need to verify account control before acting on a privacy or deletion request. Do not send sensitive identity documents unless support specifically asks through an approved process.",
      ],
    },
    {
      title: "Limits",
      paragraphs: [
        "Some information may need to be retained for security, legal, billing, audit, fraud-prevention, or platform integrity reasons where allowed by law.",
      ],
    },
  ],
});

legalSectionsPage({
  file: "uploads-evidence/index.html",
  route: "uploads-evidence/",
  title: "Uploads and Evidence | Sparky's Ready",
  description:
    "Read guidance for Sparky's Ready evidence uploads, file handling, acceptable use, learner records, and workplace-sensitive material.",
  heroTitle: "Uploads and evidence",
  intro:
    "Evidence workflows are there to help learners organise supporting material. They are not a substitute for official provider, employer, regulator, or workplace requirements.",
  sections: [
    {
      title: "Use appropriate files",
      paragraphs: [
        "Only upload material you have the right to use and that is relevant to your learning, evidence, or workflow. Avoid unnecessary sensitive information, confidential workplace material, or third-party personal data.",
      ],
    },
    {
      title: "No automatic approval",
      paragraphs: [
        "An upload inside the app does not mean an employer, supervisor, provider, authority, or regulator has accepted it. Formal acceptance must come from the relevant official process.",
      ],
    },
    {
      title: "Misuse",
      paragraphs: [
        "Do not upload unlawful, harmful, misleading, infringing, unsafe, or abusive content. Support may restrict access or remove material where needed to protect the service.",
      ],
    },
  ],
});

layout({
  file: "404.html",
  route: "404.html",
  depth: 0,
  active: "",
  title: "Page Not Found | Sparky's Ready",
  description: "The page could not be found on Sparky's Ready.",
  body: `${pageHero({
    eyebrow: "404",
    title: "This page is not available.",
    body:
      "The link may have moved during the global site rebuild. Use the main navigation to continue.",
    actions: actions([{ label: "Go home", href: "./" }, { label: "Open support", href: "support/" }]),
  })}`,
});

function redirectPage(file, depth, destination, title = "Redirecting | Sparky's Ready") {
  write(
    file,
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta http-equiv="refresh" content="0; url=${rel(depth, destination)}" />
  <link rel="canonical" href="${canonical(destination)}" />
  <link rel="stylesheet" href="${rel(depth, "styles.css")}" />
</head>
<body>
  <main class="redirect-page">
    <p>Redirecting to <a href="${rel(depth, destination)}">${brand}</a>.</p>
  </main>
</body>
</html>
`,
  );
}

redirectPage("privacy.html", 0, "privacy/");
redirectPage("terms.html", 0, "terms/");
redirectPage("support.html", 0, "support/");
redirectPage("legal/privacy.html", 1, "privacy/");
redirectPage("legal/terms.html", 1, "terms/");
redirectPage("legal/disclaimer.html", 1, "disclaimer/");
redirectPage("legal/subscriptions.html", 1, "subscriptions/");
redirectPage("legal/data-rights.html", 1, "data-rights/");
redirectPage("legal/uploads-evidence.html", 1, "uploads-evidence/");
redirectPage("legal/support.html", 1, "support/");

write(
  "email-signature.html",
  `<!doctype html>
<html lang="en">
<head><meta charset="utf-8" /><title>Sparky's Ready Email Signature</title></head>
<body>
  <table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;color:#111820">
    <tr>
      <td style="padding:0 14px 0 0">
        <div style="width:48px;height:48px;border-radius:10px;background:#111820;color:#fff;display:grid;place-items:center;font-weight:800">SR</div>
      </td>
      <td>
        <strong style="font-size:16px">Sparky's Ready</strong><br />
        <span style="font-size:13px;color:#5c6570">Global electrical readiness platform</span><br />
        <a href="${siteUrl}" style="font-size:13px;color:#0057d8">${siteUrl.replace("https://", "")}</a>
      </td>
    </tr>
  </table>
</body>
</html>
`,
);

write(
  "robots.txt",
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
);

const sitemapRoutes = [
  "",
  "apprentices/",
  "employers/",
  "profiling/",
  "learning-quizzes/",
  "pricing/",
  "family/",
  "about/",
  "support/",
  "legal/",
  "privacy/",
  "terms/",
  "disclaimer/",
  "subscriptions/",
  "data-rights/",
  "uploads-evidence/",
];

write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes.map((route) => `  <url><loc>${canonical(route)}</loc></url>`).join("\n")}
</urlset>
`,
);

write(
  "README.md",
  `# Sparky's Ready website

Static GitHub Pages website for the global Sparky's Ready product family.

The public site is generated from \`tools/build-site.mjs\` and published as plain HTML, CSS, JavaScript, and image assets.
`,
);

write("CNAME", "www.sparkysready.com\n");

write(
  "site.js",
  `document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".menu-toggle");
  if (!header || !toggle) return;

  function closeMenu() {
    header.setAttribute("data-menu-open", "false");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    var next = header.getAttribute("data-menu-open") === "true" ? "false" : "true";
    header.setAttribute("data-menu-open", next);
    toggle.setAttribute("aria-expanded", next);
  });

  header.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });
});
`,
);

write(
  "styles.css",
  `:root {
  color-scheme: light;
  --ink: #111820;
  --ink-2: #27313d;
  --muted: #5c6570;
  --paper: #f6f5ef;
  --paper-2: #ece8dc;
  --surface: #ffffff;
  --line: #d8dde3;
  --line-strong: #b9c2cd;
  --blue: #0057d8;
  --blue-soft: #e8f0ff;
  --green: #0f8a5f;
  --green-soft: #e9f7ef;
  --amber: #f4b000;
  --amber-soft: #fff5d7;
  --red: #c73d32;
  --violet: #6c4ce0;
  --shadow: 0 18px 44px rgba(17, 24, 32, 0.12);
  --shadow-soft: 0 10px 24px rgba(17, 24, 32, 0.08);
  --radius: 8px;
  --shell: min(1180px, calc(100vw - 32px));
  --font-body: Inter, "SF Pro Text", "Avenir Next", "Segoe UI", Arial, sans-serif;
  --font-display: "Avenir Next", Inter, "Segoe UI", Arial, sans-serif;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-body);
  line-height: 1.58;
}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(rgba(17, 24, 32, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(17, 24, 32, 0.045) 1px, transparent 1px);
  background-size: 56px 56px;
  opacity: 0.42;
  mask-image: linear-gradient(180deg, #000 0%, transparent 62%);
}
img { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
p, h1, h2, h3, dl { margin: 0; }
.shell { width: var(--shell); margin-inline: auto; }
.skip-link {
  position: absolute;
  left: 16px;
  top: -64px;
  z-index: 1000;
  padding: 12px 14px;
  background: var(--ink);
  color: white;
  border-radius: var(--radius);
  font-weight: 800;
}
.skip-link:focus { top: 16px; }

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(246, 245, 239, 0.92);
  border-bottom: 1px solid rgba(17, 24, 32, 0.12);
  backdrop-filter: blur(18px);
}
.site-header__inner {
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}
.brand-lockup {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-width: 220px;
}
.brand-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  object-fit: contain;
  background: #0c2138;
  padding: 2px;
  box-shadow: 0 8px 22px rgba(17, 24, 32, 0.14);
}
.brand-icon--footer { width: 52px; height: 52px; flex: 0 0 auto; }
.brand-copy strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1rem;
  line-height: 1.1;
}
.brand-copy span {
  display: block;
  margin-top: 2px;
  color: var(--muted);
  font-size: 0.79rem;
}
.nav-wrap,
.primary-nav,
.utility-nav {
  display: flex;
  align-items: center;
  gap: 6px;
}
.nav-wrap { gap: 16px; }
.nav-link {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0 10px;
  border-radius: var(--radius);
  color: var(--ink-2);
  font-size: 0.91rem;
  font-weight: 700;
}
.nav-link:hover,
.nav-link.is-active {
  background: var(--surface);
  color: var(--blue);
  box-shadow: inset 0 0 0 1px var(--line);
}
.menu-toggle {
  display: none;
  min-height: 40px;
  padding: 0 12px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--ink);
  font: inherit;
  font-weight: 800;
}
.nav-link:focus-visible,
.button:focus-visible,
.text-link:focus-visible,
.menu-toggle:focus-visible,
.footer-grid a:focus-visible {
  outline: 3px solid rgba(0, 87, 216, 0.35);
  outline-offset: 3px;
}

.hero {
  position: relative;
  background: linear-gradient(135deg, #111820 0%, #1b2430 55%, #243042 100%);
  color: white;
}
.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(380px, 0.9fr);
  gap: clamp(28px, 5vw, 72px);
  align-items: center;
  padding: clamp(56px, 8vw, 92px) 0 clamp(38px, 6vw, 72px);
}
.hero h1 {
  margin-top: 8px;
  font-family: var(--font-display);
  font-size: clamp(4rem, 8vw, 7.6rem);
  line-height: 0.9;
  letter-spacing: 0;
  max-width: 8ch;
}
.hero-lede {
  margin-top: 22px;
  max-width: 58ch;
  color: #dce5ef;
  font-size: clamp(1.08rem, 1.7vw, 1.28rem);
}
.eyebrow,
.eyebrow-small {
  display: inline-flex;
  align-items: center;
  color: var(--blue);
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.hero .eyebrow,
.section--ink .eyebrow {
  color: #84b6ff;
}
.eyebrow-small { color: var(--green); font-size: 0.72rem; }
.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 16px;
  border-radius: var(--radius);
  border: 1px solid transparent;
  font-weight: 850;
}
.button--primary {
  background: var(--amber);
  color: #161107;
}
.button--secondary {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.22);
  color: inherit;
}
.page-hero .button--secondary,
.section--white .button--secondary,
.section--paper .button--secondary {
  background: var(--surface);
  border-color: var(--line);
  color: var(--ink);
}
.hero-proof {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}
.hero-proof span {
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius);
  color: #dce5ef;
  font-size: 0.86rem;
  font-weight: 750;
}
.target-icon-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}
.target-icon-tile {
  width: 78px;
  margin: 0;
  display: grid;
  justify-items: center;
  gap: 8px;
}
.target-icon-tile img {
  width: 64px;
  height: 64px;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.22);
}
.target-icon-tile figcaption {
  color: currentColor;
  opacity: 0.82;
  font-size: 0.72rem;
  font-weight: 760;
  line-height: 1.15;
  text-align: center;
}
.hero-brand-art {
  margin: 0;
  justify-self: center;
  width: min(100%, 620px);
  filter: drop-shadow(0 38px 86px rgba(0, 0, 0, 0.36));
}
.hero-brand-art img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.visual-board {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 190px;
  grid-template-rows: auto auto;
  gap: 16px;
  align-items: start;
}
.screen-panel {
  margin: 0;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius);
  background: #0c1117;
  padding: 10px;
  box-shadow: 0 26px 60px rgba(0, 0, 0, 0.3);
}
.screen-panel img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 5px;
  background: #f6f5ef;
}
.mock-ui {
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 12px;
  padding: 14px;
  border-radius: 5px;
  background:
    linear-gradient(135deg, rgba(0, 87, 216, 0.08), transparent 42%),
    #f8fafc;
  color: var(--ink);
}
.mock-ui__bar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
  min-height: 34px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dce3ec;
}
.mock-ui__bar span {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: var(--ink);
}
.mock-ui__bar strong {
  font-size: 0.78rem;
}
.mock-ui__bar em {
  color: var(--muted);
  font-style: normal;
  font-size: 0.72rem;
  font-weight: 800;
}
.mock-ui__hero {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 14px;
  border-radius: var(--radius);
  background: var(--blue-soft);
  border: 1px solid #cfdbf4;
}
.mock-ui__hero span {
  color: var(--ink-2);
  font-weight: 850;
}
.mock-ui__hero strong {
  color: var(--blue);
}
.mock-ui__rows {
  display: grid;
  gap: 9px;
  align-content: start;
}
.mock-ui__row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 34%;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius);
  background: white;
  border: 1px solid #e2e7ee;
}
.mock-ui__row span {
  min-width: 0;
  color: var(--ink-2);
  font-size: 0.78rem;
  font-weight: 760;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mock-ui__row i {
  height: 8px;
  width: calc(42% + var(--row) * 9%);
  justify-self: end;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--green), var(--blue));
}
.mock-ui--phone {
  aspect-ratio: 0.56;
  gap: 10px;
  padding: 12px;
}
.mock-ui--tablet {
  aspect-ratio: 4 / 3;
}
.mock-ui--phone .mock-ui__bar {
  grid-template-columns: auto 1fr;
}
.mock-ui--phone .mock-ui__bar em {
  display: none;
}
.mock-ui--phone .mock-ui__hero {
  display: grid;
  gap: 4px;
}
.mock-ui--phone .mock-ui__row {
  grid-template-columns: 1fr;
}
.mock-ui--phone .mock-ui__row i {
  width: 100%;
  justify-self: stretch;
}
.screen-panel figcaption {
  display: grid;
  gap: 2px;
  padding: 10px 2px 0;
}
.screen-panel figcaption strong {
  font-size: 0.9rem;
}
.screen-panel figcaption span {
  color: #c7d1dd;
  font-size: 0.8rem;
}
.screen-panel--tablet {
  grid-row: 1 / span 2;
  width: min(100%, 520px);
}
.screen-panel--phone {
  width: 188px;
}
.screen-panel--overlap-a {
  position: static;
}
.screen-panel--overlap-b {
  position: static;
}
.media-stack {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
}
.media-stack .screen-panel--tablet { flex: 1 1 420px; }
.media-stack .screen-panel--phone { flex: 0 0 190px; }

.metric-strip {
  position: relative;
  z-index: 1;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
}
.metric-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
}
.metric-grid div {
  padding: 22px;
  border-left: 1px solid var(--line);
}
.metric-grid div:last-child { border-right: 1px solid var(--line); }
.metric-grid strong {
  display: block;
  font-size: 1.1rem;
}
.metric-grid span {
  display: block;
  color: var(--muted);
  font-size: 0.94rem;
}

.section {
  position: relative;
  z-index: 1;
  padding: clamp(62px, 8vw, 104px) 0;
}
.section--white { background: var(--surface); }
.section--paper { background: var(--paper); }
.section--ink {
  background: #111820;
  color: white;
}
.section-header {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
  gap: 26px;
  align-items: end;
  margin-bottom: 32px;
}
.section-header h2,
.page-hero h1,
.cta-band h2,
.split h2 {
  margin-top: 10px;
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4.3vw, 4.4rem);
  line-height: 0.98;
  letter-spacing: 0;
}
.section-header p,
.split p,
.page-hero p,
.cta-band p {
  color: var(--muted);
  font-size: 1.04rem;
  max-width: 62ch;
}
.section--ink .section-header p,
.section--ink .content-card p,
.section--ink .target-card p,
.section--ink .target-meta dd {
  color: #c7d1dd;
}
.card-grid,
.target-grid,
.pricing-grid,
.support-grid,
.legal-card-grid {
  display: grid;
  gap: 16px;
}
.card-grid--three,
.pricing-grid,
.support-grid,
.legal-card-grid,
.target-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.card-grid--two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.content-card,
.target-card,
.price-card,
.support-card,
.legal-block {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  padding: 22px;
  box-shadow: var(--shadow-soft);
}
.section--ink .target-card,
.section--ink .content-card {
  background: #182230;
  border-color: rgba(255, 255, 255, 0.14);
}
.content-card h3,
.target-card h3,
.price-card h3,
.support-card h3 {
  margin-top: 8px;
  font-size: 1.24rem;
  line-height: 1.18;
}
.content-card p,
.target-card p,
.price-card p,
.support-card p {
  margin-top: 10px;
  color: var(--muted);
}
.target-card__top {
  display: flex;
  gap: 14px;
  align-items: center;
}
.target-card__top img {
  width: 76px;
  height: 76px;
  object-fit: contain;
  border-radius: 18px;
  flex: 0 0 auto;
  box-shadow: var(--shadow-soft);
}
.target-meta {
  display: grid;
  gap: 8px;
  margin-top: 18px;
}
.target-meta div {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(128, 140, 153, 0.28);
}
.target-meta dt {
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.target-meta dd { color: var(--ink-2); }
.target-meta a {
  color: var(--blue);
  font-weight: 850;
  overflow-wrap: anywhere;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.section--ink .target-meta a { color: #9cc7ff; }

.split {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(360px, 1.1fr);
  gap: clamp(28px, 5vw, 64px);
  align-items: center;
}
.split h2 { margin-bottom: 18px; }
.feature-list {
  display: grid;
  gap: 10px;
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
}
.feature-list li {
  position: relative;
  padding-left: 24px;
  color: var(--ink-2);
}
.feature-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.65em;
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: var(--green);
}
.section--ink .feature-list li { color: #dce5ef; }

.page-hero {
  background: linear-gradient(135deg, #ffffff 0%, #f1efe6 100%);
  border-bottom: 1px solid var(--line);
}
.page-hero__inner {
  padding: clamp(58px, 8vw, 100px) 0;
}
.page-hero h1 { max-width: 13ch; }
.page-hero p { margin-top: 20px; }

.price-card--featured {
  border-color: rgba(0, 87, 216, 0.32);
  background: linear-gradient(180deg, #ffffff 0%, var(--blue-soft) 100%);
}
.support-card a,
.text-link {
  display: inline-flex;
  margin-top: 14px;
  color: var(--blue);
  font-weight: 850;
  overflow-wrap: anywhere;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.legal-copy {
  display: grid;
  gap: 16px;
  max-width: 920px;
}
.legal-block h2 {
  font-size: clamp(1.45rem, 2.5vw, 2.1rem);
  line-height: 1.08;
}
.legal-block p {
  margin-top: 12px;
  color: var(--ink-2);
}

.cta-band {
  padding: clamp(60px, 8vw, 100px) 0;
  background: #182230;
  color: white;
}
.cta-band p { color: #dce5ef; margin-top: 16px; }

.site-footer {
  position: relative;
  z-index: 1;
  padding: 42px 0 34px;
  background: var(--ink);
  color: white;
}
.footer-grid {
  display: grid;
  grid-template-columns: minmax(260px, 1.6fr) repeat(3, minmax(0, 1fr));
  gap: 26px;
}
.footer-brand {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}
.footer-brand h2 {
  font-size: 1.1rem;
}
.footer-brand p,
.footer-meta {
  color: #c7d1dd;
}
.footer-grid h3 {
  margin: 0 0 10px;
  color: #93a6ba;
  font-size: 0.76rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.footer-grid a {
  display: block;
  color: #ecf2f8;
  padding: 4px 0;
  font-size: 0.94rem;
}
.footer-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
  margin-top: 28px;
  font-size: 0.84rem;
}
.redirect-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px;
}
.redirect-page a {
  color: var(--blue);
  text-decoration: underline;
}

@media (max-width: 1120px) {
  .hero__grid,
  .section-header,
  .split,
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .visual-board { min-height: 560px; }
  .card-grid--three,
  .pricing-grid,
  .support-grid,
  .legal-card-grid,
  .target-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .menu-toggle { display: inline-flex; }
  .brand-lockup { min-width: 0; }
  .nav-wrap {
    position: absolute;
    left: 16px;
    right: 16px;
    top: calc(100% + 8px);
    display: none;
    flex-direction: column;
    align-items: stretch;
    padding: 14px;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: var(--surface);
    box-shadow: var(--shadow);
  }
  .site-header[data-menu-open="true"] .nav-wrap { display: flex; }
  .primary-nav,
  .utility-nav {
    flex-direction: column;
    align-items: stretch;
  }
  .nav-link { justify-content: flex-start; }
  .hero h1 { font-size: clamp(3.6rem, 15vw, 6.2rem); }
  .hero__grid { grid-template-columns: 1fr; }
  .metric-grid { grid-template-columns: 1fr; }
  .metric-grid div,
  .metric-grid div:last-child {
    border-right: 1px solid var(--line);
  }
}

@media (max-width: 680px) {
  :root { --shell: min(100vw - 24px, 1180px); }
  .site-header__inner { min-height: 70px; }
  .brand-copy span { display: none; }
  .hero__grid { padding-top: 42px; }
  .hero-brand-art {
    width: 100%;
    max-width: 310px;
    transform: translateX(-22px);
  }
  .target-icon-row { gap: 10px; }
  .target-icon-tile { width: 68px; }
  .target-icon-tile img { width: 56px; height: 56px; }
  .visual-board {
    min-height: auto;
    display: grid;
    gap: 14px;
  }
  .screen-panel--overlap-a,
  .screen-panel--overlap-b {
    position: static;
  }
  .screen-panel--phone,
  .media-stack .screen-panel--phone {
    width: min(100%, 220px);
    flex-basis: min(100%, 220px);
  }
  .screen-panel--tablet,
  .media-stack .screen-panel--tablet {
    width: 100%;
    flex-basis: 100%;
  }
  .card-grid--three,
  .card-grid--two,
  .pricing-grid,
  .support-grid,
  .legal-card-grid,
  .target-grid {
    grid-template-columns: 1fr;
  }
  .target-card__top img {
    width: 66px;
    height: 66px;
  }
  .footer-grid { gap: 22px; }
}
`,
);
