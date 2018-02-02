const express = require("express");
const Article = require("../models/article");
const jwt = require("jsonwebtoken");
const url = require("url");
const http= require("http")



const router = express.Router();


module.exports = function (passport) {



    router.get("/:id", (req, res) => {

        Article.findById(req.params.id, (error, result) => {
            if (error) {
                res.status(500).json(error);
            }
            else {
                res.json(result)
            }
        });

    });

    router.get("/", (req, res) => {

        Article.find({}, (error, result) => {
            if (error) {
                res.status(500).json(error);
            }
            else {
                res.json(result)
            }
        });
    });

    router.post("/",passport.authenticate("auth", { session: false }),(req, res) => {


        if (!req.files.articleimages) {
            return res.status(400).send("No files were uploaded");
        }

        let image = req.files.articleimages;
        let date = new Date();
        let imageName = date.getTime() + ".png"

        image.mv("./public/articleimages/" + imageName, (error) => {

            if (error) return res.status(500).send(error);

            let newObj = new Article({
                userid:req.body.userid, 
                title: req.body.title,
                excerpt: req.body.excerpt,
                story: req.body.story,
                articleimages: "http://localhost:3000/articleimages/" + imageName
            });

            newObj.save((error) => {
                if (error) {
                    res.status(500).send(error);
                }
                else {
                    res.json(newObj);
                }
            });

        });

    });

    router.delete("/:id", (req, res) => {

        Article.findByIdAndRemove(req.params.id, (error, result) => {
            if (error) {
                res.status(500).json(error);
            }
            else {
                res.json({ message: "Data deleted" })
            }
        });

    });

    router.put("/", (req, res) => {

        let newObj = {
            // userid
            title: req.body.title,
            articledate:req.body.articledate,
            excerpt: req.body.excerpt,
            story: req.body.story,
            articleimages: req.body.articleimages
        };

        Article.findByIdAndUpdate(req.body._id, newObj, (error, result) => {
            if (error) {
                res.status(500).json(error);
            }
            else {
                res.status(500).json({ message: "Data updated" })
            }
        });

    });

    return router;
}