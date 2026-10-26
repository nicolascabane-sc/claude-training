import { test, expect } from '../fixtures';
import { beginCheckoutWithItem, completeCheckout, openCart, startCheckout } from '../helpers/checkoutFlow';

test.describe('Ordering again after finish', () => {
  // Confirmed manually: after a completed order, browser Back returns to the
  // overview and Finish confirms a second order. The cart is already empty by
  // then, so it is also an empty order (see the empty cart test in decision-table.spec.ts).
  // Expected to fail while the defect exists: the terminal shows ✘, but it counts
  // as passed. It takes about 5s because not.toHaveURL waits the full timeout.
  // If it turns red, the defect is fixed: remove test.fail. See "Known defects" in the README.
  test('browser Back cannot place a second order', async ({ page, checkoutStepTwoPage }) => {
    test.fail(true, 'Known defect: browser Back after finish allows a second order');

    await beginCheckoutWithItem(page);
    await completeCheckout(page);

    await page.goBack();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await checkoutStepTwoPage.finish();

    await expect(page).not.toHaveURL(/checkout-complete\.html/);
  });

  test('a new order after a completed one works', async ({ page, inventoryPage, checkoutCompletePage }) => {
    await beginCheckoutWithItem(page);
    await completeCheckout(page);
    await checkoutCompletePage.backToProducts();

    await inventoryPage.addToCart('sauce-labs-bike-light');
    await openCart(page);
    await startCheckout(page);

    await completeCheckout(page);
  });
});
