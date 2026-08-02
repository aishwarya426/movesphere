const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vendor = sequelize.define('Vendor', {
  vendorId: { type: DataTypes.STRING, primaryKey: true, field: 'vendor_id' },
  name: DataTypes.STRING,
  contactInfo: { type: DataTypes.STRING, field: 'contact_info' },
}, {
  tableName: 'vendors',
  timestamps: false,
});

module.exports = Vendor;
