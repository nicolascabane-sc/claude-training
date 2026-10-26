import { test, expect } from '../fixtures';
import { beginCheckoutWithItem, completeCheckout } from '../helpers/checkoutFlow';

test.describe('Happy path', () => {
  test('a valid order completes', async ({ page, checkoutCompletePage }) => {
    await beginCheckoutWithItem(page);
    await completeCheckout(page);

    await checkoutCompletePage.backToProducts();
    await expect(page).toHaveURL(/inventory\.html/);
  });
});
