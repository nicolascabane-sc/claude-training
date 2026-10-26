import { test } from '../fixtures';
import { checkoutCases } from '../../test-data/checkout';
import { beginCheckoutWithItem, completeCheckout } from '../helpers/checkoutFlow';

// Data-driven test for name and zip input. One test per row of test-data/checkout.ts,
// so each case has its own result and its own name in the report.
// Adding a row adds a test; every row must complete the order.
test.describe('Accepted names and zip codes', () => {
  for (const c of checkoutCases) {
    test(c.name, async ({ page }) => {
      await beginCheckoutWithItem(page);
      await completeCheckout(page, c);
    });
  }
});
