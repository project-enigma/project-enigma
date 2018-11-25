const mongoose = require('mongoose');

const { Schema }   = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  email: {type: String, unique: true},
  imgName: {type: String},
  imgPath: {type: String}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
