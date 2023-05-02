const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 6,
        max: 20,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true

    },
    password: {
        type: String,
        min: 6,
        max: 20,
        require: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    designation:{
        type:String,
        default:""
    },
    from:{
        type:String
    },
    mobileNo:{
        type:String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);


module.exports = mongoose.model("user", userSchema);
