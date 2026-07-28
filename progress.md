# Project Progress

## Phase 1: Project Initialization & Core Setup
- **Next.js Initialization:** Created a new Next.js 15 App Router project using TypeScript and Tailwind CSS v4.
- **Dependencies:** Installed required packages: `next-intl`, `framer-motion`, `zod`, `react-hook-form`, `lucide-react`, and `next-sitemap`.
- **CSS Architecture:** Configured `globals.css` with Tailwind v4 `@theme` block defining the "Royal Trust" color palette (`--color-navy`, `--color-gold`, etc.) and basic animations (`scrollReveal`).
- **Typography:** Set up optimized custom Google Fonts (`Playfair_Display`, `Inter`, and `Noto_Sans_Devanagari`) in the localized root layout to prevent layout shift.
- **Internationalization (i18n):**
  - Set up `next-intl` configuration (`src/i18n/request.ts` and `src/i18n/routing.ts`).
  - Set up routing middleware (`src/middleware.ts`) to handle `/en` and `/hi` paths.
  - Created base translation dictionaries: `messages/en.json` and `messages/hi.json` with keys for navigation, hero section, practice areas, stats, and common buttons.
  - Migrated `next.config.ts` to include the `next-intl` plugin.
- **Base Layout & Page:** Removed the default Next.js files and created the locale-aware `src/app/[locale]/layout.tsx` and a basic `src/app/[locale]/page.tsx`.

## Phase 2: Base Layout & SEO Foundation
- **Layout Components:** Extracted HTML and styles from the prototype to build reusable layout components:
  - `TopBar`: Contact details and "Book Now" prompt.
  - `Navbar`: Responsive navigation bar with mobile menu and sticky scroll effect.
  - `Footer`: Comprehensive site footer with practice area links, quick links, and BCI compliance tag.
  - `WhatsAppFloat`: Floating WhatsApp button with pulse animation and pre-filled message.
- **Integration:** Integrated these components into `src/app/[locale]/layout.tsx` wrapping the `children`.
- **Foundational SEO:**
  - Configured `generateMetadata` in root layout for dynamic Open Graph tags, canonical URLs, and hreflang (`en-IN`, `hi-IN`, `x-default`).
  - Added Google Search Console verification placeholder.
  - Created `public/robots.txt` allowing all traffic and pointing to sitemaps.
  - Configured `next-sitemap.config.js` to automatically handle localized routes and blog priorities.

## Phase 3: Home Page Implementation
- **Scroll Animations:** Created a reusable `ScrollReveal` component using `framer-motion` to handle scroll animations consistently based on the `whileInView` API (replacing the manual Intersection Observer in vanilla JS).
- **Home Page Sections:** Componentized the homepage sections:
  - `ServiceCarousel`: A responsive carousel of primary services with auto-play and manual controls.
  - `HeroSection`: Primary hero with localized titles, stats, and a sticky "Hero Card" representing the advocate.
  - `TrustStrip`: A strip of trust indicators (Enrolled, 500+ Clients, Transparent Fees).
  - `PracticeAreas`: A responsive grid showcasing primary practice areas (Criminal, Civil, Family, Police Station).
  - `WhyChoose`: Advantage section highlighting direct access and result-oriented strategies.
  - `ProcessSection`: Step-by-step consultation process and fee structure card.
  - `Testimonials`: Client reviews layout with star ratings.
  - `FAQSection`: Interactive FAQ accordion with an adjacent contact sidebar.
  - `LocationSection`: Chamber address details and map placeholder.
  - `CTABanner`: High-conversion call-to-action banner.
- **Integration:** Assembled all components logically in `src/app/[locale]/page.tsx`.
- **Fixes for Next.js 15:** 
  - Updated `layout.tsx` to handle `params` as a Promise (Next.js 15 routing change).
  - Renamed `middleware.ts` to `proxy.ts` according to the new Next.js 16.2 deprecations.
  - Adjusted `getRequestConfig` in `i18n/request.ts` to correctly return `locale: locale as string`.

## Phase 4: Practice Areas & Schema Markup
- **Localized Pages:** Created dynamic routes at `src/app/[locale]/practice-areas/[area]/page.tsx` utilizing translations injected via node script to `en.json` and `hi.json` for detailed insights.
- **Dynamic Content & SEO:** 
  - Dynamic `generateMetadata` implemented to provide distinct `<title>`, description, Open Graph, and hreflang links based on the loaded practice area.
  - Added placeholders for OG image logic (`/images/og-image.jpg`).
- **Structured Data (JSON-LD Schema):** 
  - Developed `src/lib/schema.ts` utilities providing `LegalService`, `BreadcrumbList`, and `FAQPage` schemas.
  - Interfaced schemas into the homepage (`FAQSection.tsx`) and dynamic practice area pages ensuring excellent SERP comprehension.

## Phase 5: Forms & Contact Setup
- **Contact Page (`/contact`):** Created a dedicated contact page showcasing chamber location details, an interactive map placeholder, and contact information, encapsulated within the `<ScrollReveal />` wrapper.
- **Appointment Form:** 
  - Developed `AppointmentForm.tsx` ensuring a streamlined intake experience.
  - Implemented strong client-side validation using **React Hook Form** paired with **Zod** schema (validating name, 10-digit phone number, matter type, and description length).
- **WhatsApp Integration (`lib/whatsapp.ts`):** 
  - Instead of a traditional backend email API route, built a WhatsApp deep-link generator.
  - Upon valid form submission, the system formats the intake data (Name, Phone, Email, Matter, Description) into a clean markdown-style message and directly opens a pre-filled WhatsApp chat to the advocate's configured number, aligning with the "Direct Access" ethos.

## Phase 6: Blog System
- **Markdown Architecture:** 
  - Implemented a server-side Markdown blog system using `gray-matter` for frontmatter parsing and `react-markdown` for rendering content.
  - Added `@tailwindcss/typography` to style the rendered markdown seamlessly within the site's design system.
- **Dynamic Routes & SSG:** 
  - Created `/blog` index page to list all localized articles.
  - Developed the dynamic route `/blog/[slug]` using Static Site Generation (SSG) via `generateStaticParams`.
- **Bilingual Content Structure:** Configured `src/lib/blog.ts` to scan `content/blog/` and match files based on their localized filename extensions (e.g., `post.en.md`, `post.hi.md`), allowing independent localized SEO metadata (`title`, `excerpt`, `author`) per post.

## Phase 7: Optimization & Final Polish (Completed)
- Verified flawless responsive behavior across all sections (Home, Contact, Blog, Practice Areas) utilizing Tailwind CSS grid and flex utilities.
- Validated all Next.js 15 routing types, successfully executing a production build (`npm run build`) with zero TypeScript errors or warnings.
- Fully rewrote the `README.md` containing accurate project context, architecture details, and comprehensive local development and deployment instructions.
- The platform is now fully optimized, styled, and structurally sound for production deployment.

## SEO Phase 1: Technical & Compliance Fixes (Completed)
- **NAP single source of truth (`src/lib/business.ts`):** created with name, phone, email, hours, and both chamber locations (lat/lng/address). Refactored Footer, TopBar, WhatsAppFloat, LocationSection, HeroSection, CTABanner, FAQSection, PracticeAreas, ProcessSection, AppointmentForm, and the about/contact/practice-area pages to import from it instead of hardcoding. This also fixed wrong Kaiserbagh/Madiyaon coordinates that had drifted out of sync on the About and Contact pages, and corrected the Kaiserbagh PIN to 226001.
- **`generateLegalServiceSchema` fix (`src/lib/schema.ts`):** removed the self-serving `aggregateRating` block (4.8/13, sourced from on-site testimonials — a Google structured-data policy risk with no verifiable third-party source). Added a `location` array with both chambers as `Place` entities. Linked `founder` to the `Person` schema via a shared `@id` (`https://advocatelucknow.in/#person`). Left a `// TODO` for `sameAs` profile URLs (GBP, Justdial, Vakilno1, Lawrato, LinkedIn) once the user provides them.
- **Homepage H1 + heading hierarchy:** `HeroSection`'s `<h1>` now contains both the name and the descriptor "Criminal, Civil & Family Lawyer in Lucknow" (Hindi equivalent added) — previously the H1 was just the name. Reordered `HeroSection` before `ServiceCarousel` in `page.tsx`. Demoted `ServiceCarousel`'s slide titles from `<h2>` to styled `<p>` tags (marketing copy, not document structure) — confirmed via build output: exactly one `<h1>` on the page, containing "Lawyer in Lucknow" (EN) / "वकील" (HI).
- **Contradictions & BCI-risk copy:** unified years-of-practice to 10+ everywhere (was contradicting 15+); unified the "500+" stat to "Clients Served" (was split between "Cases Handled" and "Clients Served"); removed banned/risky terms ("Expert"/"expertise", "aggressive", comparison-with-other-lawyers phrasing) from `whyChoose`, `team`, and the civil-law carousel slide, en+hi; rewrote the criminal-law meta description to drop the "bail hearings within 24–48 hrs" outcome/timeline promise and cite the current Section 528 BNSS instead of only the superseded Section 482 CrPC. Testimonials: kept all 13 (confirmed real/verbatim by the client), but rewrote the specific clauses promising or stating a case outcome or timeline (e.g. "got bail when others said impossible", "acquittal on most counts", "48 ghante mein ho gaya", "100% trustworthy") into service-quality statements — rest of each testimonial left untouched.
- **`LegalDisclaimer` component:** new shared component (`src/components/shared/LegalDisclaimer.tsx`) rendering the localized BCI disclaimer text. Added above the footer on the homepage, all practice-area pages, about, and contact.
- **`scripts/bci-check.mjs`:** new compliance linter scanning `messages/*.json` and `content/**/*.md` for banned terms (English + Hindi), with a `bci-allow` line-level whitelist marker. Wired up as `npm run bci-check`; currently reports zero hits.
- **Sitemap automation:** new `src/lib/routes.ts` exporting `PUBLIC_PATHS` (static paths + blog slugs read from the filesystem). Rewrote `next-sitemap.config.js` to expand these paths × `[en, hi]` with correct priority and full hreflang alternates per URL — the previous hand-maintained list was missing `/blog` and the blog post entirely. Verified via build: all 18 URLs (9 paths × 2 locales) present with clean hreflang.
- **Hero carousel performance pass:** first slide keeps `priority` and adds `fetchPriority="high"`; remaining slides get explicit `loading="lazy"`. Capped `next.config.ts` `images.deviceSizes` to a max of 1920 (was defaulting up to 3840) to avoid oversized image requests on ultra-wide/4K viewports for the `sizes="100vw"` fill images.
- **Domain redirect:** `lawyerlucknow.in` → `advocatelucknow.in` 301 redirect needs to be configured at the Vercel/DNS level — this is a human task, not code (see Task 1.9 instructions given to the user).
- **Robots.txt:** confirmed still correct after build — allows `/`, references the sitemap.
- Full `npm run build` passes with zero TypeScript errors after every task in this phase.

## SEO Phase 2: Service Pages — English Money Pages (Completed)
- **Infrastructure:** `src/lib/services.ts` — a content collection for `content/services/*.md`, mirroring `blog.ts`'s `slug.locale.md` convention, with a frontmatter contract (`title`, `description`, `h1`, `updated`, `related[]`, `faqs[]`). New route `src/app/[locale]/services/[slug]/page.tsx` (SSG via `generateStaticParams`) with `generateMetadata` (canonical + hreflang + OG), `BreadcrumbList`/`FAQPage`/`Service` JSON-LD (new `generateServiceSchema` helper in `schema.ts`), markdown body via `react-markdown` + typography prose classes matching the blog's styling, a WhatsApp/call CTA sidebar, FAQ accordion, related-services links, and `LegalDisclaimer`. New `/{locale}/services` index page. Until a Hindi file exists for a slug, `/hi/services/[slug]` renders the English content with a "हिंदी संस्करण जल्द आएगा" note rather than 404ing (per user's choice) — keeps the URL live and indexable ahead of Phase 5. `routes.ts` and `next-sitemap.config.js` updated to include `/services` and derive service slugs from the filesystem.
- **12 service pages written** (all English-only for now, Phase 5 adds Hindi): `bail-lawyer-in-lucknow`, `anticipatory-bail-lawyer-lucknow`, `fir-quashing-lawyer-lucknow`, `divorce-lawyer-in-lucknow`, `mutual-consent-divorce-lucknow`, `498a-defence-lawyer-lucknow`, `cheque-bounce-lawyer-lucknow`, `property-dispute-lawyer-lucknow`, `child-custody-lawyer-lucknow`, `maintenance-lawyer-lucknow`, `domestic-violence-lawyer-lucknow`, `court-marriage-lucknow`. User confirmed the advocate takes cheque bounce and court marriage matters (both were conditional pages), confirmed NDPS/POCSO can be mentioned on the bail page, and confirmed the "fee discussed transparently before engagement" generic phrasing (no fixed fee stated anywhere). Each page: 850–960 words body (excluding FAQs), one `<h1>`, 6–8 FAQs, 2–4 contextual internal links, statutes cited "new (earlier old)" per the Master Plan §4 table only, zero fabricated case results or timelines-as-promises. Where the fact sheet didn't cover a specific statute (child custody within divorce proceedings), used the safe generic phrasing the phase file specified rather than guessing a section number.
- **`npm run bci-check` passes with zero hits** across the whole repo after this phase, including all 12 new content files (one "guaranteed"/"guarantee"/"best" hit per file was caught and rephrased during writing, each without losing legal accuracy).
- **Internal linking:** `PracticeAreas.tsx` sub-item cards that have a dedicated service page now link there directly (Bail Applications, Anticipatory Bail, FIR Defense & Quashing, Property Disputes, Divorce, Child Custody, Maintenance, Domestic Violence); cards without a page keep linking to their parent hub. Each practice-area hub page gained a "Detailed Service Pages" grid linking its children. Footer gained a new "Services" column (grid widened from 4 to 5 columns) listing 8 of the 12 service pages.
- Full `npm run build` passes with zero TypeScript errors; sitemap confirmed to include all 12 service page URLs.
- **Still open:** Hindi versions of all 12 service pages (Phase 5). `sameAs` directory URLs (Justdial, Vakilno1, Lawrato, LinkedIn) still pending from the user.
