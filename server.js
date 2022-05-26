const path = require('path');
const express = require("express");
const exphbs = require('express-handlebars');//template engine for dynamic html
const routes = require('./controllers/');//connects to our api package that collects to our user package that sums up the user routes


 
const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection"); //connects to our server

const hbs = exphbs.create({});//for express handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));//takes content of the public folder and serves them as static assets.

// turn on routes
app.use(routes);

// turn on connection to db and server
//.sync method to establish the connection to the database. The "sync" part means that this is

//Sequelize taking the models and connecting them to associated database tables. If it doesn't find a table, it'll create it for you!
// turn on connection to database and server
sequelize.sync({ force: false }).then(() => {//force:true will drop and re-create database tables on startup. useed when we change sequalize models
  app.listen(PORT, () => console.log("Now listening"));
});
