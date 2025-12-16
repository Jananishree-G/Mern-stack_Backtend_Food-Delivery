const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
const Food = require('./models/Food');
require('dotenv').config();

// Sample data
const restaurants = [
  {
    name: "Pizza Palace",
    description: "Authentic Italian pizzas made with fresh ingredients",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "30-45 min",
    deliveryFee: 0,
    minimumOrder: 299,
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      latitude: 40.7128,
      longitude: -74.0060
    },
    image: "https://source.unsplash.com/400x300/?pizza,restaurant&sig=1"
  },
  {
    name: "Burger Hub",
    description: "Gourmet burgers and loaded fries",
    cuisine: "American",
    rating: 4.3,
    deliveryTime: "25-35 min",
    deliveryFee: 40,
    minimumOrder: 199,
    address: {
      street: "456 Oak Avenue",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      latitude: 40.7589,
      longitude: -73.9851
    },
    image: "https://source.unsplash.com/400x300/?burger,restaurant&sig=2"
  },
  {
    name: "Spice Garden",
    description: "Authentic Indian cuisine with aromatic spices",
    cuisine: "Indian",
    rating: 4.6,
    deliveryTime: "35-50 min",
    deliveryFee: 50,
    minimumOrder: 349,
    address: {
      street: "789 Pine Street",
      city: "New York",
      state: "NY",
      zipCode: "10003",
      latitude: 40.7505,
      longitude: -73.9934
    },
    image: "https://source.unsplash.com/400x300/?indian,curry&sig=3"
  },
  {
    name: "Sweet Treats",
    description: "Heavenly desserts and sweet delights",
    cuisine: "Desserts",
    rating: 4.8,
    deliveryTime: "20-30 min",
    deliveryFee: 30,
    minimumOrder: 149,
    address: {
      street: "321 Sugar Lane",
      city: "New York",
      state: "NY",
      zipCode: "10004",
      latitude: 40.7282,
      longitude: -74.0776
    },
    image: "https://source.unsplash.com/400x300/?dessert,cake&sig=4"
  },
  {
    name: "Green Bowl",
    description: "Fresh salads and healthy bowls",
    cuisine: "Healthy",
    rating: 4.4,
    deliveryTime: "20-30 min",
    deliveryFee: 35,
    minimumOrder: 199,
    address: {
      street: "654 Health Street",
      city: "New York",
      state: "NY",
      zipCode: "10005",
      latitude: 40.7061,
      longitude: -74.0087
    },
    image: "https://source.unsplash.com/400x300/?salad,healthy&sig=5"
  },
  {
    name: "Comfort Kitchen",
    description: "Homestyle comfort food that warms your heart",
    cuisine: "Comfort Food",
    rating: 4.2,
    deliveryTime: "30-40 min",
    deliveryFee: 45,
    minimumOrder: 249,
    address: {
      street: "987 Cozy Avenue",
      city: "New York",
      state: "NY",
      zipCode: "10006",
      latitude: 40.7411,
      longitude: -74.0023
    },
    image: "https://source.unsplash.com/400x300/?comfort,food&sig=6"
  }
];

const foods = [
  // Pizza Palace items
  {
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
    price: 299,
    category: "main",
    isVegetarian: true,
    preparationTime: 20,
    rating: 4.6,
    mood: "happy",
    image: "https://source.unsplash.com/300x200/?pizza,margherita&sig=101"
  },
  {
    name: "Pepperoni Pizza",
    description: "Traditional pizza topped with pepperoni and mozzarella cheese",
    price: 349,
    category: "main",
    preparationTime: 20,
    rating: 4.4,
    mood: "hungry",
    image: "https://source.unsplash.com/300x200/?pizza,pepperoni&sig=102"
  },
  {
    name: "Garlic Bread",
    description: "Crispy bread with garlic butter and herbs",
    price: 149,
    category: "appetizer",
    isVegetarian: true,
    preparationTime: 10,
    rating: 4.2,
    mood: "comfort",
    image: "https://source.unsplash.com/300x200/?bread,garlic&sig=103"
  },
  {
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee-soaked ladyfingers",
    price: 199,
    category: "dessert",
    isVegetarian: true,
    preparationTime: 5,
    rating: 4.8,
    mood: "sweet",
    image: "https://source.unsplash.com/300x200/?tiramisu,dessert&sig=104"
  },
  // Burger Hub items
  {
    name: "Classic Cheeseburger",
    description: "Beef patty with cheese, lettuce, tomato, and special sauce",
    price: 249,
    category: "main",
    preparationTime: 15,
    rating: 4.3,
    mood: "hungry",
    image: "https://source.unsplash.com/300x200/?burger,cheese&sig=105"
  },
  {
    name: "Spicy Chicken Burger",
    description: "Crispy chicken with spicy mayo and jalapeños",
    price: 279,
    category: "main",
    preparationTime: 18,
    rating: 4.5,
    mood: "spicy",
    image: "https://source.unsplash.com/300x200/?chicken,burger&sig=106"
  },
  {
    name: "Loaded Fries",
    description: "Crispy fries topped with cheese, bacon, and sour cream",
    price: 179,
    category: "snack",
    preparationTime: 12,
    rating: 4.1,
    mood: "comfort",
    image: "https://source.unsplash.com/300x200/?fries,loaded&sig=107"
  },
  {
    name: "Chocolate Milkshake",
    description: "Rich and creamy chocolate milkshake",
    price: 149,
    category: "beverage",
    isVegetarian: true,
    preparationTime: 5,
    rating: 4.4,
    mood: "sweet",
    image: "https://source.unsplash.com/300x200/?milkshake,chocolate&sig=108"
  },
  // Spice Garden items
  {
    name: "Chicken Biryani",
    description: "Aromatic basmati rice with tender chicken and spices",
    price: 349,
    category: "main",
    preparationTime: 25,
    rating: 4.7,
    mood: "hungry",
    image: "https://source.unsplash.com/300x200/?biryani,chicken&sig=109"
  },
  {
    name: "Spicy Chicken Curry",
    description: "Fiery chicken curry with traditional Indian spices",
    price: 299,
    category: "main",
    preparationTime: 20,
    rating: 4.6,
    mood: "spicy",
    image: "https://source.unsplash.com/300x200/?curry,spicy&sig=110"
  },
  {
    name: "Paneer Tikka",
    description: "Grilled cottage cheese with mint chutney",
    price: 249,
    category: "appetizer",
    isVegetarian: true,
    preparationTime: 15,
    rating: 4.4,
    mood: "spicy",
    image: "https://source.unsplash.com/300x200/?paneer,tikka&sig=111"
  },
  {
    name: "Gulab Jamun",
    description: "Sweet milk dumplings in sugar syrup",
    price: 129,
    category: "dessert",
    isVegetarian: true,
    preparationTime: 5,
    rating: 4.5,
    mood: "sweet",
    image: "https://source.unsplash.com/300x200/?gulab,jamun&sig=112"
  },
  // Sweet Treats items
  {
    name: "Chocolate Brownie",
    description: "Fudgy chocolate brownie with vanilla ice cream",
    price: 179,
    category: "dessert",
    isVegetarian: true,
    preparationTime: 8,
    rating: 4.8,
    mood: "sweet",
    image: "https://source.unsplash.com/300x200/?brownie,chocolate&sig=113"
  },
  {
    name: "Strawberry Cheesecake",
    description: "Creamy cheesecake with fresh strawberry topping",
    price: 199,
    category: "dessert",
    isVegetarian: true,
    preparationTime: 5,
    rating: 4.7,
    mood: "sweet",
    image: "https://source.unsplash.com/300x200/?cheesecake,strawberry&sig=114"
  },
  {
    name: "Vanilla Cupcake",
    description: "Fluffy vanilla cupcake with buttercream frosting",
    price: 99,
    category: "dessert",
    isVegetarian: true,
    preparationTime: 3,
    rating: 4.3,
    mood: "happy",
    image: "https://source.unsplash.com/300x200/?cupcake,vanilla&sig=115"
  },
  {
    name: "Hot Chocolate",
    description: "Rich hot chocolate with whipped cream",
    price: 119,
    category: "beverage",
    isVegetarian: true,
    preparationTime: 5,
    rating: 4.4,
    mood: "comfort",
    image: "https://source.unsplash.com/300x200/?hot,chocolate&sig=116"
  },
  // Green Bowl items
  {
    name: "Mediterranean Bowl",
    description: "Quinoa bowl with grilled vegetables and hummus",
    price: 249,
    category: "main",
    isVegetarian: true,
    preparationTime: 15,
    rating: 4.5,
    mood: "healthy",
    image: "https://source.unsplash.com/300x200/?bowl,healthy&sig=117"
  },
  {
    name: "Green Smoothie",
    description: "Spinach, banana, and mango smoothie",
    price: 149,
    category: "beverage",
    isVegetarian: true,
    preparationTime: 5,
    rating: 4.2,
    mood: "healthy",
    image: "https://source.unsplash.com/300x200/?smoothie,green&sig=118"
  },
  {
    name: "Avocado Toast",
    description: "Multigrain toast with smashed avocado and seeds",
    price: 179,
    category: "appetizer",
    isVegetarian: true,
    preparationTime: 8,
    rating: 4.3,
    mood: "healthy",
    image: "https://source.unsplash.com/300x200/?avocado,toast&sig=119"
  },
  {
    name: "Fruit Salad",
    description: "Fresh seasonal fruits with honey dressing",
    price: 129,
    category: "dessert",
    isVegetarian: true,
    preparationTime: 5,
    rating: 4.1,
    mood: "healthy",
    image: "https://source.unsplash.com/300x200/?fruit,salad&sig=120"
  },
  // Comfort Kitchen items
  {
    name: "Mac and Cheese",
    description: "Creamy macaroni with three cheese blend",
    price: 199,
    category: "main",
    isVegetarian: true,
    preparationTime: 15,
    rating: 4.4,
    mood: "comfort",
    image: "https://source.unsplash.com/300x200/?mac,cheese&sig=121"
  },
  {
    name: "Chicken Soup",
    description: "Homestyle chicken soup with vegetables",
    price: 149,
    category: "appetizer",
    preparationTime: 10,
    rating: 4.3,
    mood: "comfort",
    image: "https://source.unsplash.com/300x200/?soup,chicken&sig=122"
  },
  {
    name: "Grilled Sandwich",
    description: "Toasted sandwich with cheese and vegetables",
    price: 129,
    category: "main",
    isVegetarian: true,
    preparationTime: 12,
    rating: 4.2,
    mood: "comfort",
    image: "https://source.unsplash.com/300x200/?sandwich,grilled&sig=123"
  },
  {
    name: "Apple Pie",
    description: "Classic apple pie with cinnamon and vanilla ice cream",
    price: 169,
    category: "dessert",
    isVegetarian: true,
    preparationTime: 8,
    rating: 4.6,
    mood: "comfort",
    image: "https://source.unsplash.com/300x200/?pie,apple&sig=124"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fooddelivery');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Restaurant.deleteMany({});
    await Food.deleteMany({});
    console.log('Cleared existing data');

    // Insert restaurants
    const createdRestaurants = await Restaurant.insertMany(restaurants);
    console.log(`Created ${createdRestaurants.length} restaurants`);

    // Assign foods to restaurants
    const foodsWithRestaurants = [];
    
    // Pizza Palace foods (first 4 items)
    for (let i = 0; i < 4; i++) {
      foodsWithRestaurants.push({
        ...foods[i],
        restaurant: createdRestaurants[0]._id
      });
    }
    
    // Burger Hub foods (next 4 items)
    for (let i = 4; i < 8; i++) {
      foodsWithRestaurants.push({
        ...foods[i],
        restaurant: createdRestaurants[1]._id
      });
    }
    
    // Spice Garden foods (next 4 items)
    for (let i = 8; i < 12; i++) {
      foodsWithRestaurants.push({
        ...foods[i],
        restaurant: createdRestaurants[2]._id
      });
    }
    
    // Sweet Treats foods (next 4 items)
    for (let i = 12; i < 16; i++) {
      foodsWithRestaurants.push({
        ...foods[i],
        restaurant: createdRestaurants[3]._id
      });
    }
    
    // Green Bowl foods (next 4 items)
    for (let i = 16; i < 20; i++) {
      foodsWithRestaurants.push({
        ...foods[i],
        restaurant: createdRestaurants[4]._id
      });
    }
    
    // Comfort Kitchen foods (last 4 items)
    for (let i = 20; i < 24; i++) {
      foodsWithRestaurants.push({
        ...foods[i],
        restaurant: createdRestaurants[5]._id
      });
    }

    // Insert foods
    const createdFoods = await Food.insertMany(foodsWithRestaurants);
    console.log(`Created ${createdFoods.length} food items`);

    console.log('Database seeded successfully!');
    console.log('\nSample restaurants:');
    createdRestaurants.forEach(restaurant => {
      console.log(`- ${restaurant.name} (${restaurant.cuisine})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();