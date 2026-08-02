const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MapLocation = sequelize.define('MapLocation', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('port', 'hangar', 'warehouse'),
    allowNull: false
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'warehouses',
  timestamps: false
});

module.exports = MapLocation;
