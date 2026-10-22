import { existsSync } from 'node:fs';
import { defineConfig, devices } from '@playwright/test';

// Load credentials from .env when it exists. CI sets them as environment variables instead.
if (existsSync('.env')) process.loadEnvFile();

// See https://playwright.dev/docs/test-configuration.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com',
    // saucedemo marks elements with data-test, so getByTestId() targets that attribute.
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
