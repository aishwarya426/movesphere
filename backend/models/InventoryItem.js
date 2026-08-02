const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const InventoryItem = sequelize.define('InventoryItem', {
  itemId: {
    type: DataTypes.STRING,
    primaryKey: true,
    field: 'itemId',
  },
  description: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  reorderThreshold: {
    type: DataTypes.INTEGER,
    field: 'reorderThreshold',
  },
  locationId: {
    type: DataTypes.STRING,
    field: 'locationId',
  },
}, {
  tableName: 'Inventory_Item_Locations',
  timestamps: false,
});

module.exports = InventoryItem;
