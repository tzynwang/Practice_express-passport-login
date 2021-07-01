const LineStrategy = require('passport-line').Strategy
const bcrypt = require('bcrypt')
const saltRounds = 10
const User = require('../models/user')

function loginVerifyLINE (passport) {
  passport.use(
    new LineStrategy({
      channelID: process.env.LINE_ID,
      channelSecret: process.env.LINE_SECRET,
      callbackURL: process.env.LINE_CALLBACK
    }, async (accessToken, refreshToken, profile, done) => {
      const { userId, displayName } = profile._json
      const user = await User.findOne({ email: userId })
      if (user) return done(null, user)
      try {
        // add new LINE user
        const hashPassword = await bcrypt.hash(userId, saltRounds)
        const newUser = new User({
          username: displayName,
          email: userId,
          password: hashPassword
        })
        await newUser.save()
        return done(null, newUser)
      } catch (error) {
        return done(null, false, { message: 'Sorry, we are not available to connect this LINE account.' })
      }
    })
  )
}

module.exports = loginVerifyLINE
