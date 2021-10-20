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
moviesRouter.post('/movies/:movieid', asyncHandler(async(req, res,next) => {
    const movieid= parseInt(req.params.movieid, 10);
    const { userId }=req.session.auth;
    const {horrormovieid, review} = req.body;
    const reviewPost = await db.Review.create({
        review,
        userid: userId,
        horrormovieid
    })
    res.redirect(`/movies/${movieid}`);

}))

// Reviews Edit Route
moviesRouter.post('/movies/:movieid/edit', asyncHandler(async(req, res, next) => {
    const movieid= parseInt(req.params.movieid, 10);
    const reviewEdit = await db.Review.findByPk(db.Review.id);
    await reviewEdit.update();
    res.redirect(`/movies/${movieid}`);
  }))
//Reviews Delete Route

moviesRouter.post('/movies/:movieid/delete', asyncHandler(async(req, res, next) => {
    const movieid= parseInt(req.params.movieid, 10);
    const reviewDestroy = await db.Review.findByPk(db.Review.id);
    await reviewDestroy.destroy();
    res.redirect(`/movies/${movieid}`);
  }))


module.exports = moviesRouter;
