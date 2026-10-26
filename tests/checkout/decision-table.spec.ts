import { test, expect } from '../fixtures';
import { validCustomer } from '../../test-data/checkout';
import { beginCheckoutWithEmptyCart, beginCheckoutWithItem, continueExpectingError } from '../helpers/checkoutFlow';

test.describe('Empty or filled cart', () => {
  // Expected to fail while the defect exists: the terminal shows ✘, but it counts
  // as passed. It takes about 5s because not.toHaveURL waits the full timeout.
  // If it turns red, the defect is fixed: remove test.fail. See "Known defects" in the README.
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
