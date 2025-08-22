import express, { Application, Router } from 'express';
import daysRouter from './days'; // Import the users router
import songsRouter from './songs'; // Import the calendars router

module.exports = function (app: Application) {
    // Create separate router instances
    const dayRouter = Router();
    const songRouter = Router();

    // Mount the routers on distinct API paths
    app.use('/api/days', daysRouter(dayRouter));
    app.use('/api/songs', songsRouter(songRouter));
};