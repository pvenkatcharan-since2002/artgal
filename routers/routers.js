
const express = require("express").Router({ mergeParams: true });
const route = express;
const bodyparser = require("body-parser");
const fs = require("fs");
const path = require("path");
const flash = require("req-flash");
const ImageSchema = require("../models/post");
const uploads = require("../middleware/multer");
// const Imageschema = require("../models/post");
const Comment = require("../models/comment");
const users = require("../models/registration");
const Users = require("../models/registration");
const { Router } = require("express");

//console.log("hello");
const jsonParser = bodyparser.json();

route.use(bodyparser.urlencoded({extended:false}));
const file_path = path.join(__dirname,"../uploads/");

route.post("/Posts",uploads.single('image'),(req,res,next)=>{
	console.log(req.body.artist_name);
    var obj = {
		name: req.body.name,
		desc: req.body.desc,
		img: {
			data: fs.readFileSync(path.join(file_path + req.file.filename)),
			contentType: 'image/png'
		},
		artist_name:req.body.artist_name,
		materials_used:req.body.materials_used,
		contact_details:req.body.contact_details,
		payment_id:req.body.payment_id,
		base_price:req.body.base_price
		
	}
	ImageSchema.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
			res.send(`<div class="alert alert-success" role="alert">
			Your Post published Successfully
		  </div>`);
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
			//console.log(template_path);
			res.render(template_path, { images: foundCampground });
		}
	});
})


const template_path = path.join(__dirname,"../templates");
			console.log(template_path);

route.get("/images:id/comment/new",(req,res)=>{
	console.log(req.url);
	const post_id = req.params.id
	console.log(post_id);
	console.log(post_id.name);
	//console.log(actual_path);
	//console.log(path.join(req.url,"../"));
	ImageSchema.findById(req.params.id, function (err, foundresults) {
		if (err) {
			console.log(err);
		}
		else {
			res.render("comments/new", { foundComment: foundresults });
			//const demopath = path.join(foundresults,"./");
			//console.log("demo path : ",demopath);
		}
	});
});


route.post("/comments/new",async(req,res)=>{
	
	try {
		console.log(JSON.stringify(req.body));
		console.log(req.params.id);
	//const usercomment = JSON.stringify(req.body.usercomment);
	const comment = req.body.usercomment;
	const username = req.body.username;
	const newComment = new Comment({
		comment : comment,
		username:username
	});
	 await newComment.save();
	ImageSchema.comments=newComment;
	res.render("/Show");
	//console.log(req.url);
	} catch (error) {
		console.log("Error occured while posting a new comment");
		console.log(error);
	}
});
route.get('/logout', function(req, res, next) {
	// remove the req.user property and clear the login session
	req.logout();
  
	// destroy session data
	req.session = null;
  
	// redirect to homepage
	res.redirect('/login');
  });


module.exports = route;