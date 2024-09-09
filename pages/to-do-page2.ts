import { Page } from "@playwright/test";

export default class ToDoPage2 {
    constructor (public page: Page) {}
    
    public newToDo = this.page.getByPlaceholder('What needs to be done?')
    public markComplete = this.page.getByLabel('Mark all as complete')
    
    async createDefaultTodos() {
        // create a new todo locator
        const TODO_ITEMS = [
            'buy some cheese',
            'feed the cat',
            'book a doctors appointment'
          ] as const;
    
        for (const item of TODO_ITEMS) {
            await this.newToDo.fill(item);
            await this.newToDo.press('Enter');
        }
    }
}