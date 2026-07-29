# ACTION ITEMS — things only YOU can do (not code)

This file lists every task that **cannot be done in code by Claude** — because it needs
a Google account login, DNS/Vercel access, or a fact only you have. Claude will keep this
file updated as new items come up in later phases.

**How to use:** do an item → tell Claude, or just tick the box here. Items marked
🔴 BLOCKING affect what's already on the live site; ⚪ OPTIONAL improve it further.

---

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
- **Also:** [x] Sitemap resubmitted in GSC (covers this item plus items 8, 9, 11 in one shot).
- **Note:** Do this only AFTER the changes are deployed live to `advocatelucknow.in` — confirmed live.
- **Status:** [ ] in progress — sitemap submitted; individual Request Indexing hit GSC's daily quota, continue a few URLs/day until all 12 are done

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
- **Note:** Sitemap already resubmitted (see item 4) — covers these URLs too.
- **Status:** [ ] in progress — sitemap submitted; individual Request Indexing pending (daily quota)

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
- **Also:** [x] Sitemap resubmitted (see item 4).
- **Note:** The old `/blog` URL and the old `bail-process-in-india` post slug now 301-redirect to `/guides` and `/guides/bail-process-in-lucknow-courts` respectively — if either old URL was previously indexed or has external backlinks, no action needed on your side, the redirect carries the SEO value forward automatically.
- **Status:** [ ] in progress — sitemap submitted; individual Request Indexing pending (daily quota)

## 10. 🔴 Native-speaker spot-review of the new Hindi pages (Phase 5 exit requirement)
- **What:** Phase 5's own exit criterion — pick 3 pages of your choice from the new Hindi content and read them as a native Lucknow Hindi speaker, checking whether the phrasing sounds natural (search-Hindi, not "shuddh"/textbook Hindi) and whether any term should be swapped for a more locally common word.
- **Why this needs you specifically:** Claude wrote all Hindi content using the glossary and conventions from Phases 1–4's existing Hindi copy, but Claude is not a substitute for a native speaker's ear — this is explicitly called out in the phase instructions as something to ask you rather than guess.
- **Where to look:** Any 3 of the 12 service pages, 7 guides, or 4 location pages under `/hi/services/`, `/hi/guides/`, `/hi/locations/` — your choice. A good spread would be one service page, one guide, and one location page.
- **What to tell Claude:** Any specific sentence or word that reads awkwardly, and what you'd say instead. Claude will update the specific pages — no need to review everything, just enough to sanity-check the overall approach before requesting indexing (item 11 below).
- **Status:** [ ] not done

## 11. ⚪ Google Search Console — request indexing for the new Hindi (/hi) URLs
- **What:** Same process as items 4, 8, and 9, for the Hindi versions of the 12 service pages, 7 guides (the 8th, bail-process, already had Hindi from Phase 4), and the location pages that gained real Hindi content this phase instead of throwing errors.
- **Where:** GSC → **URL Inspection** → paste each URL → **Request Indexing**.
- **Note:** Sitemap already resubmitted covering all Hindi URLs too (see item 4) — done ahead of the native-speaker review since you chose to proceed without waiting.
- **Status:** [ ] in progress — sitemap submitted; individual Request Indexing pending (daily quota). Item 10 review still outstanding.

## 12. ⚪ Chamber photos (2–3 real photos per chamber)
- **What:** Real photos — exterior with signage, and interior — for both the Madiyaon and Kaiserbagh chamber pages. You said "no photos for now"; this stays open for whenever you have them.
- **Where they go:** The chamber pages (`src/app/[locale]/locations/[slug]/page.tsx`) have a `{/* TODO photo */}` placeholder comment marking exactly where to add them once available — just send me the image files and I'll wire them in.
- **Why:** Real photos are one of the strongest trust signals for a Google Business Profile landing page and reduce bounce from search visitors checking if the chamber is legitimate.
- **Status:** [ ] not done — optional, whenever available

## 13. 🔴 Google Business Profile setup (highest ROI — do first, ongoing)
- **What:** Off-site work described in `06-PHASE6-offsite-checklist.md` — none of it is code, all of it is browser/app work on your Google Business Profile.
- **One-time setup:**
  - [ ] Primary category **Lawyer**; secondary categories Criminal justice attorney, Divorce lawyer, Family law attorney, Civil law attorney, Legal services.
  - [ ] Confirm one profile only (already decided — Website field → homepage, per item 6 above). Do NOT create a second profile for the second chamber.
  - [ ] Address text must exactly match `src/lib/business.ts` (see item 7 above) — same task, same source of truth.
  - [ ] Fill Services list mirroring the 12 service-page names, hours, a factual 750-char description (no superlatives — tell Claude if you want a draft), opening date.
  - [ ] Upload 10+ real photos: signboard, chamber exterior/interior, advocate at his desk (no court-interior photos). This is the same photo task as item 12 above, just published to GBP instead of (or in addition to) the site.
  - [ ] Seed Q&A: post and answer 5 real client questions yourself (appointment process, documents needed, which courts, Hindi consult available, both chambers).
  - [ ] Get the short review-request link (Profile → Ask for reviews) and save it.
- **Status:** [ ] not done

## 14. 🔴 Review pipeline (ongoing, monthly — the biggest lever for "best lawyer" searches)
- **What:** After each matter concludes, send this WhatsApp message (BCI-safe, already drafted): *"Namaste, aapke case mein saath kaam karke achha laga. Agar aap chahein to apna anubhav Google par share kar sakte hain — isse doosre logon ko sahi jaankari milti hai: {link}. Koi dabav nahin hai. Dhanyavaad."*
- **Rules:** Never offer anything in return. Never ask only happy clients (no review-gating). Never write reviews yourself or via family — fake reviews violate Google policy, consumer law, and BCI rules.
- **Reply to every review within 48h**, neutrally, without discussing case details (e.g. "Dhanyavaad. Aapka feedback mahatvapurn hai." — vary the wording each time).
- **Target:** 2–4 genuine reviews/month, steady pace, not bursts.
- **Status:** [ ] ongoing, starts whenever the next matter concludes

## 15. ⚪ Weekly GBP "Update" post
- **What:** Once a week, post a GBP Update linking one guide or service page already live on the site, with a 2-line factual summary.
- **Where you give it:** If you want Claude to draft the 2-line summary for a specific page, just name the page.
- **Status:** [ ] ongoing

## 16. ⚪ Citations & directories (claim/create with EXACT same NAP)
- **What:** Create or claim listings on: Justdial, Sulekha, LawRato (also answer free Q&A there weekly), Lawzana, Rest The Case, Lead India, PathLegal, other Vakil-type directories that surface for your keywords, Bing Places, Apple Business Connect, LinkedIn (personal, fully filled), Bar association directory (if available).
- **Track in a sheet:** Name / URL / login / date / status.
- **After each listing goes live:** send Claude the URL — it gets added to `sameAs` in `src/lib/schema.ts` (this is the one code touch from this task, already tracked as item 3 above — same list, same destination).
- **Status:** [ ] not done — do progressively

## 17. ⚪ Search Console monthly routine (20 minutes/month)
- **What:**
  - [ ] Pages report → anything stuck "Discovered/Crawled – currently not indexed" for 4+ weeks → tell Claude, it needs internal links from stronger pages (a GBP post linking it counts as the external mention).
  - [ ] Performance → Queries → sort by impressions → queries with impressions but position >10 and no dedicated page → send Claude the query list to decide which page to strengthen or add.
  - [ ] Request indexing manually for every newly shipped URL (both locales) — same mechanic as items 4, 8, 9, 11 above.
- **Status:** [ ] ongoing, monthly

## 18. ⚪ Tracking baseline (set up once, review monthly)
- **What:**
  - [ ] Set up keyword tracking (manual or any rank tool, Lucknow location set) for: advocate in lucknow, lawyer in lucknow, criminal lawyer in lucknow, best criminal lawyer in lucknow, bail lawyer lucknow, anticipatory bail lucknow, divorce lawyer in lucknow, लखनऊ में वकील, तलाक के वकील लखनऊ, लखनऊ में जमानत के वकील.
  - [ ] Check GBP Insights monthly: calls + direction requests (the real KPI, more than rankings).
- **Realistic timeline:** map-pack movement 4–8 weeks after reviews+citations start; organic long-tail (services/guides) 2–4 months; head terms 6+ months.
- **Status:** [ ] not done

## 19. ⚪ Permanent rules — things to never do (will burn the domain)
- Fake, incentivized, or family reviews.
- A second live site or doorway pages on `lawyerlucknow.in` — it must stay a dumb 301 (already true per item 1 above; keep it that way).
- Locality-spam pages (e.g. gomti-nagar-lawyer, alambagh-lawyer…).
- Buying backlink packages or Fiverr-type links.
- Re-adding `aggregateRating` schema (already removed for policy reasons — see `progress.md` Phase 6 notes).
- Superlatives anywhere, including the GBP description and directory bios (BCI applies there too).
- Publishing AI-drafted guides without the advocate actually reviewing them — he is professionally responsible for every word.
- **Status:** standing rule, no action needed unless you're about to break one — flag it to Claude if in doubt.

---

## Notes
- Domain 301 redirect (`lawyerlucknow.in` → `advocatelucknow.in`) and the Kaiserbagh PIN confirmation are both done and removed from this list.
- All Phase 2–5 code is now committed and live on Vercel — includes a fix for a production bug where every guide/service/location page was 500ing (root cause: missing `setRequestLocale` for next-intl static rendering).
- Sitemap has been resubmitted in GSC, covering all English + Hindi service, guide, and location URLs. Individual "Request Indexing" is limited by Google's daily quota — continue a few URLs/day (items 4, 8, 9, 11) until done.
- **Nothing here changes site code by itself** — items 2 and 3 become code changes only after you hand me the values/files. Item 10 may result in small text edits to specific Hindi pages once you flag anything.
- Claude will append new human-action items to this file at the end of each future phase.
