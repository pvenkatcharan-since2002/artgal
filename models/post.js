const mongoose = require("mongoose");
const comment = require("./comment");
const user = require("./registration");
const uploadSchema = new mongoose.Schema({
    name: String,
    
    img:
    {
        data: Buffer,
        contentType: String
    },
    artist_name:{
        type:String
    },
    materials_used:{
        type:String
    },
    contact_details:{
        type:String
    },
    payment_id:{
        type:String
    },
    base_price:{
        type:String
    },
    desc: String,
    createdAt: { type: Date, default: Date.now },
    
   
});

const Imageschema = new mongoose.model("imageupload",uploadSchema);
module.exports = Imageschema;