const router = require('express').Router();
const verify = require('./verifyToken');
const Student = require('../models/Student');
const User = require('../models/User');
const Teacher = require('../models/Teacher');
const AdditionalClasses = require('../models/AdditionalClasses');

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

            const additionals = await AdditionalClasses.find({
                teacher: user._id
            })
            .populate({
                path: 'subject'
            })
            teacher.additionals = additionals            

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
        const additionals =  await AdditionalClasses.find({
            teacher: user._id
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
                dayOfTheWeek: item.dayOfTheWeek,
                classTime: item.classTime,
                groups: item.groups
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