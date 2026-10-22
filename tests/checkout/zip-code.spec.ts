import { test } from '@playwright/test';
import { zipCodeCases } from '../../test-data/checkout';
import { beginCheckoutWithItem, completeCheckout } from '../helpers/checkoutFlow';

// Characterization tests (risk S2). No zip rule has been specified, so each test
// documents current behaviour: the order completes. See the test strategy.
test.describe('Equivalence partitioning and boundaries: zip code (risk S2)', () => {
  for (const c of zipCodeCases) {
    test(`${c.id}: ${c.description}`, async ({ page }) => {
      await beginCheckoutWithItem(page);
      await completeCheckout(page, c.firstName, c.lastName, c.zip);
    });
  }
});
