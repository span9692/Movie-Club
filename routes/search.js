const express = require("express");

const db = require("../db/models");
const { csrfProtection, asyncHandler } = require('./utils');

const searchRouter = express.Router();

searchRouter.get('/search', asyncHandler(async(req, res, next) => {
    const horrorMovies = await db.HorrorMovie.findAll();
    console.log('PLEASE END ME');
    console.log(req.body);
    res.render('search-page', {title: 'Movies', horrorMovies});
}));

// searchRouter.get('/movies/:movieid(\\d+)', asyncHandler(async(req, res, next) => {
//     const movieid = parseInt(req.params.movieid, 10);

//     const result = await db.HorrorMovie.findByPk(movieid, {
//         where: { id: movieid },
//         include: db.Review
//     });

//     // console.log(result.Reviews[0].review)
//     res.render('movie-page', {title: 'Movies', result});
// }));


module.exports = searchRouter;
