import { defineConfig } from "eslint/config";
import pluginCypress from "eslint-plugin-cypress";

export default defineConfig([
  {
    files: ["e2e/cypress/**/*.js"],
    extends: [pluginCypress.configs.recommended],
    rules: {
      "cypress/no-force": "off",
    },
  },
]);
