import { test } from '../fixtures';
import { beginCheckoutWithItem, completeCheckout, openCart, startCheckout } from '../helpers/checkoutFlow';

test.describe('State transition: resubmission after finish (risk F2)', () => {
  // Pending the manual reproduction of TC-F2-01. The assertion depends on
  // what the manual run shows. If a second order is confirmed, change this to
  // test(...) with test.fail(true, 'Known defect F2: ...') and assert that no
  // second order is created.
  test.fixme('TC-F2-01: browser Back after finish should not allow a second order', async ({ page, checkoutStepTwoPage }) => {
    await beginCheckoutWithItem(page);
    await completeCheckout(page, 'Mary', 'Smith', '12345');

    await page.goBack();
    await checkoutStepTwoPage.finish();
    // TODO: assertion pending manual result for TC-F2-01.
  });

  test('TC-F2-02: after a completed order, a second order with a new item completes normally', async ({ page, inventoryPage, checkoutCompletePage }) => {
    await beginCheckoutWithItem(page);
    await completeCheckout(page, 'Mary', 'Smith', '12345');
    await checkoutCompletePage.backToProducts();

    await inventoryPage.addToCart('sauce-labs-bike-light');
    await openCart(page);
    await startCheckout(page);

    await completeCheckout(page, 'Mary', 'Smith', '12345');
  });
});
