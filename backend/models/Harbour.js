const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const InventoryItem = require('./InventoryItem');
const Vendor = require('./Vendor');

const Harbour = sequelize.define('Harbour', {
  harbourId: { type: DataTypes.STRING, primaryKey: true, field: 'harbour_id' },
  berths: DataTypes.INTEGER,
  docks: DataTypes.STRING,
  equipment: DataTypes.STRING,
}, {
  tableName: 'harbours',
  timestamps: false,
});

Harbour.hasMany(InventoryItem, { foreignKey: 'locationId', sourceKey: 'harbourId' });
Harbour.hasMany(Vendor, { foreignKey: 'harbourId', sourceKey: 'harbourId' });

module.exports = Harbour;
