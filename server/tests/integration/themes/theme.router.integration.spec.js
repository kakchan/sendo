'use strict';

var config = require("../../../config/environment/index");
var should = require('should');
var test_helper = require("../../helpers/test_helper");
var theme_test_helper = require('../../helpers/theme_test_helper');
var test_process = require("../../test_process");
var async = require('async');

describe( 'Integration Test - Theme Router', function () {
  before( function( done ) {
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
      },
      function( start_server_done ) {
        test_process.start(start_server_done);
      }
    ], done );
  } );

  beforeEach( function (done) {
    test_helper.get_admin_access_token( function (err, token) {
      should.not.exist(err);
      should.exist(token);
      done();
    } );
  } );

  describe( "index endpoint", function () {
    it( "should return themes details in the theme directory", function( done ) {
      var expected_result = [
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

      test_helper.get_admin_themes( {}, function( err, resp, json ) {
        json.themes_info.length.should.equal( 3 );
        json.themes_info.should.eql( expected_result );
        done();
      } );
    } );
  } );
} );
