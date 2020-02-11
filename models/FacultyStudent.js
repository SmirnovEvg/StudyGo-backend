const mongoose = require('mongoose');

const facultyStudentSchema = new mongoose.Schema({
    studnumber: {
        type: Number,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    secondName: {
        type: String,
        required: true,
    },
    thirdName: {
        type: String,
        required: true
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

module.exports = mongoose.model('FacultyStudent', facultyStudentSchema);