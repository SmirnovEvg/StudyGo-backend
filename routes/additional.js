const router = require('express').Router();

const AdditionalClasses = require('../models/AdditionalClasses');



router.post('/', (req, res) => {
    const newAdditionalClass = new AdditionalClasses({
        teacher: req.body.teacher,
        subject: req.body.subject,
        classroomNumber: req.body.classroomNumber,
        hall: req.body.hall,
        dayOfTheWeek: req.body.dayOfTheWeek,
        classTime: req.body.classTime,
        groups: req.body.groups
    })
    res.send(newAdditionalClass);

    newAdditionalClass.save();
})

router.get('/', (req, res) => {

});

module.exports = router;