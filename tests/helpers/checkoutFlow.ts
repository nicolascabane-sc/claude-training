import { Page, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutStepOnePage } from '../../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';

export const STANDARD_USER = { username: 'standard_user', password: 'secret_sauce' };

/** Logs in as standard_user and asserts the inventory page is shown. */
export async function loginAsStandardUser(page: Page) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(STANDARD_USER.username, STANDARD_USER.password);
  await expect(page).toHaveURL(/inventory\.html/);
}

/** Opens the cart and asserts it is shown. */
export async function openCart(page: Page) {
  await new InventoryPage(page).openCart();
  await expect(page).toHaveURL(/cart\.html/);
}

/** Starts checkout from the cart and asserts step one is shown. */
export async function startCheckout(page: Page) {
  await new CartPage(page).checkout();
  await expect(page).toHaveURL(/checkout-step-one\.html/);
}

/**
 * Logs in, adds one product, opens the cart and starts checkout.
 * Used by tests that need a non-empty cart at step one.
 */
export async function beginCheckoutWithItem(page: Page, productSlug = 'sauce-labs-backpack') {
  await loginAsStandardUser(page);
  await new InventoryPage(page).addToCart(productSlug);
  await openCart(page);
  await startCheckout(page);
}

/**
 * Fills step one, continues to the overview, finishes, and asserts the
 * confirmation page is shown with the expected header.
 */
export async function completeCheckout(page: Page, firstName: string, lastName: string, zip: string) {
  const stepOne = new CheckoutStepOnePage(page);
  await stepOne.fillForm(firstName, lastName, zip);
  await stepOne.continue();
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  await new CheckoutStepTwoPage(page).finish();
  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(new CheckoutCompletePage(page).completeHeader).toHaveText('Thank you for your order!');
}

/** Continues from step one and asserts checkout is blocked with a validation error. */
export async function continueExpectingError(page: Page) {
  const stepOne = new CheckoutStepOnePage(page);
  await stepOne.continue();
  await expect(page).toHaveURL(/checkout-step-one\.html/);
  await expect(stepOne.errorMessage).toBeVisible();
}
