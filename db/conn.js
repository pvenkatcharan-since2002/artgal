const mongoose = require("mongoose");
const db = "mongodb+srv://artgal:password@cluster1.pe3cofh.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
}).then(()=>{
    console.log("Connected to the databse")
}).catch((err)=>{
    console.log("Something went wrong while connecting to the databse");
    console.log(err)
});

