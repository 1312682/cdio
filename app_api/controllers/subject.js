var mongoose = require('mongoose');

// Models
var Subject = mongoose.model('Subject');

// Exported methods
//-----------------------------------------------
module.exports.createSubject = function (req, res, next) {
  Subject
    .create({
      code: req.body.code,
      name: req.body.name,
      credit: req.body.credit,
      hour: {
        theory: req.body.hour.theory,
        practice: req.body.hour.practice
      },
      description: req.body.description
    })
    .then((subject) => {
      return res.status(200).json(subject);
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Cannot save subject',
        detail: err
      });
    });
};

module.exports.getAllSubject = function (req, res, next) {
  Subject.find()
    .exec()
    .then((subjects) => {
      return res.status(200).json(subjects);
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Cannot get subject list',
        detail: err
      });
    });
};

module.exports.getSubject = function (req, res, next) {
  Subject.findById(req.params.subjectId)
    .exec()
    .then((subject) => {
      if (!subject) {
        return res.status(404).json({
          message: 'Subject does not exist'
        });
      }

      return res.status(200).json(subject);
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Cannot get subject',
        detail: err
      });
    });
};

module.exports.updateSubject = function (req, res, next) {
  Subject
    .findOneAndUpdate({
      _id: req.params.subjectId
    }, {
      code: req.body.code,
      name: req.body.name,
      credit: req.body.credit,
      hour: {
        theory: req.body.hour.theory,
        practice: req.body.hour.practice
      },
      description: req.body.description
    })
    .exec()
    .then((subject) => {
      if (!subject) {
        return res.status(404).json({
          message: 'Subject does not exist'
        });
      }

      return res.status(200).json({
        message: 'Success'
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Cannot update subject',
        detail: err
      });
    });
};

module.exports.deleteSubject = function (req, res, next) {
  Subject
    .findOneAndRemove({
      _id: req.params.subjectId
    })
    .exec()
    .then((subject) => {
      if (!subject) {
        return res.status(404).json({
          message: 'Subject does not exist'
        });
      }

      return res.status(200).json({
        message: 'Success'
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Cannot update subject',
        detail: err
      });
    });
};