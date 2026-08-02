const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const InventoryItem = require('./InventoryItem');

const Warehouse = sequelize.define('Warehouse', {
  id: { 
    type: DataTypes.STRING, 
    primaryKey: true,
    field: 'id' 
  },
  type: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  name: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  city: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  state: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  latitude: { 
    type: DataTypes.DECIMAL(10, 7), 
    allowNull: true 
  },
  longitude: { 
    type: DataTypes.DECIMAL(10, 7), 
    allowNull: true 
  },
}, {
  tableName: 'warehouses',
  timestamps: false,
});

// Relationship with InventoryItem
Warehouse.hasMany(InventoryItem, { foreignKey: 'locationId', sourceKey: 'id' });

module.exports = Warehouse;
