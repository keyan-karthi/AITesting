import { Page, expect } from '@playwright/test';

export class CartPage {
  private page: Page;
  private addToCartButton;
  private cartIcon;
  private checkoutButton;
  private firstNameInput;
  private lastNameInput;
  private postalCodeInput;
  private continueButton;
  private finishButton;
  private successMessage;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.successMessage = page.locator('.complete-header');
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  async checkout(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.checkoutButton.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
    await this.finishButton.click();
  }

  async isCheckoutComplete(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }
} 