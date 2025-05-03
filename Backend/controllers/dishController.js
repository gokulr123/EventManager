// routes/dishRoutes.js
const express = require('express');
const Dish = require('../models/dish'); // Import the Dish model
const router = express.Router();

// POST route to create a new dish
const createDish = async (req, res) => {
    try {
        const { name, price, restaurantName, category } = req.body;
    
        // Create a new dish
        const newDish = new Dish({
          name,
          price,
          restaurantName,
          category,
        });
    
        // Save the dish to the database
        await newDish.save();
    
        res.status(201).json({ message: 'Dish added successfully', dish: newDish });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add dish', error: err.message });
      }
};


// GET route to fetch all dishes
const getDishes = async (req, res) => {
    try {
        const dishes = await Dish.find(); // Retrieve all dishes
        res.status(200).json(dishes);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch dishes', error: err.message });
      }
   
};

module.exports = { createDish, getDishes };
