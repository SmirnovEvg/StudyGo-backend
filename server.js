const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

const app = express();
const port = 3333;
app.use(cors());

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/studygo', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

app.use(express.json());

app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

app.listen(port, () => console.log(`App listening on port ${port}!`))