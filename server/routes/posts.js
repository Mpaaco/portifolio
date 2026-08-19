import { Router } from 'express'
import { getDatabase } from '../database/mongo.js'

const router = Router()

router.get('/', async (req, res) => {
  const database = getDatabase()
  if (!database) return res.json([])

  try {
    const posts = await database.collection('posts').find().toArray()
    res.json(posts.map(({ _id, ...post }) => post))
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/batch', async (req, res) => {
  const database = getDatabase()
  if (!database) return res.status(503).json({ error: 'Banco não conectado' })
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Body deve ser um array' })
  }

  try {
    const collection = database.collection('posts')
    await collection.deleteMany({})
    if (req.body.length > 0) await collection.insertMany(req.body)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router