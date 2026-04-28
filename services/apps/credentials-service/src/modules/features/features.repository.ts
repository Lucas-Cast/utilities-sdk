import { PrismaService } from '@app/database'
import { Injectable } from '@nestjs/common'
import { CreateFeatureDto } from './dto/create-feature.dto'
import { UpdateFeatureDto } from './dto/update-feature.dto'

@Injectable()
export class FeaturesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFeatureDto) {
    return this.prisma.feature.create({ data })
  }

  async findAll() {
    return this.prisma.feature.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }

  async findById(id: string) {
    return this.prisma.feature.findUnique({ where: { id } })
  }

  async findByName(name: string) {
    return this.prisma.feature.findUnique({ where: { name } })
  }

  async findByNameExcludingId(name: string, id: string) {
    return this.prisma.feature.findFirst({
      where: { name, NOT: { id } },
    })
  }

  async update(id: string, data: UpdateFeatureDto) {
    return this.prisma.feature.update({ where: { id }, data })
  }

  async delete(id: string) {
    return this.prisma.feature.delete({ where: { id } })
  }
}
