+ const { readJSON, writeJSON, VIDEOS_KEY } = require('./storage')
const { v4: uuid } = require('uuid')

function toEmbedUrl(url) {
  if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/')
  if (url.includes('youtu.be/'))
    return url.replace('youtu.be/', 'www.youtube.com/embed/')
  return url
}
async function showNewVideo(req, res) {
  res.render('video/newVideo', {
    error: req.query.error, success: req.query.success
  })
}
async function addVideo(req, res) {
  const { url, title } = req.body
  if (!url||!title)
    return res.redirect('/video/new_video?error=Missing fields')
  const videos = await readJSON(videosFile)
  videos.push({ id:uuid(),url,title,owner:req.session.user.id })
  await writeJSON(VIDEOS_KEY, videos)
  res.redirect('/video/new_video?success=Video added!')
}
async function showDashboard(req, res) {
  const filter = req.params.videofilter
  const videos = await readJSON(VIDEOS_KEY)
  const list = filter==='mine'
    ? videos.filter(v=>v.owner===req.session.user.id)
    : videos
  const withEmbed = list.map(v=>({
    title: v.title,
    embedUrl: toEmbedUrl(v.url)
  }))
  res.render('video/dashboard', { videos:withEmbed, filter })
}
module.exports = { showNewVideo, addVideo, showDashboard }
