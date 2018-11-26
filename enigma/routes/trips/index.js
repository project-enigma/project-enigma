require('dotenv').config();

const User = require('../../models/User');

const Trip = require('../../models/Trip');

const express = require('express');

const tripsRouter = express.Router();


tripsRouter.get('/', (req, res, next) => {
  Trip.find()
    .then(trips => res.render('trips', { trips }))
    .catch(err => next(err));
});

tripsRouter.get('/buy/:id', (req, res, next) => {
  Trip.findById(req.params.id)
    .then(trip => res.render('trips/buy', { trip }))
    .catch(err => next(err));
});


tripsRouter.get('/buy/:id/success', (req, res, next) => {
  Trip.findById(req.params.id)
    .then(trip => res.render('trips/success', { trip }))
    .catch(err => next(err));
});

tripsRouter.post('/buy/:id', (req, res, next) => {
  Trip.findByIdAndUpdate(req.params.id, { $addToSet: { users: req.user.id } })
    .then(() => res.redirect(`/trips/buy/${req.params.id}/success`))
    .catch(err => next(err));
});

module.exports = tripsRouter;
