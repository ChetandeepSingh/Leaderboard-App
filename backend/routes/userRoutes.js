const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all users sorted by totalPoints desc
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new user
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'User already exists' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

module.exports = router; 