const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tfretro', 'root', 'adimin', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
