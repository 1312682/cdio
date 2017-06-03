var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// LO schema
//-----------------------------------------------
var detailSchema = new Schema({
  title: { type: String, required: true },
  majors: { type: [String], default: null },
  path: { type: String, default: '' },
  parent: { type: String, default: null },
  ver: { type: String, required: true, default: null }
});

// Virtual properties
detailSchema.virtual('level').get(function() {
  return this.path.split(',').length;
});

var learningSchema = new Schema({
  current: { type: detailSchema },
  prev: { type: [detailSchema], default: null }
});

// Compile schema
//-----------------------------------------------
mongoose.model('Outcome', learningSchema, 'Outcomes');