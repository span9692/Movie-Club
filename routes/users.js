const express = require("express");

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser } = require("../auth");

const usersRouter = express.Router();

/* GET users listing. */

usersRouter.get("/user/register", csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render("user-register", {
    title: "Register",
    user,
    csrfToken: req.csrfToken(),
  });
});

///VERIFICATION OF INFORMATION
const userValidators = [
  check('firstname')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for First Name')
  .isLength({ max: 50 })
  .withMessage('First Name must not be more than 50 characters long'),
  check('lastname')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Last Name')
  .isLength({ max: 50 })
  .withMessage('Last Name must not be more than 50 characters long'),
  check('email')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Email Address')
  .isLength({ max: 255 })
  .withMessage('Email Address must not be more than 255 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email')
    .custom((value) => {
      return db.User.findOne({ where: { email: value } })
      .then((user) => {
        if (user) {
          return Promise.reject('The provided Email Address is already in use by another account');
        }
      });
    }),
    check('username')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for User Name')
  .isLength({ max: 30 })
  .withMessage('User Name must not be more than 30 characters long')
    .custom((value) => {
      return db.User.findOne({ where: { username: value } })
      .then((user) => {
        if (user) {
          return Promise.reject('The provided User Name is already in use by another account');
        }
      });
    }),
    check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('confirmpassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    }),
  ];

  usersRouter.post("/user/register", userValidators, asyncHandler(async (req, res) => {
    // console.log(req.body);
  const {
    firstname,
    lastname,
    username,
    email,
    password
  } = req.body;

  const user = await db.User.build({
    firstname,
    lastname,
    email,
    username
  });

  const validatorErrors = validationResult(req);


  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedpassword = hashedPassword;
    await user.save();
    loginUser(req, res, user);
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('user-register', {
      title: 'Register',
      user,
      errors,
      // csrfToken: req.csrfToken(),
    });
  }
}));


usersRouter.get("/user/login", function (req, res, next) {
  res.render("user-login", { title: "Login" });
});

const loginValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password'),
];

usersRouter.post('/user/login', loginValidators,
  asyncHandler(async (req, res) => {
    const {
      email,
      password,
    } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      // Attempt to get the user by their email address.
      const user = await db.User.findOne({ where: { email } });

      if (user !== null) {
        // If the user exists then compare their password
        // to the provided password.
        const passwordMatch = await bcrypt.compare(password, user.hashedpassword.toString());

        if (passwordMatch) {
          // If the password hashes match, then login the user
          // and redirect them to the default route.
          loginUser(req, res, user);
          return res.redirect('/');
        }
      }

      // Otherwise display an error message to the user.
      errors.push('Login failed for the provided email address and password');
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render('user-login', {
      title: 'Login',
      email,
      errors,
      // csrfToken: req.csrfToken(),
    });
  }));

usersRouter.post("/user/logout", (req, res) => {
  logoutUser(req, res);
  res.redirect('/');
});

usersRouter.get('/user/watchlist', asyncHandler(async(req, res, next) => {
  const { userId } = req.session.auth
  const horrorMovies = await db.Watchlist.findAll({where: {userid: userId}, include: db.HorrorMovie });
  // console.log(horrorMovies)
  // const watchlist = db.Watchlist.create({userid, horrormovieid});
  res.render('watch-list', {title: 'User Movie Graveyard', horrorMovies})
}));

usersRouter.post('/user/watchlist', asyncHandler(async(req, res, next) => {
  const { horrormovieid } = req.body;
  const { userId } = req.session.auth
  const watchlist = await db.Watchlist.create({
    userid: userId,
    horrormovieid
  })
  // res.redirect('/movies')
  const response = await fetch('/movies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}));

usersRouter.post('/user/watchlist/:id/delete', asyncHandler(async(req, res, next) => {
  const { horrormovieid } = req.body
  const watchlist = await db.Watchlist.findByPk(horrormovieid);
  await watchlist.destroy();
  res.redirect('/user/watchlist')
}))



//click on ADD WATCHLIST (small form with submit button)
//watchlist post route, destruct id from req.body
//find movie by id - validation, not needed
//watchlist.create passing in userid and movieid
//create a watchlist
//watchlist.findAll(userId)
module.exports = usersRouter;
