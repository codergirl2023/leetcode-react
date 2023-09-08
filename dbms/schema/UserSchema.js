const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    fullName:{
        type: String
    },
    age: {
        type: Number,
        default: 0,
    },
    submissions:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Submissions'
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;