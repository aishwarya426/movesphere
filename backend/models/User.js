const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fullName: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  phone: DataTypes.STRING,
  passwordHash: DataTypes.STRING,
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  otp: DataTypes.STRING, // store OTP temporarily
  otpExpiresAt: DataTypes.DATE,
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
