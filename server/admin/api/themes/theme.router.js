var config = require('../../../config/environment');
var ThemeService = require('./theme.service');

exports.index = function(req, res) {
  ThemeService.get_themes_info_by_theme_root_dir( config.themes_path, function(err, themes_info) {
    res.json( {
      themes_info: themes_info
    });
  });
};
