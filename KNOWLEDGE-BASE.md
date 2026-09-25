# Al Khair Islamic Finance – Knowledge Base

Everything known about this project: what was asked, what the original site is and how it worked,
how the clone was built, what was verified, what is still open, and the decisions taken along the way.
Last updated 24 September 2026.

---

## 1. The request

- Duplicate **https://www.alkhairsocietys.org.in/** as a new project in `J:\PROJECTS`, the same way
  the LoanBridge site (`J:\PROJECTS\loanbridge`) was built.
- One content change only: **"Al Khair Islamic Bank" → "Al Khair Islamic Finance"**, i.e. every
  "Bank" becomes "Finance". Everything else stays the same and everything must work.
- Project folder: `J:\PROJECTS\alkhair-islamic-finance`.

---

## 2. The original website

### 2.1 Platform
- WordPress 7.1.2 with the **Elementor 4.3** page builder, **OceanWP** theme (v4.1.4),
  **Formidable Forms** (loan form), **All in One SEO**, **Amin Chat Button** (WhatsApp button),
  **Call Now Button** plugin. PHP 8.3 on LiteSpeed.
- Google Ads tag `AW-18229007162` on every page except none (all pages).
- Fonts: Google Fonts Montserrat and Marcellus SC (theme), Roboto (Elementor kit).
- Colours: header/footer dark green `#092415`, links/buttons green `#166432`, gold accents
  `#c59d55`, top bar black `#0a0a0a`, mobile menu panel `#060866`, close bar `#dd3333`.

### 2.2 Pages (8)
| Original address | Title | Content |
|---|---|---|
| `/` (page 161) | Al Khair Islamic Bank, Al Khair Bank Loan Apply Online | Green hero with form, photo + "alkhair islamic bank" text and 4 phone headings, baitulmaal + aurangabad columns, 4 short columns (Bank / Loan / Al khair / Finance), office photo + second form |
| `/alkhair/` (883) | Al-Khair Co-Operative Credit Society | "know More about Al khair Bank", Our Mission list, gradient form block |
| `/alkhair-baitulmaal-co-op-credit-soc/` (885) | alkhair baitulmaal co-op credit soc | Multi-Loan Services article |
| `/alkhair-bank-aurangabad/` (887) | al khair bank aurangabad phone number | Three long articles about the Aurangabad branch |
| `/alkhair-finance/` (889) | Al Khair Islamic Finance Loan Apply Online | "Why Choose Al Khair Finance" article |
| `/alkhair-islamic-bank/` (891) | Al khair Islamic Bank Loan Apply Online | Intro, blue form block, Islamic banking article |
| `/alkhair-loan/` (895) | Al khair Loan From Al khair Bank | Two loan articles, purple form block |
| `/contact/` (354) | al khair bank contact number | Magenta form block, phone lines, three contact boxes (Address / Phone / Contact) |

Pages linked but missing on the original (404): `/al-khair/`, `/al-khair-islamic-bank/`,
`/al-khair-finance/`, `/al-khair-bank-aurangabad/`, `/al-khair-baitulmaal-co-op-credit-soc/`
(used in the footer "Important" list).

### 2.3 Shared elements
- Top bar: "Call 8893237245" (blue) and "APPLY NOW" (red, goes to Contact).
- Header: logo (Al-Khair Co-Operative Credit Society Ltd.), 8-item menu, hamburger below 960px.
- Mobile menu: slide-in panel from the right (sidr), red "Close Menu" bar, pushes the page left.
- Page title bar with breadcrumbs on every page except Home.
- Footer: About Us text, "Important" list of 15 keyword links, Contact Info (address, phone, email),
  bottom menu (same 8 items), copyright "© Copyright [Al Khair_2022] - zero interest loan Alkhair Society".
- Floating buttons: WhatsApp bottom-left (+91 88932 37245 with greeting "Welcome in alkhair bank how
  many I help you ?"), green "Call Us" bottom-right (tel: 88932 37245). Scroll-to-top arrow.
- Contact numbers on the site: 8893237245 (buttons, footer, headings) and 7903724946 (page titles,
  meta descriptions). Email info@alkhairsocietys.org.in. Address: Markaz-e-Islami Building, Yunus
  Colony, Aurangabad, Maharashtra 431001.

### 2.4 The loan form (Formidable form id 2, "Alkhair Loan Application Form")
- Fields, all required, in two columns: Full Name, Email, Address, State, Pin Code (number),
  Mobile Number (tel with pattern), Loan Purpose, Loan Amount (number). Submit button. Hidden
  honeypot "If you are human, leave this field blank."
- Appears on Home (twice), alKhair, alkhair islamic bank, alkhair Loan and Contact.
- How it worked: WordPress saved each entry in its database (Formidable › Entries) and, with the
  plugin's default action, emailed it to the site's admin address (unknown to us; probably
  info@alkhairsocietys.org.in). Submission and validation ran through WordPress's admin-ajax.

### 2.5 Images
- Logo `cropped-…-images-removebg-preview.png` (510×290) plus 270/192/180/32 px crops (favicon 32).
- Hero photo `depositphotos_130975284-…-arab.webp` (400×600) + 200×300.
- Office photo `AlKhairBiharMPOs29may2022.jpeg` (696×425) + 300×183.
- Contact page icons hotlinked from lawyer.oceanwp.org (location, time, send).
- The logo 2x variant was hotlinked from a second domain, alkhairbanksociety.org.in.

### 2.6 Things noticed on the original
- Menu has both "alkhair Bank" (home) and "alKhair Finance" (a page).
- Meta description and keywords are keyword-stuffed and identical in style across pages.
- The alkhair Loan page contains a block pasted from a ChatGPT conversation (its wrapper markup is
  still in the HTML). The aurangabad page has three near-duplicate articles.
- Documents page mentions "bank statements" (a document type).
- Elementor's lazy-load CSS hides container backgrounds until JS runs (dropped in the clone).

---

## 3. What was built

### 3.1 Approach
- Same skeleton as LoanBridge: Vite 6, React 18, TypeScript, react-router 6, Express 4 API with
  JSON-file storage, `concurrently` for `npm run dev`.
- Each page's Elementor markup was converted by `tools/generate_content.py` (BeautifulSoup) into a
  node tree in `src/content/pages/*.ts` (`container`, `heading`, `text`, `button`, `image`, `form`,
  `image-box`, `section`). `src/components/elementor/ElementorRenderer.tsx` renders the exact
  original markup (same element ids and classes), so the per-page Elementor CSS applies unchanged.
- All theme, Elementor, Formidable and plugin CSS plus icon fonts are copied verbatim into
  `src/vendor/` keeping the WordPress folder tree (relative font paths keep working). The inline
  `<style>` blocks from the page head are in `src/styles/wp-inline.css` (WordPress presets, custom CSS)
  and `src/styles/theme-customizer.css` (OceanWP colours and sizes). `src/styles/site.css` is ours.
- Load order in `src/main.tsx` follows the original `<head>` so the cascade is the same.
- Layout components reproduce the OceanWP DOM: `#outer-wrap > #wrap > top bar, #site-header, #main,
  #footer`, `#sidr` mobile panel, `#scroll-top`, WhatsApp and Call buttons. Body classes per page
  (`has-topbar`, `content-full-screen`, `elementor-page-161`, …) are set by `useBodyClasses`.
- Theme JavaScript was replaced: mobile menu open/close and page push (React state + `site.css`),
  scroll-to-top (React), form validation and submission (React + API). Elementor's front-end JS is
  not needed (no animations or sliders on the site).

### 3.2 Routes and redirects
| Route | Page | Redirected from |
|---|---|---|
| `/` | Home | |
| `/alkhair` | alKhair | `/al-khair` |
| `/alkhair-baitulmaal-co-op-credit-soc` | Baitulmaal | `/al-khair-baitulmaal-co-op-credit-soc` |
| `/alkhair-finance-aurangabad` | Aurangabad | `/alkhair-bank-aurangabad`, `/al-khair-bank-aurangabad` |
| `/alkhair-finance` | alKhair Finance | `/al-khair-finance` |
| `/alkhair-islamic-finance` | Islamic Finance | `/alkhair-islamic-bank`, `/al-khair-islamic-bank` |
| `/alkhair-loan` | alkhair Loan | |
| `/contact` | Contact | |
| `*` | 404 page (new) | |

### 3.3 The Bank → Finance rule (in `tools/generate_content.py`, `rebrand()`)
- Whole-word `Bank` / `bank` / `BANK` → `Finance` / `finance` / `FINANCE`, case preserved.
- Standalone "the bank" / "The bank" → "the finance company" (plain "the finance" is not English).
- "bank statements" is left alone (it names a document). "banking" is untouched (not the word bank).
- Applied to headings, paragraphs, buttons, alt text, page titles, meta descriptions and keywords,
  menu and footer labels, the WhatsApp greeting, and the page slugs above.
- Result: no "Bank" remains in any rendered page except "bank statements" on the Loan page.
- Side effect: the menu now reads "alkhair Finance" (home) and "alKhair Finance" (page).
- The logo image contains no "Bank", so it was not changed.

### 3.4 Files to know
```
index.html                        fonts, favicon, optional Google tag (VITE_GTAG_ID)
server/index.js                   POST /api/loan-application, GET /api/health, serves dist/
src/content/site.ts               phone, WhatsApp number + greeting, email, address, footer text, top-bar labels
src/content/navigation.ts         mainMenu (header + footer bottom), footerLinks (Important), redirects
src/content/form.ts               form fields, placeholders, validation and success messages
src/content/floatingButtons.ts    the two SVG icons (base64) for WhatsApp and Call buttons
src/content/pages/*.ts            page trees (generated; edit text/html freely, keep id/className)
src/assets/index.ts               image map (logo sizes, hero, office, contact icons)
src/components/layout/*           Topbar, Header, MobileMenu, Footer, ScrollTop, FloatingButtons, PageHeader, Layout
src/components/elementor/*        ElementorRenderer, LoanApplicationForm
src/styles/site.css               mobile menu behaviour, honeypot hiding, menu padding fix
tools/generate_content.py         regenerates src/content/pages from tools/original-pages (pip install beautifulsoup4)
tools/original-pages/*.html       the 8 pages as downloaded on 24 Sep 2026
```

### 3.5 Scripts and ports
- `npm run dev` → web http://localhost:5174 + API http://localhost:5001 (LoanBridge uses 5173/5000,
  so both projects can run at once). `npm run build`, `npm run preview` (:4173 by default),
  `npm start` (API + built site), `npm run typecheck`.
- `.env.example`: `VITE_GTAG_ID`, `PORT`. Git is not initialised (user decides).

### 3.6 Deliberate deviations from the original
- Form posts to our API instead of WordPress; success message is Formidable's default text
  "Your responses were successfully submitted. Thank you!"; error text under each empty field.
- Contact page icons and the logo 2x are local files instead of hotlinks.
- Menu item padding reduced from 15px to 10px on desktop (and the menu's 15px right shift to 10px)
  because "finance" is longer than "bank"; this keeps the 8 items on one line at 1400px exactly as
  the original. Below ~1300px both sites wrap to two lines.
- Elementor's lazy-load background rule and WordPress block-library CSS (only used on one page for
  nothing visible) were not copied. Google tag is off until an ID is set.
- A 404 page was added (the original showed the theme's default).

---

## 4. Verification done (24 Sep 2026)
- `npm run build`: TypeScript clean, Vite build OK (≈285 KB JS, 485 KB CSS before gzip). One CSS
  warning came from a stray `{}` in Elementor's own kit CSS; removed.
- Headless Chrome (installed Chrome via playwright-core): all 8 routes render; 3 redirects land on
  the right pages; mobile menu opens (panel at right:0, body gets `sidr-open`), a menu click
  navigates and closes it; empty form shows 8 "This field cannot be blank." messages; filled form
  shows the success message; scroll-top appears after scrolling; no console or page errors.
- API with curl: valid submission stored (201 + id), missing fields rejected (400), honeypot
  rejected (400). Test data deleted afterwards.
- Compared with the live site at 1400px: identical page heights on all 8 pages (e.g. home 3109,
  aurangabad 4733, loan 3418); at 1280px also identical (both wrap the menu). Computed header
  metrics compared: same fonts, sizes, letter-spacing; last menu item's text ends at x=1400 on both.
- Rendered text scanned for the word "bank": none left except "bank statements".

---

## 5. Open items
1. **Where form submissions go.** Today they are saved to `server/data/applications.json` and logged;
   nobody is notified. Decision taken: use **Web3Forms** (free, 250/month). Needs the receiving
   email address registered at web3forms.com and the access key it sends, placed in `.env`
   (never in chat). Then `server/index.js` forwards each submission. Alternatives: Brevo (300/day),
   Resend, Gmail app password, Google Sheet via Apps Script.
2. **WhatsApp**: only the number is needed for the click-to-chat button (already in place, same
   number as the original). Server-sent WhatsApp alerts would need the Meta Cloud API or a provider
   (Twilio/Interakt/Gupshup) and were not part of the original site.
3. Google Ads tag ID (`VITE_GTAG_ID`) if tracking is wanted; the original's ID was not copied.
4. Domain and hosting; `npm run build` + `npm start` on any Node host.
5. Optional: replace the two phone numbers or the greeting text in `site.ts`; decide whether the
   duplicate "Finance" menu labels should be renamed.

---

## 6. Related
- LoanBridge project (`J:\PROJECTS\loanbridge`, clone of aadharcapital.com) uses the same structure
  and the same form-notification plan; its knowledge base is in `C:\Users\Pc\Downloads\LoanBridge-Knowledge-Base.md`.
- Tooling lessons that also applied here: write source files with the editor's Write tool rather
  than long shell heredocs; generate PDFs/screenshots with the installed Chrome via playwright-core;
  compare against the live site by measuring `document.body.scrollHeight` and header metrics at
  fixed viewport widths.
