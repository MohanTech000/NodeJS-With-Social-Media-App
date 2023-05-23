const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPhoto: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followee: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:Number,
        enum: [1, 2, 3] //enumerated property is used to take a value from a predefined list.

    }
},

    { timestamps: true } //it will automatically set user time stamp whenever we update or del user.

);

module.exports = mongoose.model("User", userSchema)