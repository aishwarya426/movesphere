const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');

// GET all map locations or search
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;

    // raw SQL query to avoid findAll
    let sql = 'SELECT id, name, type, latitude, longitude, city, state FROM warehouses';
    let replacements = [];

    if (q) {
      sql += ' WHERE name LIKE ? OR type LIKE ?';
      replacements.push(`%${q}%`, `%${q}%`);
    }

    const [results] = await sequelize.query(sql, { replacements });

    // Format results for frontend
    const formatted = results.map(loc => ({
      id: loc.id,
      name: loc.name,
      type: loc.type,
      position: { lat: parseFloat(loc.latitude), lng: parseFloat(loc.longitude) },
      city: loc.city,
      state: loc.state
    }));

    res.json(formatted);

  } catch (err) {
    console.error('Error fetching map locations:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
