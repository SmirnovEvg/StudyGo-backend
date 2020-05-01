const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Subject"
    },
    classroomNumber: {
        type: String,
        required: true
    },
    hall: {
        type: Number,
        required:true
    },
    week: {
        type: Number,
        required: true
    },
    dayOfTheWeek: {
        type: Number,
        required: true
    },
    classTime: {
        type: Number,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    group: [{
        type: Number,
        required: true
    }],
    course: {
        type: Number,
        required: true
    },
    groupPart: {
        type: Number,
        default: 0
    },
    additional: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Timetable', timetableSchema);