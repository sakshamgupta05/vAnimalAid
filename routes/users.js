const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  let newUser = new User ({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  User.getUserByEmail(newUser.email, (err, user) => {
    if (err) console.log(err);
    if (user) {
      return res.json({ success: false, msg: 'Email already registered' });
    }

    User.addUser(newUser, (err, user) => {
      if (err) {
        res.json({success: false, msg: 'Failed to register user'});
      } else {
        res.json({success: true, msg: 'User registered'});
      }
    });
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if (err) console.log(err);
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) console.log(err);
      if (isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 86400 // 1 day
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});


router.post('/changepass', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const email = req.body.email;
  const password = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  User.getUserByEmail(email, (err, user) => {
    if (err) console.log(err);
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) console.log(err);
      if (isMatch) {
        User.updatePassword(email, newPassword, (err) => {
          if (err) {
            res.json({success: false, msg: 'Failed to change password'});
          } else {
            res.json({success: true, msg: 'Password changed'});
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
