const express = require('express')
const app = express()
const port = 3000

// DB
require('./config/mongoose')

// form handling
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// display message after redirect by session and flash
const session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
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
loginVerify(passport)
app.use(passport.initialize())
app.use(passport.session())

// rendering template
const expressHandlebars = require('express-handlebars')
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes
const routes = require('./routes')
app.use(routes)

// scripts, styles
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
