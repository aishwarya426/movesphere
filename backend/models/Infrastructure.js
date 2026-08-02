const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Infrastructure = sequelize.define('Infrastructure', {
  infrastructureId: {
    type: DataTypes.INTEGER,  // Changed to INTEGER for auto-increment ID support
    primaryKey: true,
    autoIncrement: true,
    field: 'infrastructureId',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  location: {
    type: DataTypes.STRING,
  },
  capacity: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
  ownership: {
    type: DataTypes.STRING,
  },
  city:{
    type: DataTypes.STRING,
  }
}, {
  tableName: 'Infrastructure',
  timestamps: false, // set to true if you have createdAt/updatedAt columns
});

module.exports = Infrastructure;
