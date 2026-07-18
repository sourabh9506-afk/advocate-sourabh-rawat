# Advocate Sourabh Rawat - Law Chamber Website

A modern, high-performance, and fully bilingual (English & Hindi) website for Advocate Sourabh Rawat, practicing at the High Court of Judicature at Allahabad, Lucknow Bench.

## 🚀 Technologies Used
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Internationalization (i18n)**: `next-intl` (English & Hindi support)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms & Validation**: `react-hook-form` & `zod`
- **Blog Engine**: `gray-matter` & `react-markdown`
- **SEO & Structured Data**: Built-in JSON-LD schemas (`LegalService`, `BreadcrumbList`, `FAQPage`, `Article`), Open Graph meta, and automated `sitemap.xml`/`robots.txt`

## 🌟 Key Features
- **Bilingual Support**: Full routing and content translation (e.g., `/en/contact`, `/hi/contact`).
- **Scroll Animations**: Smooth entrance animations using Framer Motion's `whileInView` API via a reusable `<ScrollReveal />` component.
- **Dynamic Practice Areas**: Specialized, SEO-optimized pages for Criminal Law, Civil Law, Family Law, and Police Station Matters.
- **Server-Side Markdown Blog**: Fully functional blogging system supporting independent English/Hindi markdown posts.
- **Direct Access WhatsApp Integration**: Appointment intake form validates client details and generates a pre-filled WhatsApp message sent directly to the advocate's configured number, completely bypassing slow email backends.
- **BCI Compliant**: Designed as a passive informational resource without active solicitation, adhering to Bar Council of India regulations.

## 🛠️ Project Structure
- `/src/app/[locale]`: Core application routes (Home, Contact, Blog, Practice Areas) utilizing the `next-intl` locale wrapper.
- `/src/components`: Reusable UI components separated into `/home`, `/contact`, and `/shared`.
- `/src/lib`: Utilities including JSON-LD schema generators and WhatsApp deep-link formatter.
- `/messages`: JSON dictionary files (`en.json`, `hi.json`) housing localized static content.
- `/content/blog`: Markdown files for the blog. Naming convention: `[slug].[locale].md` (e.g., `bail-process.en.md`).

## 💻 Running Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_WA_NUMBER="919876543210"
   NEXT_PUBLIC_PHONE="+919876543210"
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:3000`.

## 📦 Deployment
The project is perfectly optimized for deployment on [Vercel](https://vercel.com).
```bash
npm run build
npm run start
```

*Designed and Developed following modern web standards, achieving near-perfect Lighthouse scores across Performance, Accessibility, Best Practices, and SEO.*
