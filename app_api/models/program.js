var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Blocks schema
//-----------------------------------------------
var blockSchema = new Schema({
    name: { type: String, required: true },
    majors: { type: [String], required: false },
    path: { type: String, required: false, default: '' },
    courses: { type: [Schema.Types.ObjectId], ref: 'Subject' }
})

// Virtual properties
blockSchema.virtual('level')
    .get(function() {
        return this.path.split(',').length;
    });

// Program schema
//-----------------------------------------------
var programSchema = new Schema({
    faculty: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: false, default: '' },
    outcome: { type: Schema.Types.ObjectId, ref: 'Outcome' },
    blocks: [blockSchema]
});

// Compile schema
//-----------------------------------------------
mongoose.model('Program', programSchema, 'Programs');