# MBONGO

Editorial media platform — wealth, business, culture, and money across Africa and the global Black diaspora.

**Concept:** The Cover and The Ledger  
**Stack:** Next.js App Router · TypeScript · GSAP ScrollTrigger · typed local content · CSS design tokens

## Run

```bash
cd /agent/mbongo
npm install
npm run dev
# http://localhost:3000
```

Production:

```bash
npm run build && npm start
```

## Routes

| Route | Experience |
|---|---|
| `/` | Cover Sequence + Latest ledger + newsletter |
| `/wealth` `/business` `/culture` `/money` | Chapter |
| `/articles/[slug]` | The Spread |
| `/interviews/[slug]` | The Record |
| `/index` | The Ledger (search + filters) |
| `/about` `/contact` | Utility |

## Docs

- `/cursor/stores/self/docs/mbongo-design-system.md`
- `/cursor/stores/self/docs/mbongo-architecture.md`

## Assets

Brand kit lives in `public/assets/` (covers + article plates). See `public/assets/README.md`. Logo mark not in pack — wordmark is set in type.
