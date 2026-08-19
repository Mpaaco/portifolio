import express from 'express'
import cors from 'cors'
import { port } from './server/config/env.js'
import { connectDatabase } from './server/database/mongo.js'
import postsRouter from './server/routes/posts.js'

const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use('/api/posts', postsRouter)

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`)
})

connectDatabase().catch((error) => {
  console.error('Falha ao conectar ao MongoDB:', error)
  })
