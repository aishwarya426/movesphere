const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LegalSupport = sequelize.define('LegalSupport', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  city: {
    type: DataTypes.STRING,
  },
  caseType: {
    type: DataTypes.STRING,
  },
  courtName: {
    type: DataTypes.STRING,
  },
  lawyerName: {
    type: DataTypes.STRING,
  },
  lawyerContact: {
    type: DataTypes.STRING,
  },
  applicableActs: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'legal_support',
  timestamps: false,
});

module.exports = LegalSupport;
