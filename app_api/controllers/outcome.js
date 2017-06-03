var mongoose = require('mongoose');
var outcomeFunc = require('../modules/outcome');
// Models
var Outcome = mongoose.model('Outcome');

// Exported methods
//-----------------------------------------------
module.exports.createOutcome = function(req, res, next) {
  Outcome.create({
      current: {
        title: req.body.title,
        majors: req.body.majors,
        path: req.body.path,
        parent: req.body.parent,
        ver: req.body.version
      },
      prev: []
    })
    .then((outcome) => {
      return res.status(200).json({
        outcome: outcome.current,
        _id: outcome._id
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "cannot create new outcome",
        detail: err
      });
    });
};

module.exports.getTreeOutcome = function(req, res, next) {
  var currentVersion = req.query.version;
  var query = {
    'current.path': new RegExp(req.params.outcomeId),
    'current.ver': currentVersion
  }

  Outcome.find(query)
    .exec()
    .then((tree) => {
      if (!tree || tree.length == 0) {
        return res.status(404).json({
          message: "parent node not found!!!"
        });
      } else {
        return res.status(200).json(tree);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "cannot get treeview",
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
          message: "learning outcome not found!!!"
        });
      } else {
        if (version !== outcome.current.ver) {
          for (var i = 0; i < outcome.prev.length; i++) {
            if (outcome.prev[i].ver === version) {
              outcome.prev[i] = {
                title: req.body.title,
                majors: req.body.majors,
                path: req.body.path,
                parent: req.body.parent,
                ver: req.query.version
              }
            }
          }
        } else if (req.query.version == outcome.current.ver) {
          outcome.current = {
            title: req.body.title,
            majors: req.body.majors,
            path: req.body.path,
            parent: req.body.parent,
            ver: req.query.version
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
        message: "cannot update learning outcome",
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
          message: "learning outcome not found!!!"
        });
      } else {
        var currVersion = outcome.current.ver;
        outcome.prev.push(outcome.current);
        outcome.current = {
          title: req.body.title,
          majors: req.body.majors,
          path: req.body.path,
          parent: req.body.parent,
          ver: req.body.version
        }

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
      'current.path': new RegExp(req.params.outcomeId)
    })
    .exec()
    .then((outcome) => {
      if (!outcome) {
        return res.status(404).json({
          message: "learning outcome not found!!!"
        });
      } else {
        for (var i = 0; i < outcome.length; i++) {
          Outcome.remove(outcome[i]);
        }

        return res.status(200).json({
          message: "remove successfully"
        })
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "cannot delete learning outcome",
        detail: err
      });
    });
}