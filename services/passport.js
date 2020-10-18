const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
/*const googleClientID= '666081180748-as5ru02olbuk4g0ud0ahmdanj41i98t4.apps.googleusercontent.com';
const googleClientSecret= 'fpOIOrS8UiPAssgqco0Uk9cs';*/
const mongoose = require('mongoose');
const e = require('express');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
    .then((existingUser) => {
      if(existingUser) {
        done(null, existingUser);
      } else {
        new User({googleId: profile.id}).save()
        .then(user => done(null, user));
      }
    })
    
  })
);
