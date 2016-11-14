var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Subject schema
//-----------------------------------------------
var subjectSchema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  credit: { type: String, required: true },
  hour: {
    theory: { type: String, required: true },
    practice: { type: String, required: true }
  },
  description: { type: String, required: false }
});

// Compile schema
//-----------------------------------------------
var Subject = mongoose.model('Subject', subjectSchema, 'Subjects');

// Log event
//-----------------------------------------------
Subject.on('index', (err) => {
  if (err) {
    return console.log(`Error occur when indexing: ${err}`);
  }

  return console.log('Finish indexing Subject');
});