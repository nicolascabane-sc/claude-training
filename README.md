# claude-training

Risk-based Playwright tests for the checkout flow of [saucedemo.com](https://www.saucedemo.com), run on Chromium.

## Setup

```sh
npm ci
npx playwright install --with-deps chromium
```

## Running

```sh
npm test              # run all tests headless
npm run test:headed   # run with a visible browser
npm run report        # open the last HTML report
```

## Layout

- `pages/`: Page Objects, one per screen, using `data-test` locators
- `tests/fixtures.ts`: extends Playwright's `test` so specs get page objects as fixtures (`{ checkoutStepOnePage }`); import `test` and `expect` from here
- `tests/helpers/checkoutFlow.ts`: shared login, cart and checkout steps
- `tests/checkout/`: specs, grouped by risk and test design technique
- `test-data/checkout.ts`: data table for `data-driven.spec.ts` (S2, S5); each row is one test

## Coverage by risk

| Risk | Spec | Technique |
|---|---|---|
| C1: order with an empty cart | `happy-path.spec.ts`, `decision-table.spec.ts` | Regression anchor, decision table |
| S2: zip code validation | `data-driven.spec.ts` | Equivalence partitioning, exploratory boundaries |
| S5: name field validation | `data-driven.spec.ts` | Equivalence partitioning |
| F2: resubmission after finish | `resubmission.spec.ts` | State transition |

Known defects are marked with `test.fail`: the test passes while the defect still exists.
Pending cases are marked with `test.fixme`.
Characterization tests record current behaviour where no rule has been specified.
