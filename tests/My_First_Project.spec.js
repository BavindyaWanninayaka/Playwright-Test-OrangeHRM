const {test, expect} = require('@playwright/test')

// Instead of repeating the URL in every test, store it once
const baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
});

// This avoids repeating the same steps in every test.
async function login(page, username, password) {
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('button[type="submit"]').click();
  }
  
// 1. Correct username and correct password
test('Login with valid credentials', async ({ page }) => {
  await login(page, 'Admin', 'admin123');

// Assertions
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('h6')).toHaveText('Dashboard');
});

// 2. Correct username and incorrect password
test('Valid username + invalid password', async ({ page }) => {
  await login(page, 'Admin', 'wrongPassword');

  const errorMsg = page.locator('.oxd-alert-content-text');

  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toHaveText(/Invalid credentials/);
});

// 3. Incorrect username and correct password
test('Invalid username + valid password', async ({ page }) => {
  await login(page, 'WrongUser', 'admin123');

  const errorMsg = page.locator('.oxd-alert-content-text');

  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toHaveText(/Invalid credentials/);
});

// 4. Incorrect username and incorrect password
test('Invalid username + invalid password', async ({ page }) => {
  await login(page, 'WrongUser', 'wrongPassword');

  const errorMsg = page.locator('.oxd-alert-content-text');

  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toHaveText(/Invalid credentials/);
});



