const router = require("express").Router();
const lectureSlides = require("../models/LectureSlides");
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const nodemailer = require('nodemailer');

//set the mail credentials
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'applicationframeworkproject@gmail.com',
        pass: 'malisha1996'
    }
});

//File Handling
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/LectureSlides');
    },
    filename: function (req, file, cb) {
        console.log(file.originalname);
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        const fileExt = path.extname(file.originalname);
        const fileText = Date.now() + "-" + file.originalname + "-" + dd + "-" + mm + "-" + yyyy + fileExt;
        cb(null, fileText);
    }
})

var upload = multer({
    storage: storage
})

//add new lecture notice
router.route("/add").post((req, res) => {
    const { subject_ID, Topic, Description, type } = req.body;
    const newlectureSlides = new lectureSlides({
        subject_ID,
        Topic,
        Description,
        type
    })
    newlectureSlides.save().then(() => {
        res.json("Subject Added")
    }).catch((err) => {
        console.log(err);
    })
})

//add new lecture slides
router.route("/addlectures").post(upload.single('lectureslide'), (req, res) => {
    const { subject_ID, Topic, Description, type } = req.body;
    const lectureslide = req.file.filename;
    const newlectureSlides = new lectureSlides({
        subject_ID,
        Topic,
        Description,
        type,
        lectureslide
    })
    newlectureSlides.save().then(() => {
        res.json("Subject Added")
    }).catch((err) => {
        console.log(err);
    })
})

//get all subjects details
router.route("/GetAllSubjects").get((req, res) => {
    lectureSlides.find().then((events => {
        res.json(events)
    })).catch((err) => {
        console.log(err)
    })
})

//get subjects details using subject id
router.route("/GetSubject/:id").get((req, res) => {
    let subjectID = req.params.id;
    lectureSlides.findById(subjectID).then((subject) => {
        res.json(subject)
    }).catch((err) => {
        console.log(err);
    })
})

//get all subject notices
router.route("/getsubjectNotices/:subjectid").get((req, res) => {
    let subjectid = req.params.subjectid;
    lectureSlides.find({ subject_ID: subjectid, type: "Notice" })
        .then((notice) => {
            res.json(notice)
        }).catch((err) => {
            console.log(err);
        })
})

//get all subject lecture slides
router.route("/getsubjeclectureslides/:subjectid").get((req, res) => {
    let subjectid = req.params.subjectid;
    lectureSlides.find({ subject_ID: subjectid, type: "LectureSlides" })
        .then((lectures) => {
            res.json(lectures)
        }).catch((err) => {
            console.log(err);
        })
})

//delete the lecture notice
router.route("/Deletenotice/:id").delete(async (req, res) => {
    let subjectID = req.params.id;
    await lectureSlides.findByIdAndDelete(subjectID)
        .then(() => {
            res.status(200).send({ status: "lecture notice Deleted" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with deleting data" })
        })
})

//delete the  lecture with file
router.route("/Deletelectures/:id/:filename").delete(async (req, res) => {
    let ID = req.params.id;
    let filename = req.params.filename;
    await lectureSlides.findByIdAndDelete(ID)
        .then(() => {
            fs.unlink('C:/Users/JontyRulz/Desktop/SPM-FINAL_BACKEND/uploads/LectureSlides/' + filename, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
            res.status(200).send({ status: "Teacher Deleted" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with deleting data" })
        })
})

module.exports = router;