const express = require('express');

const authRoute = require('./auth');
const userRoute = require('./user');
const chatRoute = require('./chat');
const subjectRoute = require('./subject');
const timetableRoute = require('./timetable');
const additionalRoute = require('./additional');
const laboratotyRoute = require('./laboratory');
const laboratotyClassRoute = require('./laboratoryclass');
const laboratotyTimeRoute = require('./laboratorytime');
const eventRoute = require('./event');

const app = express();

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);
app.use('/api/subject', subjectRoute);
app.use('/api/timetable', timetableRoute);
app.use('/api/additional', additionalRoute);
app.use('/api/laboratory', laboratotyRoute);
app.use('/api/laboratoryclass', laboratotyClassRoute);
app.use('/api/laboratorytime', laboratotyTimeRoute);
app.use('/api/event', eventRoute);

module.exports = app;