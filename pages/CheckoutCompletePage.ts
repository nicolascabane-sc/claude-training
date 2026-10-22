import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.getByTestId('complete-header');
    this.backToProductsButton = page.getByTestId('back-to-products');
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }
}
