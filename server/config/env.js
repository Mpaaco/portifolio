import 'dotenv/config'

export const port = Number(process.env.PORT) || 3000
export const mongoUri = process.env.MONGODB_URI
export const databaseName = process.env.MONGODB_DATABASE || 'portf_db'

export function hasValidMongoUri() {
  return Boolean(mongoUri && !mongoUri.includes('<db_username>'))
}