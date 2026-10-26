import { test, expect } from '../fixtures';
import { validCustomer } from '../../test-data/checkout';
import { beginCheckoutWithEmptyCart, beginCheckoutWithItem, continueExpectingError } from '../helpers/checkoutFlow';

test.describe('Empty or filled cart', () => {
  test('an empty cart cannot be ordered', async ({ page, checkoutStepOnePage, checkoutStepTwoPage }) => {
    test.fail(true, 'Known defect: an order completes with an empty cart');

    await beginCheckoutWithEmptyCart(page);

    await checkoutStepOnePage.fillForm(validCustomer);
    await checkoutStepOnePage.continue();
    await checkoutStepTwoPage.finish();

    await expect(page).not.toHaveURL(/checkout-complete\.html/);
  });

  test('empty cart and empty form shows an error', async ({ page }) => {
    await beginCheckoutWithEmptyCart(page);

    await continueExpectingError(page);
  });

  test('filled cart and empty form shows an error', async ({ page }) => {
    await beginCheckoutWithItem(page);

    await continueExpectingError(page);
  });
});
