const express = require('express');
const router = express.Router();
const LegalSupport = require('../models/legalSupport');

// GET /api/legal-support with optional filters city and caseType
router.get('/', async (req, res) => {
  let { city = '', caseType = '' } = req.query;
  city = city.trim();
  caseType = caseType.trim();

  const where = {};
  if (city) where.city = city;
  if (caseType) where.caseType = caseType;

  try {
    const records = await LegalSupport.findAll({ where });
    res.json(records);
  } catch (error) {
    console.error('Error fetching legal support data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create new legal support record
router.post('/', async (req, res) => {
  try {
    const newRecord = await LegalSupport.create(req.body);
    res.status(201).json(newRecord);
  } catch (error) {
    console.error('Error creating legal support record:', error);
    res.status(400).json({ error: error.message });
  }
});

// PUT update existing legal support record
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await LegalSupport.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedRecord = await LegalSupport.findByPk(req.params.id);
      res.json(updatedRecord);
    } else {
      res.status(404).json({ error: 'Legal support record not found' });
    }
  } catch (error) {
    console.error('Error updating legal support record:', error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE legal support record
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await LegalSupport.destroy({ where: { id: req.params.id } });
    if (deleted) res.json({ success: true });
    else res.status(404).json({ error: 'Legal support record not found' });
  } catch (error) {
    console.error('Error deleting legal support record:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
