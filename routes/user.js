const router = require('express').Router();
const verify = require('./verifyToken');
const Student = require('../models/Student');
const User = require('../models/User');
const Teacher = require('../models/Teacher');
const Timetable = require('../models/Timetable');

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
            })
            .populate({
                path: 'subjects'
            });

            const additionalClasses = await Timetable.find({
                teacher: user._id,
                additional: true
            })
            .populate({
                path: 'subject'
            })
            res.json({
                userId: {
                    _id: teacher.userId._id,
                    studnumber: teacher.userId.studnumber,
                    firstName: teacher.userId.firstName,
                    secondName: teacher.userId.secondName,
                    thirdName: teacher.userId.thirdName,
                    role: teacher.userId.role,
                  },
                subjects: teacher.subjects,
                additionals: additionalClasses,
                department: teacher.department,
                rank: teacher.rank
            });
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
        const additionals =  await Timetable.find({
            teacher: user._id,
            additional: true
        })
        .populate({
            path: 'subject',
            select: 'name'
        })
            
        let additionalClass = additionals.map(item => {
            return {
                teacher: item.teacher,
                subject: item.subject.name,
                classroomNumber: item.classroomNumber,
                hall: item.hall,
                week: item.week,
                dayOfTheWeek: item.dayOfTheWeek,
                classTime: item.classTime,
                group: item.group
            }
        })
        
        res.json({
            firstName: user.firstName,
            secondName: user.secondName,
            thirdName: user.thirdName,
            department: teacher.department,
            rank: teacher.rank,
            role: user.role,
            additionals: additionalClass
        });
    }
});

module.exports = router;