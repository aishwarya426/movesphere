const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Storage = sequelize.define('Storage', {
  warehouseId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  type: DataTypes.STRING,
  location: DataTypes.STRING,
  capacity: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
}, {
  tableName: 'storages',
  timestamps: false,
});

module.exports = Storage;
