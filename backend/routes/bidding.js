const express = require('express');
const router = express.Router();

// Example data store (replace with DB usage)
let bids = [
  { id: 1, title: 'Warehouse Lease', startDate: '2025-10-01', endDate: '2025-10-10' },
  { id: 2, title: 'Port Cargo Transport', startDate: '2025-10-05', endDate: '2025-10-15' },
];

// GET /api/bidding - returns list of ongoing/upcoming bids
router.get('/', (req, res) => {
  res.json(bids);
});

// POST /api/bidding - create a new bid
router.post('/', (req, res) => {
  const { title, description, startDate, endDate, minimumBid } = req.body;

  // Simple validation (add more as needed)
  if (!title || !description || !startDate || !endDate || !minimumBid) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newBid = {
    id: bids.length + 1,
    title,
    description,
    startDate,
    endDate,
    minimumBid,
  };

  bids.push(newBid);
  res.status(201).json({ message: 'Bid created', bid: newBid });
});

module.exports = router;
