const router = require('express').Router();
const Subject = require('../models/Subject');

router.post('/', (req, res) => {    
    const newSubject = new Subject({
        name: req.body.name
    })
    res.send(newSubject);

    newSubject.save();
})

router.get('/', (req, res) => {
    Subject.find({}).then((sub) => res.send(sub));
});

module.exports = router;