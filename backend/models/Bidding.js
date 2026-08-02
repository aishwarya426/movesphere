const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Auction = sequelize.define('Auction', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  title: { type: DataTypes.STRING, allowNull: false },
  warehouseId: { type: DataTypes.STRING }, // or foreign key if applicable
  location: { type: DataTypes.STRING },
  startAtIso: { type: DataTypes.DATE, allowNull: false },
  endAtIso: { type: DataTypes.DATE, allowNull: false },
  minStart: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  minIncrement: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 100 },
  graceSeconds: { type: DataTypes.INTEGER, defaultValue: 180 },
  extendSeconds: { type: DataTypes.INTEGER, defaultValue: 120 },
  highestValidSeconds: { type: DataTypes.INTEGER, defaultValue: 120 },
  allowForceClose: { type: DataTypes.BOOLEAN, defaultValue: true },
  reserve: { type: DataTypes.INTEGER, defaultValue: 0 },
  status: { type: DataTypes.ENUM('upcoming', 'open', 'closed', 'paused'), defaultValue: 'upcoming' }
}, {
  tableName: 'auctions',
  timestamps: true,
});

const Bid = sequelize.define('Bid', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  auctionId: { type: DataTypes.UUID, allowNull: false },
  user: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.INTEGER, allowNull: false },
  tsIso: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  note: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('leading', 'outbid'), allowNull: false },
  optimistic: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: 'bids',
  timestamps: false,
});

Auction.hasMany(Bid, { foreignKey: 'auctionId', sourceKey: 'id' });
Bid.belongsTo(Auction, { foreignKey: 'auctionId', targetKey: 'id' });

module.exports = { Auction, Bid };
