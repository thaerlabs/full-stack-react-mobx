/**
 * Bootstrap application file
 *
 * This is the main entry point of the application, it will load configurations, initialize the app and start the
 * Express server
 */
// Load babel for subsequent imports in ES2015
require('babel-register');
require('babel-polyfill');

// Load .env file
require('dotenv').load({
  path: __dirname + '/.env'
});

// Load config
require('./config/env').init();


var config = require('nconf');
var mongoose = require('mongoose');
var connectMongo = require('connect-mongo');
var session = require('express-session');

// Configure and connect Mongoose
//set mongoose Promise provider to bluebird
mongoose.Promise = require('bluebird');
// Connect to database
mongoose.connect(config.get('MONGODB_URL'));

/**
 * Configure passport
 */
require('./config/passport').init();

/**
 * Configure winston
 */
require('./config/winston').init();

/**
 * Initialize session middleware
 */
const MongoStore = connectMongo(session);
const sessionMiddleware = session({
  secret: config.get("SESSION_SECRET"),
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
});

/**
 * Require Express app
 */
require('./config/express').init(sessionMiddleware);
var app = require('./config/express').getAppInstance();

var server = app.listen(config.get("PORT"), function() {
  console.log('Express server listening on http://localhost:' + config.get("PORT"));
});

/**
 * Initializing Socket
 */
var io = require('socket.io').listen(server);
require('./config/socket.io').init(io, sessionMiddleware);

/**
 * Seed user, roles and menu items
 */

require('./seed').init();
