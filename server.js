const express    = require('express')
const path       = require('path')
const session    = require('express-session')
const bodyParser = require('body-parser')

const authRoutes  = require('./routes/auth')
const videoRoutes = require('./routes/video')
const app         = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'a-super-secret-key',
  resave: false,
  saveUninitialized: false
}))
app.use('/resources', express.static(path.join(__dirname, 'resources')))

app.use('/auth', authRoutes)
app.use('/video', videoRoutes)
app.get('/', (req, res) => res.redirect('/auth/login'))

module.exports = app
