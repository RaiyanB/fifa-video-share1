const express = require('express')
const { ensureAuth } = require('../middleware/auth')
const { showNewVideo, addVideo, showDashboard } =
  require('../controllers/videoController')
const router = express.Router()
router.get('/new_video', ensureAuth, showNewVideo)
router.post('/new',      ensureAuth, addVideo)
router.get('/dashboard/:videofilter', ensureAuth, showDashboard)
module.exports = router
