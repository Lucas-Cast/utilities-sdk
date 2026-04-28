import 'dotenv/config'

export const environment = {
  DATABASE_URL: process.env.DATABASE_URL || '',
  PORT: process.env.PORT || 8000,
}
