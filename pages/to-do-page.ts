import { Page } from '@playwright/test';

export class ToDoPage {
    constructor(public page: Page) {

    }

    public newToDo = this.page.getByPlaceholder('What needs to be done?')
    public toDoTitle = this.page.getByTestId('todo-title');
    public toDoCount = this.page.getByTestId('todo-count')


    async addToDo(todo: string) {
        await this.newToDo.fill(todo);
        await this.newToDo.press('Enter');
    }

    async checkNumberOfTodosInLocalStorage(expected: number) {
        return await this.page.waitForFunction(e => {
            return JSON.parse(localStorage['react-todos']).length === e;
        }, expected);
    }

}