const express = require("express");
const { Op } = require("sequelize");

const db = require("../db/models");
const { csrfProtection, asyncHandler } = require('./utils');

const searchRouter = express.Router();

searchRouter.post('/search', asyncHandler(async(req, res, next) => {
    const {title, director, releasedate, rating, scarelevel, subGenre}= req.body;
    const movieSearch = await db.HorrorMovie.findAll({
        where: {
            title: {
                [Op.iLike]:`%${req.body.search}%`
            }
        }
    });
    console.log(movieSearch)
    console.log(req.body.search);
    res.render('search-page',
    {
        title: 'Movies',
        movieSearch,
});
}));



module.exports = searchRouter;
