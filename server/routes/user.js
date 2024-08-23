const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Import your User model

// Route to find a user by userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;  // Get userId from request parameters

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

