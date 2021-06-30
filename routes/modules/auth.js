const express = require('express')
const router = express.Router()

// passport
const passport = require('passport')

// request email and public_profile from FB
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

// response from FB
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/todos',
  failureRedirect: '/users/login',
  failureFlash: true
}))

// request email and profile from Google
router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}))

// response from Google
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/todos',
  failureRedirect: '/users/login',
  failureFlash: true
}))

module.exports = router
