import { Page } from "@playwright/test";
import { ToDoPage } from "./to-do-page";
import ToDoPage2 from "./to-do-page2";

export default class PageObjects {
    toDo1: ToDoPage
    toDo2: ToDoPage2

    constructor(public page: Page) {
        this.toDo1 = new ToDoPage(page);
        this.toDo2 = new ToDoPage2(page);
    }
}