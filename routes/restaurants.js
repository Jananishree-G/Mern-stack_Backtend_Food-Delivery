const express = require('express');
const { getRestaurants, getRestaurantById, getRestaurantMenu } = require('../controllers/restaurantController');

const router = express.Router();

router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.get('/:id/menu', getRestaurantMenu);

module.exports = router;