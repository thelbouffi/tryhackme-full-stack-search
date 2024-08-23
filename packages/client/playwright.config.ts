import { defineConfig, devices } from "@playwright/test";
import { CLIENT_BASE_URL } from "./src/utils/config";


export default defineConfig({
  testDir: "./src/tests/e2e",
  timeout: 30000,
  retries: 2,
  use: {
    baseURL: CLIENT_BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],
  webServer: {
    command: "npm run start",
    url: CLIENT_BASE_URL,
    stdout: "pipe",
    stderr: "pipe",
    reuseExistingServer: true,
  },
});
