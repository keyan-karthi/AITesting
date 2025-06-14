import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import config from '../config/config.json';

const validUser = { username: 'standard_user', password: 'secret_sauce' };

test('Add to cart and checkout scenario', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto(config.baseURL);
  await loginPage.login(validUser.username, validUser.password);
  await expect(page).toHaveURL(/inventory/);
  await page.screenshot({ path: './screenshots/checkout-after-login.png' });

  await cartPage.addToCart();
  await page.screenshot({ path: './screenshots/checkout-after-add-to-cart.png' });

  await cartPage.goToCart();
  await expect(page).toHaveURL(/cart/);
  await page.screenshot({ path: './screenshots/checkout-cart-page.png' });

  await cartPage.checkout('John', 'Doe', '12345');
  await page.screenshot({ path: './screenshots/checkout-complete.png' });
  
  expect(await cartPage.isCheckoutComplete()).toBeTruthy();
  await page.screenshot({ path: './screenshots/checkout-success.png' });
}); 