var mongoose = require('mongoose');

// Models
var LearningOutcome = mongoose.model('LearningOutcome');

// Exported methods
//-----------------------------------------------
module.exports.createOutcome = function (req, res, next) {
		LearningOutcome.create({
			name: req.body.name,
			majors: req.body.majors,
			parent: req.body.parent
		})
		.then((learning) => {
			return res.status(200).json(learning);
		})
		.catch((err) => {
			return res.status(500).json();
		});
	}
};

module.exports.getOutcome = function (req, res, next) {
	// body...
}