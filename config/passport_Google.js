const GoogleStrategy = require('passport-google-oauth20').Strategy
const bcrypt = require('bcrypt')
const saltRounds = 10
const User = require('../models/user')

function loginVerifyGoogle (passport) {
  passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      profileFields: ['email', 'displayName']
    }, async (accessToken, refreshToken, profile, done) => {
      // console.log(profile)
      const { email, given_name, sub } = profile._json
      const user = await User.findOne({ email })
      if (user) return done(null, user)
      try {
        // add new FB user
        const hashPassword = await bcrypt.hash(sub, saltRounds)
        const newUser = new User({
          username: given_name,
          email,
          password: hashPassword
        })
        await newUser.save()
        return done(null, newUser)
      } catch (error) {
        return done(null, false, { message: 'Sorry, we are not available to connect this Google account.' })
      }
    })
  )
}

module.exports = loginVerifyGoogle
