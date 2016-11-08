var express = require('express');
var routeProgram = require(__BASE + '/app_api/controllers/program');

var router = express.Router();

// Config routes
//-----------------------------------------------
router.route('/programs')
  .post(routeProgram.createProgram);
router.route('/programs/:id')
  .put(routeProgram.updateProgram);
router.route('/programs/:id/groups')
  .post(routeProgram.addGroup);
router.route('/programs/:programId/groups/:groupId/courses')
  .post(routeProgram.addCourse);

//-----------------------------------------------
module.exports = router;