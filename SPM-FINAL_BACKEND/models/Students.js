const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//Student Schema
const studentSchema = new Schema({
    image : {
        type : String,
        required: false
    },
    admissionNumber : {
        type : String,
        required: false
    },
    firstName : {
        type : String,
        required: false
    },
    lastName : {
        type : String,
        required: false
    },
    section : {
        type : Number,
        required: false
    },
    className : {
        type : String,
        required: false
    },
    gender: {
        type : String,
        required: false
    },
    dateOfBirth: {
        type : String,
        required: false
    },
    mobileNumber: {
        type : Number,
        required: false
    },
    email: {
        type : String,
        required: false
    },
    address: {
        type : String,
        required: false
    },
    guardianName: {
        type : String,
        required: false
    },
    guardianRelationship: {
        type : String,
        required: false
    },
    guardianMobileNumber: {
        type : String,
        required: false
    },
    guardianEmail: {
        type : String,
        required: false
    }
})

const Students = mongoose.model("Students",studentSchema);

module.exports = Students;
