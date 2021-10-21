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
moviesRouter.post('/movies/:movieid/edit/:reviewid', asyncHandler(async(req, res, next) => {
    console.log('I AM HERE');
    const {reviewid}=req.params;
    const movieid= parseInt(req.params.movieid, 10);
    console.log(movieid,reviewid);
    const result = await db.Review.findByPk(reviewid, {
        include: db.HorrorMovie
    });
    console.log(result)
    res.render('movie-page-edit', {title: 'Movies', result, reviewid});
    // await reviewEdit.update();
    // res.redirect(`/movies/${movieid}/edit/${reviewid}`);

    // const result = await db.HorrorMovie.findByPk(movieid, {
    //     where: { id: movieid },
    //     include: db.Review
    // });
    // res.redirect('/');
  }))

  // Edit Review Posting Router
  moviesRouter.post('/movies/:movieid/edit', asyncHandler(async(req, res,next) => {
    const movieid= parseInt(req.params.movieid, 10);
    const{reviewid} =req.params;
    const { userId }=req.session.auth;
    const {horrormovieid, review} = req.body;
    const reviewPost = await db.Review.update(review,{
        where: {
            review: reviewid
          }
        });
        res.redirect(`/movies/${movieid}`);
    }));
//Reviews Delete Route

moviesRouter.post('/movies/:movieid/delete', asyncHandler(async(req, res, next) => {
    const movieid= parseInt(req.params.movieid, 10);
    const {reviewid}=req.body;
    const reviewDestroy = await db.Review.findByPk(reviewid);
    await reviewDestroy.destroy();
    res.redirect(`/movies/${movieid}`);
  }))


module.exports = moviesRouter;
