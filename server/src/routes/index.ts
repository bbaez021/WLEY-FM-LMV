import express, { Application, Router } from 'express';


module.exports = function (app, router){
    app.use('/api/days', require('./days.js')(router));
    app.use('/api/songs', require('./songs.js')(router))
}