import { test, expect } from '../fixtures';
import { beginCheckoutWithItem, completeCheckout, openCart, startCheckout } from '../helpers/checkoutFlow';

test.describe('State transition: resubmission after finish (risk F2)', () => {
  // Confirmed manually: after a completed order, browser Back returns to the
  // overview and Finish confirms a second order. The cart is already empty by
  // then, so it is also an empty order (compare TC-C1-01).
  test('TC-F2-01: browser Back after finish should not allow a second order', async ({ page, checkoutStepTwoPage }) => {
    test.fail(true, 'Known defect F2: browser Back after finish allows a second order');

    await beginCheckoutWithItem(page);
    await completeCheckout(page);

    await page.goBack();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await checkoutStepTwoPage.finish();

    await expect(page).not.toHaveURL(/checkout-complete\.html/);
  });

  test('TC-F2-02: after a completed order, a second order with a new item completes normally', async ({ page, inventoryPage, checkoutCompletePage }) => {
    await beginCheckoutWithItem(page);
    await completeCheckout(page);
    await checkoutCompletePage.backToProducts();

    await inventoryPage.addToCart('sauce-labs-bike-light');
    await openCart(page);
    await startCheckout(page);

    await completeCheckout(page);
  });
});
