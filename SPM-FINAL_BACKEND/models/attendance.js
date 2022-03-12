const mongoose = require('mongoose');
//Attendance Schema
const AttendanceSchema = new mongoose.Schema({
    StudentId :{
        type: String,
        required:true
    },
    date : {
        type : Date,
        required: false,
    },
    status :{
        type : String,
        required : true
    },
    className :{
        type : String,
        required : true
    }
});

const Attendance = mongoose.model("attendance",AttendanceSchema);

module.exports = Attendance;