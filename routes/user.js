const router = require('express').Router();
const verify = require('./verifyToken');
const Student = require('../models/Student');
const User = require('../models/User');
const Teacher = require('../models/Teacher');
const Timetable = require('../models/Timetable');
const express = require('express');
const multer = require('multer');

router.use(express.static(__dirname + "../public"));

const Storage = multer.diskStorage({
    destination: "../frontend/public/uploads",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + file.originalname);
    }
})

const upload = multer({
    storage: Storage
}).single('file');


router.get('/', verify, async (req, res) => {
    const user = await User.findOne({
        _id: req.user._id
    });
    if (!user.role) {
        const student = await Student.findOne({
            userId: user._id
        }).populate({
            path: 'userId',
            select: '-password'
        });

        res.send(
            student
        );
    } else {
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
            id: teacher._id,
            subjects: teacher.subjects,
            additionals: additionalClasses,
            department: teacher.department,
            rank: teacher.rank,
            image: teacher.image,
        });
    }

});

router.get('/info/', async (req, res) => {
    const user = await User.findOne({
        _id: req.query.userId
    }).select('-password -studnumber');

    if (!user.role) {
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
    } else {
        const teacher = await Teacher.findOne({
            userId: user._id
        }).populate({
            path: 'subjects'
        });

        const additionals = await Timetable.find({
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
            id: teacher._id,
            firstName: user.firstName,
            secondName: user.secondName,
            thirdName: user.thirdName,
            department: teacher.department,
            rank: teacher.rank,
            role: user.role,
            additionals: additionalClass,
            subjects: teacher.subjects,
            image: teacher.image
        });
    }
});

router.get('/teachers', async (req, res) => {
    try {
        const teachers = await User.find({
            $or: [{
                role: 1
            }, {
                role: 2
            }]
        }).select('-password -studnumber');
        res.status(200).send(teachers);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.put('/teacher', async (req, res) => {
    try {
        const teacher = await Teacher.findOneAndUpdate({
            userId: req.body.teacherId
        }, {
            subjects: req.body.subjects
        })
        res.send(teacher)
    } catch (error) {
        res.status(500).send(error);
    }
})

router.put('/changephoto', upload, (req, res) => {
    console.log(req.file.filename);
    try {
        Teacher.findByIdAndUpdate({
            _id: req.body.teacherId
        }, {
            image: req.file.filename
        }, {
            new: true
        }).then(data => {
            console.log(data);
            
            res.send(data)
        })
    } catch (error) {
        res.status(500).send(error);
    }
})


module.exports = router;