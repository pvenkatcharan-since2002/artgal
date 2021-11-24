const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
   
    file:{
        type:String,
        requried:true,
    },
    desc:{
        type:String,
        required:true,

    },
    imageBase64:{
        type:String,
        required:true
    }
});

const Posts = new mongoose.model("post",PostSchema);

module.exports = Posts;