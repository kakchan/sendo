'use strict';

var express = require('express');
var ThemeRouter = require('./theme.router');
var config = require('../../../config/environment');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', auth.hasRole('admin'), ThemeRouter.index);

module.exports = router;
