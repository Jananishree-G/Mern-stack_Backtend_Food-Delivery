const Order = require('../models/Order');
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
  try {
    const { deliveryAddress, paymentMethod } = req.body;
    
    const cart = await Cart.findOne({ user: req.user.id })
      .populate('items.menuItem')
      .populate('restaurant');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = new Order({
      user: req.user.id,
      restaurant: cart.restaurant._id,
      items: cart.items.map(item => ({
        menuItem: item.menuItem._id,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: cart.totalAmount,
      deliveryAddress,
      paymentMethod
    });

    await order.save();
    
    // Clear cart after order
    cart.items = [];
    cart.totalAmount = 0;
    cart.restaurant = null;
    await cart.save();

    await order.populate('restaurant', 'name');
    await order.populate('items.menuItem', 'name image');
    
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('restaurant', 'name')
      .populate('items.menuItem', 'name image')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('restaurant', 'name')
      .populate('items.menuItem', 'name image');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrders, getOrderById };