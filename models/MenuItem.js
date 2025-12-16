const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Pizza', 'Burger', 'Meals', 'Desserts', 'Beverages', 'Appetizers']
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  isVegetarian: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number,
    default: 15
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);