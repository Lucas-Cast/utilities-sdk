import { PrismaPg } from '@prisma/adapter-pg'
import * as bcrypt from 'bcrypt'
import 'dotenv/config'
import { PrismaClient } from 'generated/prisma/client'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })
async function main() {
  const masterPassword = process.env.MASTER_PASSWORD
  if (!masterPassword) {
    throw new Error('MASTER_PASSWORD environment variable is required for seeding')
  }

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10
  const hashedPassword = await bcrypt.hash(masterPassword, saltRounds)

  // Seed features
  const [notificationFeature, credentialsFeature] = await Promise.all([
    prisma.feature.upsert({
      where: { name: 'notification-service' },
      update: {},
      create: {
        name: 'notification-service',
        description: 'Service responsible for sending notifications',
        isActive: true,
      },
    }),
    prisma.feature.upsert({
      where: { name: 'credentials-service' },
      update: {},
      create: {
        name: 'credentials-service',
        description: 'Service responsible for managing credentials',
        isActive: true,
      },
    }),
  ])
  console.log(`✅ Feature created: ${notificationFeature.name} (${notificationFeature.id})`)
  console.log(`✅ Feature created: ${credentialsFeature.name} (${credentialsFeature.id})`)

  // Seed master client
  const masterClient = await prisma.client.upsert({
    where: { name: 'master' },
    update: {},
    create: {
      name: 'master',
      secret: hashedPassword,
      isActive: true,
    },
  })
  console.log(`✅ Master client created: ${masterClient.name} (${masterClient.id})`)

  // Assign all features to master client
  const allFeatures = await prisma.feature.findMany()
  await Promise.all(
    allFeatures.map((feature) =>
      prisma.clientFeature.upsert({
        where: {
          clientId_featureId: {
            clientId: masterClient.id,
            featureId: feature.id,
          },
        },
        update: {},
        create: {
          clientId: masterClient.id,
          featureId: feature.id,
        },
      }),
    ),
  )
  allFeatures.forEach((f) => console.log(`✅ Feature "${f.name}" assigned to master client`))
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
