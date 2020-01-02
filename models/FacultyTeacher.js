const mongoose = require('mongoose');

const facultyTeacherSchema = new mongoose.Schema({
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
    department: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('facultyTeacher', facultyTeacherSchema);