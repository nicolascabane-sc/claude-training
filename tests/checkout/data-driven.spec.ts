import { test } from '@playwright/test';
import { CheckoutStepOnePage } from '../../pages/CheckoutStepOnePage';
import { checkoutCases } from '../../test-data/checkout';
import { beginCheckoutWithItem, completeCheckout, continueExpectingError } from '../helpers/checkoutFlow';

// Data-driven test (risks S2 and S5). One test per row of test-data/checkout.ts,
// so each case has its own result and its own name in the report.
// Adding a row adds a test. 'accepted' rows must complete the order;
// 'rejected' rows must stay on step one with a validation error.
test.describe('Data-driven: name and zip partitions (risks S2, S5)', () => {
  for (const c of checkoutCases) {
    test(`${c.id}: ${c.description} (expected: ${c.expected})`, async ({ page }) => {
      await beginCheckoutWithItem(page);

      if (c.expected === 'accepted') {
        await completeCheckout(page, c.firstName, c.lastName, c.zip);
      } else {
        await new CheckoutStepOnePage(page).fillForm(c.firstName, c.lastName, c.zip);
        await continueExpectingError(page);
      }
    });
  }
});
