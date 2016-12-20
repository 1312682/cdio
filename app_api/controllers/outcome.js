var mongoose = require('mongoose');

// Models
var Outcome = mongoose.model('Outcome');

// Exported methods
//-----------------------------------------------
module.exports.createOutcome = function (req, res, next) {
	Outcome.create({
		title: req.body.title,
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
	Outcome.find({
		path: new RegExp(req.params.outcomeId)
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

module.exports.updateOutcome = function (req, res, next) {
	Outcome.findOneAndUpdate({ 
		_id: req.params.outcomeId 
	}, {
		title: req.body.title,
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
	Outcome.findOneAndRemove(req.params.outcomeId)
	.select()
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