const express = require('express');
const routes = require('./routes');//connects to our api package that collects to our user package that sums up the user routes
const sequelize = require('./config/connection');//connects to our server

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
//.sync method to establish the connection to the database. The "sync" part means that this is 
//Sequelize taking the models and connecting them to associated database tables. If it doesn't find a table, it'll create it for you!
app.listen(PORT, () => console.log('Now listening'));
sequelize.sync({ force: false }).then(() => {//force:true will drop and re-create database tables on startup. useed when we change sequalize models
});