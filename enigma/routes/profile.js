// routes/index.js

const express = require('express');
const User = require('../models/User');
const uploadCloud = require('../config/cloudinary.js');
const router = express.Router();