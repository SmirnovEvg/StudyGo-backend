const router = require('express').Router();

const Dialog = require('../models/Dialog');
const Message = require('../models/Message');
const User = require('../models/User');

router.post('/dialog', (req, res) => {
    const newDialog = new Dialog({
        users: [req.body.userId, req.body.partnerId],
        createTime: req.body.createTime
    })
    res.send(newDialog);

    newDialog.save();
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
            const partnerIds = data.map(x => {
                return {
                    id: x.users[0]._id
                }
            })
            res.json({
                dialog,
                partnerIds
            });
        })
})

router.get('/dialog/findbyusers', (req, res) => {
    if (req.query) {
        try {
            Dialog.find({
                    $and: [{
                            users: req.query.userId
                        },
                        {
                            users: req.query.profileUserId
                        },
                    ]
                })
                .then(data => {
                    res.status(200).send(data)
                })
        } catch (error) {
            res.status(500).send(error)
        }
    }
})

router.get('/partner/', (req, res) => {
    Dialog.findOne({
            _id: req.query.dialogId
        }).populate({
            path: 'users',
            match: {
                _id: {
                    $ne: req.query.userId
                }
            },
            select: 'firstName secondName _id'
        })
        .then(data => {
            const user = data.users[0];
            res.json(user);
        })
})

router.post('/message', async (req, res) => {
    const newMessage = new Message({
        dialogId: req.body.dialogId,
        chatMessageText: req.body.chatMessageText,
        chatMessageTime: req.body.chatMessageTime,
        chatMessageUser: req.body.chatMessageUser,
        isRead: false
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

router.get('/message/unread', (req, res) => {
    Message.find({
        dialogId: req.query.dialogId,
        chatMessageUser: req.query.partnerId,
        isRead: false
    }).then(data => {
        res.json(data.length)
    })
})

router.get('/message/unread/all', (req, res) => {
    Dialog.find({
        users: req.query.userId
    }).then(dialogs => {
        const dialogsIds = dialogs.map((dialog) => {
            return {
                dialogId: dialog._id
            }
        })
        Message.find({
            $or: dialogsIds,
            isRead: false,
            chatMessageUser: {
                $ne: req.query.userId
            }
        }).then(mess => {
            res.send(mess)
        })
    })
})

router.put('/message/unread', (req, res) => {
    Message.updateMany({
        dialogId: req.body.dialogId,
        chatMessageUser: req.body.partnerId
    }, {
        $set: {
            isRead: true
        }
    }).then(data => {
        res.json(data)
    })
})

router.get('/users/', (req, res) => {
    let arr = [];
    for (var i = 0; i < req.query.partners.length; i++) {
        arr.push(JSON.parse(req.query.partners[i]).id);
    }

    User.find({
            _id: {
                $not: {
                    $in: arr
                }
            }
        })
        .select('-password -studnumber -thirdName')
        .then(data => {
            const searchStudentList = data.filter(item => {
                return (item.firstName.toLowerCase().includes(req.query.searchText.toLowerCase()) || item.secondName.toLowerCase().includes(req.query.searchText.toLowerCase())) && item.role === 0
            })

            const searchTeacherList = data.filter(item => {
                return (item.firstName.toLowerCase().includes(req.query.searchText.toLowerCase()) || item.secondName.toLowerCase().includes(req.query.searchText.toLowerCase())) && (item.role === 1 || item.role === 2)
            })

            res.json({
                searchStudentList,
                searchTeacherList
            })
        })
})

module.exports = router;