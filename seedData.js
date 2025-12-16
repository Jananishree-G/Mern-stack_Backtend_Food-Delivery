const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');

dotenv.config();

const restaurants = [
  {
    name: "Pizza Palace",
    description: "Authentic Italian pizzas with fresh ingredients",
    cuisine: "Italian",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    rating: 4.5,
    deliveryTime: "25-35 mins",
    deliveryFee: 0,
    minimumOrder: 200
  },
  {
    name: "Burger Junction",
    description: "Juicy burgers and crispy fries",
    cuisine: "American",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    rating: 4.3,
    deliveryTime: "20-30 mins",
    deliveryFee: 30,
    minimumOrder: 150
  },
  {
    name: "Spice Garden",
    description: "Traditional Indian cuisine with authentic flavors",
    cuisine: "Indian",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    rating: 4.7,
    deliveryTime: "30-45 mins",
    deliveryFee: 0,
    minimumOrder: 250
  }
];

const menuItems = [
  // Pizza Palace items
  {
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    price: 299,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    isVegetarian: true,
    preparationTime: 20
  },
  {
    name: "Pepperoni Pizza",
    description: "Spicy pepperoni with mozzarella cheese",
    price: 399,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    isVegetarian: false,
    preparationTime: 22
  },
  // Burger Junction items
  {
    name: "Classic Beef Burger",
    description: "Juicy beef patty with lettuce, tomato, and cheese",
    price: 249,
    category: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    isVegetarian: false,
    preparationTime: 15
  },
  {
    name: "Veggie Burger",
    description: "Plant-based patty with fresh vegetables",
    price: 199,
    category: "Burger",
    image: "https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop",
    isVegetarian: true,
    preparationTime: 12
  },
  // Spice Garden items
  {
    name: "Chicken Biryani",
    description: "Aromatic basmati rice with tender chicken",
    price: 349,
    category: "Meals",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400&h=300&fit=crop",
    isVegetarian: false,
    preparationTime: 35
  },
  {
    name: "Paneer Butter Masala",
    description: "Creamy tomato curry with cottage cheese",
    price: 279,
    category: "Meals",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    isVegetarian: true,
    preparationTime: 25
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});
    console.log('Cleared existing data');

    // Create restaurants
    const createdRestaurants = await Restaurant.insertMany(restaurants);
    console.log('Created restaurants');

    // Create menu items with restaurant references
    const menuItemsWithRestaurants = [];
    
    createdRestaurants.forEach((restaurant, index) => {
      const startIndex = index * 2;
      const endIndex = startIndex + 2;
      const restaurantMenuItems = menuItems.slice(startIndex, endIndex);
      
      restaurantMenuItems.forEach(item => {
        menuItemsWithRestaurants.push({
          ...item,
          restaurant: restaurant._id
        });
      });
    });

    await MenuItem.insertMany(menuItemsWithRestaurants);
    console.log('Created menu items');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();