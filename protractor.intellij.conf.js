// Protractor configuration
// https://github.com/angular/protractor/blob/master/referenceConf.js

'use strict';
var admin_theme_on_prepare = require("./tests/e2e/admin/themes/admin_theme_on_prepare");

exports.config = {
  // The timeout for each script run on the browser. This should be longer
  // than the maximum time your application needs to stabilize between tasks.
  allScriptsTimeout: 110000,

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:' + (process.env.PORT || '9876'),

  // If true, only chromedriver will be started, not a standalone selenium.
  // Tests for browsers other than chrome will not run.
  chromeOnly: true,

  // list of files / patterns to load in the browser
  specs: [
    'tests/e2e/admin/login/admin_login.spec.js',

    /* Products */
    'tests/e2e/admin/products/admin_products.spec.js',
    'tests/e2e/admin/products/admin_add_product.spec.js',
    'tests/e2e/admin/products/admin_edit_product.spec.js',

    /* Themes */
    'tests/e2e/admin/themes/admin_themes.spec.js'
  ],

  // Patterns to exclude.
  exclude: [],

  // ----- Capabilities to be passed to the webdriver instance ----
  //
  // For a full list of available capabilities, see
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities
  // and
  // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
  capabilities: {
    'browserName': 'chrome',
    "chromeOptions": {
      binary: "/Applications/Google Chrome Stable.app/Contents/MacOS/Google Chrome",
      args: [],
      extensions: []
    }
  },

  // ----- The test framework -----
  //
  // Jasmine and Cucumber are fully supported as a test and assertion framework.
  // Mocha has limited beta support. You will need to include your own
  // assertion framework if working with mocha.
  framework: 'jasmine',

  // ----- Options to be passed to minijasminenode -----
  //
  // See the full list at https://github.com/juliemr/minijasminenode
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  onPrepare: function(done) {
    admin_theme_on_prepare.init(done);
  }
};
