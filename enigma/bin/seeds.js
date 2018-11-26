// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const User = require('../models/User');
const Trip = require('../models/Trip');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/enigma', { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const trips = [
  {
    from: 'Madrid',
    to: 'Budapest',
    tips: 'Classic',
    price: 71,
    depart: '2018-12-10 07:00',
    return: '2018-12-17 08:00',
  },
  {
    from: 'Madrid',
    to: 'Bangkok',
    tips: 'Get ready for the jungle...',
    price: 453,
    depart: '2019-01-10 08:00',
    return: '2019-01-14 09:00',
  },
  {
    from: 'Madrid',
    to: 'Los Angeles',
    tips: 'Top tier production!',
    price: 312,
    depart: '2019-02-01 12:00',
    return: '2019-02-06 17:00',
  },
  {
    from: 'Barcelona',
    to: 'Oslo',
    tips: 'It\'s cold out there, bring a coat!',
    price: 102,
    depart: '2019-01-21 12:00',
    return: '2019-01-28 08:00',
  },
  {
    from: 'Barcelona',
    to: 'Berlin',
    tips: 'Hearth of the culture',
    price: 91,
    depart: '2018-12-16 17:00',
    return: '2018-12-21 01:00',
  },
  {
    from: 'Barcelona',
    to: 'Tokyo',
    tips: 'The dreamland',
    price: 450,
    depart: '2019-02-21 18:00',
    return: '2019-02-28 15:00',
  },
];

Trip.deleteMany()
  .then(() => Trip.create(trips))
  .then((tripsCreated) => {
    console.log(`${tripsCreated.length} trips created with the following id:`);
    console.log(tripsCreated.map(u => u._id));
  })
  .then(() => {
  // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });

// const users = [
//   {
//     username: 'alice',
//     password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt)),
//   },
//   {
//     username: 'bob',
//     password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
//   },
// ];

// User.deleteMany()
//   .then(() => User.create(users))
//   .then((usersCreated) => {
//     console.log(`${usersCreated.length} users created with the following id:`);
//     console.log(usersCreated.map(u => u._id));
//   })
//   .then(() => {
//   // Close properly the connection to Mongoose
//     mongoose.disconnect();
//   })
//   .catch((err) => {
//     mongoose.disconnect();
//     throw err;
//   });
