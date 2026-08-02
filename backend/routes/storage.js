const express = require('express');
const router = express.Router();
const Storage = require('../models/storage');

// Get list of storages
router.get('/', async (req, res) => {
  try {
    const storages = await Storage.findAll();
    res.json(storages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch storages' });
  }
});

// Update storage by warehouseId
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Storage.update(req.body, { where: { warehouseId: id } });
    if (updated) {
      const updatedStorage = await Storage.findOne({ where: { warehouseId: id } });
      return res.json(updatedStorage);
    }
    res.status(404).json({ error: 'Storage not found' });
  } catch (error) {
    res.status(400).json({ error: 'Update failed' });
  }
});

module.exports = router;
