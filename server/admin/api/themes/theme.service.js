var fs = require('fs');
var async = require('async');
var config = require('../../../config/environment');

var get_directory_list = function( path, get_directory_list_done ) {
  async.waterfall( [
    // read directory
    function(read_directory_done) {
      fs.readdir(path, function(err, files) {
        read_directory_done( null, files );
      });
    },
    // get directories
    function( files_or_directories, get_directories_done ) {
      if ( files_or_directories === undefined ) {
        get_directories_done(null, []);
        return;
      }
      async.map(files_or_directories, function( name, done ) {
        fs.stat( path + "/" + name, function( err, stat ) {
          done( null, { name: name, is_directory: stat.isDirectory() } );
        } );
      }, function( err, results ) {
        if ( err ) {
          get_directories_done( err );
          return;
        }
        var directories = results.filter( function( result ) {
          return result.is_directory;
        });
        get_directories_done( null, directories );
      } );
    }
  ], get_directory_list_done);
};

var get_theme_info = function( path, done ) {
  fs.readFile(path, function( err, data ) {
    if (err) {
      done( err );
      return;
    }
    try {
      var json = JSON.parse( data );
      done( null, json );
    } catch( err ) {
      done( err );
    }
  });
};

var get_themes_info_from_theme_json_file = function( base_dir, directories_info, done ) {
  async.map( directories_info, function( directory_info, get_theme_info_done ) {
    var theme_file_root_path = base_dir + "/" + directory_info.name;
    var theme_json_path = create_theme_json_file_path( theme_file_root_path );
    get_theme_info( theme_json_path, function( err, theme_info ) {
      theme_info.path = directory_info.name;
      get_theme_info_done( err, theme_info );
    } );
  }, done );
};

var get_themes_info_by_theme_root_dir = function(dir, done) {
  async.waterfall( [
    get_directory_list.bind( null, dir ),
    get_themes_info_from_theme_json_file.bind( null, dir )
  ], done);
};

var create_theme_json_file_path = function(path) {
  return path + "/theme.json";
};

module.exports = {
  create_theme_json_file_path: create_theme_json_file_path,
  get_directory_list: get_directory_list,
  get_theme_info: get_theme_info,
  get_themes_info_by_theme_root_dir: get_themes_info_by_theme_root_dir
};
