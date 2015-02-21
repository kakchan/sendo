'use strict';

var express = require('express');
var ProductRouter = require('./product.router');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), ProductRouter.index);
router.delete('/:id', auth.hasRole('admin'), ProductRouter.destroy);
router.post('/', ProductRouter.create);

module.exports = router;
