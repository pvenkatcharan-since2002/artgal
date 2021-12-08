const mongoose = require("mongoose");
const comment = require("./comment");
const user = require("./registration");
const commentSchema =  mongoose.Schema({
    comment: {
        type:String
    },
    createdAt: { type: Date, default: Date.now }
    
    ,username:{
        type:String,
        ref:user
    }
});
const Comment= new mongoose.model("comment",commentSchema);
module.exports = Comment;