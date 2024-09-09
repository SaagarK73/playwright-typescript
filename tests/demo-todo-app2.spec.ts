import { test, expect } from '../pages/custom-fixture'
import { Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
});

test.describe('Mark all as completed', () => {
    test.beforeEach(async ({ pages }) => {
        await pages.toDo2.createDefaultTodos();
        await pages.toDo1.checkNumberOfTodosInLocalStorage(3);
    });

    test.afterEach(async ({ pages }) => {
        await pages.toDo1.checkNumberOfTodosInLocalStorage(3);
    });

    test('should allow me to mark all items as completed', async ({ pages, page }) => {
        // Complete all todos.
        await pages.toDo2.markComplete.check();

        // Ensure all todos have 'completed' class.
        await expect(page.getByTestId('todo-item')).toHaveClass(['completed', 'completed', 'completed']);
        await checkNumberOfCompletedTodosInLocalStorage(page, 3);
    });

    test('should allow me to clear the complete state of all items', async ({ page, pages }) => {

        // Check and then immediately uncheck.
        await pages.toDo2.markComplete.check();
        await pages.toDo2.markComplete.uncheck();

        // Should be no completed classes.
        await expect(page.getByTestId('todo-item')).toHaveClass(['', '', '']);
    });

    test('complete all checkbox should update state when items are completed / cleared', async ({ page }) => {
        const toggleAll = page.getByLabel('Mark all as complete');
        await toggleAll.check();
        await expect(toggleAll).toBeChecked();
        await checkNumberOfCompletedTodosInLocalStorage(page, 3);

        // Uncheck first todo.
        const firstTodo = page.getByTestId('todo-item').nth(0);
        await firstTodo.getByRole('checkbox').uncheck();

        // Reuse toggleAll locator and make sure its not checked.
        await expect(toggleAll).not.toBeChecked();

        await firstTodo.getByRole('checkbox').check();
        await checkNumberOfCompletedTodosInLocalStorage(page, 3);

        // Assert the toggle all is checked again.
        await expect(toggleAll).toBeChecked();
    });
});


async function checkNumberOfCompletedTodosInLocalStorage(page: Page, expected: number) {
    return await page.waitForFunction(e => {
        return JSON.parse(localStorage['react-todos']).filter((todo: any) => todo.completed).length === e;
    }, expected);
}

async function checkTodosInLocalStorage(page: Page, title: string) {
    return await page.waitForFunction(t => {
        return JSON.parse(localStorage['react-todos']).map((todo: any) => todo.title).includes(t);
    }, title);
}