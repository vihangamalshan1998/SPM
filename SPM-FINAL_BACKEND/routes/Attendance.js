const router = require("express").Router();
const Attendance = require("../models/attendance");

//Add new attendance
router.route("/mark").post((req, res) => {
    const {StudentId,status,className} = req.body;
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const date = year + "/" + month + "/" + day;
    const newAttendance = new Attendance({
        StudentId,
        date,
        status,
        className
    });
    newAttendance.save().then(() =>{
        res.status(200).send({status: "Attendance Added!"});
    })
})

//view all attendance
router.route("/").get((req, res) => {
    Attendance.find().then((Attendance) =>{
        res.json(Attendance);
    }).catch((err)=>{
        console.log(err);
    })
})

//Search Attendance by ClassName
router.route("/:className").get((req, res) => {
    let className = req.params.className;
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const date = year + "/" + month + "/" + day;
    Attendance.find({className:className, date:date}).then((Attendance) =>{
        res.json(Attendance);
    }).catch((err)=>{
        console.log(err);
    })
})

//Edit attendance
router.route("/editAttendance").post(async (req,res) =>{
    const {_id,StudentId,status,className} = req.body;
    const UpdateAttendance = {
        StudentId,
        status,
        className
    }
    await Attendance.findByIdAndUpdate(_id,UpdateAttendance).then(()=>{
        res.status(200).send({status: "Updated!"});
    }).catch((err) =>{
        res.status(500).send({status: "Error with updating data"});
    })
})

//delete attendance
router.route("/delete/:id").delete(async (req,res)=>{
    let attId = req.params.id;
    await Attendance.findOneAndDelete(attId).then(()=>{
        res.status(200).send({status: "Attendance Deleted Successfully"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete"});
    })
})

//report generation
router.route("/report/:id").get(async (req,res)=>{
    let id = req.params.id;
    Attendance.find({StudentId:id}).then((Attendance) =>{
        res.json(Attendance);
    }).catch((err)=>{
        console.log(err);
    })
})
module.exports = router;
