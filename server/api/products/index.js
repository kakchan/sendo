'use strict';

var express = require('express');
var ProductRouter = require('./product.router');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var multer = require('multer');
var router = express.Router();

var upload_product_photo = function() {
  return multer({
    dest: config.product_photo_path,
    rename: function (fieldname, filename) {
      return (filename + "_" + Date.now()).toLowerCase();
    }
  });
};


router.get('/', auth.hasRole('admin'), ProductRouter.index);
router.post('/', auth.hasRole('admin'), ProductRouter.create);
router.post('/upload_photo', auth.hasRole('admin'), upload_product_photo(), ProductRouter.upload_photo);
router.delete('/delete_photo', auth.hasRole('admin'), ProductRouter.delete_photo );

module.exports = router;
