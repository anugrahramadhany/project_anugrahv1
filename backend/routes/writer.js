const express = require("express")
const Writer = require("../models/writer")

const jwt = require("jsonwebtoken")


const router = express.Router();







router.post("/signup", (req, res) => {

    if (!req.files.writerImage) {
        return res.status(400).send("No files were uploaded");
    }

    let image = req.files.writerImage;
    
    let imageName = Date.now()+".png"

    image.mv("./public/writerimages/" + imageName, (error) => {

        if (error) return res.status(500).send(error);

        let newObj = new Writer ({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            writerImage:"http://localhost:3000/writerimages/" + imageName  
    });

        newObj.save((error) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.json(newObj);
            }
        });
    });

})

router.post("/login", (req, res)=>{
    

    Writer.findOne({userName : req.body.userName, password: req.body.password}, (error ,result)=>{
        if(error){
            res.status(500).json(error);
        }
        else if(!result){
            res.status(404).json({message:"User not found !"})
        }else{
            const payload ={
                id:result._id,
                name:result.userName
            }
            const token = jwt.sign(payload, "secretkey", {expiresIn :200000 });
            
            // const  userName = result.firstName
            res.json({token:token});
            
        };
    });
});

router.get("/", (req, res) => {
    
            Writer.find({}, (error, result) => {
                if (error) {
                    res.status(500).json(error);
                }
                else {
                    res.json(result)
                }
            });
        });


        router.delete("/:id", (req, res) => {
            
                    Writer.findByIdAndRemove(req.params.id, (error, result) => {
                        if (error) {
                            res.status(500).json(error);
                        }
                        else {
                            res.json({ message: "Data deleted" })
                        }
                    });
            
                });
module.exports = (function () {
    return router;
})();
