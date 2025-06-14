const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const loginData = require('../data/loginData.json');
const config = require('../config/config.json');

test.describe('Login Scenarios', () => {
  for (const data of loginData) {
    test(`Login test for user: ${data.username} (valid: ${data.valid})`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto(config.baseURL);
      await loginPage.login(data.username, data.password);
      if (data.valid) {
        await expect(page).toHaveURL(/inventory/);
      } else {
        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).not.toBeNull();
      }
    });
  }
}); 