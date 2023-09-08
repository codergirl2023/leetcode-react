const mongoose = require('mongoose');
const {Types} = require("mongoose/lib/schema");

const SubmissionsSchema = new mongoose.Schema({
    language: {
        type: String
    },
    code: {
        type: String
    },
    userId:{
        type: Types.ObjectId, ref: 'User'
    },
    problemId:{
        type: Types.ObjectId, ref: 'Problems'
    }
});

const Submissions = mongoose.model("Submissions", SubmissionsSchema);

module.exports = Submissions;