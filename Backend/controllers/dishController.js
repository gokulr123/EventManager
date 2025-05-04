// routes/dishRoutes.js
const express = require('express');
const Dish = require('../models/dish');
const Event =require('../models/event') 
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
        const dishes = await Dish.find({ active: true }); // Retrieve all dishes
        res.status(200).json(dishes);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch dishes', error: err.message });
      }
   
};

const activateDishes = async (req,res)=>{
  const { restaurantName, dishType } = req.body;

  if (!restaurantName || !dishType) {
    return res.status(400).json({ message: 'restaurantName and dishType are required' });
  }

  try {
    const result = await Dish.updateMany(
      {
        restaurantName: restaurantName,
        category: dishType
      },
      { $set: { active: true } }
    );

    res.status(200).json({
      message: `${result.modifiedCount} dishes activated for ${restaurantName} - ${dishType}`,
    });
  } catch (error) {
    console.error('Error activating dishes:', error);
    res.status(500).json({ message: 'Failed to activate dishes', error: error.message });
  }
};

const deactivateDishes = async (req,res)=>{
  const { restaurantName, dishType } = req.body;

  if (!restaurantName || !dishType) {
    return res.status(400).json({ message: 'restaurantName and dishType are required' });
  }

  try {
    const result = await Dish.updateMany(
      {
        restaurantName: restaurantName,
        category: dishType
      },
      { $set: { active: false } }
    );

    res.status(200).json({
      message: `${result.modifiedCount} dishes activated for ${restaurantName} - ${dishType}`,
    });
  } catch (error) {
    console.error('Error activating dishes:', error);
    res.status(500).json({ message: 'Failed to activate dishes', error: error.message });
  }
};

const getDishSummary=async(req,res)=>{

  try{
    const event = await Event.findById(req.params.eventId).lean();
    if (!event) return res.status(404).json({ message: "Event not found" });
    const dishIdCountMap = {};

  for (const participant of event.participants) {
    if (participant.isDishSelected) {
      for (const { dish, quantity } of participant.selectedDishes) {
        const dishIdStr = dish.toString();
        dishIdCountMap[dishIdStr] = (dishIdCountMap[dishIdStr] || 0) + quantity;
      }
    }
  }

  const dishIds = Object.keys(dishIdCountMap);
  const dishes = await Dish.find({ _id: { $in: dishIds } }).lean();
  

  const summaryByRestaurant = {};

  dishes.forEach((dish) => {
    const quantity = dishIdCountMap[dish._id.toString()];
    const restaurant = dish.restaurantName;

    if (!summaryByRestaurant[restaurant]) {
      summaryByRestaurant[restaurant] = {
        dishes: [],
        totalItems: 0,
        totalPrice: 0,
      };
    }

    summaryByRestaurant[restaurant].dishes.push({
      name: dish.name,
      quantity,
    });

    summaryByRestaurant[restaurant].totalItems += quantity;
    summaryByRestaurant[restaurant].totalPrice += dish.price * quantity;
  });

    res.json(summaryByRestaurant);
  } catch(err)
  {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const generateDishSummary = async (eventId, io) => {
  console.log("Generating summary for event:", eventId);
  
  const event = await Event.findById(eventId).lean();
  if (!event) return;

  const dishIdCountMap = {};

  for (const participant of event.participants) {
    if (participant.isDishSelected) {
      for (const { dish, quantity } of participant.selectedDishes) {
        const dishIdStr = dish.toString();
        dishIdCountMap[dishIdStr] = (dishIdCountMap[dishIdStr] || 0) + quantity;
      }
    }
  }

  const dishIds = Object.keys(dishIdCountMap);
  console.log(dishIds)
  const dishes = await Dish.find({ _id: { $in: dishIds } }).lean();
  

  const summaryByRestaurant = {};

  dishes.forEach((dish) => {
    const quantity = dishIdCountMap[dish._id.toString()];
    const restaurant = dish.restaurantName;

    if (!summaryByRestaurant[restaurant]) {
      summaryByRestaurant[restaurant] = {
        dishes: [],
        totalItems: 0,
        totalPrice: 0,
      };
    }

    summaryByRestaurant[restaurant].dishes.push({
      name: dish.name,
      quantity,
    });

    summaryByRestaurant[restaurant].totalItems += quantity;
    summaryByRestaurant[restaurant].totalPrice += dish.price * quantity;
  });

  console.log("Summary by restaurant:", summaryByRestaurant);

  // Emit to all clients in the room
  io.to(eventId).emit("dish-summary-update", summaryByRestaurant);
};
const getDishActiveStatus = async (req, res) => {
  try {
    const dishes = await Dish.find({}, 'restaurantName category active'); // only return needed fields

    // Group and return unique (restaurantName + category) with active status
    const groupedStatus = [];

    const seen = new Set();

    for (const dish of dishes) {
      const key = `${dish.restaurantName}-${dish.category}`;
      if (!seen.has(key)) {
        seen.add(key);
        groupedStatus.push({
          restaurantName: dish.restaurantName,
          dishType: dish.category,
          active: dish.active
        });
      }
    }

    res.status(200).json(groupedStatus);
  } catch (err) {
    console.error('Error fetching dish active status:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createDish,activateDishes,deactivateDishes, getDishes,generateDishSummary ,getDishSummary,getDishActiveStatus };
