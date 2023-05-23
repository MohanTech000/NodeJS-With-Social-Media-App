const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/social-media",{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("success");
}).catch((error)=>{
    console.error(error);
})