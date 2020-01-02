const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
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
    department: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Teacher', teacherSchema);