'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductImage = new Schema({
  filename: String,
  size: Number,
  is_default: Boolean
});

var ProductSchema = new Schema({
  shop_id: { type: Number, index: true },
  title: { type: String, required: "'Title' field cannot be blank" },
  description: String,
  page_title: String,
  meta_description: String,
  handle: String,
  images: [ProductImage],
  created_at: Date,
  updated_at: Date
});

/**
 * Validations
 */

ProductSchema
  .path('title')
  .validate(function(title) {
    return (title && title.trim().length > 0) === true;
  }, 'Invalid Title field');

module.exports = mongoose.model( "Product", ProductSchema, "Products" );
