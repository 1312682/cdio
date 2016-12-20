var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// LO schema
//-----------------------------------------------
var learningSchema = new Schema({
	title: { type: String, required: true },
	majors: { type: [String], required: false },
	path: { type: String, default: null }
});

// Compile schema
//-----------------------------------------------
mongoose.model('Outcome', learningSchema, 'Outcomes');