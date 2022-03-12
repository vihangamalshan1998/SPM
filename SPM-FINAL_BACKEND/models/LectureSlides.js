const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//Lecture Slide Schema
const LectureSlideSchema = new Schema({
    subject_ID: {
        type: String,
        required: true
    },
    Topic: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    lectureslide: {
        type: String,
        required: false,
    }
})

const lectureslides = mongoose.model("LectureSlides", LectureSlideSchema);
module.exports = lectureslides;