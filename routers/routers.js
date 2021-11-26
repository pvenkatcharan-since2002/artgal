
const express = require("express").Router();
const route = express;
const fs = require("fs");
const path = require("path");
const ImageSchema = require("../models/post");
const uploads = require("../middleware/multer");
console.log("hello");
const file_path = path.join(__dirname,"../uploads/");

route.post("/Posts",uploads.single('image'),(req,res,next)=>{
    var obj = {
		name: req.body.name,
		desc: req.body.desc,
		img: {
			data: fs.readFileSync(path.join(file_path + req.file.filename)),
			contentType: 'image/png'
		}
	}
	ImageSchema.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
			res.redirect('/Posts');
		}
	});
})

route.get("/Posts",(req,res)=>{
    res.render("Post");
})

route.get('/ViewAll', (req, res) => {
    ImageSchema.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
           // res.send(items);
            //console.log(items);

            res.render("AllPosts",{items:items});
        }
    });
});
route.get("/ViewAll",(req,res)=>{
    res.render("AllPosts");
})
module.exports = route;