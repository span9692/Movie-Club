const express = require("express");

const db = require("../db/models");
const { csrfProtection, asyncHandler } = require('./utils');

const moviesRouter = express.Router();

moviesRouter.get('/movies', asyncHandler(async(req, res, next) => {
    // const horrorMovies = await db.HorrorMovie.findAll();
    res.render('movie-list', {title: 'Movies'/*, horrorMovies*/});
}));


module.exports = moviesRouter;
