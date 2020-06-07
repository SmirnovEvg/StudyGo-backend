const mongoose = require('mongoose');

const laboratoryWorkSchema = new mongoose.Schema({
    laboratoryclass: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "LaboratoryClass"
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Student"
    },
    number: {
        type: Number,
    },
    passed: {
        type: Number,
    },
    visit: {
        type: String,
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model('laboratoryWork', laboratoryWorkSchema);