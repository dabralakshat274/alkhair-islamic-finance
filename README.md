# Al Khair Islamic Finance – website

A React 18 + Vite + TypeScript rebuild of the Al Khair society website, with a small Express API that
receives the loan application form. The page layout, colours and text are reproduced from the
original WordPress/Elementor site with one change: **"Bank" is now "Finance"** everywhere
(Al Khair Islamic Bank → Al Khair Islamic Finance, alkhair bank aurangabad → alkhair finance aurangabad, and so on).

## Run it

```bash
npm install
npm run dev        # web on http://localhost:5174, API on http://localhost:5001
```

| Script              | What it does                                          |
| ------------------- | ----------------------------------------------------- |
| `npm run dev:web`   | Vite dev server only                                  |
| `npm run dev:api`   | Express API only                                      |
| `npm run build`     | Type-check and build the site into `dist/`            |
| `npm run preview`   | Preview the production build                          |
| `npm start`         | Run the API; it also serves `dist/` if a build exists |
| `npm run typecheck` | TypeScript check without emitting                     |

Copy `.env.example` to `.env` to set the Google tag id (`VITE_GTAG_ID`), the API port, or the extra hosts the
dev server accepts (`ALLOWED_HOSTS`, comma-separated; a leading dot allows every subdomain, e.g.
`.ngrok-free.dev`, and `true` allows any host). Restart `npm run dev` after changing it.

## Pages

| Route                                  | Page                                | Old address (redirects here)                              |
| -------------------------------------- | ----------------------------------- | --------------------------------------------------------- |
| `/`                                    | Home (alkhair Finance)              |                                                           |
| `/alkhair`                             | alKhair                             | `/al-khair`                                               |
| `/alkhair-baitulmaal-co-op-credit-soc` | alkhair baitulmaal co-op credit soc | `/al-khair-baitulmaal-co-op-credit-soc`                   |
| `/alkhair-finance-aurangabad`          | alkhair finance aurangabad          | `/alkhair-bank-aurangabad`, `/al-khair-bank-aurangabad`   |
| `/alkhair-finance`                     | alKhair Finance                     | `/al-khair-finance`                                       |
| `/alkhair-islamic-finance`             | alkhair islamic finance             | `/alkhair-islamic-bank`, `/al-khair-islamic-bank`         |
| `/alkhair-loan`                        | alkhair Loan                        |                                                           |
| `/contact`                             | Contact                             |                                                           |

## Where to change things

| You want to change                              | Edit this                                                        |
| ----------------------------------------------- | ---------------------------------------------------------------- |
| Phone, WhatsApp, email, address, footer text    | `src/content/site.ts`                                            |
| Menu and footer links, old-URL redirects        | `src/content/navigation.ts`                                      |
| Page text (headings, paragraphs, buttons)       | `src/content/pages/<page>.ts` (text blocks are HTML strings)     |
| Form fields and messages                        | `src/content/form.ts`                                            |
| Logo, hero photo, office photo, contact icons   | `src/assets/images/` and `src/assets/index.ts`                   |
| Favicon                                         | `public/favicon.png`                                             |
| Theme colours (header, footer, links)           | `src/styles/theme-customizer.css`                                |
| Per-page Elementor styling (colours, sizes)     | `src/vendor/wp-content/uploads/elementor/css/post-<id>.css`      |
| Mobile menu behaviour                           | `src/styles/site.css`, `src/components/layout/MobileMenu.tsx`    |

Each page's content file is a small tree of nodes (`container`, `heading`, `text`, `button`, `image`,
`form`, `image-box`, `section`). `src/components/elementor/ElementorRenderer.tsx` turns them into the
exact Elementor markup the original site produced, so the copied Elementor CSS keeps working. Keep the
`id` and `className` values when editing; change the `text` / `html` values freely.

## Project layout

```
index.html                       Fonts, favicon, optional Google tag
server/index.js                  Express API (loan applications); JSON files in server/data
src/main.tsx                     Loads all stylesheets in the original order and mounts the app
src/App.tsx                      Routes (one per page) and redirects
src/assets/                      Images
src/content/                     site.ts, navigation.ts, form.ts, floatingButtons.ts, pages/*.ts
src/components/layout/           Topbar, Header, MobileMenu, Footer, ScrollTop, FloatingButtons, PageHeader
src/components/elementor/        ElementorRenderer, LoanApplicationForm
src/pages/                       ElementorPage (generic), NotFoundPage
src/styles/                      wp-inline.css, theme-customizer.css (copied), site.css (ours)
src/vendor/                      Theme, Elementor, Formidable and plugin CSS + icon fonts, copied verbatim
```

## API

| Method | Path                    | Body                                                                                  |
| ------ | ----------------------- | ------------------------------------------------------------------------------------- |
| POST   | `/api/loan-application` | `fullName, email, address, state, pinCode, mobile, loanPurpose, loanAmount`           |
| GET    | `/api/health`           |                                                                                       |

Submissions are appended to `server/data/applications.json`. The handler logs each one; that is the
place to add an email, WhatsApp or CRM notification.

## Notes

- The original form was Formidable Forms inside WordPress; this form keeps the same look and fields
  and posts to the API above.
- The logo image reads "Al-Khair Co-Operative Credit Society Ltd." and contains no "Bank", so it was
  kept as is.
- Deploy with `npm run build` then `npm start` on a Node host (serves `dist/` and the API together),
  or host `dist/` statically and point `VITE_API_URL` at the API.

## Regenerating page content from the original HTML

`tools/original-pages/` holds the eight pages as downloaded from alkhairsocietys.org.in on
24 September 2026. `tools/generate_content.py` converts them into `src/content/pages/*.ts`, applying
the Bank → Finance rebrand and the route mapping. Re-run it only if you want to start over from the
original text (it overwrites the content files):

```bash
pip install beautifulsoup4
python tools/generate_content.py
```
