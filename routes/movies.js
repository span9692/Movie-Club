const express = require("express");
const { requireAuth } = require('../auth')

const db = require("../db/models");
const { csrfProtection, asyncHandler } = require('./utils');

const moviesRouter = express.Router();

moviesRouter.get('/movies', csrfProtection, asyncHandler(async (req, res, next) => {
    const horrorMovies = await db.HorrorMovie.findAll();
    res.render('movie-list',
        {
            title: 'Movies',
            horrorMovies,
            csrfToken: req.csrfToken(),
        });
}));

moviesRouter.get('/movies/:movieid(\\d+)', requireAuth, csrfProtection, asyncHandler(async (req, res, next) => {
    const movieid = parseInt(req.params.movieid, 10);
    const { userId } = req.session.auth;
    const result = await db.HorrorMovie.findByPk(movieid, {
        where: { id: movieid },
        include: db.Review
    });
    const vote = await db.Vote.findAll({
        where: {
            horrormovieid: movieid,
        }
    })
    const votes = vote.length

    const voteStatus = await db.Vote.findOne({
        where:{
            userid: userId,
            horrormovieid: movieid,
        }
    })

    res.render('movie-page',
        {
            title: 'Movies',
            result,
            votes: votes,
            voteStatus,
            csrfToken: req.csrfToken(),
        });
}));
// Reviews Post Route
moviesRouter.post('/movies/:movieid', requireAuth, asyncHandler(async (req, res, next) => {
    const movieid = parseInt(req.params.movieid, 10);
    const { userId } = req.session.auth;
    const { horrormovieid, review } = req.body;
    const reviewPost = await db.Review.create({
        review,
        userid: userId,
        horrormovieid
    })
    res.redirect(`/movies/${movieid}`);

}))

// Votes Post Route
moviesRouter.post('/movies/:movieid/vote', requireAuth, asyncHandler(async (req, res, next) => {
    const movieid = parseInt(req.params.movieid, 10);
    const { userId } = req.session.auth;
    const { horrormovieid, opinion } = req.body;

    // const downvoteopinions = await db.Vote.findAll({
    //     where: {
    //         opinion: false,
    //         horrormovieid: movieid
    //     }
    // })
    const vote = await db.Vote.findOne({
        where: {
            horrormovieid: movieid,
            userid: userId,
            // opinion: true
        }
    })


    if(vote) {
        await vote.destroy()
    } else {
        await db.Vote.create({
            userid: userId,
            horrormovieid: movieid,
            // opinion: true
        })
    }
    const upvoteopinions = await db.Vote.findAll({
        where: {
            // opinion: true,
            horrormovieid: movieid
        }
    })
    const votes = upvoteopinions.length

    res.json({votes: votes});

}))

// query for entry on vote table with horrormovie id  and user id
// if exists change to reflect new input if doesnt exist create to reflect input
// upvote array length - downvote array length
// send back as json
// make sure response is 200
// edit score using dom manipulation

// Reviews Edit Route
moviesRouter.post('/movies/:movieid/edit/:reviewid', requireAuth, asyncHandler(async (req, res, next) => {
    const { reviewid } = req.params;
    const movieid = parseInt(req.params.movieid, 10);
    const result = await db.Review.findByPk(reviewid, {
        include: db.HorrorMovie
    });
    res.render('movie-page-edit',
        {
            title: 'Movies',
            result,
            reviewid,
            // csrfToken: req.csrfToken(),
        });

}))

// Edit Review Posting Router
moviesRouter.post('/movies/:movieid/edit', asyncHandler(async (req, res, next) => {
    const movieid = parseInt(req.params.movieid, 10);
    const { reviewid, review } = req.body;
    const result = await db.Review.findByPk(reviewid);
    await result.update({ review: review });
    res.redirect(`/movies/${movieid}`);
}));

//Reviews Delete Route

moviesRouter.post('/movies/:movieid/delete', requireAuth, asyncHandler(async (req, res, next) => {
    const movieid = parseInt(req.params.movieid, 10);
    const { reviewid } = req.body;
    const reviewDestroy = await db.Review.findByPk(reviewid);
    await reviewDestroy.destroy();
    res.redirect(`/movies/${movieid}`);
}))


module.exports = moviesRouter;
