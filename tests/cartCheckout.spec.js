const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { CartPage } = require('../pages/CartPage');
const config = require('../config/config.json');

const validUser = { username: 'standard_user', password: 'secret_sauce' };

test('Add to cart and checkout scenario', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto(config.baseURL);
  await loginPage.login(validUser.username, validUser.password);
  await expect(page).toHaveURL(/inventory/);

  await cartPage.addToCart();
  await cartPage.goToCart();
  await expect(page).toHaveURL(/cart/);

  await cartPage.checkout('John', 'Doe', '12345');
  expect(await cartPage.isCheckoutComplete()).toBeTruthy();
}); 