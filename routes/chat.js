const router = require('express').Router();

const Dialog = require('../models/Dialog');
const Message = require('../models/Message');

router.post('/dialog', async (req, res) => {
    const newDialog = new Dialog({
        users: req.body.users,
        createTime: req.body.createTime
    })
    res.send(newDialog);

    await newDialog.save();
})

router.get('/dialog/', (req, res) => {
    Dialog.find({
            users: req.query.userId
        }).populate({
            path: 'users',
            match: {
                _id: {
                    $ne: req.query.userId
                }
            },
            select: '-studnumber -password -role'
        })
        .then(data => {
            const dialog = data.map(x => {
                return {
                    id: x._id,
                    user: x.users[0]
                }
            })
            res.json(dialog);
        })
})

router.post('/message', async (req, res) => {
    const newMessage = new Message({
        dialogId: req.body.dialogId,
        chatMessageText: req.body.chatMessageText,
        chatMessageTime: req.body.chatMessageTime,
        chatMessageUser: req.body.chatMessageUser
    })
    res.send(newMessage);
    await newMessage.save();
})

router.get('/message/', (req, res) => {
    Message.find({
        dialogId: req.query.dialogId
    }).then(data => {
        res.json(data)
    })
})

module.exports = router;