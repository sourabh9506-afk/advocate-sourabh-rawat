# ACTION ITEMS — things only YOU can do (not code)

This file lists every task that **cannot be done in code by Claude** — because it needs
a Google account login, DNS/Vercel access, or a fact only you have. Claude will keep this
file updated as new items come up in later phases.

**How to use:** do an item → tell Claude, or just tick the box here. Items marked
🔴 BLOCKING affect what's already on the live site; ⚪ OPTIONAL improve it further.

---

## 1. 🔴 Domain 301 redirect — `lawyerlucknow.in` → `advocatelucknow.in`
- **What:** Point the second domain at the main site as a permanent (301) redirect. Never a separate/duplicate site.
- **Where:** Vercel → your project → **Settings → Domains → Add** `lawyerlucknow.in` → choose **"Redirect to advocatelucknow.in"** → make sure it's set to **Permanent (308/301)**.
- **Why:** Consolidates SEO value onto one domain; avoids a duplicate-content penalty.
- **Status:** [ ] not done

## 2. 🔴 Provide Bar Council enrollment YEAR
- **What:** The exact year Adv. Sourabh Rawat was enrolled with the Bar Council of Uttar Pradesh (e.g. "2014"). You approved showing the year (not the number) in Phase 1, but never gave me the year, so nothing is displayed yet.
- **Where you give it:** Just tell Claude the year. Claude will add it to the About page + Person schema (strengthens Google's trust signal / E-E-A-T).
- **Why:** A verifiable credential with a date is one of the strongest legitimacy signals for a lawyer's site.
- **Status:** [ ] not done

## 3. ⚪ Provide directory / social profile URLs (`sameAs`)
- **What:** Public profile links that are the SAME advocate, so Google connects them as one entity.
- **Already added:** Google Business Profile → `https://share.google/pZkTxYt32RCd44TK0`
- **Still needed (send whatever exists — don't create new ones just for this):**
  - [ ] Justdial profile URL
  - [ ] LawRato / Vakilno1 / Lawzana profile URL
  - [ ] LinkedIn profile URL (personal)
  - [ ] Any other real listing (Sulekha, Practo-style legal directories, etc.)
- **Where you give it:** Tell Claude the URL(s); Claude adds them to `src/lib/business.ts` → `sameAs`.
- **Status:** [ ] ongoing — add as they appear

## 4. ⚪ Google Search Console — request indexing for the 12 new service pages
- **What:** Ask Google to crawl the new money pages now instead of waiting.
- **Where:** [Google Search Console](https://search.google.com/search-console) → **URL Inspection** (top search bar) → paste each URL → **Request Indexing**.
- **The 12 URLs (do the English ones; Hindi come after Phase 5):**
  - [ ] https://advocatelucknow.in/en/services/bail-lawyer-in-lucknow
  - [ ] https://advocatelucknow.in/en/services/anticipatory-bail-lawyer-lucknow
  - [ ] https://advocatelucknow.in/en/services/fir-quashing-lawyer-lucknow
  - [ ] https://advocatelucknow.in/en/services/divorce-lawyer-in-lucknow
  - [ ] https://advocatelucknow.in/en/services/mutual-consent-divorce-lucknow
  - [ ] https://advocatelucknow.in/en/services/498a-defence-lawyer-lucknow
  - [ ] https://advocatelucknow.in/en/services/cheque-bounce-lawyer-lucknow
  - [ ] https://advocatelucknow.in/en/services/property-dispute-lawyer-lucknow
  - [ ] https://advocatelucknow.in/en/services/child-custody-lawyer-lucknow
  - [ ] https://advocatelucknow.in/en/services/maintenance-lawyer-lucknow
  - [ ] https://advocatelucknow.in/en/services/domestic-violence-lawyer-lucknow
  - [ ] https://advocatelucknow.in/en/services/court-marriage-lucknow
- **Also:** [ ] Resubmit the sitemap in GSC → **Sitemaps** → enter `sitemap.xml` → Submit (picks up all new pages at once).
- **Note:** Do this only AFTER the changes are deployed live to `advocatelucknow.in`.
- **Status:** [ ] not done

## 5. ⚪ Confirm Kaiserbagh chamber PIN (low priority — already answered once)
- **What:** You confirmed **226001** is correct for the Kaiserbagh chamber in Phase 1. No action unless that was a guess — if you're unsure, double-check it, since a wrong PIN hurts local map ranking.
- **Status:** [x] confirmed 226001 (re-verify only if uncertain)

## 6. 🔴 Set your Google Business Profile's "Website" field
- **What:** You confirmed there's **one GBP** (not one per chamber). Point its Website field at the **homepage**: `https://advocatelucknow.in`
- **Where:** Google Business Profile Manager → your listing → **Edit profile → Contact → Website**.
- **Why:** Confirms to Google that the GBP and the website are the same business entity — helps local map-pack ranking.
- **Status:** [ ] not done

## 7. 🔴 Make sure your GBP address text EXACTLY matches the site
- **What:** Whatever address is typed into your Google Business Profile must match, character-for-character, the address used on the site. The site's exact strings (source of truth: `src/lib/business.ts`) are:
  - **Madiyaon:** `616/188/A Semra Gaudhi, Near Primary School, Thana Madiyaon, Lucknow, Uttar Pradesh 226021`
  - **Kaiserbagh:** `Near CHC Building, Gate No. 8, Kaiserbagh, Lucknow, Uttar Pradesh 226001`
- **Why:** Mismatched address text between GBP and the website (NAP inconsistency) is one of the most common reasons local rankings underperform — Google cross-checks these.
- **Status:** [ ] not done

## 8. ⚪ Google Search Console — request indexing for the 4 new location pages
- **What:** Same process as item 4, for the new chamber/court pages from Phase 3.
- **Where:** GSC → **URL Inspection** → paste each URL → **Request Indexing**.
- **The 4 URLs:**
  - [ ] https://advocatelucknow.in/en/locations/madiyaon-chamber
  - [ ] https://advocatelucknow.in/en/locations/kaiserbagh-chamber
  - [ ] https://advocatelucknow.in/en/locations/district-court-lucknow
  - [ ] https://advocatelucknow.in/en/locations/high-court-lucknow-bench
- **Note:** Do this only AFTER deploying, and after resubmitting the sitemap (item 4 already covers a sitemap resubmit — one resubmit picks up both Phase 2 and Phase 3 URLs if done after both are live).
- **Status:** [ ] not done

## 9. ⚪ Google Search Console — request indexing for the 8 new Legal Guides
- **What:** Same process as items 4 and 8, for the new `/guides` pages from Phase 4.
- **Where:** GSC → **URL Inspection** → paste each URL → **Request Indexing**.
- **The 8 URLs (English; Hindi comes in Phase 5 except the bail guide, which already has both):**
  - [ ] https://advocatelucknow.in/en/guides/how-to-file-fir-in-lucknow
  - [ ] https://advocatelucknow.in/en/guides/bail-process-in-lucknow-courts
  - [ ] https://advocatelucknow.in/en/guides/divorce-procedure-lucknow-family-court
  - [ ] https://advocatelucknow.in/en/guides/rights-on-arrest-police-questioning-up
  - [ ] https://advocatelucknow.in/en/guides/maintenance-laws-india-wife-children-parents
  - [ ] https://advocatelucknow.in/en/guides/property-partition-guide-up
  - [ ] https://advocatelucknow.in/en/guides/cheque-bounce-case-guide
  - [ ] https://advocatelucknow.in/en/guides/ipc-to-bns-what-changed
- **Also:** [ ] Resubmit the sitemap in GSC (one resubmit after deploy picks up Phases 2, 3, and 4 URLs together if not already done).
- **Note:** The old `/blog` URL and the old `bail-process-in-india` post slug now 301-redirect to `/guides` and `/guides/bail-process-in-lucknow-courts` respectively — if either old URL was previously indexed or has external backlinks, no action needed on your side, the redirect carries the SEO value forward automatically.
- **Status:** [ ] not done

## 10. 🔴 Native-speaker spot-review of the new Hindi pages (Phase 5 exit requirement)
- **What:** Phase 5's own exit criterion — pick 3 pages of your choice from the new Hindi content and read them as a native Lucknow Hindi speaker, checking whether the phrasing sounds natural (search-Hindi, not "shuddh"/textbook Hindi) and whether any term should be swapped for a more locally common word.
- **Why this needs you specifically:** Claude wrote all Hindi content using the glossary and conventions from Phases 1–4's existing Hindi copy, but Claude is not a substitute for a native speaker's ear — this is explicitly called out in the phase instructions as something to ask you rather than guess.
- **Where to look:** Any 3 of the 12 service pages, 7 guides, or 4 location pages under `/hi/services/`, `/hi/guides/`, `/hi/locations/` — your choice. A good spread would be one service page, one guide, and one location page.
- **What to tell Claude:** Any specific sentence or word that reads awkwardly, and what you'd say instead. Claude will update the specific pages — no need to review everything, just enough to sanity-check the overall approach before requesting indexing (item 11 below).
- **Status:** [ ] not done

## 11. ⚪ Google Search Console — request indexing for the new Hindi (/hi) URLs
- **What:** Same process as items 4, 8, and 9, for the Hindi versions of the 12 service pages, 7 guides (the 8th, bail-process, already had Hindi from Phase 4), and the location pages that gained real Hindi content this phase instead of throwing errors.
- **Where:** GSC → **URL Inspection** → paste each URL → **Request Indexing**.
- **Note:** Do this only after item 10 (native-speaker spot-review) is done and after deploying — no point indexing content that might still get a wording tweak. One sitemap resubmit after all of Phases 2–5 are live picks up every new URL from every phase at once, so there's no need to resubmit separately per phase if you're doing this after Phase 5.
- **Status:** [ ] not done — do after item 10

## 12. ⚪ Chamber photos (2–3 real photos per chamber)
- **What:** Real photos — exterior with signage, and interior — for both the Madiyaon and Kaiserbagh chamber pages. You said "no photos for now"; this stays open for whenever you have them.
- **Where they go:** The chamber pages (`src/app/[locale]/locations/[slug]/page.tsx`) have a `{/* TODO photo */}` placeholder comment marking exactly where to add them once available — just send me the image files and I'll wire them in.
- **Why:** Real photos are one of the strongest trust signals for a Google Business Profile landing page and reduce bounce from search visitors checking if the chamber is legitimate.
- **Status:** [ ] not done — optional, whenever available

---

## Notes
- **Deploy first, then index.** Items 1, 4, 8, 9, and 11 only make sense once the latest code is live on Vercel.
- **Nothing here changes site code by itself** — items 2 and 3 become code changes only after you hand me the values/files. Item 10 may result in small text edits to specific Hindi pages once you flag anything.
- **Phases 3, 4, and 5 code changes have NOT been committed to git yet** — they're sitting in the working tree at your request. Nothing above needs to wait for that commit except items 1, 4, 8, 9, and 11 (which need the code live on Vercel, which itself needs a commit + deploy first).
- Claude will append new human-action items to this file at the end of each future phase.
