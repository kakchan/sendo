var bunyan = require('bunyan');
var PrettyStream = require('bunyan-prettystream');
var prettyStdOut = new PrettyStream();
var config = require('../config/environment');
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
      path: config.log_files_root_path + "/sendo.info.log",
      period: "1d",
      count: 20
    },
    {
      level: 'error',
      path: config.log_files_root_path + "/sendo.error.log",
      period: "1d",
      count: 20
    }
  ]
});
module.exports = log;
