const express = require('express');
const router = express.Router();
const InfrastructureModel = require('../models/Infrastructure');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  const { city = '', type = '', ownership = '' } = req.query;

  const where = {};

  if (city.trim()) {
    where.city = { [Op.like]: `%${city}%` };
  }
  if (type && type !== 'any') {
    where.type = type;
  }
  if (ownership && ownership !== 'any') {
    where.ownership = ownership;
  }

  try {
    const results = await InfrastructureModel.findAll({ where });
    res.json(results);
  } catch (error) {
    console.error('Failed to fetch infrastructure:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
