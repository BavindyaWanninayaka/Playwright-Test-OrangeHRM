const {test, expect} = require('@playwright/test')

test('My Test Case', async ({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com');
    await expect(page).toHaveTitle('OrangeHRM');

    await page.getByRole('textbox', { name: 'username' }).fill('admin');
    await page.getByRole('textbox', { name: 'password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

} )

