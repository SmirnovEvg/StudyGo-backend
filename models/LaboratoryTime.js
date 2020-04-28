const mongoose = require('mongoose');

const laboratoryTimeSchema = new mongoose.Schema({
    laboratoryclass: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "LaboratoryClass"
    },
    number: {
        type: Number,
    },
    date: {
        type: Date,
    },
});

module.exports = mongoose.model('laboratoryTime', laboratoryTimeSchema);