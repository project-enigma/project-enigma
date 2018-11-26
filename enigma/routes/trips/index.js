require('dotenv').config();

const express = require('express');

const tripsRouter = express.Router();

tripsRouter.get('/', (req, res, next) => res.render('trips'));

module.exports = tripsRouter;
