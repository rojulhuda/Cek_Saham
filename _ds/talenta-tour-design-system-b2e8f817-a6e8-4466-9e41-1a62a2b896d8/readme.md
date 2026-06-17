# Talenta Tour — Design System

A design system for **Talenta Tour**, a travel & tour management platform. The product is a
B2B workspace for travel agents and tour operators: a dashboard for managing destinations and
trip packages, a drag-and-drop **Trip Builder** for assembling day-by-day itineraries
(flights, hotels, attractions, restaurants, transport, images), a customer/CRM area, a file
manager for travel documents, a link hub, and an API-status monitor for the integrations the
product depends on (Supabase, flights, hotels, weather, FX, maps).

The feel is **calm, confident and editorial**: lots of white space, large friendly rounded
cards, a single decisive brand red against a near-neutral zinc palette, the geometric warmth
of Poppins, and slow, smooth transitions. It supports light and dark themes.

## Sources

This system was reverse-engineered from the product's React/Next.js component code.

- **Codebase:** a local `components/` folder (Next.js App Router + Tailwind + lucide-react +
  framer-motion + TanStack Query + Supabase). Key files studied: `header.tsx`, `sidebar.tsx`,
  `auth-layout.tsx`, `social-auth.tsx`, `command-palette.tsx`, `ui/toast.tsx`, `ui/select.tsx`,
  `api-status-dashboard.tsx`, `itinerary-blocks/*`, `destinations-data.ts`, `customers-data.ts`,
  `logo.tsx`, `plane-logo.tsx`.
- **Brand marks:** supplied by the user as `uploads/talentatourlogo.js` (wordmark) and
  `uploads/talentatourplane.js` (plane mark), converted to SVG in `assets/`.

> The reader is not assumed to have access to these sources — they are recorded here for
> provenance.

---

## CONTENT FUNDAMENTALS

How Talenta Tour writes.

- **Voice:** warm, direct, lightly aspirational — a capable concierge, not a hype machine.
  Marketing surfaces lean inspirational ("Discover the world with Talenta Tour"); in-product
  copy is plain and functional ("Real-time monitoring of Supabase cloud and external travel
  service integrations").
- **Person:** addresses the user as **you** ("Manage your travel resources…", "Search trips…").
  First-person plural is rare. Greets by name in-app ("Good morning, Amara").
- **Casing:** Sentence case for headings, body and buttons ("Save itinerary", "Add destination",
  "New Trip"). The one consistent exception is the **uppercase, wide-tracked eyebrow label**
  used for section kickers, statuses and breadcrumbs ("ALL SYSTEMS OPERATIONAL", "SYSTEM HEALTH",
  "OR CONTINUE WITH"). This wide-tracking (0.22em) is a signature.
- **Buttons & actions:** short, verb-first — "New Trip", "Save itinerary", "Refresh all",
  "Add a block", "Create an account".
- **Status language:** crisp single words — Operational, Degraded, Offline, Checking; Active,
  Draft, Published; Popular, Trending, Premium, Luxury, Nature, Relax.
- **Numbers & codes:** booking references (TT-7741), confirmation numbers, latency (142ms),
  uptime (99.9%) and times render in **monospace** for alignment and a technical feel.
- **Emoji:** none. The product never uses emoji. Iconography carries all the visual shorthand.
- **Tone of empty/error states:** factual and reassuring, never cute ("Booking reference not
  found", "Some systems degraded").

---

## VISUAL FOUNDATIONS

- **Color:** one brand **red** (`#dc2626`, hover `#b91c1c`) does almost all the accent work —
  primary buttons, active nav, links, focus rings, the unread badge. The logo uses a deeper
  crimson (`#850001`) with charcoal (`#202020`). Everything else is the **zinc** grey ramp.
  Semantic accents are reserved for meaning only: emerald = success/operational, amber =
  warning/degraded, red = danger/offline, blue = info. Itinerary block types get their own
  tints (sky for flights, indigo for hotels). Red is used decisively but sparingly — it should
  feel like punctuation, not a wash.
- **Backgrounds:** flat and quiet. Light app background is `zinc-50` (#fafafa); cards are pure
  white. Dark app background is `#121212` with `#181818` cards. **No gradients** in the UI
  chrome. The only gradient appears on the auth/marketing panel: a dark `zinc-900` field with
  two large, soft blurred red radial glows (≈120px blur, low opacity) behind the wordmark.
  Destination cards use full-bleed photographic imagery (warm, bright travel photography from
  the catalogue).
- **Type:** **Poppins** everywhere (geometric sans, weights 400–900; bold/extrabold do the
  heavy lifting). **JetBrains Mono** for codes, references, latency and `kbd`. Base body size is
  **15px**. Display/titles use slight negative tracking (-0.02em); labels use wide positive
  tracking (up to 0.22em).
- **Spacing:** 4px grid. Generous, airy padding inside cards (20–32px). Comfortable 18–24px
  gaps between cards in grids.
- **Corner radii:** **large and friendly** — the system's most recognisable trait. Buttons,
  badges, avatars and toggles are full pills; chips and list rows ~16px; cards, inputs and
  selects 24px; modals, the command palette and hero cards 32px.
- **Shadows:** **soft, diffuse, low-alpha**. The signature card shadow is
  `0 8px 30px rgb(0 0 0 / .04)` — barely-there elevation. Modals use a larger soft shadow.
  Active/dragging elements pick up a red-tinted shadow. No hard or high-contrast shadows.
- **Borders:** hairline `zinc-200` (light) / `zinc-800` (dark). Cards combine a hairline border
  *and* a soft shadow. Inputs sit on a sunken fill with a hairline border that turns red on
  focus.
- **Animation:** **slow and calm** — the product's default transition is **500ms** with a
  smooth `cubic-bezier(0.4,0,0.2,1)` ease (sidebar collapse, theme switch, nav). Interactive
  bits use ~300ms. Menus/toasts **fade + slide + scale** in (framer-motion in the source).
  Toasts slide from the right; the loading toast spins. No bounces, no infinite decorative loops.
- **Hover states:** subtle background tint (`zinc-50` / red wash), occasional small **translate**
  (nav items nudge left ~3–4px), cards **scale to 1.02**. Ghost buttons darken text + add a fill.
- **Press states:** a confident **scale-down** — buttons `scale(0.97)`, icon buttons `scale(0.9)`,
  cards `scale(0.99)`. This tactile press is consistent across the product.
- **Focus:** red focus ring — `0 0 0 4px rgb(220 38 38 / .10)` — plus a solid red border on
  inputs/selects.
- **Transparency & blur:** used for overlays and floating surfaces — modal/spotlight scrims are
  `rgba(9,9,11,.55)` with `backdrop-filter: blur`; toasts are slightly frosted.
- **Cards:** white surface, 24px radius, hairline border, soft `0 8px 30px /.04` shadow.
  Interactive cards lift to `scale(1.02)` and deepen their border on hover.
- **Imagery vibe:** bright, warm, saturated destination photography (Unsplash travel shots),
  always inside a rounded mask. No duotones or heavy filters.

---

## ICONOGRAPHY

- **System:** [**Lucide**](https://lucide.dev) (`lucide-react` in the source) is the single icon
  set, used pervasively — nav, headers, buttons, itinerary block types, status tiles, empty
  states. Clean, consistent **stroke** icons (~2px), rounded line caps/joins, drawn on a 24px
  grid and typically rendered at 16–20px.
- **No emoji, no Unicode glyphs** as icons (the one exception is the `⌘K` shortcut hint in the
  search field). Brand glyphs that Lucide doesn't carry — the Google "G" and the Apple mark on
  the social-auth buttons — are bespoke inline SVGs (recreated in `ui_kits/dashboard/Login.jsx`).
- **How this system ships icons:** Lucide is loaded from CDN
  (`unpkg.com/lucide@0.460.0`). In specimen cards and the UI kit, icons are written as
  `<i data-lucide="plane"></i>` placeholders and hydrated with `lucide.createIcons()`. Components
  that take an `icon` prop accept any node, so you can pass a Lucide icon, an inline SVG, etc.
- **Brand marks:** the **wordmark** (`assets/logo-wordmark.svg`, white variant
  `logo-wordmark-white.svg`) and the **plane mark** (`assets/logo-plane.svg` / `-white.svg`).
  The collapsed sidebar swaps the full wordmark for the plane mark. Use the white variants on
  dark backgrounds.
- **Common icons in use:** `layout-grid`, `map`, `route`, `folder-open`, `link-2`, `activity`,
  `users`, `plane`, `bed-double`, `camera`, `utensils`, `car-front`, `search`, `bell`, `sun`,
  `plus`, `more-vertical`, `paperclip`, `star`, `map-pin`, `heart`, `chevron-right`,
  `trending-up`, `refresh-cw`, `shield-check`.

---

## INDEX

Root files
- `styles.css` — **the single entry point consumers link.** `@import`s the token files + base layer.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill front-matter so this system can be used inside Claude Code.

`tokens/` — CSS custom properties (imported by `styles.css`)
- `colors.css` · `typography.css` · `spacing.css` · `radii-shadows.css` · `fonts.css` · `base.css`

`assets/` — brand marks
- `logo-wordmark.svg` / `logo-wordmark-white.svg` · `logo-plane.svg` / `logo-plane-white.svg`

`components/` — reusable React primitives (`window.TalentaTourDesignSystem_b2e8f8`)
- `actions/` — **Button**, **IconButton**
- `forms/` — **Input**, **Select**, **Switch**, **Checkbox**
- `data-display/` — **Badge**, **StatusPill**, **Avatar**, **Card**
- `navigation/` — **Tabs**
- `feedback/` — **Toast**, **Tooltip**

`guidelines/` — foundation specimen cards (Design System tab): colors, type, spacing/radii/shadows, brand.

`templates/dashboard/` — the full workspace shell packaged as a **template** consuming projects
can copy to seed a new design: login → dashboard → destinations → trip builder → API status,
with ⌘K spotlight. Entry `index.html` loads the DS via `ds-base.js` (point its `base` at the
bound `_ds/<folder>` tree). This is the place to study real product layout patterns.

---

## USING THE COMPONENTS

```html
<link rel="stylesheet" href="styles.css" />
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" …></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" …></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" …></script>
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const { Button, Card, Badge, StatusPill } = window.TalentaTourDesignSystem_b2e8f8;
  // …render
</script>
```

## CAVEATS / SUBSTITUTIONS

- **Fonts load from Google Fonts CDN** (`tokens/fonts.css`) rather than being self-hosted.
  Poppins and JetBrains Mono are the *real* product typefaces — only the delivery differs. To
  self-host, drop the `.woff2` files in `assets/fonts/` and swap the `@import`s for `@font-face`
  rules. (Because of this, the compiler currently reports 0 self-hosted webfonts.)
- **Icons load from the Lucide CDN.** This matches the source (`lucide-react`); no substitution.
