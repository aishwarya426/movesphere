const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');

const Customer = sequelize.define('Customer', {
  customerId: { type: DataTypes.STRING, primaryKey: true, field: 'customer_id' },
  name: DataTypes.STRING,
  contactDetails: { type: DataTypes.STRING, field: 'contact_details' },
}, {
  tableName: 'customers',
  timestamps: false,
});

Customer.hasMany(Order, { foreignKey: 'customerId', sourceKey: 'customerId' });

module.exports = Customer;
