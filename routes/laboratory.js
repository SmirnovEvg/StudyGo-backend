const router = require('express').Router();

const LaboratoryWork = require('../models/LaboratoryWork');

router.post('/', (req, res) => {
    try {
        const newLaboratoryWork = new LaboratoryWork({
            laboratoryclass: req.body.laboratoryclass,
            student: req.body.student,
            number: req.body.number,
            passed: req.body.passed,
            visit: '',
            description: '',
        })
        newLaboratoryWork.save();
        res.status(200).send(newLaboratoryWork);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/visit', (req, res) => {
    try {
        const newLaboratoryWork = new LaboratoryWork({
            laboratoryclass: req.body.laboratoryclass,
            student: req.body.student,
            number: req.body.number,
            passed: 0,
            visit: req.body.visit,
            description: '',
        })
        newLaboratoryWork.save();
        console.log(newLaboratoryWork);

        res.status(200).send(newLaboratoryWork);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/description', (req, res) => {
    try {
        const newLaboratoryWork = new LaboratoryWork({
            laboratoryclass: req.body.laboratoryclass,
            student: req.body.student,
            number: req.body.number,
            passed: 0,
            visit: '',
            description: req.body.description,
        })
        newLaboratoryWork.save();
        res.status(200).send(newLaboratoryWork);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/', (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).send(error)
        console.log(error);
        
    }

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
        passed: req.body.passed,
    }).then(data => {
        res.send(data)
    })
})

router.put('/visit', (req, res) => {
    LaboratoryWork.findByIdAndUpdate({
        _id: req.body.laboratoryId
    }, {
        visit: req.body.visit,
    }).then(data => {
        res.send(data)
    })
})

router.put('/description', (req, res) => {
    LaboratoryWork.findByIdAndUpdate({
        _id: req.body.laboratoryId
    }, {
        description: req.body.description,
    }).then(data => {
        res.send(data)
    })
})

router.get('/allpassedstudentlaboratories', async (req, res) => {    
    try {
        LaboratoryWork.find({
                student: req.query.studentId,
                number: {
                    $ne: 0
                },
                passed: {
                    $ne: 0
                }
            })
            .then(data => {
                res.status(200).send({
                    count: data.length
                })
            })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;