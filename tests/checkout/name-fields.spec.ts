import { test } from '@playwright/test';
import { nameFieldCases } from '../../test-data/checkout';
import { beginCheckoutWithItem, completeCheckout } from '../helpers/checkoutFlow';

// Characterization tests (risk S5). The agreed expected behaviour is that
// special characters are accepted in name fields. Whether a real shop should
// reject them is a product question, raised in the risk analysis.
test.describe('Equivalence partitioning: name fields (risk S5)', () => {
  for (const c of nameFieldCases) {
    test(`${c.id}: ${c.description}`, async ({ page }) => {
      await beginCheckoutWithItem(page);
      await completeCheckout(page, c.firstName, c.lastName, c.zip);
    });
  }
});
