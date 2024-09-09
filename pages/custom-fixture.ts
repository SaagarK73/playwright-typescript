import { test as baseTest } from "@playwright/test"
import PageObjects from "./parentPage"

type pages = {
    pages: PageObjects;
}

const testPages = baseTest.extend<pages>({
    pages: async ({page}, use) => {
        await use(new PageObjects(page));
    }
})

export const test = testPages;
export const expect = testPages.expect;