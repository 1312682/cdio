var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// LO schema
//-----------------------------------------------
var learningSchema = new Schema({
  title: { type: String, required: true },
  majors: { type: [String], required: false },
  path: { type: String, default: '' },
  version: { type: String, required: true },
  code: { type: String, default: null }
});

// Virtual properties
learningSchema.virtual('level')
  .get(function() {
    return this.path.split(',').length;
  });

// Compile schema
//-----------------------------------------------
mongoose.model('Outcome', learningSchema, 'Outcomes');