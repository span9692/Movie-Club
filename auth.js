// Added model to the auth page
const db = require('./db/models');

// Create a login user variable

const loginUser = (req, res, user) => {
    req.session.auth= {
        //Creating key value pair and setting it to the user's primary key.
        userId: user.id,
    };
};

// Now we will delete the login user here with this function.
const logoutUser = (req, res) => {
    // Deleting the entire req.session.auth object.
    delete req.session.auth;
};


// Here is the function that will require authorization for the user to access the website.
const requireAuth = (req, res, next) => {
    //Identifying credentials of the user to see if they are authorized.
    //If not, this function redirects back to login.
    if (!res.locals.authenticated) {
        return res.redirect('/user/login');
    }
    //If they are authenticated, invokes the next middleware, either login or restore.
    return next();
}

// Function to let user preserve a login session after navigating away.
const userRestore = async (req, res, next) => {
    // if the user is authenticated, we destructure the userId out of the object.
    if (req.session.auth) {
        const { userId } = req.session.auth;
        // We will try to find that specfic user by that Id.
        try {
            const user = await db.User.findByPk(userId);
            //If we find the user, give them access.
            if (user) {
                res.locals.authenticated=true;
                res.locals.user=user;
                next();
            }
            //if not, we will catch the error and pass into the next error handler.
            // This should pass it back to the function to redirect back to login.
        } catch (err) {
            res.locals.authenticated=false;
            next(err);
        }
    } else {
        res.locals.authenticated=false;
        next();
    }
}


//Exporting functions
module.exports= {
loginUser,
logoutUser,
requireAuth,
userRestore
}
