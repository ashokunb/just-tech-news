const path = require('path');
const express = require("express");
const exphbs = require('express-handlebars');//template engine for dynamic html
const session = require('express-session');// express session to allow us to save session into database

 
const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection"); //connects to our server
// use express sessions and sequallize store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {// use express sessions and sequallize store
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({});//for express handlebars

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));//takes content of the public folder and serves them as static assets.

app.use(require('./controllers/'));//connects to our api package that collects to our user package that sums up the user routes

// turn on connection to db and server
//.sync method to establish the connection to the database. The "sync" part means that this is

//Sequelize taking the models and connecting them to associated database tables. If it doesn't find a table, it'll create it for you!
// turn on connection to database and server
sequelize.sync({ force: false }).then(() => {//force:true will drop and re-create database tables on startup. useed when we change sequalize models
  app.listen(PORT, () => console.log("Now listening"));
});
