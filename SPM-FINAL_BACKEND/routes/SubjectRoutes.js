const router = require("express").Router();
const Subject = require("../models/Subject");
const exportUsersToExcel = require('./documents/exportSubjectService');

//add new subject
router.route("/add").post((req, res) => {
    const { subject_ID, subject_Name, allocated_Grade, description } = req.body;
    const newSubject = new Subject({
        subject_ID,
        subject_Name,
        allocated_Grade,
        description
    })
    newSubject.save().then(() => {
        res.json("Subject Added")
    }).catch((err) => {
        console.log(err);
    })
})

//get all subjects details
router.route("/GetAllSubjects").get((req, res) => {
    Subject.find().then((events => {
        res.json(events)
    })).catch((err) => {
        console.log(err)
    })
})

//get subjects details using Section
router.route("/GetSubjectusignSection/:section").get((req, res) => {

    let section = req.params.section;
    Subject.find({ allocated_Grade : section}).then((subject) => {
        res.json(subject)
    }).catch((err) => {
        console.log(err);
    })
})

//get subjects details using subject id
router.route("/GetSubject/:id").get((req, res) => {
    let subjectID = req.params.id;
    Subject.findById(subjectID).then((subject) => {
        res.json(subject)
    }).catch((err) => {
        console.log(err);
    })
})

//delete the Subject
router.route("/Delete/:id").delete(async (req, res) => {
    let subjectID = req.params.id;
    await Subject.findByIdAndDelete(subjectID)
        .then(() => {
            res.status(200).send({ status: "Subject Deleted" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with deleting data" })
        })
})

//generate report
router.route("/print").post((req, res) => {
    let subjects = req.body.report;
    console.log(subjects)
const workSheetColumnName = [
    "Subject ID",
    "Subject Name",
    "Allocated Grade",
    "Description"
]
const workSheetName = 'Subject';
const filePath = './outputFiles/Subject.xlsx';
exportUsersToExcel(subjects, workSheetColumnName, workSheetName, filePath);
})

module.exports = router;