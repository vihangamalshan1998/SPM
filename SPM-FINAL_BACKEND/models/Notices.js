const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//Notice Schema
const noticesSchema = new Schema({
    image : {
        type : String,
        required: false
    },
    title : {
        type : String,
        required: false
    },
    description : {
        type : String,
        required: false
    }
})

const Notices = mongoose.model("Notices",noticesSchema);
module.exports = Notices;
