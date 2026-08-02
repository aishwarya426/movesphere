const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// GET all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

// GET vehicle by vehicleId
router.get('/:vehicleId', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.vehicleId);
    if (vehicle) res.json(vehicle);
    else res.status(404).json({ error: 'Vehicle not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicle' });
  }
});

// POST create vehicle
router.post('/', async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create vehicle' });
  }
});

// PUT update vehicle
router.put('/:vehicleId', async (req, res) => {
  try {
    const [, updated] = await Vehicle.update(req.body, { where: { vehicleId: req.params.vehicleId } });
    if (updated) {
      const updatedVehicle = await Vehicle.findByPk(req.params.vehicleId);
      res.json(updatedVehicle);
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update vehicle' });
  }
});

// DELETE vehicle
router.delete('/:vehicleId', async (req, res) => {
  try {
    const deleted = await Vehicle.destroy({ where: { vehicleId: req.params.vehicleId } });
    if (deleted) res.json({ success: true });
    else res.status(404).json({ error: 'Vehicle not found' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete vehicle' });
  }
});

module.exports = router;
