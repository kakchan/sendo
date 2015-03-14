/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/admin/api/users', require('./admin/api/user'));
  app.use('/admin/api/products', require('./admin/api/products'));
  app.use('/admin/api/themes', require('./admin/api/themes'));
  app.use('/admin/auth', require('./admin/auth'));
  app.use('/admin/general', require('./admin/general'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(admin\/api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
