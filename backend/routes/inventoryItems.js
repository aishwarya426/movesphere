const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { InventoryItem } = require('../models');

// GET all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await InventoryItem.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET inventory item by ID
router.get('/:itemId', async (req, res) => {
  try {
    const item = await InventoryItem.findByPk(req.params.itemId);
    if (item) res.json(item);
    else res.status(404).json({ error: 'Item not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new inventory item with validation
router.post(
  '/',
  [
    body('itemId').notEmpty().withMessage('Item ID is required'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
    body('description').optional().isString(),
    body('reorderThreshold').optional().isInt({ min: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const newItem = await InventoryItem.create(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// PUT update existing inventory item by ID with validation
router.put(
  '/:itemId',
  [
    body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
    body('description').optional().isString(),
    body('reorderThreshold').optional().isInt({ min: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const [updatedRows] = await InventoryItem.update(req.body, { where: { itemId: req.params.itemId } });
      if (updatedRows === 1) {
        const updatedItem = await InventoryItem.findByPk(req.params.itemId);
        res.json(updatedItem);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// DELETE inventory item by ID
router.delete('/:itemId', async (req, res) => {
  try {
    const deletedRows = await InventoryItem.destroy({ where: { itemId: req.params.itemId } });
    if (deletedRows) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
