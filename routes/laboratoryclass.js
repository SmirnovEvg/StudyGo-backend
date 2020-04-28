const router = require('express').Router();

const LaboratoryClass = require('../models/LaboratoryClass');
const LaboratoryWork = require('../models/LaboratoryWork');
const Student = require('../models/Student');

router.post('/', (req, res) => {
    try {
        Student.find({
                course: req.body.course,
                group: req.body.group,
                groupPart: req.body.groupPart
            })
            .then(students => {
                const newLaboratoryClass = new LaboratoryClass({
                    subject: req.body.subject,
                    course: req.body.course,
                    group: req.body.group,
                    groupPart: req.body.groupPart,
                    count: req.body.count,
                    students,
                    teacher: req.body.teacher
                })
                newLaboratoryClass.save()
                .then(labClass => {
                    const newLaboratoryWork = new LaboratoryWork({
                        laboratoryclass: labClass._id,
                        student: labClass.students[0]._id,
                        number: 0,
                        passed: 0,
                    })
                    newLaboratoryWork.save();
                })
                res.status(200).send(newLaboratoryClass);
            })

    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/', (req, res) => {
    try {
        LaboratoryClass.find({
                _id: req.query.classId
            })
            .populate({
                path: 'subject',
                select: 'name'
            })
            .populate({
                path: 'students',
                populate: {
                    path: 'userId'
                }
            })
            .then(data => {
                res.status(200).send(data)
            })
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/teacher', (req, res) => {
    try {
        LaboratoryClass.find({
                teacher: req.query.teacherId
            })
            .populate({
                path: 'subject',
                select: 'name'
            })
            .populate({
                path: 'students',
                populate: {
                    path: 'userId'
                }
            })
            .then(data => {
                res.status(200).send(data)
            })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;