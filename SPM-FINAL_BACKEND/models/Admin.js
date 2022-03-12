const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//Admin Schema
const adminSchema = new Schema({
    userName : {
        type : String,
        required: false
    },
    password : {
        type : String,
        required: false
    },
})

const Admin = mongoose.model("Admin",adminSchema);
module.exports = Admin;
