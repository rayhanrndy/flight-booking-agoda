const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
const dotenv = require("dotenv");
dotenv.config();

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/",   // Folder output
    overwrite: true,
    html: false,                          // Jangan generate HTML langsung dari setiap file
    json: true
  },
  e2e: {
    specPattern: "**/*.feature",
    env: {
      ...process.env
    },
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
    },
  },
  video: true,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
});
