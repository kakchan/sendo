var async = require('async');
var fs = require('fs-extra');
var config = require('../../config/environment/index');
var ThemeService = require('../../admin/api/themes/theme.service.js');

var create_directory = function( path, done ) {
  fs.mkdirp( path, function( err ) {
    done( err );
  });
};

var create_theme_directories = function( directory_names, done ) {
  async.each( directory_names, function( directory_name, create_directory_done ) {
    create_directory( config.themes_path + "/" + directory_name, create_directory_done );
  }, done );
};

var create_theme_json_file = function( path, theme_name, done ) {
  var json = {};
  json.name = theme_name;
  fs.writeFile(path, JSON.stringify( json ), function (err) {
    done( err );
  });
};

var create_theme_json_files = function( data, done ) {
  async.each( data, function( theme, create_theme_json_file_done ) {
    var file_path = ThemeService.create_theme_json_file_path(config.themes_path + "/" + theme.pathname );
    create_theme_json_file(file_path, theme.name, create_theme_json_file_done );
  }, done );
};

module.exports = {
  create_theme_directories: create_theme_directories,
  create_theme_json_files: create_theme_json_files
};
