const express = require('express')
const router = express.Router()

// check if user has logged in
const { isLoggedIn, notLoggedIn } = require('../../config/auth')

router.get('/', notLoggedIn, (req, res) => {
  res.render('index')
})

router.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('dashboard', { user: req.user.username })
})

module.exports = router
