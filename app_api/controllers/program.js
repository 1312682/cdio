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
  Program.findById(req.body.id)
    .select('groups')
    .exec()
    .then((program) => {
      program.groups.push({
        children: req.body.children,
        name: req.body.name,
        major: req.body.major
      });

      program.save()
        .then(() => {
          return res.status(200);
        })
        
    })
}