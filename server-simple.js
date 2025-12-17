const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://frontend-two-wheat.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Food Delivery API is running!',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

// Basic auth route for testing
app.post('/api/auth/register', (req, res) => {
  res.json({
    success: true,
    message: 'Registration endpoint working',
    data: req.body
  });
});

// Basic restaurants route
app.get('/api/restaurants', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        _id: '1',
        name: 'Pizza Palace',
        cuisine: 'Italian',
        rating: 4.5,
        deliveryTime: '30-45 min'
      }
    ]
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});