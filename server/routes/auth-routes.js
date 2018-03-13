const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user-model')
const authRoutes = express.Router()

//Routes go to /api to distinguish from potential other APIs (Youtube?);
authRoutes.post('/signup', (req, res, next) => {
  if (!req.body.signUpUsername || !req.body.signUpPassword) {
    res.status(400).json({ message: "Please provide a username and password" });
  }
  User.findOne({ username: req.body.signUpUsername }, (err, userFromDb) => {
    if (err) {
      res.status(500).json({ message: "Username check threw an error. " })
      return;
    }
    if (userFromDb) {
      res.status(400).json({ message: "Username taken, please choose a different one." })
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const scrambledPassword = bcrypt.hashSync(req.body.signUpPassword, salt);

    const theUser = new User({
      username: req.body.signUpUsername,
      encryptedPassword: scrambledPassword
    });

    theUser.save((err) => {
      if (err) {
        res.status(500).json({ message: "User save threw an error." })
        return;
      }

      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({ message: "Automatic signup login threw an error" });
          return;
        }

        // Clears password
        theUser.encryptedPassword = undefined;

        // Send user info to front-end.
        res.status(200).json(theUser);
      })
    })
  })
})

authRoutes.post('/login', (req, res, next) => {
  const authenticateFunction = passport.authenticate('local', (err, theUser, failureDetails) => {

    if (err) {
      res.status(500).json({ message: "Login route threw an error" });
      return;
    }
    if (!theUser) {
      //failureDetails has error messages from passport strategy
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save threw an error. ", theuser: theUser, error: err })
        return;
      }

      theUser.encryptedPassword = undefined;
      res.status(200).json(theUser);
    });
  });
  authenticateFunction(req, res, next);
});

authRoutes.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "Successfully logged out." })
})

authRoutes.get('/api/checklogin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }

  res.status(401).json({ message: "Not logged in." })
})

function loggedOutReroute(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(403).json({ message: "Not allowed to view. " })
    return;
  }

  next();
}

authRoutes.get('/private', loggedOutReroute, (req, res, next) => {
  res.json({ message: 'Yay for practicing! ' });
})

module.exports = authRoutes;