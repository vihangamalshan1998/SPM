const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//Subject Schema
const subjectSchema = new Schema({
    subject_ID: {
        type: String,
        required: true
    },
    subject_Name: {
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
    }
})

const subject = mongoose.model("Subject", subjectSchema);

module.exports = subject;