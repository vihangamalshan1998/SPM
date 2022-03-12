const router = require("express").Router();
const Marks = require("../models/marks");

//get All marks
router.route("/").get(async (req,res)=>{
    Marks.find().then((Marks) =>{
        res.json(Marks);
    }).catch((err)=>{
        console.log(err);
    })
})

//Add marks
router.route("/add").post(async (req,res)=>{
    const {StudentId,Name,Grade,Term,Status,marks} = req.body;
    const newMark = new Marks({
        StudentId,
        Name,
        Grade,
        Term,
        Status,
        marks
    });
    newMark.save().then(() =>{
        res.status(200).send({status: "Marks Added!"});
    })
})

//Delete Mark
router.route("/delete/:id").delete(async (req,res)=>{
    const id = req.params.id;
    await Marks.findOneAndDelete({_id:id}).then(()=>{
        res.status(200).send({status: "Mark Record Deleted Successfully"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete"});
    });
});

//Generate Report for Marks
router.route("/report/:id").get(async (req,res)=>{
    const id = req.params.id;
    Marks.find({StudentId:id}).then((Marks) =>{
        res.json(Marks);
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;