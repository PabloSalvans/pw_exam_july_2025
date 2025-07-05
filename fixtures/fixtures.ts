import { expect, test as base } from '@playwright/test';
import { PageManager } from '../pageManagers/pageManager';

interface LocalFixtures {
  pageManager: PageManager;
}

export const test = base.extend<LocalFixtures>({
  pageManager: async ({ page }, use) => {
    const pageManager = new PageManager(page);
    await use(pageManager);
  },
});

export { expect };
declare module '@playwright/test' {
  interface PlaywrightTestArgs {
    pageManager: PageManager;
  }
}
