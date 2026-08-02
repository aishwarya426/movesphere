// routes/compliance.js
const express = require('express');
const router = express.Router();
const Compliance = require('../models/compliance');

// GET /api/compliance?category=&city=
router.get('/', async (req, res) => {
  try {
    const { category, city } = req.query;

    // Build filter dynamically
    const where = {};
    if (category && category.trim() !== '') where.category = category.trim();
    if (city && city.trim() !== '') where.city = city.trim();

    const records = await Compliance.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    res.json(records);
  } catch (err) {
    console.error('Error fetching compliance records:', err);
    res.status(500).json({ error: 'Failed to fetch compliance records' });
  }
});

module.exports = router;
