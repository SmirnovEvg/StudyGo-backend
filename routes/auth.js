const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const FacultyStudent = require('../models/FacultyStudent');
const FacultyTeacher = require('../models/FacultyTeacher');
const User = require('../models/User');

const {
    registerValidation
} = require('../validation/validation');

dotenv.config();


const saveStudent = async (userId, data) => {
    const student = new Student({
        userId,
        course: data.course,
        group: data.group,
        groupPart: data.groupPart,
    })

    await student.save();
}

const saveTeacher = async (userId, data) => {
    
    const teacher = new Teacher({
        userId,
        department: data.department,
        rank: data.rank,
        subjects: data.subjects
    })
    console.log(teacher);

    await teacher.save();
}

router.post('/register', async (req, res) => {
    if (req.body.role === 0) {
        const {
            error
        } = await registerValidation(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        const student = await FacultyStudent.findOne({
            studnumber: req.body.studnumber
        });

        if (!student) return res.status(400).send('Такого студента не существует.');

        //Checking if the user is already in database
        const userExist = await User.findOne({
            studnumber: req.body.studnumber
        });
        if (userExist) return res.status(400).send('Такой пользователь уже зарегистрирован.');

        if (req.body.password !== req.body.confirmPassword) return res.status(300).send('Пароли не совпадают.');

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            studnumber: req.body.studnumber,
            password: hashedPassword,
            firstName: student.firstName,
            secondName: student.secondName,
            thirdName: student.thirdName,
            role: req.body.role
        })

        await newUser.save();
        await saveStudent(newUser._id, student);

        const token = jwt.sign({
            _id: newUser._id
        }, process.env.TOKEN_SECRET);

        const user = {
            studnumber: newUser.studnumber,
            firstName: newUser.firstName,
            secondName: newUser.secondName,
            thirdName: newUser.thirdName,
            role: newUser.role
        }

        res.json({
            user,
            token
        });

    } else if (req.body.role === 1) {
        const {
            error
        } = await registerValidation(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        const teacher = await FacultyTeacher.findOne({
            studnumber: req.body.studnumber
        });

        if (!teacher) return res.status(400).send('Такого преподавателя не существует.');

        //Checking if the user is already in database
        const userExist = await User.findOne({
            studnumber: req.body.studnumber
        });
        if (userExist) return res.status(400).send('Такой пользователь уже зарегистрирован.');

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            studnumber: req.body.studnumber, //body
            password: hashedPassword, //body
            firstName: teacher.firstName,
            secondName: teacher.secondName,
            thirdName: teacher.thirdName,
            role: req.body.role
        })

        await newUser.save();
        await saveTeacher(newUser._id, teacher);

        const token = jwt.sign({
            _id: newUser._id
        }, process.env.TOKEN_SECRET);

        const user = {
            studnumber: newUser.studnumber,
            firstName: newUser.firstName,
            secondName: newUser.secondName,
            thirdName: newUser.thirdName,
            role: newUser.role
        }

        res.json({
            user,
            token
        });
    } else {
        res.send("role error");
    }

})

router.post('/login', async (req, res) => {
    //Checking if the user exists
    const user = await User.findOne({
        studnumber: req.body.studnumber
    });

    if (!user) return res.status(400).send('Неверный логин или пароль');

    //Password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Неверный логин или пароль');
    try {
        if (req.body.role === user.role) {
            const token = jwt.sign({
                _id: user._id
            }, process.env.TOKEN_SECRET);

            const authUser = {
                _id: user._id,
                studnumber: user.studnumber,
                firstName: user.firstName,
                secondName: user.secondName,
                thirdName: user.thirdName,
                role: user.role
            }

            res.json({
                authUser,
                token
            });

        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;