const sequelize = require('../config/database');
const Hangar = require('./Hangar');
const InventoryItem = require('./InventoryItem');

// Define associations here after importing models
Hangar.hasMany(InventoryItem, { foreignKey: 'locationId', sourceKey: 'hangarId' });
InventoryItem.belongsTo(Hangar, { foreignKey: 'locationId', targetKey: 'hangarId' });

module.exports = {
  sequelize,
  Hangar,
  InventoryItem,
};
