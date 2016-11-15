var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// LO schema
//-----------------------------------------------
var learningSchema = new Schema({
	name: { type: String, required: true },
	majors: { type: String, required: false, default: '' },
	parent: String
});

// Compile schema
//-----------------------------------------------
mongoose.model('LearningOutcome', learningSchema, 'LearningOutcomes');