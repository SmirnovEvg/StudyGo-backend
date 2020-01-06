const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    dialogId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Dialog"
    },
    chatMessageText: {
        type: String,
        required: true
    },
    chatMessageTime: {
        type: Date,
        required: true
    },
    chatMessageUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
});

module.exports = mongoose.model('Message', messageSchema);