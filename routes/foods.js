const express = require('express');
const Food = require('../models/Food');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all foods
router.get('/', async (req, res) => {
  try {
    const { restaurant, category } = req.query;
    let query = { isAvailable: true };
    
    if (restaurant) query.restaurant = restaurant;
    if (category) query.category = category;
    
    const foods = await Food.find(query).populate('restaurant', 'name');
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get foods by restaurant
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const foods = await Food.find({ 
      restaurant: req.params.restaurantId, 
      isAvailable: true 
    }).populate('restaurant', 'name');
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get food by ID
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('restaurant');
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create food item
router.post('/', authMiddleware, async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();
    await food.populate('restaurant', 'name');
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update food item
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('restaurant', 'name');
    
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete food item
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;