var mongoose = require('mongoose');

// Models
var Program = mongoose.model('Program');

// Exported methods
//----------------------------------------------- 
module.exports.createProgram = function (req, res, next) {
  var newProgram = new Program();

  // Map properties
  newProgram.name = req.body.name;
  newProgram.falcuty = req.body.falcuty;
  newProgram.level = req.body.level;

  newProgram.save()
    .then(() => {
      return res.status(200).json(newProgram);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports.addGroup = function (req, res, next) {
  Program.findById(req.params.id)
    .select('groups')
    .exec()
    .then((program) => {
      // Push new group into program
      program.groups.push({
        children: req.body.children,
        name: req.body.name,
        major: req.body.major
      });

      program.save()
        .then(() => {
          return res.status(200).json();
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports.addCourse = function (req, res, next) {
  Program.findById(req.params.programId)
    .select('groups')
    .exec()
    .then((program) => {
      program.groups.id(req.params.groupId).courses.push({
        _id: req.body.id,
        name: req.body.name
      });

      program.save()
        .then(() => {
          return res.status(200).json();
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports.updateProgram = function (req, res, next) {
  Program
    .update({
      _id: req.params.id
    }, {
      name: req.body.name,
      falcuty: req.body.falcuty,
      level: req.body.level
    })
    .exec()
    .then(() => {
      return res.stats(200).json();
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};

module.exports.updateGroup = function (req, res, next) {

};