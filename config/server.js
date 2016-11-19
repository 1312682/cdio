var path = require('path');
var express = require('express');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var app = express();

// Common config
//-------------------------------------------------
require(path.join('..', 'config/common'));

// Config Models
//-------------------------------------------------
require(__BASE + '/app_api/models/database');

// Config standard middlewares
//-------------------------------------------------
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false}));
app.use(morgan('dev'));

// Config routes
//-------------------------------------------------
var routeApi = require(__BASE + '/app_api/routes');

app.use('/api', routeApi);

// Serve client files
//-------------------------------------------------
app.use(express.static(__BASE + '/public/build'));
app.use('/bower_components', express.static(__BASE + '/bower_components'));

// For route with AngularJs route
app.use('/*', (req, res) => {
  res.sendFile('public/build/index.html', { root: __BASE });
})

// Exports
//-------------------------------------------------
module.exports = app;