const mongoose = require("mongoose");

const uploadSchema = mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const Imageschema = new mongoose.model("imageupload",uploadSchema);
module.exports = Imageschema;