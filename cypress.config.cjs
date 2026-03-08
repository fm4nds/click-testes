const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  video: true,
  screenshotOnRunFailure: true,
  retries: 2,
  viewportWidth: 1280,
  viewportHeight: 720,
  videosFolder: "reports/evidencias/videos",
  screenshotsFolder: "reports/evidencias/screenshots",

  e2e: {
    baseUrl: "https://bugbank.netlify.app/",
    specPattern: "e2e/cypress/**/*.feature",
    supportFile: "e2e/cypress/support/e2e.js",

    async setupNodeEvents(on, config) {
      allureCypress(on, config);
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});
