const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/footyboard");

const Schema = mongoose.Schema;

const articleSchema = new Schema({

    // userid:String,
    title : String,
    articleDate:String,
    excerpt : String,
    story:String,
    articleimages : String
});

const Article = mongoose.model("article", articleSchema);

module.exports = Article;