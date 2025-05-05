const { readJSON, writeJSON, USERS_KEY }     = require('./storage')
const { v4: uuid } = require('uuid')

async function showRegister(req, res) {
  res.render('auth/register', { error: req.query.error })
}
async function doRegister(req, res) {
  const { email, name, password } = req.body
  if (!email||!name||!password)
    return res.redirect('/auth/register?error=Missing fields')
  const users = await readJSON(USERS_KEY)
  if (users.find(u=>u.email===email))
    return res.redirect('/auth/register?error=Email in use')
  users.push({ id: uuid(), email, name, password })
  await writeJSON(USERS_KEY, users)
  res.render('accountCreated', { name })
}
async function showLogin(req, res) {
  res.render('auth/login', { error: req.query.error })
}
async function doLogin(req, res) {
  const { email, password } = req.body
  const users = await readJSON(USERS_KEY)
  const user = users.find(u=>u.email===email&&u.password===password)
  if (!user)
    return res.redirect('/auth/login?error=Incorrect Password')
  req.session.user = { id:user.id,email:user.email,name:user.name }
  res.redirect('/video/dashboard/all')
}
module.exports = { showRegister, doRegister, showLogin, doLogin }
