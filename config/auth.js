function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('errorMessage', 'Please log in to view this page.')
  res.redirect('/users/login')
}

function notLoggedIn (req, res, next) {
  if (!req.isAuthenticated()) {
    return next()
  }
  res.redirect('/todos')
}

function navButtons (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated()
  return next()
}

module.exports = { isLoggedIn, notLoggedIn, navButtons }
