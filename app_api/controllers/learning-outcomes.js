var mongoose = require('mongoose');

// Models
var LearningOutcome = mongoose.model('LearningOutcome');

// Exported methods
//-----------------------------------------------
module.exports.createOutcome = function (req, res, next) {
	var data = req.body;
}