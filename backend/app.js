const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();

const Hangar = require('./models/Hangar');
const Harbour = require('./models/Harbour');
const Vehicle = require('./models/Vehicle');
const InventoryItem = require('./models/InventoryItem');
const Customer = require('./models/Customer');
const Order = require('./models/Order');
const Warehouse = require('./models/Warehouse');
const Vendor = require('./models/Vendor');
const Employee = require('./models/Employee');

const complianceRoutes = require('./routes/compliance');
const biddingRoutes = require('./routes/bidding');
const inventoryRoutes = require('./routes/inventoryItems');
const infrastructureRoutes = require('./routes/infrastructure');
const legalSupportRoutes = require('./routes/legalSupport');
const mapsRoutes = require('./routes/maps');
const dashboardRoutes = require('./routes/dashboard');
const storageRoutes = require('./routes/storage');
const warehouseRoutes = require('./routes/warehouses');
const vehicleRoutes = require('./routes/vehicles');
const auctionRoutes = require('./routes/auctions');
const mapLocationsRoutes = require('./routes/maps');



const createCrudRoutes = require('./routes/crudRoutes');
const authModule = require('./routes/auth'); // Import the whole module since it exports an object
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Verify the authModule export
const authRoutes = authModule.router;
const authenticateToken = authModule.authenticateToken;

if (typeof authRoutes !== 'function') {
  console.error('authRoutes is not a function. Check ./routes/auth.js export.');
  process.exit(1);
}

if (typeof authenticateToken !== 'function') {
  console.error('authenticateToken is not a function. Check ./routes/auth.js export.');
  process.exit(1);
}

// Models hashmap for generic CRUD routes
const models = {
  Hangar,
  Harbour,
  Vehicle,
  InventoryItem,
  Customer,
  Order,
  Warehouse,
  Vendor,
  Employee,
};

// Register generic CRUD routes for all models under /api/[modelname]
// Make sure createCrudRoutes returns a Router instance
const crudRouter = createCrudRoutes(models);
if (typeof crudRouter !== 'function') {
  console.error('createCrudRoutes did not return a router. Check ./routes/crudRoutes.js');
  process.exit(1);
}
app.use(crudRouter);

// Register feature-specific routes with API paths
app.use('/api/compliance', complianceRoutes);
app.use('/api/bidding', biddingRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/infrastructure', infrastructureRoutes);
app.use('/api/legal-support', legalSupportRoutes);
app.use('/api/maps', mapsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/storage', storageRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/maps', mapLocationsRoutes);



// Authentication related routes
app.use('/api/auth', authRoutes);

// Protected route example needing auth token
app.use('/api/secure-route', authenticateToken, (req, res) => {
  res.json({
    message: 'You accessed a secure route!',
    user: req.user,
  });
});

// Health check route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Express backend!' });
});

// Global error handler must be after all routes
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();

module.exports = app;
