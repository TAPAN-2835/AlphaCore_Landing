import { test as base, expect } from "@playwright/test";

// Re-export the base fixtures
export { expect };
export const test = base.extend({});
