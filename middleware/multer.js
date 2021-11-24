const multer = require("multer");
const path = require("path");
//setting the storage
const storage = multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        //returning the extension of the uploaded image

        //const extenstion = file.originalname.substr(file.originalname.lastIndexOf("."));

        //naming the for uploaded image
        cb(null,Date.now()+path.extname(file.originalname));
    }
})

store = multer({storage:storage});
module.exports = store;