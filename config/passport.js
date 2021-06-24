const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user')

function loginVerify (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      const user = await User.findOne({ email })
      // check if user exist
      if (!user) return done(null, false, { message: 'User not exist' })

      // check password
      const compareResult = await bcrypt.compare(password, user.password)
      return compareResult ? done(null, user) : done(null, false, { message: 'Password incorrect' })
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user)
    })
  })
}

module.exports = loginVerify
