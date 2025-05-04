// models/dishModel.js
const mongoose = require('mongoose');

// Define the schema for a Dish
const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  restaurantName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  active: { type: Boolean, default: false }
});

// Create the model based on the schema
const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;