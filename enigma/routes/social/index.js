// routes/index.js
const User = require('../../models/User');
const uploadCloud = require('../../config/cloudinary.js');
const express = require('express');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const passport = require('passport');
const bcrypt = require('bcrypt');

const bcryptSalt = 10;

const socialRouter = express.Router();


socialRouter.get('/profile', ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render('social/profile');
});

socialRouter.get('/settings', ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render('social/settings');
});

socialRouter.post('/settings', [ensureLoggedIn('/auth/login'), uploadCloud.single('photo')], (req, res, next) => {
  const userId = req.body.userid;
  const myUser = {};

  if (req.body.email) {
    myUser.email = req.body.email;
  }

  if (req.body.username) {
    myUser.username = req.body.username;
  }

  if (req.body.password) {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(req.body.password, salt);
    myUser.password = hashPass;
  }

  if (req.file) {
    myUser.imgPath = req.file.url;
    myUser.imgName = req.file.originalname;
  }

  User.findByIdAndUpdate(userId,  myUser, { new:true })
    .then((user) => {
      res.redirect('/social/profile');
    })
    .catch(error => console.log(`${error} in profile/settings`));
});

socialRouter.get('/friends', ensureLoggedIn('/auth/login'), (req, res, next) => {
  const userId = req.user.id;
  User.findById(userId)
    .populate('friends')
    .then((myUser) => {
      res.render('social/friends', { myUser });
    })
    .catch(err => next(err));
});

socialRouter.post('/friends', ensureLoggedIn('/auth/login'), (req, res, next) => {
  const userId = req.body.userid;
  const friendUsername = req.body.friendUsernme;
  if (friendUsername === '') {
    res.render('social/friends', { message: 'Here you should write your friends username' });
  }
  User.findOne({ username: friendUsername })
    .then((friend) => {
      // res.redirect('/social/profile');
      User.findByIdAndUpdate(userId, { $addToSet: { friends: friend.id } })
        .then(() => res.redirect('/social/friends'))
        .catch(err => next(err));
    })
    .catch(error => console.log(`${error} in profile/friends`));
});


module.exports = socialRouter;
