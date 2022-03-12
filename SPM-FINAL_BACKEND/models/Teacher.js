const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//Teacher Schema
const teacherSchema = new Schema({
    teacher_ID: {
        type: String,
        required: true
    },
    teacher_Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    NIC: {
        type: String,
        required: true
    },
    profile_Picture: {
        type: String,
        required: true
    },
    allocated_Grade: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subject: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Subject'
    }]

})

const teacher = mongoose.model("Teacher", teacherSchema);

module.exports = teacher;