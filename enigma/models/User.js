const mongoose = require('mongoose');

const { Schema }   = mongoose;
require('dotenv').config();

const userSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
  email: {type: String, unique: true},
  imgName: {type: String, default: "defaultProfile.png"},
  imgPath: {type: String, default: process.env.CLOUDINARY_DEFAULTPROFILE_IMG },
  trips: {type: Array},
  friends: {type: Array},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
