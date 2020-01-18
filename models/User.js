const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    studnumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    thirdName: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);