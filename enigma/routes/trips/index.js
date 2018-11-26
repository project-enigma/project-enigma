require('dotenv').config();

const express = require('express');

const tripsRouter = express.Router();

const Trip = require('../../models/Trip');

tripsRouter.get('/', (req, res, next) => {
  Trip.find()
    .then(trips => res.render('trips', { trips }))
    .catch(err => next(err));
});

module.exports = tripsRouter;
