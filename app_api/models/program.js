var mongoose = require('mongoose');

// Program schema
//-----------------------------------------------
var courseSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
});

var groupSchema = new mongoose.Schema({
  children: { type: String, required: false },
  name: { type: String, required: true },
  major: { type: String, required: false },     // major
  courses: [courseSchema]
});

var programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  falcuty: { type: String, required: true },
  level: { type: String, required: true },
  groups: [groupSchema]
});

// Compile schema
//-----------------------------------------------
mongoose.model('Program', programSchema, 'Programs');