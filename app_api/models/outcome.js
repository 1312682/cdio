var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// LO schema
//-----------------------------------------------
var detailSchema = new Schema({
    title: { type: String, required: true },
    majors: { type: [String], required: false, default: null },
    path: { type: String, default: null },
    parent: { type: String, default: null },
    ver: Number
})

var learningSchema = new Schema({
    current: { type: detailSchema },
    prev: { type: [detailSchema], default: null }
});

// Compile schema
//-----------------------------------------------
mongoose.model('Outcome', learningSchema, 'Outcomes');