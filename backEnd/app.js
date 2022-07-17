const express = require('express');
const app = express();
const cors =require('cors');
const mongoose = require('mongoose');
const debug = require('debug')("app:main");
const config = require('config');
const winston = require('winston');

const router = require('./src/routes');


require('./startup/db')();
require('./startup/config')(app,express,cors);
require('./startup/logging')();
// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

app.use('/api', router);
const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`listening on port ${port}`));











