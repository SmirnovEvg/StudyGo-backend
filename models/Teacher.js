const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    department: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Subject"
    }],
    additionals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AdditionalClasses"
    }],
    image: {
        type: String,
    }
});

module.exports = mongoose.model('Teacher', teacherSchema);