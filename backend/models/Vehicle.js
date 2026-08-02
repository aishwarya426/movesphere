const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const InventoryItem = require('./InventoryItem');

const Vehicle = sequelize.define('Vehicle', {
  vehicleId: { type: DataTypes.STRING, primaryKey: true, field: 'vehicleId' },
  type: DataTypes.STRING,
  capacity: DataTypes.INTEGER,
}, {
  tableName: 'Vehicles',
  timestamps: false,
});

// Vehicle.hasMany(InventoryItem, { foreignKey: 'vehicleId', sourceKey: 'vehicleId' });

module.exports = Vehicle;
