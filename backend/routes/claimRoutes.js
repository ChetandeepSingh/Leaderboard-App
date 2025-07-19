const express = require('express');
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');
const router = express.Router();

// Claim random points for a user
router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const points = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += points;
    await user.save();
    const history = new ClaimHistory({ userId, pointsClaimed: points });
    await history.save();
    res.json({ user, pointsAwarded: points });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all claim history (optional, for frontend)
router.get('/history', async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .sort({ claimedAt: -1 })
      .populate('userId', 'name');
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 