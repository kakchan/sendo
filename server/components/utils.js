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
  }
};
