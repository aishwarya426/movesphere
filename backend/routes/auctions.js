const express = require('express');
const router = express.Router();
const { Auction, Bid } = require('../models'); // Sequelize models
const { Op } = require('sequelize');

// GET /api/auctions?state=open,upcoming
router.get('/', async (req, res) => {
  try {
    const { state } = req.query;
    const where = {};
    if (state) {
      const states = state.split(',');
      where.status = { [Op.in]: states };
    }
    const auctions = await Auction.findAll({ where, order: [['startAtIso', 'ASC']] });
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch auctions' });
  }
});

// GET /api/auctions/current
router.get('/current', async (req, res) => {
  try {
    const auction = await Auction.findOne({ where: { status: 'open' }, order: [['startAtIso', 'DESC']] });
    if (!auction) return res.status(404).json({ error: 'No current auction' });
    res.json(auction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch current auction' });
  }
});

// GET /api/auctions/current/bids
router.get('/current/bids', async (req, res) => {
  try {
    const auction = await Auction.findOne({ where: { status: 'open' } });
    if (!auction) return res.status(404).json({ error: 'No current auction' });
    const bids = await Bid.findAll({ where: { auctionId: auction.id }, order: [['tsIso', 'DESC']] });
    res.json(bids);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bids' });
  }
});

// POST /api/auctions/current/bids
router.post('/current/bids', async (req, res) => {
  try {
    const auction = await Auction.findOne({ where: { status: 'open' } });
    if (!auction) return res.status(404).json({ error: 'No current auction' });

    const { amount, note } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid bid amount' });

    const bid = await Bid.create({ auctionId: auction.id, amount, note, user: 'me', tsIso: new Date().toISOString(), status: 'leading' });
    res.status(201).json({ bid });
  } catch (error) {
    res.status(400).json({ error: 'Failed to place bid' });
  }
});

// PATCH /api/auctions/current
router.patch('/current', async (req, res) => {
  try {
    const auction = await Auction.findOne({ where: { status: 'open' } });
    if (!auction) return res.status(404).json({ error: 'No current auction' });

    await auction.update(req.body);
    res.json(auction);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update auction' });
  }
});

// POST /api/auctions/current/force-close
router.post('/current/force-close', async (req, res) => {
  try {
    const auction = await Auction.findOne({ where: { status: 'open' } });
    if (!auction) return res.status(404).json({ error: 'No current auction to force close' });

    await auction.update({ status: 'closed' });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Failed to force close auction' });
  }
});

module.exports = router;
