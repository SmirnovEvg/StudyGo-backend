const router = require('express').Router();
const verify = require('./verifyToken');
const Student = require('../models/Student');
const User = require('../models/User');
const Teacher = require('../models/Teacher');

router.get('/', verify, async (req, res) => {
    const user = await User.findOne({
        _id: req.user._id
    });
    switch (user.role) {
        case 0:
            const student = await Student.findOne({
                userId: user._id
            }).populate({
                path: 'userId',
                select: '-password'
            });

            res.send(
                student
            );
            break;

        case 1:
            const teacher = await Teacher.findOne({
                userId: user._id
            }).populate({
                path: 'userId',
                select: '-password'
            });

            res.send(
                teacher
            );
            break;

        default:
            break;
    }
});

router.get('/info/', async (req, res) => {
    const user = await User.findOne({
        _id: req.query.userId
    }).select('-password -studnumber');

    if (user.role === 0) {
        const student = await Student.findOne({
            userId: user._id
        });

        res.json({
            firstName: user.firstName,
            secondName: user.secondName,
            thirdName: user.thirdName,
            course: student.course,
            group: student.group,
            groupPart: student.groupPart,
            role: user.role
        });
    } else if (user.role === 1) {
        const teacher = await Teacher.findOne({
            userId: user._id
        });

        res.json({
            firstName: user.firstName,
            secondName: user.secondName,
            thirdName: user.thirdName,
            department: teacher.department,
            rank: teacher.rank,
            role: user.role
        });
    }
});

module.exports = router;