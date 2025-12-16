const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');
const { foodItems } = require('../data/foodData');

const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id })
      .populate('items.menuItem')
      .populate('restaurant', 'name');
    
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }
    
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { menuItemId, quantity = 1 } = req.body;
    
    // Try to find in database first, then fallback to static data
    let menuItem = await MenuItem.findById(menuItemId).populate('restaurant');
    
    if (!menuItem) {
      // Fallback to static food data
      const staticItem = foodItems.find(item => item.id === menuItemId);
      if (!staticItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      
      // Create a mock menu item for cart operations
      menuItem = {
        _id: staticItem.id,
        name: staticItem.name,
        price: staticItem.price,
        restaurant: { _id: 'default-restaurant', name: 'Sample Restaurant' }
      };
    }

    let cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      cart = new Cart({ 
        user: req.user.id, 
        items: [], 
        restaurant: menuItem.restaurant._id || 'default-restaurant'
      });
    }

    cart.restaurant = menuItem.restaurant._id || 'default-restaurant';

    const existingItem = cart.items.find(item => 
      item.menuItem.toString() === menuItemId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        menuItem: menuItemId,
        quantity,
        price: menuItem.price
      });
    }

    cart.calculateTotal();
    await cart.save();
    
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;
    
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(item => 
        item.menuItem.toString() !== menuItemId
      );
    } else {
      const item = cart.items.find(item => 
        item.menuItem.toString() === menuItemId
      );
      if (item) {
        item.quantity = quantity;
      }
    }

    cart.calculateTotal();
    await cart.save();
    
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => 
      item.menuItem.toString() !== id
    );

    cart.calculateTotal();
    await cart.save();
    
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = [];
      cart.totalAmount = 0;
      cart.restaurant = null;
      await cart.save();
    }
    
    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };