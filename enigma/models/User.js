require('dotenv').config();

const mongoose = require('mongoose');

const { Schema }   = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
  imgName: { type: String, default: 'defaultProfile.png' },
  imgPath: { type: String, default: process.env.CLOUDINARY_DEFAULTPROFILE_IMG },
  trips: [{ type: Schema.Types.ObjectId }],
  friends: [{ type: Schema.Types.ObjectId }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
