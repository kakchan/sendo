'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  shop_id: { type: Number, index: true },
  title: String,
  description: String,
  page_title: String,
  meta_description: String,
  handle: String,
  images: [],
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model( "Product", ProductSchema, "Products" );

/**
 * Validations
 */

// Validate empty email
ProductSchema
  .path('title')
  .validate(function(title) {
    return title.length;
  }, 'Product Title cannot be blank');
