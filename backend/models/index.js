const sequelize = require('../config/database');
const Hangar = require('./Hangar');
const InventoryItem = require('./InventoryItem');

// Define associations after both models are imported
Hangar.hasMany(InventoryItem, { foreignKey: 'locationId', sourceKey: 'hangarId' });
InventoryItem.belongsTo(Hangar, { foreignKey: 'locationId', targetKey: 'hangarId' });

module.exports = {
  sequelize,
  Hangar,
  InventoryItem,
  // Export other models as needed
};
