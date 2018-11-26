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

socialRouter.post('/settings', uploadCloud.single('photo'), (req, res, next) => {
  const userId = req.body.userid;
  console.log(userId);
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

  console.log(myUser);
  User.findByIdAndUpdate(userId,  myUser, { new:true })
    .then((user) => {
      console.log(user);
      res.redirect('/social/profile');
    })
    .catch(error => console.log(`${error} in profile/settings`));
});


module.exports = socialRouter;
