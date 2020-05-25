const router = require('express').Router();
const express = require('express');
const multer = require('multer');
const Event = require('../models/Event');

router.use(express.static(__dirname + "../public"));

const Storage = multer.diskStorage({
    destination: "../frontend/public/uploads",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + file.originalname);
    }
})

const upload = multer({
    storage: Storage
}).single('file');

router.post('/', upload, (req, res) => {
    const newEvent = new Event({
        name: req.body.name,
        description: req.body.description,
        dateCreated: req.body.date,
        image: req.file.filename
    })
    newEvent.save();
    res.send(newEvent);
})

router.get('/', (req, res) => {
    Event.find({}).sort({dateCreated: -1}).then((events) => res.send(events));
});

router.get('/post', (req, res) => {    
    Event.findOne({
        _id: req.query.id
    }).then((event) => {
        res.status(200).send(event)
    });
});

router.put('/', upload, (req, res) => {
    Event.findByIdAndUpdate({
        _id: req.body.eventId
    }, {
        name: req.body.name,
        description: req.body.description,
        image: req.file ? req.file.filename : req.body.image
    }, {
        new: true
    }).then(data => {
        res.send(data)
    })
})

router.delete('/', (req, res) => {
    try {
        Event.deleteOne({
                _id: req.body.id
            })
            .then(() => {
                res.status(200)
            })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;