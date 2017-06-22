var mongoose = require('mongoose');

// Models
var Outcome = mongoose.model('Outcome');

// Exported methods
//-----------------------------------------------
module.exports.createOutcome = function(req, res, next) {
  Outcome.create({
      title: req.body.title,
      majors: req.body.majors,
      path: req.body.path,
      version: req.body.version,
      code: req.body.code
    })
    .then((learning) => {
      return res.status(200).json(learning);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports.getTreeOutcome = function(req, res, next) {
  Outcome.find({
      path: new RegExp(req.params.outcomeId),
      version: req.query.version
    })
    .exec()
    .then((tree) => {
      if (!tree || tree.length === 0) {
        return res.status(404).json({
          message: "Parent node not found!!!"
        });
      } else {
        var treeView = [];
        var length = tree.length;
        var Child = function(data) {
          return {
            _id: data._id,
            title: data.title,
            majors: data.majors,
            path: data.path,
            code: data.code,
            version: data.version,
            nodes: []
          }
        }
        var createChild = function(parent, child, level) {
          if (level === 1) {
            parent.push(Child(child));
          } else {
            createChild(parent[parent.length - 1].nodes, child, level - 1);
          }
        }

        for (var i = 0; i < length; i++) {
          createChild(treeView, tree[i], tree[i].level);
        }

        return res.status(200).json(treeView);
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
  Outcome.findOneAndUpdate({
      _id: req.params.outcomeId
    }, {
      title: req.body.title,
      majors: req.body.majors,
      path: req.body.path,
      version: req.body.version,
      code: req.body.code
    })
    .exec()
    .then((learning) => {
      if (!learning) {
        return res.status(404).json({
          message: "Learning outcome not found!!!"
        });
      } else {
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

module.exports.deleteOutcome = function(req, res, next) {
  Outcome.find({
      path: new RegExp(req.params.outcomeId)
    })
    .exec()
    .then((learning) => {
      if (!learning) {
        return res.status(404).json({
          message: "Learning outcome not found!!!"
        });
      } else {
        for (var i = 0; i < learning.length; i++) {
          Outcome.remove(learning[i]);
        }

        return res.status(200).json({
          message: "Remove successfully"
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Cannot delete learning outcome",
        detail: err
      });
    });
}

module.exports.getAllVersion = function(req, res, next) {
  Outcome.find({
      path: new RegExp(req.params.outcomeId),
    })
    .distinct('version')
    .exec()
    .then((versionList) => {
      if (!versionList || versionList.length === 0) {
        return res.status(404).json({
          message: "Don't have any version"
        });
      } else {
        return res.status(200).json(versionList);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Cannot find version",
        detail: err
      });
    });
}