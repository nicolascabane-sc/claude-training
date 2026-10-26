# claude-training

Risk-based Playwright tests for the checkout flow of [saucedemo.com](https://www.saucedemo.com), a public demo shop. The suite has 15 tests, runs on Chromium, and runs in GitHub Actions on every pull request.

## Quick start

```sh
npm ci
npx playwright install --with-deps chromium
cp .env.example .env   # then fill in the saucedemo username and password
```

```sh
npm test              # run all tests headless
npm run test:headed   # run with a visible browser
npm run report        # open the HTML report of the last run
```

saucedemo shows its demo usernames and password on its own login page.

## Test strategy

- **Scope:** the checkout flow only, from login and adding to the cart through to the order confirmation. Product listing, sorting and other user types are out of scope.
- **Risk-based:** each spec covers one checkout risk and uses the test design technique that suits it (see the table below).
- **Characterization tests:** saucedemo specifies no rules for names or zip codes, so these tests record what the site does today (it accepts all input) instead of guessing a rule. Whether a real shop should reject some of that input is a product question, not a test question.
- **Known defects:** a test that checks behaviour the site gets wrong is marked with `test.fail`. It passes while the defect exists and starts failing once the defect is fixed, which tells you to turn it into a normal test. The suite stays green either way.
- **Environment:** the tests run against the live saucedemo.com site in Chromium. There is no local copy of the site.

## Risks and coverage

| Risk | Why it matters | Technique | Spec |
|---|---|---|---|
| Order with an empty cart | The shop confirms an order with nothing in it | Decision table, happy path | `decision-table.spec.ts`, `happy-path.spec.ts` |
| Zip code validation | Wrong addresses would reach orders | Equivalence partitioning, exploratory boundaries | `data-driven.spec.ts` |
| Name field validation | Valid names (e.g. accented) must not be rejected | Equivalence partitioning | `data-driven.spec.ts` |
| Ordering again after finish | A customer could place a duplicate order | State transition | `resubmission.spec.ts` |

## Test cases

**Empty or filled cart** (`decision-table.spec.ts`): the cart is empty or filled, and the form is empty or filled in.

| Test | Expected |
|---|---|
| an empty cart cannot be ordered | No order is confirmed. **Known defect.** |
| empty cart and empty form shows an error | Checkout stays on step one with an error |
| filled cart and empty form shows an error | Checkout stays on step one with an error |

**Happy path** (`happy-path.spec.ts`)

| Test | Expected |
|---|---|
| a valid order completes | The order is confirmed and "Back Home" returns to the products page |

**Ordering again after finish** (`resubmission.spec.ts`)

| Test | Expected |
|---|---|
| browser Back cannot place a second order | No second order is confirmed. **Known defect.** |
| a new order after a completed one works | A second, normal order with a new item completes |

**Accepted names and zip codes** (`data-driven.spec.ts`): one test per row of `test-data/checkout.ts`. Each row starts from a valid customer (Mary Smith, 12345) and changes only the field under test. Every row is expected to complete the order.

| Field | Cases |
|---|---|
| Names | plain names, accented names (José Ángel), names with special characters (Mary#) |
| Zip code | five-digit zip, zip with letters, zip with special characters, zip with letters and digits, one-digit zip, 500-character zip |

The site defines no zip length, so the one-digit and 500-character cases are exploratory boundaries, not boundary value analysis against a specified limit.

## Known defects

| Defect | How to reproduce | Test |
|---|---|---|
| An order can be placed with an empty cart | Log in, open the empty cart, check out, fill in the form, finish | an empty cart cannot be ordered |
| Browser Back after finishing allows a second order | Complete an order, press browser Back, click Finish | browser Back cannot place a second order |

The second defect also produces an empty order, because the cart is already emptied by the first one. Both are low severity for a demo site, but they would matter in a real shop.

## Project structure

```
pages/                    Page objects, one per screen: locators and actions, no assertions
tests/fixtures.ts         Gives specs their page objects, e.g. async ({ checkoutStepOnePage }) => ...
tests/helpers/            Shared steps with their checks: beginCheckoutWithItem, completeCheckout, ...
tests/checkout/           The specs, one per risk
test-data/checkout.ts     validCustomer and the data-driven cases
test-data/users.ts        Login credentials, read from environment variables
.env.example              Template for the local .env file (git-ignored)
```

Page objects find elements through the site's `data-test` attributes with `getByTestId`. Specs import `test` and `expect` from `tests/fixtures.ts`, not from `@playwright/test`.

To add a test: reuse the helpers in `tests/helpers/checkoutFlow.ts`, and for a new name or zip case just add a row to `test-data/checkout.ts`.

## CI and credentials

- **GitHub Actions** (`.github/workflows/playwright.yml`) runs on every pull request and every push to `main`, in the official Playwright Docker image, which has Chromium preinstalled. A run takes about one minute, and the HTML report is uploaded as an artifact for 30 days.
- **Credentials** are never stored in the repo. Locally they come from `.env`; in CI they come from the repository secrets `SAUCE_USERNAME` and `SAUCE_PASSWORD`. If either is missing, the run stops with a message saying so.
- **Upgrading Playwright:** when you upgrade `@playwright/test`, change the Docker image tag in the workflow to the same version.

## Limitations

- Chromium only; Firefox and WebKit are not tested.
- The tests depend on the live saucedemo.com site being up.
- Three tests submit the same valid customer (plain names, five-digit zip, a valid order completes). They stay separate because each one covers a different risk.
- Neither CI nor `npm test` checks TypeScript types; Playwright runs the tests without type checking.
