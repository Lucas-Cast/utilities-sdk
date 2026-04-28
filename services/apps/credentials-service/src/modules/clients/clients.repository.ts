import { PrismaService } from '@app/database'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ClientsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string; secret: string }) {
    return this.prisma.client.create({
      data,
      include: { features: { include: { feature: true } } },
    })
  }

  async findAll() {
    return this.prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
      include: { features: { include: { feature: true } } },
    })
  }

  async findById(id: string) {
    return this.prisma.client.findUnique({
      where: { id },
      include: { features: { include: { feature: true } } },
    })
  }

  async findByName(name: string) {
    return this.prisma.client.findUnique({ where: { name } })
  }

  async findByNameExcludingId(name: string, id: string) {
    return this.prisma.client.findFirst({
      where: { name, NOT: { id } },
    })
  }

  async update(id: string, data: { name?: string; secret?: string; isActive?: boolean }) {
    return this.prisma.client.update({
      where: { id },
      data,
      include: { features: { include: { feature: true } } },
    })
  }

  async delete(id: string) {
    return this.prisma.client.delete({ where: { id } })
  }

  async syncFeatures(clientId: string, featureIds: string[]) {
    await this.prisma.clientFeature.deleteMany({ where: { clientId } })

    if (!featureIds.length) return

    await this.prisma.clientFeature.createMany({
      data: featureIds.map((featureId) => ({ clientId, featureId })),
    })
  }
}
