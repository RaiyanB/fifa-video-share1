const fs   = require('fs-extra')
const path = require('path')
const usersFile  = path.join(__dirname, '../data/users.json')
const videosFile = path.join(__dirname, '../data/videos.json')

async function readJSON(file) {
  await fs.ensureFile(file)
  const txt = await fs.readFile(file, 'utf8')
  return txt ? JSON.parse(txt) : []
}

async function writeJSON(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2))
}

module.exports = { usersFile, videosFile, readJSON, writeJSON }
