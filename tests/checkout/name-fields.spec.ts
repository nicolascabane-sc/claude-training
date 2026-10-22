import { test } from '@playwright/test';
import { beginCheckoutWithItem, completeCheckout } from '../helpers/checkoutFlow';

// Characterization tests (risk S5). The agreed expected behaviour is that
// special characters are accepted in name fields. Whether a real shop should
// reject them is a product question, raised in the risk analysis.
test.describe('Equivalence partitioning: name fields (risk S5)', () => {
  test('TC-S5-01: plain letters in first and last name are accepted', async ({ page }) => {
    await beginCheckoutWithItem(page);
    await completeCheckout(page, 'Mary', 'Smith', '12345');
  });

  test('TC-S5-02: accented letters in first and last name are accepted', async ({ page }) => {
    await beginCheckoutWithItem(page);
    await completeCheckout(page, 'José', 'Ángel', '12345');
  });

  test('TC-S5-03: special characters in first and last name are accepted (characterization)', async ({ page }) => {
    await beginCheckoutWithItem(page);
    await completeCheckout(page, 'Mary#', 'Smith$', '12345');
  });
});
