const router = require('express').Router();

const AdditionalClasses = require('../models/AdditionalClasses');

router.post('/', async (req, res) => {
    try {
        const newAdditionalClass = new AdditionalClasses({
            teacher: req.body.teacher,
            subject: req.body.subject,
            classroomNumber: req.body.classroomNumber,
            hall: req.body.hall,
            dayOfTheWeek: req.body.dayOfTheWeek,
            classTime: req.body.classTime,
            groups: req.body.groups
        })
        await newAdditionalClass.save();
        const newAddirtional = await AdditionalClasses.findOne({
            _id: newAdditionalClass._id
        })
        .populate({
            path: 'subject',
            select: 'name'
        })
        res.status(200).send(newAddirtional);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/', (req, res) => {  
    try {
        AdditionalClasses.find({
            teacher: req.body.teacher
        })
        .populate({
            path: 'subject',
            select: 'name'
        })
        .then(data => {
            let additionalClass = data.map(item => {
                return {
                    teacher: item.teacher,
                    subject: item.subject.name,
                    classroomNumber: item.classroomNumber,
                    hall: item.hall,
                    dayOfTheWeek: item.dayOfTheWeek,
                    classTime: item.classTime,
                    groups: item.groups
                }
            })
            res.status(200).send(additionalClass)
        })
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/', (req, res) => {
    try {
        AdditionalClasses.deleteOne({
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