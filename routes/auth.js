const express = require('express')
const { showRegister, doRegister, showLogin, doLogin } =
  require('../controllers/authController')
const router = express.Router()
router.get('/register', showRegister)
router.post('/register', doRegister)
router.get('/login', showLogin)
router.post('/login', doLogin)
module.exports = router
