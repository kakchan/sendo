var should = require('should');
var ThemeService = require("../../../../server/admin/api/themes/theme.service");
var config = require("../../../../server/config/environment");
var async = require('async');
var test_helper = require('../../../helpers/test_helper');
var theme_test_helper = require('../../../helpers/theme_test_helper');

describe('Theme Service', function() {
  before(function( done ) {
    var me = this;
    async.waterfall( [
      function(create_theme_directories_done) {
        theme_test_helper.create_theme_directories( [
          "theme_1",
          "theme_2",
          "theme_3"
        ], create_theme_directories_done );
      },
      function(create_theme_json_files_done) {
        me._correct_theme_json_data = [
          { pathname: "theme_1", name: "Theme 1" },
          { pathname: "theme_2", name: "Theme 2" },
          { pathname: "theme_3", name: "Theme 3" }
        ];
        theme_test_helper.create_theme_json_files(me._correct_theme_json_data, create_theme_json_files_done);
      }
    ], done );
  });

  describe("get_directory_list", function() {
    it("should return a list of directories", function(done) {
      ThemeService.get_directory_list(config.themes_path, function( err, directories ) {
        var expected_directory_result = [
          { name: "default" },
          { name: "theme_1" },
          { name: "theme_2" },
          { name: "theme_3" }
        ];
        directories.length.should.equal( expected_directory_result.length );
        test_helper.partial_array_eql(directories, expected_directory_result);
        done();
      } );
    } );
  } );

  describe( "get_theme_info", function() {
    it( "should return correct theme information", function(done) {
      async.each(this._correct_theme_json_data, function( theme_test_data, theme_test_done ) {
        var theme_path = config.themes_path + "/" + theme_test_data.pathname;
        var theme_json_file_path = ThemeService.create_theme_json_file_path(theme_path);
        ThemeService.get_theme_info(theme_json_file_path, function(err, theme_info) {
          theme_info.name.should.equal(theme_test_data.name);
          theme_test_done( null );
        } );
      }, done );
    } );

    it( "should return error if file does not exists", function( done ) {
      ThemeService.get_theme_info("", function( err, theme_info ) {
        err.code.should.equal( "ENOENT" );
        done();
      } );
    } );

    it( "should return error if file is not in json format", function( done ) {
      ThemeService.get_theme_info(config.product_photo_path + "/green_apple.gif", function( err, theme_info ) {
        should.exists( err );
        done();
      } );
    } );
  } );

  describe( "get_themes_info_by_theme_root_dir", function() {
    it( "should return all theme information within the directory", function( done ) {
      var expected_result = [
        {
          name: "Sendo Default Theme",
          path: "default"
        },
        {
          name: "Theme 1",
          path: "theme_1"
        },
        {
          name: "Theme 2",
          path: "theme_2"
        },
        {
          name: "Theme 3",
          path: "theme_3"
        }
      ];
      ThemeService.get_themes_info_by_theme_root_dir( config.themes_path, function( err, themes_info ) {
        themes_info.should.eql( expected_result );
        done();
      } );
    } );
  } );
} );
