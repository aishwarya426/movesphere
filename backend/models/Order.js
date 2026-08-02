const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  orderId: { type: DataTypes.STRING, primaryKey: true, field: 'order_id' },
  customerRef: { type: DataTypes.STRING, field: 'customer_id' },
  shipmentDetails: { type: DataTypes.STRING, field: 'shipment_details' },
  status: DataTypes.STRING,
  warehouseRef: { type: DataTypes.STRING, field: 'warehouse_id' },
}, {
  tableName: 'orders',
  timestamps: false,
});

module.exports = Order;
