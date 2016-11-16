var mongoose = require('mongoose');

// Models
var LearningOutcome = mongoose.model('LearningOutcome');

// Exported methods
//-----------------------------------------------
module.exports.createOutcome = function (req, res, next) {
	LearningOutcome.create({
		name: req.body.name,
		majors: req.body.majors,
		path: req.body.path
	})
	.then((learning) => {
		return res.status(200).json(learning);
	})
	.catch((err) => {
		return res.status(500).json(err);
	});
};

module.exports.getTreeOutcome = function (req, res, next) {
	LearningOutcome.find({
		path: /^,req.params.outcomeId,/
	})
	.exec()
	.then((tree) => {
		if (!tree) {
			return res.status(404).json({
				message: "Parent node not found!!!"
			});
		}
		else {
			return res.status(200).json(tree);
		}
	})
	.catch((err) => {
		return res.status(500).json({
			message: "Cannot get treeview",
			detail: err
		});
	});
}

// module.exports.getOutcome = function (req, res, next) {
// 	LearningOutcome.findById(req.params.outcomeId)
// 	.exec()
// 	.then((learning) => {
// 		if (!learning) {
// 			return res.status(404).json({
// 				message: "Learning outcome not found!!!"
// 			});
// 		}
// 		else {
// 			return res.status(200).json(learning);
// 		}
// 	})
// 	.catch((err) => {
// 		return res.status(500).json({
// 			message: "Cannot get learning outcome",
// 			detail: err
// 		});
// 	});
// }

module.exports.updateOutcome = function (req, res, next) {
	LearningOutcome.findOneAndUpdate({ 
		_id: req.params.outcomeId 
	}, {
		name: req.body.name,
		majors: req.body.majors,
		path: req.body.path
	})
	.exec()
	.then((learning) => {
		if (!learning) {
			return res.status(404).json({
				message: "Learning outcome not found!!!"
			});
		}
		else {
			return res.status(200).json(learning);
		}
	})
	.catch((err) => {
		return res.status(500).json({
			message: "Cannot update learning outcome",
			detail: err
		});
	});
}

module.exports.deleteOutcome = function (req, res, next) {
	LearningOutcome.findOneAndRemove(req.params.outcomeId)
	.exec()
	.then((learning) => {
		if (!learning) {
			return res.status(404).json({
				message: "Learning outcome not found!!!"
			});
		}
		else {
			return res.status(200).json({
				message: "Remove successfully"
			})
		}
	})
	.catch((err) => {
		return res.status(500).json({
			message: "Cannot delete learning outcome",
			detail: err
		});
	});
}

