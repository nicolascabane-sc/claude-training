import { test, expect } from '@playwright/test';
import { CheckoutStepOnePage } from '../../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../pages/CheckoutStepTwoPage';
import { beginCheckoutWithItem, continueExpectingError, loginAsStandardUser, openCart, startCheckout } from '../helpers/checkoutFlow';

test.describe('Decision table: checkout with empty or filled cart (risk C1)', () => {
  test('TC-C1-01: an empty cart should not allow an order to be placed', async ({ page }) => {
    test.fail(true, 'Known defect C1: an order completes with an empty cart');

    await loginAsStandardUser(page);
    await openCart(page);
    await startCheckout(page);

    const stepOne = new CheckoutStepOnePage(page);
    await stepOne.fillForm('Mary', 'Smith', '12345');
    await stepOne.continue();
    await new CheckoutStepTwoPage(page).finish();

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
