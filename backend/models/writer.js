const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/footyboard");

const Schema = mongoose.Schema;

const writerSchema = new Schema({


    userName:String,
    email:String,
    password:String,
    firstName: String,
    lastName:String,

    writerImage : String
});

const Writer = mongoose.model("writer", writerSchema);

module.exports = Writer;