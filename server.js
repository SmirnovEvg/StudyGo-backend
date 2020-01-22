const express = require('express');
const cors = require('cors');
const chat = require('./chat/chatConnection');
const db = require('./database/db');
const routes = require('./routes')

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`App listening on port ${port}!`))