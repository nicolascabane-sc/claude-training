import { test, expect } from '../fixtures';
import { beginCheckoutWithItem, continueExpectingError, loginAsStandardUser, openCart, startCheckout } from '../helpers/checkoutFlow';

test.describe('Decision table: checkout with empty or filled cart (risk C1)', () => {
  test('TC-C1-01: an empty cart should not allow an order to be placed', async ({ page, checkoutStepOnePage, checkoutStepTwoPage }) => {
    test.fail(true, 'Known defect C1: an order completes with an empty cart');

    await loginAsStandardUser(page);
    await openCart(page);
    await startCheckout(page);

    await checkoutStepOnePage.fillForm('Mary', 'Smith', '12345');
    await checkoutStepOnePage.continue();
    await checkoutStepTwoPage.finish();

    await expect(page).not.toHaveURL(/checkout-complete\.html/);
  });

  test('TC-C1-02: an empty cart with an empty form shows required-field validation', async ({ page }) => {
    await loginAsStandardUser(page);
    await openCart(page);
    await startCheckout(page);

    await continueExpectingError(page);
  });

  test('TC-C1-03: a filled cart with an empty form shows required-field validation', async ({ page }) => {
    await beginCheckoutWithItem(page);

    await continueExpectingError(page);
  });
});
