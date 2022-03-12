const router = require("express").Router();
let Notices = require("../models/Notices");
const path = require('path');
const multer = require('multer');
const fs = require('fs');

//multer for file handling
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

//add a new Notice
router.route("/addNotices").post(upload.single('image'),(req,res)=>{
    const image = req.file.filename;
    const title = req.body.title;
    const description = req.body.description;
    const newNotice = new Notices({
        image,
        title,
        description,
    })
    newNotice.save().then(() =>{
        res.json("Notice Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//get all Notices
router.route("/allNotices").get((req,res)=>{
    Notices.find().then((notices =>{
        res.json(notices)
    })).catch((err)=>{
        console.log(err)
    })
})

//delete Notices
router.route("/delete/:id").delete(async (req, res)=>{
    let noticeId= req.params.id;
    await Notices.findByIdAndDelete(noticeId).then(()=>{
        res.status(200).send({status: "Notice Deleted Successfully"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete ", noticeerror: err.message});
    })
})

//update notices with the image
router.route("/update/:id/:picturename").put(upload.single('image'), (req, res) => {
    let noticeID = req.params.id;
    const { title, description } = req.body;
    const image = req.file.filename;
    let picturename = req.params.picturename;
    const updateNotice = {
        image,
        title,
        description
    }
    const update = Notices.findByIdAndUpdate(noticeID, updateNotice)
        .then(() => {
            res.status(200).send({ status: "Notice Updated" })
            fs.unlink('D:/Y3S2/SPM/SPM/BACKEND/uploads/' + picturename, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Updating data" })
        })
})

//update notice without new image
router.route("/update/:id").put(async (req, res) => {
    let noticeID = req.params.id;
    const { title, description } = req.body;
    const updateNotice = {
        title,
        description
    }
    const update = await Notices.findByIdAndUpdate(noticeID, updateNotice)
        .then(() => {
            res.status(200).send({ status: "Notice Updated" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Updating data" })
        })
})

//get notice by ID
router.route("/get/:id").get(async (req, res)=>{
    let noticeId = req.params.id;
    Notices.findById(noticeId).then((notices)=>{
        res.json(notices)
    }).catch((err)=>{
        console.log(err);
    })
})

//search notice by title
router.route("/getNotice/:notice").get((req,res)=>{
    let notice = req.params.notice;
    Notices.find({ title: notice}).then((notices)=>{
        res.json(notices)
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;