const express = require('express');
const router = express.Router();

// Dummy dashboard summary data - replace with real DB queries or aggregates
const dashboardSummary = {
  totalUsers: 150,
  totalInfrastructures: 50,
  activeBiddings: 12,
  recentLegalCases: 5,
  lastUpdated: new Date().toISOString(),
};

router.get('/', (req, res) => {
  // Here you can add real DB calls if needed
  res.json(dashboardSummary);
});

module.exports = router;
