module.exports = {
  error_handler: function( err ) {
    var messages = [];
    if ( err && err.errors ) {
      var errors = err.errors;
      for ( var field_name in errors ) {
        var message = errors[field_name].message;
        messages.push( message );
      }
    }
    return messages;
  },

  pad_zero: function( obj, digits ) {
    var str = obj + "";
    var len = str.length;
    for ( var i = len; i < digits; i++ ) {
      str = "0" + str;
    }
    return str;
  }
};
