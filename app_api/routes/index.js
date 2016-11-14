var express = require('express');

// Controllers
var routeProgram = require(__BASE + '/app_api/controllers/program');
var routeSubject = require(__BASE + '/app_api/controllers/subject');

// Config routes
//-----------------------------------------------
var router = express.Router();

router.route('/programs')
  .post(routeProgram.createProgram)
  .get(routeProgram.getAllProgram);
router.route('/programs/:programId')
  .get(routeProgram.getProgram)
  .put(routeProgram.updateProgram)
  .delete(routeProgram.deleteProgram);
router.route('/programs/:programId/blocks')
  .post(routeProgram.addBlock)
  .get(routeProgram.getAllBlock);
router.route('/programs/:programId/blocks/:blockId')
  .get(routeProgram.getBlock)
  .put(routeProgram.updateBlock)
  .delete(routeProgram.deleteBlock);

router.route('/subjects')
  .post(routeSubject.createSubject)
  .get(routeSubject.getAllSubject);
router.route('/subjects/:subjectId')
  .get(routeSubject.getSubject)
  .put(routeSubject.updateSubject)
  .delete(routeSubject.deleteSubject);

// 404 handler
router.use('*', function (req, res, next) {
  return res.status(404).json({
    message: 'Bad URL'
  });
});

//-----------------------------------------------
module.exports = router;