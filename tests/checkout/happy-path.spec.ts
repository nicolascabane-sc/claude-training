import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';
import { completeCheckout, loginAsStandardUser, openCart, startCheckout } from '../helpers/checkoutFlow';

test.describe('Checkout: happy path (regression anchor)', () => {
  test('TC-C1-04: a filled cart with valid details completes the order', async ({ page }) => {
    await loginAsStandardUser(page);
    await new InventoryPage(page).addToCart('sauce-labs-backpack');
    await openCart(page);
    await startCheckout(page);

    await completeCheckout(page, 'Mary', 'Smith', '12345');

    await new CheckoutCompletePage(page).backToProducts();
    await expect(page).toHaveURL(/inventory\.html/);
  });
});
