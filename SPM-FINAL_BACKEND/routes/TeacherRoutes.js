const router = require('express').Router()
const Teacher = require('../models/Teacher')
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const nodemailer = require('nodemailer')
const exportUsersToExcel = require('./documents/exportService')
const pdfTemplate = require('./documents/pdftemplate')
const pdf = require('html-pdf')

//Credentials for mail sending
let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'applicationframeworkproject@gmail.com',
    pass: 'malisha1996',
  },
})

//Multer for file storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/teachers')
  },
  filename: function (req, file, cb) {
    console.log(file.originalname)
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    const fileExt = path.extname(file.originalname)
    const fileText =
      Date.now() +
      '-' +
      file.originalname +
      '-' +
      dd +
      '-' +
      mm +
      '-' +
      yyyy +
      fileExt
    cb(null, fileText)
  },
})

var upload = multer({
  storage: storage,
})

//add new Teacher
router.route('/add').post(upload.single('profile_Picture'), (req, res) => {
  const {
    teacher_ID,
    teacher_Name,
    email,
    NIC,
    allocated_Grade,
    subject,
    description,
  } = req.body
  const profile_Picture = req.file.filename
  const newTeacher = new Teacher({
    teacher_ID,
    teacher_Name,
    email,
    NIC,
    profile_Picture,
    subject,
    allocated_Grade,
    description,
  })
  newTeacher
    .save()
    .then(() => {
      let mailDetails = {
        from: 'applicationframeworkproject@gmail.com',
        to: newTeacher.email,
        subject: 'YOU ADDED AS A TEACHER IN KIDZ SCHOOL',
        text:
          'Mr./Mrs. ' +
          newTeacher.teacher_Name +
          ',\n\n' +
          'Congradulations!\n\n' +
          'Succesfully, You added as a Teacher IN KIDZ SCHOOL\n\n' +
          'You email is ' +
          newTeacher.email +
          ' \n\n' +
          'You password is ' +
          newTeacher.NIC +
          ' \n\n',
      }
      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log('Error Occurs')
        } else {
          console.log('Email sent successfully')
        }
      })
      console.log('Teacher Added')
      res.json('Teacher Added')
    })
    .catch((err) => {
      console.log(err)
    })
})

//get all Teacher details
router.route('/GetAllTeacaher').get((req, res) => {
  Teacher.find({})
    .populate('subject', 'subject_ID subject_Name allocated_Grade description')
    .then((events) => {
      res.json(events)
    })
    .catch((err) => {
      console.log(err)
    })
})

//get all Teacher details using grade
router.route('/GetAllTeacaherUsingGrade/:grade').get((req, res) => {
  let grade = req.params.grade
  Teacher.find({ allocated_Grade: grade })
    .populate('subject', 'subject_ID subject_Name allocated_Grade description')
    .then((events) => {
      res.json(events)
    })
    .catch((err) => {
      console.log(err)
    })
})

//get Teacher details using Teacher id
router.route('/GetTeacher/:id').get((req, res) => {
  let teacherID = req.params.id
  Teacher.findById(teacherID)
    .populate('subject', 'subject_ID subject_Name allocated_Grade description')
    .then((subject) => {
      res.json(subject)
    })
    .catch((err) => {
      console.log(err)
    })
})

//update only teacher details without picture using teacher id
router.route('/assgin/:id').put(async (req, res) => {
  let TeacherID = req.params.id
  const {
    teacher_ID,
    teacher_Name,
    email,
    NIC,
    allocated_Grade,
    profile_Picture,
    subject,
    description,
  } = req.body

  const updateTeacher = {
    teacher_ID,
    teacher_Name,
    email,
    NIC,
    allocated_Grade,
    profile_Picture,
    subject,
    description,
  }
  const update = await Teacher.findByIdAndUpdate(TeacherID, updateTeacher)
    .then(() => {
      res.status(200).send({ status: 'Teacher Updated' })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ status: 'Error with Updating data' })
    })
})

//update teacher with new image
router
  .route('/update/:id/:picturename')
  .put(upload.single('profile_Picture'), (req, res) => {
    let TeacherID = req.params.id
    const {
      teacher_ID,
      teacher_Name,
      email,
      NIC,
      allocated_Grade,
      description,
    } = req.body
    const profile_Picture = req.file.filename
    let picturename = req.params.picturename
    const updateTeacher = {
      teacher_ID,
      teacher_Name,
      email,
      NIC,
      allocated_Grade,
      profile_Picture,
      description,
    }
    const update = Teacher.findByIdAndUpdate(TeacherID, updateTeacher)
      .then(() => {
        res.status(200).send({ status: 'Teacher Updated' })
        fs.unlink(
          'C:/Users/JontyRulz/Desktop/SPM-FINAL_BACKEND/uploads/teachers/' +
            picturename,
          function (err) {
            if (err) throw err
            console.log('File deleted!')
          },
        )
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send({ status: 'Error with Updating data' })
      })
  })

//update teacher without new image
router.route('/update/:id').put(async (req, res) => {
  let TeacherID = req.params.id
  const {
    teacher_ID,
    teacher_Name,
    email,
    NIC,
    allocated_Grade,
    profile_Picture,
    description,
  } = req.body
  const updateTeacher = {
    teacher_ID,
    teacher_Name,
    email,
    NIC,
    profile_Picture,
    allocated_Grade,
    description,
  }
  const update = await Teacher.findByIdAndUpdate(TeacherID, updateTeacher)
    .then(() => {
      res.status(200).send({ status: 'Reviwer Updated' })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ status: 'Error with Updationg data' })
    })
})

//delete the teacher with file
router.route('/Delete/:id/:filename').delete(async (req, res) => {
  let teacherID = req.params.id
  let filename = req.params.filename

  await Teacher.findByIdAndDelete(teacherID)
    .then(() => {
      fs.unlink(
        'C:/Users/JontyRulz/Desktop/SPM-FINAL_BACKEND/uploads/teachers/' +
          filename,
        function (err) {
          if (err) throw err
          console.log('File deleted!')
        },
      )
      res.status(200).send({ status: 'Teacher Deleted' })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ status: 'Error with deleting data' })
    })
})

//generate report
router.route('/print').post((req, res) => {
  let teachers = req.body.report
  const workSheetColumnName = [
    'ID',
    'Name',
    'Email',
    'NIC',
    'Allocated Grade',
    'Description',
  ]
  const workSheetName = 'Teachers'
  const filePath = './outputFiles/teacher.xlsx'
  exportUsersToExcel(teachers, workSheetColumnName, workSheetName, filePath)
})
router.post('/createpdf', (req, res) => {
  pdf
    .create(pdfTemplate(req.body), {})
    .toFile('./routes/TeacherDetails.pdf', (err) => {
      if (err) {
        return console.log('error')
      }
      res.send(Promise.resolve())
    })
})
router.get('/getpdf', (req, res) => {
  res.sendFile(__dirname + '/TeacherDetails.pdf')
})

module.exports = router
