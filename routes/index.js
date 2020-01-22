const express = require('express');

const authRoute = require('./auth');
const userRoute = require('./user');
const chatRoute = require('./chat');

const app = express();

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);

module.exports = app;