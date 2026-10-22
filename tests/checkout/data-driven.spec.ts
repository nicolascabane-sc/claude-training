import { test } from '../fixtures';
import { checkoutCases } from '../../test-data/checkout';
import { beginCheckoutWithItem, completeCheckout } from '../helpers/checkoutFlow';

// Data-driven test (risks S2 and S5). One test per row of test-data/checkout.ts,
// so each case has its own result and its own name in the report.
// Adding a row adds a test; every row must complete the order.
test.describe('Data-driven: name and zip partitions (risks S2, S5)', () => {
  for (const c of checkoutCases) {
    test(`${c.id}: ${c.description}`, async ({ page }) => {
      await beginCheckoutWithItem(page);
      await completeCheckout(page, c);
    });
  }
});
