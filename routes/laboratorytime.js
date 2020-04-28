const router = require('express').Router();

const LaboratoryTime = require('../models/LaboratoryTime');

router.post('/', (req, res) => {
    try {
        const newLaboratoryWork = new LaboratoryTime({
            laboratoryclass: req.body.laboratoryclass,
            number: req.body.number,
            date: req.body.date,
        })
        newLaboratoryWork.save();
        res.status(200).send(newLaboratoryWork);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/', (req, res) => {    
    LaboratoryTime.find({
            laboratoryclass: req.query.laboratoryClass
        })
        .then(data => {
            res.status(200).send(data)
        })
})

router.put('/', (req, res) => {
    LaboratoryTime.findByIdAndUpdate({
        _id: req.body.id,
    }, {
        date: req.body.date
    },
    {new: true}).then(data => {
        res.send(data)
    })
})

module.exports = router;