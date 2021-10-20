const express = require("express");
const { Op } = require("sequelize");

const db = require("../db/models");
const { csrfProtection, asyncHandler } = require('./utils');

const searchRouter = express.Router();

searchRouter.post('/search', asyncHandler(async(req, res, next) => {
    const {title, director, releasedate, rating, scarelevel, subGenre}= req.body;
    const horrorMovies = await db.HorrorMovie.findAll(
        {where:{[Op.iLike]:`%${req.body.search}%`}
    });
    console.log(req.body.search);
    // if (req.body.search === db.HorrorMovie.findAll (HorrorMovie.title))
    res.render('movie-page', {title: 'Movies', horrorMovies});
}));

//IDEA FOR SCARE VALUE
// HorrorMovie.findAll({
//     attributes: [scarelevel, rating]
//   });

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
