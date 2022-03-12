const mongoose = require('mongoose');
//Marks Schema
const MarksSchema = new mongoose.Schema({
    StudentId :{
        type: String,
        required:true
    },
    Name : {
        type : String,
        required: true,
    },
    Grade : {
        type : String,
        required : true
    },
    Term : {
        type : String,
        required : true
    },
    status :{
        type : String,
        required : false
    },
    marks : [
        {
            subjectName :{
                type: String,
                required : false
            },
            mark : {
                type: String,
                required : false
            },
        },
    ],
});

const Marks = mongoose.model("marks",MarksSchema);
module.exports = Marks;