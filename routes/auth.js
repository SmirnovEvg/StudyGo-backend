const express = require('express');
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
} = require('../validation');

dotenv.config();


const saveStudent = async (userId, data) => {
    const student = new Student({
        userId,
        firstName: data.firstName,
        secondName: data.secondName,
        course: data.course,
        group: data.group,
    })

    await student.save();
}

const saveTeacher = async (userId, data) => {
    const teacher = new Teacher({
        userId,
        firstName: data.firstName,
        secondName: data.secondName,
        thirdName: data.thirdName,
        department: data.department,
        rank: data.rank,
    })

    await teacher.save();
}

router.post('/register', async (req, res) => {
    if (req.body.role === 0) {
        const { error } = await registerValidation(req.body);

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
            userId: student._id,
            studnumber: req.body.studnumber, //body
            password: hashedPassword, //body
            role: req.body.role
        })

        await newUser.save();
        await saveStudent(newUser._id, student);

        const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET);
        res.json({ token });

    } else if (req.body.role === 1) {
        const { error } = await registerValidation(req.body);

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
            userId: teacher._id,
            studnumber: req.body.studnumber, //body
            password: hashedPassword, //body
            role: req.body.role
        })

        await newUser.save();
        await saveTeacher(newUser._id, teacher);

        const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET);
        res.json({ token });
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

    if (req.body.role === 0) {
        const student = await Student.findOne({
            userId: user._id
        });
        const token = jwt.sign({
            _id: user._id
        }, process.env.TOKEN_SECRET); //.env TOKEN_SECRET
        res.json({
            student,
            token
        });
    } else if (req.body.role === 1) {
        const teacher = await Teacher.findOne({
            userId: user._id
        });
        const token = jwt.sign({
            _id: user._id
        }, process.env.TOKEN_SECRET); //.env TOKEN_SECRET
        res.json({
            teacher,
            token
        });
    }
})

module.exports = router;