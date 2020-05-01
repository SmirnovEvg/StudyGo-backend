const router = require('express').Router();

const LaboratoryWork = require('../models/LaboratoryWork');

router.post('/', (req, res) => {
    try {
        const newLaboratoryWork = new LaboratoryWork({
            laboratoryclass: req.body.laboratoryclass,
            student: req.body.student,
            number: req.body.number,
            passed: req.body.passed,
        })
        newLaboratoryWork.save();
        res.status(200).send(newLaboratoryWork);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/', (req, res) => {
    LaboratoryWork.find({
            laboratoryclass: req.query.laboratoryClass
        }).populate({
            path: 'student',
            select: '-studnumber -password -role',
            populate: {
                path: 'userId'
            }
        })
        .then(data => {
            res.status(200).send(data)
        })
})

router.get('/student', (req, res) => {
    LaboratoryWork.find({
            laboratoryclass: req.query.laboratoryClass,
            student: req.query.student,
        }).populate({
            path: 'student',
            select: '-studnumber -password -role',
            populate: {
                path: 'userId'
            }
        })
        .then(data => {
            res.status(200).send(data)
        })
})

router.put('/', (req, res) => {
    LaboratoryWork.findByIdAndUpdate({
        _id: req.body.laboratoryId
    }, {
        passed: req.body.passed
    }).then(data => {
        res.send(data)
    })
})

module.exports = router;