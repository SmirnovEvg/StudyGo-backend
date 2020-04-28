const mongoose = require('mongoose');

const laboratoryClassSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Subject"
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    course: {
        type: Number,
        required: true
    },
    group: {
        type: Number,
        required: true
    },
    groupPart: {
        type: Number,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Student"
    }],
    count: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('laboratoryClass', laboratoryClassSchema);