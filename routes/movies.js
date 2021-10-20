const express = require("express");

const db = require("../db/models");
const { csrfProtection, asyncHandler } = require('./utils');

const moviesRouter = express.Router();

moviesRouter.get('/movies', asyncHandler(async(req, res, next) => {
    const horrorMovies = await db.HorrorMovie.findAll();
    res.render('movie-list', {title: 'Movies', horrorMovies});
}));

moviesRouter.get('/movies/:movieid(\\d+)', asyncHandler(async(req, res, next) => {
    const movieid = parseInt(req.params.movieid, 10);

    const result = await db.HorrorMovie.findByPk(movieid, {
        where: { id: movieid },
        include: db.Review
    });
    res.render('movie-page', {title: 'Movies', result});
}));
// Reviews Post Route
moviesRouter.post('/movies/:movieid(\\d+)'), asyncHandler(async(req, res,next) => {
    const movieid= parseInt(req.params.movieid, 10);
    const { userid }=req.session.auth;
    const {horrormovieid, review} = req.body;
    const reviewPost = await db.Review.create({
        userid,
        horrormovieid,
        review
    })
    res.render('movie-page', {title: 'Movies', reviewPost});

})


module.exports = moviesRouter;
