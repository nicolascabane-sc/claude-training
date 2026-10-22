import { test, expect } from '@playwright/test';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';
import { beginCheckoutWithItem, completeCheckout } from '../helpers/checkoutFlow';

test.describe('Checkout: happy path (regression anchor)', () => {
  test('TC-C1-04: a filled cart with valid details completes the order', async ({ page }) => {
    await beginCheckoutWithItem(page);
    await completeCheckout(page, 'Mary', 'Smith', '12345');

    await new CheckoutCompletePage(page).backToProducts();
    await expect(page).toHaveURL(/inventory\.html/);
  });
});
