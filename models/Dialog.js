const mongoose = require('mongoose');

const dialogSchema = new mongoose.Schema({
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: "User"
    },
    createTime: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Dialog', dialogSchema);