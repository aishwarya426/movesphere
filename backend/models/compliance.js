const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Compliance = sequelize.define('compliance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  steps: {
    type: DataTypes.JSON, // Array of steps stored as JSON
    allowNull: false,
    defaultValue: [],
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'compliance',  // explicitly specify your table name here
  timestamps: true          // you can keep it true to use createdAt and updatedAt
});

module.exports = Compliance;
