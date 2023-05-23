const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    }
},

    { timestamps: true } //it will automatically set user time stamp whenever we update or del user.

);

module.exports = mongoose.model("Post", postSchema);