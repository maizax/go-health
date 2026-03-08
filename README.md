# go-health — Multi-Brand Quiz App

## How to run

```bash
# Install dependencies
npm install

# Create and copy .env.example contents to .env.local
cp .env.example .env.local

# Start app + mock API together
npm run dev
```

- App: http://localhost:3000
- Mock API: http://localhost:4000

## What's implemented

**Multi-brand support**

- Brand is determined by URL path: `/brand-a/...` or `/brand-b/...`
- `/` redirects to the first brand from the API
- Each brand has its own theme (colors via CSS custom properties in `src/app/globals.css`), logo, hero image, and quiz content
- Adding a new brand = add an entry in `mock-db.json` + add a `[data-brand="..."]` block in `src/app/globals.css`

**Routing & navigation**

- Each question has its own URL: `/[brand]/quiz/[id]`
- Browser back/forward works correctly between questions

**Data & logic**

- Quiz data loaded from a mock REST API
- Brand config (images, landing copy, quiz) is fully data-driven — no FE redeploy needed to change content, only for brand colors.
- Conditional question visibility via `visibleIf` — questions appear/hide based on previous answers
- Extensible question schema: add new types in `src/types/question.ts` and a new component in `src/components/question-card/`

**State & persistence**

- Answers stored in `localStorage` with a per-brand key
- Navigating back/forward preserves selected answers
- Answers are cleared only when the user clicks "Start Over" on the summary page

**Nice-to-have**

- Fake loading page at `/[brand]/quiz/loading` (3 second delay)
- Summary page at `/[brand]/quiz/summary` showing all answers with labels

## Key technical decisions

| Decision                                       | Why                                                                                             |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Brand via URL path                             | Clean, shareable URLs; no cookies or headers needed                                             |
| Brand data in `mock-db.json`                   | Content, images, and quiz editable without redeploying FE                                       |
| CSS custom properties in `src/app/globals.css` | Zero JS for theming; adding a brand = one new `[data-brand]` block; no Tailwind config changes  |
| `useQuiz` hook with localStorage               | No global state needed; per-brand key prevents answer collisions between brands; hydration-safe |
| `visibleIf` as serializable JSON               | Evaluated by a pure function (`src/lib/quiz/visibility.ts`); easy to extend and test            |
| API layer (`src/lib/api/quiz.api.ts`)          | Single file to update when switching from mock to real backend                                  |

## What to improve/add

- **Responsive design** — layouts are partly optimized for mobile and desktop;
- **Accessibility**
- **Error handling**
- **Analytics**
- **Unit tests**
- **Brand colors in DB** — colors are currently hardcoded in `src/app/globals.css`; moving them to DB would make brands fully data-driven with zero FE changes
- **Refactor `QuestionCard`** — the component handles rendering, validation, and input state; splitting into smaller focused components would improve readability and testability
