var mongoose = require('mongoose');

// Models
var Program = mongoose.model('Program');

// Exported methods
//-----------------------------------------------
module.exports.createProgram = function (req, res, next) {
  Program
    .create({
      name: req.body.name,
      falcuty: req.body.falcuty,
      type: req.body.type,
      description: req.body.description,
      blocks: {
        name: 'root'
      }
    })
    .then((program) => {
      return res.status(200).json(program);
    })
    .catch((err) => {
      return res.status(500).json();
    })
};

module.exports.getAllProgram = function(req, res, next) {
  Program.find()
    .select('-blocks')
    .exec()
    .then((programs) => {
      return res.status(200).json(programs);
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Cannot get program list',
        detail: err
      });
    });
};

module.exports.getProgram = function (req, res, next) {
  Program.findById(req.params.programId)
    .exec()
    .then((program) => {
      if (!program) {
        return res.status(404).json({
          message: 'Program does not exist'
        });
      }

      return res.status(200).json(program);
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Cannot save program',
        detail: err
      });
    });
};

module.exports.updateProgram = function (req, res, next) {
  Program
    .findOneAndUpdate({
      _id: req.params.programId
    }, {
      name: req.body.name,
      falcuty: req.body.falcuty,
      type: req.body.type,
      description: req.body.description
    })
    .select('-blocks')
    .exec()
    .then((program) => {
      if (!program) {
        return res.status(404).json({
          message: 'Program does not exist'
        });
      }

      return res.status(200).json({
        message: 'Success'
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Cannot save program',
        detail: err
      });
    });
};

module.exports.deleteProgram = function (req, res, next) {
  Program
    .findOneAndRemove({
      _id: req.params.programId
    })
    .exec()
    .then((program) => {
      if (!program) {
        return res.status(404).json({
          message: 'Program does not exist'
        });
      }

      return res.status(200).json({
        message: 'Success'
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Cannot delete program',
        detail: err
      });
    });
};

module.exports.addBlock = function (req, res, next) {
  Program.findById(req.params.programId)
    .exec()
    .then((program) => {
      if (!program) {
        return res.status(404).json({
          message: 'Program does not exist'
        });
      }

      program.blocks.push({
        name: req.body.name,
        majors: req.body.majors,
        path: req.body.path,
        courses: req.body.courses
      });

      program.save()
        .then(() => {
          return res.status(200).json({
            message: 'Success'
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: 'Cannot save program',
            detail: err
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Cannot get program',
        detail: err
      });
    });
};

module.exports.getAllBlock = function (req, res, next) {
  Program.findById(req.params.programId)
    .select('blocks -_id')
    .exec()
    .then((program) => {
      if (!program) {
        return res.status(404).json({
          message: 'Program does not exist'
        });
      }

      return res.status(200).json(program);
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Cannot get program',
        detail: err
      });
    });
};

module.exports.getBlock = function (req, res, next) {
  Program.findById(req.params.programId)
    .select('blocks -_id')
    .exec()
    .then((program) => {
      if (!program) {
        return res.status(404).json({
          message: 'Program does not exist'
        });
      }

      var block = program.blocks.id(req.params.blockId);

      if (!block) {
        return res.status(404).json({
          message: 'Block does not exist'
        });
      }

      return res.status(200).json(block);
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Cannot get program',
        detail: err
      });
    });
};

module.exports.updateBlock = function (req, res, next) {
  Program.findById(req.params.programId)
    .select('blocks -_id')
    .exec()
    .then((program) => {
      if (!program) {
        return res.status(404).json({
          message: 'Program does not exist'
        });
      }

      var block = program.blocks.id(req.params.blockId);

      if (!block) {
        return res.status(404).json({
          message: 'Block does not exist'
        });
      }

      block.name = req.body.name,
      block.majors = req.body.major,
      block.path = req.body.path,
      block.courses = req.body.courses

      program.save()
        .then(() => {
          return res.status(200).json({
            message: 'Success'
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: 'Cannot save program',
            detail: err
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Cannot get program',
        detail: err
      });
    });
};

module.exports.deleteBlock = function (req, res, next) {
  Program.findById(req.params.programId)
    .select('blocks')
    .exec()
    .then((program) => {
      if (!program) {
        return res.status(404).json({
          message: 'Program does not exist'
        });
      }

      var block = program.blocks.id(req.params.blockId);

      if (!block) {
        return res.status(404).json({
          message: 'Block does not exist'
        });
      }

      if (block.path === '') {
        return res.status(400).json({
          message: 'Cannot delete root block'
        });
      }

      console.log(`Block: ${block}`);
      block.remove();

      program.save()
        .then(() => {
          return res.status(200).json({
            message: 'Success'
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: 'Cannot save program',
            detail: err
          });
        })
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Cannot get program',
        detail: err
      });
    });
};