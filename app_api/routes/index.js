var express = require('express');
var routeProgram = require(__BASE + '/app_api/controllers/program');

var router = express.Router();

// Config routes
//-----------------------------------------------
router.route('/programs')
  .post(routeProgram.createProgram);

//-----------------------------------------------
module.exports = router;