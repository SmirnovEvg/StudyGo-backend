const router = require('express').Router();
const Event = require('../models/Event');

router.post('/', (req, res) => {    
    const newEvent = new Event({
        name: req.body.name,
        description: req.body.description,
        dateCreated: req.body.date
    })
    newEvent.save();
    res.send(newEvent);
})

router.get('/', (req, res) => {
    Event.find({}).then((events) => res.send(events));
});

router.put('/', (req, res) => {
    Event.findByIdAndUpdate({
        _id: req.body.eventId
    }, {
        name: req.body.name,
        description: req.body.description,
    },
    {new: true}).then(data => {
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