const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    heading : {
        type : String,
        required : true
    },
    course_id : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

module.exports = mongoose.model('Note', noteSchema)