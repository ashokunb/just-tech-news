// import the sequalize construcor from the library
const Sequelize = require('sequelize');

// library; .env stores the name, username and password that gets passed into this file to login w/o using local info.
require('dotenv').config();

// // create connection to our db

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: 'localhost',
//   dialect: 'mysql',
//   port: 3306
// });

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;