// routes/index.js

const express = require('express');
const User = require('../../models/User');
const uploadCloud = require('../../config/cloudinary.js');
const socialRouter = express.Router();


socialRouter.get('/profile', (req, res, next) => {
    res.render('social/profile');
  });

module.exports = socialRouter;