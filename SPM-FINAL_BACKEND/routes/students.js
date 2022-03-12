const router = require("express").Router();
let Students = require("../models/Students");
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const pdf = require('html-pdf');
const pdfTemplate = require('./documents');

//multer for image handling
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads');
    },
    filename:function(req,file,cb){
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
    storage : storage
})

//add a new Student
router.route("/addStudents").post(upload.single('image'),(req,res)=>{
    const image = req.file.filename;
    const admissionNumber = req.body.admissionNumber;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const section  = req.body.section;
    const className = req.body.className;
    const  gender  = req.body.gender;
    const  dateOfBirth  = req.body.dateOfBirth;
    const  mobileNumber  = req.body.mobileNumber;
    const  email  = req.body.email;
    const  address  = req.body.address;
    const  guardianName  = req.body.guardianName;
    const  guardianRelationship  = req.body.guardianRelationship;
    const  guardianMobileNumber  = req.body.guardianMobileNumber;
    const  guardianEmail  = req.body.guardianEmail;

    const newStudent = new Students({
        image,
        admissionNumber,
        firstName,
        lastName,
        section,
        className,
        gender,
        dateOfBirth,
        mobileNumber,
        email,
        address,
        guardianName,
        guardianRelationship,
        guardianMobileNumber,
        guardianEmail
    })
    newStudent.save().then(() =>{
        res.json("Student Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//get all students
router.route("/allStudents").get((req,res)=>{
    Students.find().then((students =>{
        res.json(students)
    })).catch((err)=>{
        console.log(err)
    })
})

//delete Student
router.route("/delete/:id").delete(async (req, res)=>{
    let studentId= req.params.id;
    await Students.findByIdAndDelete(studentId).then(()=>{
        res.status(200).send({status: "Student Deleted Successfully"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete ", studenterror: err.message});
    })
})

//get student by ID
router.route("/get/:id").get(async (req, res)=>{
    let studentId = req.params.id;
    Students.findById(studentId).then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err);
    })
})

//update notices with the image
router.route("/update/:id/:picturename").put(upload.single('image'), (req, res) => {
    let studentID = req.params.id;
    const { admissionNumber,
        firstName,
        lastName,
        section,
        className,
        gender,
        dateOfBirth,
        mobileNumber,
        email,
        address,
        guardianName,
        guardianRelationship,
        guardianMobileNumber,
        guardianEmail} = req.body;
    const image = req.file.filename;
    let picturename = req.params.picturename;
    const updateStudent = {
        image,
        admissionNumber,
        firstName,
        lastName,
        section,
        className,
        gender,
        dateOfBirth,
        mobileNumber,
        email,
        address,
        guardianName,
        guardianRelationship,
        guardianMobileNumber,
        guardianEmail
    }
    const update = Students.findByIdAndUpdate(studentID, updateStudent)
        .then(() => {
            res.status(200).send({ status: "Student Updated" })
            fs.unlink('D:/Y3S2/SPM/SPM/BACKEND/uploads/' + picturename, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Updating data" })
        })
})

//update student without new image
router.route("/update/:id").put(async (req, res) => {
    let studentID = req.params.id;
    const { admissionNumber,
        firstName,
        lastName,
        section,
        className,
        gender,
        dateOfBirth,
        mobileNumber,
        email,
        address,
        guardianName,
        guardianRelationship,
        guardianMobileNumber,
        guardianEmail } = req.body;
    const updateStudent = {
        admissionNumber,
        firstName,
        lastName,
        section,
        className,
        gender,
        dateOfBirth,
        mobileNumber,
        email,
        address,
        guardianName,
        guardianRelationship,
        guardianMobileNumber,
        guardianEmail
    }
    const update = await Students.findByIdAndUpdate(studentID, updateStudent)
        .then(() => {
            res.status(200).send({ status: "Student Updated" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Updating data" })
        })
})

//get student by admissionNumber
router.route("/getStudent/:studentNumber").get((req,res)=>{
    let studentNumber = req.params.studentNumber;
    Students.find({admissionNumber : studentNumber}).then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err);
    })
})

//get student by section
router.route("/getStudentBySection/:grade").get((req,res)=>{
    let grade = req.params.grade;
    Students.find({section : grade}).then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err);
    })
})

//get student by class
router.route("/getStudentByClass/:classname").get((req,res)=>{
    let classname = req.params.classname;
    Students.find({className : classname}).then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err);
    })
})

//get student by name
router.route("/getStudentByName/:studentName").get((req,res)=>{
    let studentName = req.params.studentName;
    Students.find({ firstName: studentName}).then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err);
    })
})

//Generate PDF Report
router.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('student.pdf', (err) => {
        if(err) {
            return console.log('error');
        }
        res.send(Promise.resolve())
    });
})

//Get the PDF report from the frontend
router.get('/getpdf', (req, res) => {
    res.sendFile('D:\\Y3S2\\SPM\\SPM\\BACKEND\\student.pdf');
});

// get student using section number
router.route("/getpStudentUsingSection/:SectionNumber").get((req, res) => {
    let SectionNumber = req.params.SectionNumber;
    Students.find({ section: SectionNumber }).then((Students) => {
        res.json(Students)
    }).catch((err) => {
        console.log(err);
    })
})


module.exports = router;