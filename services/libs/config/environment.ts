import 'dotenv/config'

export const environment = {
  DATABASE_URL: process.env.DATABASE_URL || '',
  PORT: process.env.PORT || 8080,
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  MASTER_PASSWORD: process.env.MASTER_PASSWORD || '',
  JWT_SECRET: process.env.JWT_SECRET || 'change-me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
}
