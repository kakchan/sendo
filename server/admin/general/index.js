'use strict';

var express = require('express');
var configuration_router = require('./configuration.router.js');
var auth = require('../auth/auth.service.js');

var router = express.Router();

router.get('/config', auth.hasRole('admin'), configuration_router.index);

module.exports = router;
