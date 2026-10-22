import { test } from '@playwright/test';
import { beginCheckoutWithItem, completeCheckout } from '../helpers/checkoutFlow';

// Characterization tests (risk S2). No zip rule has been specified, so each test
// documents current behaviour: the order completes. See the test strategy.
test.describe('Equivalence partitioning and boundaries: zip code (risk S2)', () => {
  test('TC-S2-01: a numeric five-digit zip is accepted', async ({ page }) => {
    await beginCheckoutWithItem(page);
    await completeCheckout(page, 'Mary', 'Smith', '12345');
  });

  test('TC-S2-02: letters in the zip are accepted (characterization)', async ({ page }) => {
    await beginCheckoutWithItem(page);
    await completeCheckout(page, 'Mary', 'Smith', 'abcde');
  });

  test('TC-S2-03: special characters in the zip are accepted (characterization)', async ({ page }) => {
    await beginCheckoutWithItem(page);
    await completeCheckout(page, 'Mary', 'Smith', '!@#$%');
  });

  test('TC-S2-04: mixed letters and digits in the zip are accepted (characterization)', async ({ page }) => {
    await beginCheckoutWithItem(page);
    await completeCheckout(page, 'Mary', 'Smith', '1234a');
  });

  // Exploratory boundary: the site defines no boundary, so this is not textbook BVA.
  test('TC-S2-05: a one-digit zip is accepted (exploratory boundary, characterization)', async ({ page }) => {
    await beginCheckoutWithItem(page);
    await completeCheckout(page, 'Mary', 'Smith', '1');
  });

  // Exploratory boundary: searches for any input length limit.
  test('TC-S2-06: a 500-character zip is accepted (exploratory boundary, characterization)', async ({ page }) => {
    await beginCheckoutWithItem(page);
    await completeCheckout(page, 'Mary', 'Smith', '1'.repeat(500));
  });
});
