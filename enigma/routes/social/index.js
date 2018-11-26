// routes/index.js
const User = require('../../models/User');
const uploadCloud = require('../../config/cloudinary.js');
const express = require('express');

const passport = require('passport');
const bcrypt = require('bcrypt');

const bcryptSalt = 10;

const socialRouter = express.Router();


socialRouter.get('/profile', (req, res, next) => {
  res.render('social/profile');
});

socialRouter.get('/settings', (req, res, next) => {
  res.render('social/settings');
});

socialRouter.post('/settings', (req, res, next) => {
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

  if (req.body.photo) {
    myUser.imgPath = req.file.path;
    myUser.imgName = req.file.originalname;
  }


  User.findByIdAndUpdate(userId, { myUser })
    .then()
    .catch();
  res.render('social/settings');
});


module.exports = socialRouter;
