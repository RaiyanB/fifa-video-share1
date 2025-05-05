function ensureAuth(req, res, next) {
  if (req.session.user) return next()
  res.redirect('/auth/login?error=You must login to access this content')
}
module.exports = { ensureAuth }
