const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ isActive: true });
    res.json({ success: true, data: restaurants });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json({ success: true, data: restaurant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRestaurantMenu = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ 
      restaurant: req.params.id, 
      isAvailable: true 
    }).populate('restaurant', 'name');
    
    res.json({ success: true, data: menuItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRestaurants, getRestaurantById, getRestaurantMenu };