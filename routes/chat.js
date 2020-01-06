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

router.post('/getMessages', async (req, res) => {
   Message.find({dialogId: req.body.dialogId}).then(mess => {
       res.json(mess)
   })
})

module.exports = router;