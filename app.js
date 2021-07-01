const express = require('express')
const app = express()
const port = 3000

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// DB
require('./config/mongoose')

// form handling
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// display message after redirect by session and flash
const session = require('express-session')
app.use(session({
  secret: process.env.SESSION_SECRET_KEY || 'The quick brown fox jumps over the lazy dog',
  resave: true,
  saveUninitialized: true
}))

const flash = require('connect-flash')
app.use(flash())

app.use((req, res, next) => {
  res.locals.successMessage = req.flash('successMessage')
  res.locals.errorMessage = req.flash('errorMessage')
  res.locals.error = req.flash('error')
  next()
})

// passport
const passport = require('passport')
const loginVerify = require('./config/passport')
const loginVerifyFB = require('./config/passport_FB')
const loginVerifyGoogle = require('./config/passport_Google')
const loginVerifyLINE = require('./config/passport_LINE')
loginVerify(passport)
loginVerifyFB(passport)
loginVerifyGoogle(passport)
loginVerifyLINE(passport)
app.use(passport.initialize())
app.use(passport.session())

// rendering template
const expressHandlebars = require('express-handlebars')
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// method overwritten
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// navbar register& login or logout
const { navButtons } = require('./config/auth')
app.use(navButtons)

// routes
const routes = require('./routes')
app.use(routes)

// scripts, styles
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
