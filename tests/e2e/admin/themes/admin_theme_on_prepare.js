var async = require('async');
var theme_test_helper = require('../../../helpers/theme_test_helper');

var init = function(done) {
  async.waterfall( [
    function(create_theme_directories_done) {
      theme_test_helper.create_theme_directories( [
        "theme_1",
        "theme_2",
        "theme_3"
      ], create_theme_directories_done );
    },
    function(create_theme_json_files_done) {
      var correct_theme_json_data = [
        { pathname: "theme_1", name: "Theme 1" },
        { pathname: "theme_2", name: "Theme 2" },
        { pathname: "theme_3", name: "Theme 3" }
      ];
      theme_test_helper.create_theme_json_files(correct_theme_json_data, create_theme_json_files_done);
    }
  ], done );
};

module.exports = {
  init: init
};
