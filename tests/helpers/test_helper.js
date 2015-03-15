var config = require("../../server/config/environment/index");
var request = require("request");
var should = require("should");

module.exports = {
  access_token: null,
  get_admin_access_token: function( done ) {
    var me = this;
    request( {
      uri: config.get_admin_login_api_url(),
      method: "POST",
      form: {
        email: "admin@laputan.me",
        password: "password"
      },
      json: true
    }, function( err, data ) {
      var json = data.body;
      me.access_token = json.token;
      done( err, json.token );
    } )
  },

  /* Common */
  admin_request: function( url, options, done ) {
    var me = this;
    options = options || {};

    request( {
      url: url,
      headers: {
        "Authorization": "Bearer " + me.access_token
      },
      qs: options.qs || {},
      json: true
    }, done );
  },

  /* Products */
  get_admin_products: function( options, done ) {
    this.admin_request( config.get_admin_product_api_index_url(), options, done );
  },

  /* Themes */
  get_admin_themes: function( options, done ) {
    this.admin_request( config.get_admin_theme_api_index_url(), options, done );
  },


  // Helper Methods
  partial_array_eql: function(actual_results, expected_results) {
    actual_results.forEach( function( result, index ) {
      var expected_result = expected_results[ index ];
      for ( var key in expected_result ) {
        result[key].should.eql( expected_result[key] );
      }
    } );
  }
};
