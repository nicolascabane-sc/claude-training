import { Page, Locator } from '@playwright/test';

/** The details entered on step one of checkout. */
export type CustomerInfo = {
  firstName: string;
  lastName: string;
  zip: string;
};

export class CheckoutStepOnePage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.errorMessage = page.getByTestId('error');
  }

  async fillForm({ firstName, lastName, zip }: CustomerInfo) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(zip);
  }

  async continue() {
    await this.continueButton.click();
  }
}
