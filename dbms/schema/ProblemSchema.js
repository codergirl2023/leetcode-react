const mongoose = require('mongoose');

const ProblemsSchema = new mongoose.Schema({

    title: {
        type: String
    },
    description: {
        type: String
    },
    examples:{
        type: String,
        get: function(data) {
            try {
                return JSON.parse(data);
            } catch(error) {
                return data;
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        }
    },
    acceptance: {
        type: String
    },
    difficulty: {
        type: String
    }
});

const Problems = mongoose.model("Problems", ProblemsSchema);

module.exports = Problems;