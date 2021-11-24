const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
   
    author:{
        type:String,
        requried:true,
    },
    desc:{
        type:String,
        required:true,

    },
    image:{
        type:String,
        required:true
    }
});

const Posts = new mongoose.model("post",PostSchema);

module.exports = Posts;