var bunyan = require('bunyan');
var PrettyStream = require('bunyan-prettystream');
var prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

var log = bunyan.createLogger({
  name: "sendo",
  streams: [
    {
      level: 'trace',
      stream: prettyStdOut
    },
    {
      level: 'info',
      path: ".tmp/logs/sendo.info.log",
      period: "1d",
      count: 20
    },
    {
      level: 'error',
      path: ".tmp/logs/sendo.error.log",
      period: "1d",
      count: 20
    }
  ]
});
module.exports = log;
