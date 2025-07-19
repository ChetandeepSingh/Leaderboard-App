const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const claimRoutes = require('./routes/claimRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/claim', claimRoutes);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/leaderboard';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    // Seed 10 users if not present
    const count = await User.countDocuments();
    if (count === 0) {
      const names = ['Rahul', 'Kamal', 'Sanak', 'Amit', 'Priya', 'Neha', 'Vikas', 'Anjali', 'Rohit', 'Sneha'];
      await User.insertMany(names.map(name => ({ name })));
      console.log('Seeded 10 users');
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err)); 