var mongoose = require('mongoose');

// Models
var Outcome = mongoose.model('Outcome');

// Exported methods
//-----------------------------------------------
module.exports.createOutcome = function(req, res, next) {
    Outcome.create({
            current: {},
            prev: []
        })
        .then((outcome) => {
            var newOutcome = outcome.current.create({
                title: req.body.title,
                majors: req.body.majors,
                path: req.body.path,
                parent: req.body.parent,
                ver: 1
            });

            return res.status(200).json(outcome);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
};

module.exports.getTreeOutcome = function(req, res, next) {
    Outcome.find({
            current: {
                path: new RegExp(req.params.outcomeId)
            }
        })
        .exec()
        .then((tree) => {
            if (!tree) {
                return res.status(404).json({
                    message: "Parent node not found!!!"
                });
            } else {
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

module.exports.updateOutcome = function(req, res, next) {
    var version = req.query.version;
    Outcome.findById({
            _id: req.params.outcomeId
        })
        .exec()
        .then((outcome) => {
            if (!outcome) {
                return res.status(404).json({
                    message: "Learning outcome not found!!!"
                });
            } else {
                if (req.query.version < outcome.current.ver) {
                    for (var i = 0; i < outcome.prev.length; i++) {
                        if (outcome.prev[i].ver == req.query.version) {
                            outcome.prev[i] = {
                                title: req.body.title,
                                majors: req.body.majors,
                                path: req.body.path,
                                parent: req.body.parent
                            }
                        }
                    }
                } else if (req.query.version == outcome.current.ver) {
                    outcome.current = {
                        title: req.body.title,
                        majors: req.body.majors,
                        path: req.body.path,
                        parent: req.body.parent
                    }
                } else {
                    return res.status(500).json({
                        message: "version not exist"
                    });
                }

                outcome.save()
                    .then(() => {
                        return res.status(200).json(outcome);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            message: "cannot update outcome",
                            detail: err
                        });
                    });
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Cannot update learning outcome",
                detail: err
            });
        });
}

module.exports.updateVersionOutcome = function(req, res, next) {
    Outcome.findById({
            _id: req.params.outcomeId
        })
        .exec()
        .then((outcome) => {
            if (!outcome) {
                return res.status(404).json({
                    message: "Learning outcome not found!!!"
                });
            } else {
                outcome.prev.push(outcome.current);
                outcome.current.ver += 1;

                outcome.save()
                    .then(() => {
                        return res.status(200).json({
                            message: "update new version successfully"
                        });
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            message: "cannot update new version",
                            detail: err
                        });
                    });
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: "outcome does not exist",
                detail: err
            });
        });
}

module.exports.deleteOutcome = function(req, res, next) {
    Outcome.find({
            current: {
                path: new RegExp(req.params.outcomeId)
            }
        })
        .exec()
        .then((outcome) => {
            if (!outcome) {
                return res.status(404).json({
                    message: "Learning outcome not found!!!"
                });
            } else {
                for (var i = 0; i < outcome.length; i++) {
                    Outcome.remove(outcome[i]);
                }

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