import { MongoClient } from 'mongodb'
import { databaseName, hasValidMongoUri, mongoUri } from '../config/env.js'

let database

export async function connectDatabase() {
  if (!hasValidMongoUri()) {
    console.warn('MONGODB_URI não está configurado. O backend iniciará sem persistência.')
    return null
  }

  const client = new MongoClient(mongoUri)
  await client.connect()
  database = client.db(databaseName)
  console.log(`Conectado ao MongoDB: ${databaseName}`)
  return database
}

export function getDatabase() {
  return database
}