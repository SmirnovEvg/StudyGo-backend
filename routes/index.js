const express = require('express');

const authRoute = require('./auth');
const userRoute = require('./user');
const chatRoute = require('./chat');
const subjectRoute = require('./subject');
const timetableRoute = require('./timetable');

const app = express();

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);
app.use('/api/subject', subjectRoute);
app.use('/api/timetable', timetableRoute);

module.exports = app;