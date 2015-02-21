'use strict';

var express = require('express');
var user_router = require('./user.router');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), user_router.index);
router.delete('/:id', auth.hasRole('admin'), user_router.destroy);
router.get('/me', auth.isAuthenticated(), user_router.me);
router.put('/:id/password', auth.isAuthenticated(), user_router.changePassword);
router.get('/:id', auth.isAuthenticated(), user_router.show);
router.post('/', user_router.create);

module.exports = router;
