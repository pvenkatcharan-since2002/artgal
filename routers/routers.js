
const express = require("express").Router();
const route = express;
const fs = require("fs");
const path = require("path");
const ImageSchema = require("../models/post");
const uploads = require("../middleware/multer");
const Imageschema = require("../models/post");
const Comment = require("../models/comment");

//console.log("hello");
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
});
// route.get("/image:id/coment",(req,res)=>{
// 	res.send("hello");
// })

route.get("/image:id",(req,res)=>{
	ImageSchema.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
		if (err) {
			console.log(err);
		}
		else {
			// render show template with that campground
			const template_path = path.join(__dirname,"../templates/views/Show");
			console.log(template_path);
			res.render(template_path, { images: foundCampground });
		}
	});
})
const template_path = path.join(__dirname,"../templates");
			console.log(template_path);

route.get("/images:id/comment",(req,res)=>{
	ImageSchema.findById(req.params.id, function (err, foundresults) {
		if (err) {
			console.log(err);
		}
		else {
			res.render("comments/new", { foundComment: foundresults });
		}
	});
});
route.post("/images:id/comment",  function (req, res) {
	
	Imageschema.findById(req.params.id, function (err, res) {
		if (err) {
			console.log(err);
			res.redirect("/images:id/comment");
		}
		else {
			// create new comment
			Comment.create(req.body.comment, function (err, res_comment) {
				if (err) {
					req.flash("error", "Something went wrong");
					console.log(err);
				}
				else {
					// add username and id to comment
					res_comment.author.id = req.user._id;
					res_comment.author.username = req.user.username;
					// save comment
					res_comment.save();
					// connect new comment to campground
					res.comments.push(res_comment);
					res.save();
					console.log(res_comment);
					// redirect to campground show route
					req.flash("success", "Successfully added a comment.");
					res.redirect("/images" + res._id);
				}
			});
		}
	});
});

module.exports = route;