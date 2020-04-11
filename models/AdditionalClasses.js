const mongoose = require('mongoose');

const additionalClassesSchema = new mongoose.Schema({
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
    dayOfTheWeek: {
        type: Number,
        required: true
    },
    classTime: {
        type: Number,
        required: true
    },
    groups: [{
        type: Number,
        required: true
    }]
});

module.exports = mongoose.model('AdditionalClasses', additionalClassesSchema);