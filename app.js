const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotEnv = require('dotenv');

const feedRoutes = require('./src/routes/web');

const app = express();
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

let routes = feedRoutes.init();
app.use(routes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

mongoose
    .connect(
        'mongodb://' + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT,
        { useNewUrlParser: true }
    )
    .then(result => {
        app.listen(8082);
    })
    .catch(err => console.log(err));
