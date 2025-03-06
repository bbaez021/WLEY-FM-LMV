import { NextFunction, Request, Response } from "express"
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';

var discogs = require('disconnect');
var bodyParser = require('body-parser');
var router = express.Router();

dotenv.config({path: __dirname + "/../config.env"})

const app = express();
const port = process.env.PORT;
const path = require('path')

const uri = process.env.CONNECTION_URI;
if (!uri){
    throw new Error("ERROR CONNNECTION UNDEFINED");
}
mongoose.connect(uri);

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Use routes as a module (see index.js)
require('./routes')(app, router);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
