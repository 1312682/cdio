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

// Serve client files
//-------------------------------------------------
app.use(express.static(__BASE + '/public'));

// Config routes
//-------------------------------------------------
var routeApi = require(__BASE + '/app_api/routes');

app.use('/api', routeApi);

// Exports
//-------------------------------------------------
module.exports = app;