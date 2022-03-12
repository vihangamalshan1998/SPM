const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Teacher = require('../models/Teacher')
const Student = require('../models/Students')
const Admin = require('../models/Admin')
const JWT_SECRET = 'dseiow985344he02-238hfsdy22@@@sdtjerltmdjdguot'

//Add a new user
router.route('/login').post(async (req, res) => {
  const { Username, password, type } = req.body
  let user
  console.log(Username + ' ' + password)
  if (type == 'Teacher') {
    console.log(Username + ' ' + password)
    user = await Teacher.findOne({ teacher_ID: Username, NIC: password }).lean()
    if (!user) {
      return res.json({ status: 'error', error: 'Invalid username/password' })
    } else {
      let token = jwt.sign(
        {
          id: user._id,
          name: user.firstName + user.lastName,
          email: user.email,
          type: 'Teacher',
        },
        JWT_SECRET,
      )
      return res.json({ status: 'ok', token: token })
    }
  } else if (type == 'Student') {
    console.log(Username + ' ' + password)
    user = await Student.findOne({
      admissionNumber: Username,
      firstName: password,
    }).lean()
    if (!user) {
      return res.json({ status: 'error', error: 'Invalid username/password' })
    } else {
      let token = jwt.sign(
        {
          id: user._id,
          name: user.firstName + user.lastName,
          email: user.email,
          stID: user.admissionNumber,
          section: user.section,
          type: 'Student',
        },
        JWT_SECRET,
      )
      return res.json({ status: 'ok', token: token })
    }
  } else if (type == 'Admin') {
    console.log(Username + ' ' + password)
    user = await Admin.findOne({
      userName: Username,
      password: password,
    }).lean()
    if (!user) {
      return res.json({ status: 'error', error: 'Invalid username/password' })
    } else {
      let token = jwt.sign(
        {
          id: user._id,
          name: user.userName,
          type: 'Admin',
        },
        JWT_SECRET,
      )
      return res.json({ status: 'ok', token: token })
    }
  }
})

//Add an Admin
router.route('/addAdmin').post(async (req, res) => {
  const { userName, password } = req.body
  const newAdmin = new Admin({
    userName,
    password,
  })
  newAdmin.save().then(() => {
    res.status(200).send({ status: 'Admin Added!' })
  })
})

module.exports = router
