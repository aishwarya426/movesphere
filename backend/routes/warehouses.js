const express = require('express');
const router = express.Router();
const Warehouse = require('../models/Warehouse');

// GET all warehouses
router.get('/', async (req, res) => {
  try {
    const warehouses = await Warehouse.findAll();
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch warehouses' });
  }
});

// GET warehouse by warehouseId
router.get('/:warehouseId', async (req, res) => {
  try {
    const warehouse = await Warehouse.findByPk(req.params.warehouseId);
    if (warehouse) res.json(warehouse);
    else res.status(404).json({ error: 'Warehouse not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch warehouse' });
  }
});

// POST create warehouse
router.post('/', async (req, res) => {
  try {
    const warehouse = await Warehouse.create(req.body);
    res.status(201).json(warehouse);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create warehouse' });
  }
});

// PUT update warehouse
router.put('/:warehouseId', async (req, res) => {
  try {
    const [, updated] = await Warehouse.update(req.body, { where: { warehouseId: req.params.warehouseId } });
    if (updated) {
      const updatedWarehouse = await Warehouse.findByPk(req.params.warehouseId);
      res.json(updatedWarehouse);
    } else {
      res.status(404).json({ error: 'Warehouse not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update warehouse' });
  }
});

// DELETE warehouse
router.delete('/:warehouseId', async (req, res) => {
  try {
    const deleted = await Warehouse.destroy({ where: { warehouseId: req.params.warehouseId } });
    if (deleted) res.json({ success: true });
    else res.status(404).json({ error: 'Warehouse not found' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete warehouse' });
  }
});

module.exports = router;
