
const { Redis } = require('@upstash/redis')

const redis = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const USERS_KEY  = 'users'
const VIDEOS_KEY = 'videos'

async function readJSON(key) {
  const data = await redis.get(key)
  return Array.isArray(data) ? data : []
}

async function writeJSON(key, data) {
  await redis.set(key, data)
}

module.exports = { USERS_KEY, VIDEOS_KEY, readJSON, writeJSON }
