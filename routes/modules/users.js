const express = require('express')
const router = express.Router()

// DB
const User = require('../../models/user')

// password hash
const bcrypt = require('bcrypt')
const saltRounds = 10

// passport
const passport = require('passport')

// only direct not logged in user to login or register endpoint
const { notLoggedIn } = require('../../config/auth')

router.get('/login', notLoggedIn, (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/todos',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', notLoggedIn, (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  const registerErrors = []
  if (!username || !email || !password) registerErrors.push({ message: 'Please fill in all fields' })
  if (email) {
    const find = await User.findOne({ email })
    if (find) registerErrors.push({ message: `The email "${email}" has registered before` })
  }
  if (registerErrors.length) {
    res.render('register', { registerErrors, username, email, password })
    return
  }

  const hashPassword = await bcrypt.hash(password, saltRounds)
  const newUser = new User({
    username,
    email,
    password: hashPassword
  })
  await newUser.save()
  req.flash('successMessage', 'You are now register and can log in.')
  res.redirect('/users/login')
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('successMessage', 'You have logged out.')
  res.redirect('/users/login')
})

module.exports = router
