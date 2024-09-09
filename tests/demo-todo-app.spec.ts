import { test, expect } from '../pages/custom-fixture'

// const ToDo: ToDoPage;

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

});

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
] as const;

test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ pages }) => {
    await pages.toDo1.addToDo(TODO_ITEMS[0])

    await expect(pages.toDo1.toDoTitle).toHaveText([
      TODO_ITEMS[0]
    ]);

    await pages.toDo1.addToDo(TODO_ITEMS[1])

    // Make sure the list now has two todo items.
    await expect(pages.toDo1.toDoTitle).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[1]
    ]);

    await pages.toDo1.checkNumberOfTodosInLocalStorage(2);
  });

  test('should clear text input field when an item is added', async ({ pages }) => {
    await pages.toDo1.addToDo(TODO_ITEMS[0])

    // Check that input is empty.
    await expect(pages.toDo1.newToDo).toBeEmpty();
    await pages.toDo1.checkNumberOfTodosInLocalStorage(1);
  });

  test('should append new items to the bottom of the list', async ({ pages }) => {
    // Create 3 items.
    await pages.toDo2.createDefaultTodos();
  
    // Check test using different methods.
    await expect(pages.page.getByText('3 items left')).toBeVisible();
    await expect(pages.toDo1.toDoCount).toHaveText('3 items left');
    await expect(pages.toDo1.toDoCount).toContainText('3');
    await expect(pages.toDo1.toDoCount).toHaveText(/3/);

    // Check all items in one call.
    await expect(pages.toDo1.toDoTitle).toHaveText(TODO_ITEMS);
    await pages.toDo1.checkNumberOfTodosInLocalStorage(3);
  });
});

