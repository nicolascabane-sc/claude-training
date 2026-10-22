import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutStepOnePage } from '../../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';

test.describe('Checkout: happy path', () => {
  test('standard_user can complete a purchase from login to order confirmation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const stepOne = new CheckoutStepOnePage(page);
    const stepTwo = new CheckoutStepTwoPage(page);
    const complete = new CheckoutCompletePage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.openCart();
    await expect(page).toHaveURL(/cart\.html/);

    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    await stepOne.fillForm('Name', 'Last name here', 'myzip123');
    await stepOne.continue();
    await expect(page).toHaveURL(/checkout-step-two\.html/);

    await stepTwo.finish();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(complete.completeHeader).toHaveText('Thank you for your order!');

    await complete.backToProducts();
    await expect(page).toHaveURL(/inventory\.html/);
  });
});
