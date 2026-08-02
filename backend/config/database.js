const { Sequelize } = require('sequelize');
const fs = require('fs');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync(process.env.DB_CA_CERT_PATH),
    }
  },
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Connected to Aiven MySQL database with Sequelize!'))
  .catch(err => console.error('Error connecting via Sequelize:', err));

module.exports = sequelize;
