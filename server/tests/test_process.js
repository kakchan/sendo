var start_server = require('../start_server');
var _started = false;

var start = function(done) {
  if ( _started ) {
    console.log( "Server has already been started" );
    done && done();
    return;
  }
  start_server(function() {
    _started = true;
    done && done();
  });
};

var stop = function(done) {
  done();
};

module.exports = {
  start: start,
  stop: stop
};
