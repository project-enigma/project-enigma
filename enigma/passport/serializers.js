const User = require('../models/User');
const passport = require('passport');

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession)
    .then((userDocument) => {
      cb(null, userDocument);
    })
    .catch((err) => {
      cb(err);
    });
});
