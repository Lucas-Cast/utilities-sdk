import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateFeatureDto } from './dto/create-feature.dto'
import { UpdateFeatureDto } from './dto/update-feature.dto'
import { FeaturesRepository } from './features.repository'

@Injectable()
export class FeaturesService {
  constructor(private readonly featuresRepository: FeaturesRepository) {}

  async create(dto: CreateFeatureDto) {
    const existing = await this.featuresRepository.findByName(dto.name)
    if (existing) throw new ConflictException(`Feature "${dto.name}" already exists`)

    return this.featuresRepository.create(dto)
  }

  async findAll() {
    return this.featuresRepository.findAll()
  }

  async findOne(id: string) {
    const feature = await this.featuresRepository.findById(id)
    if (!feature) throw new NotFoundException(`Feature with id "${id}" not found`)

    return feature
  }

  async update(id: string, dto: UpdateFeatureDto) {
    await this.findOne(id)

    if (dto.name) {
      const existing = await this.featuresRepository.findByNameExcludingId(dto.name, id)
      if (existing) throw new ConflictException(`Feature "${dto.name}" already exists`)
    }

    return this.featuresRepository.update(id, dto)
  }

  async remove(id: string) {
    await this.findOne(id)
    return this.featuresRepository.delete(id)
  }
}
