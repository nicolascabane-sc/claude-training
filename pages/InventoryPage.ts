import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  addToCart(productSlug: string) {
    return this.page.locator(`[data-test="add-to-cart-${productSlug}"]`).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
