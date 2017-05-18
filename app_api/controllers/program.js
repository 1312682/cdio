var mongoose = require('mongoose');

// Models
var Program = mongoose.model('Program');

// Exported methods
//-----------------------------------------------
module.exports.createProgram = function(req, res, next) {
  Program
    .create({
      name: req.body.name,
      faculty: req.body.faculty,
      type: req.body.type,
      description: req.body.description
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

module.exports.getProgram = function(req, res, next) {
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

module.exports.updateProgram = function(req, res, next) {
  Program
    .findOneAndUpdate({
      _id: req.params.programId
    }, {
      name: req.body.name,
      faculty: req.body.faculty,
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

module.exports.deleteProgram = function(req, res, next) {
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

module.exports.addBlock = function(req, res, next) {
  Program.findById(req.params.programId)
    .exec()
    .then((program) => {
      if (!program) {
        return res.status(404).json({
          message: 'Program does not exist'
        });
      }

      var newBlock = program.blocks.create({
        name: req.body.name,
        majors: req.body.majors,
        path: req.body.path,
        courses: req.body.courses
      });
      if (newBlock.path === '') {
        newBlock.path += newBlock._id;
      } else {
        newBlock.path += ',' + newBlock._id;
      }

      program.blocks.push(newBlock);

      program.blocks.sort((a, b) => {
        if (a.path < b.path) {
          return -1;
        }
        if (a.path > b.path) {
          return 1;
        }
        return 0;
      });

      program.save()
        .then(() => {
          Program
            .populate(newBlock, {
              path: 'courses',
              model: 'Subject'
            })
            .then(function(block) {
              return res.status(200).json(newBlock);
            })
            .catch(function(err) {

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

module.exports.getAllBlock = function(req, res, next) {
  Program.findById(req.params.programId)
    .select('blocks -_id')
    .exec()
    .then((program) => {
      if (!program) {
        return res.status(404).json({
          message: 'Program does not exist'
        });
      }

      Program
        .populate(program, {
          path: 'blocks.courses',
          model: 'Subject'
        })
        .then(function(program) {
          var tree = [];
          var blocks = program.blocks;
          var length = blocks.length;
          var Child = function(data) {
            return {
              _id: data._id,
              name: data.name,
              majors: data.majors,
              path: data.path,
              courses: data.courses,
              children: []
            }
          }
          var createChild = function(parent, child, level) {
            if (level === 1) {
              parent.push(Child(child));
            } else {
              createChild(parent[parent.length - 1].children, child, level - 1);
            }
          }

          for (var i = 0; i < length; i++) {
            createChild(tree, blocks[i], blocks[i].level);
          }

          return res.status(200).json(tree);
        })
        .catch(function(err) {

        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: 'Cannot get program',
        detail: err
      });
    });
};

module.exports.getBlock = function(req, res, next) {
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

module.exports.updateBlock = function(req, res, next) {
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

      block.name = req.body.name;
      block.majors = req.body.majors;
      block.path = req.body.path;
      block.courses = req.body.courses;

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

module.exports.deleteBlock = function(req, res, next) {
  Program
    .findOneAndUpdate({
      _id: req.params.programId,
      'blocks._id': req.params.blockId
    }, {
      $pull: {
        blocks: {
          path: new RegExp(req.params.blockId)
        }
      }
    })
    .exec()
    .then((program) => {
      if (!program) {
        return res.status(404).json({
          message: 'Block does not exist'
        });
      }

      return res.status(200).json(program);
    })
    .catch((err) => {
      return res.status(500).json(err);
    })
};

module.exports.getAllFaculty = function(req, res, next) {
  Program
    .find({
      faculty: new RegExp(req.query.name)
    })
    .distinct('faculty')
    .exec()
    .then((program) => {
      return res.status(200).json({
        message: 'Success'
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Cannot get faculty list',
        detail: err
      });
    });
};

module.exports.getAllType = function(req, res, next) {
  Program.find({
      type: new RegExp(req.query.name)
    })
    .distinct('type')
    .exec()
    .then((program) => {
      return res.status(200).json(program);
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Cannot get type list',
        detail: err
      });
    });
};