const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    course: {
        type: Number,
        required: true,
        max: 4
    },
    group: {
        type: Number,
        required: true,
    },
    groupPart: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Student', studentSchema);