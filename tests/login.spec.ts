import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../data/loginData.json';
import config from '../config/config.json';

interface LoginData {
  username: string;
  password: string;
  valid: boolean;
}
console.log("Test the yaml code push");
test.describe('Login Scenarios', () => {
  for (const data of loginData as LoginData[]) {
    test(`Login test for user: ${data.username} (valid: ${data.valid})`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      
      // Take screenshot of initial login page
      await loginPage.goto(config.baseURL);
      await page.screenshot({ path: `./screenshots/login-initial-${data.username}.png` });
      
      // Take screenshot after entering credentials
      await loginPage.login(data.username, data.password);
      await page.screenshot({ path: `./screenshots/login-after-submit-${data.username}.png` });
      
      if (data.valid) {
        await expect(page).toHaveURL(/inventory/);
        // Take screenshot of successful login
        await page.screenshot({ path: `./screenshots/login-success-${data.username}.png` });
      } else {
        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).not.toBeNull();
        // Take screenshot of failed login
        await page.screenshot({ path: `./screenshots/login-failure-${data.username}.png` });
      }
    });
  }
}); 