import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateFeatureDto } from './dto/create-feature.dto'
import { UpdateFeatureDto } from './dto/update-feature.dto'
import { FeaturesService } from './features.service'

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Post()
  create(@Body() dto: CreateFeatureDto) {
    return this.featuresService.create(dto)
  }

  @Get()
  findAll() {
    return this.featuresService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featuresService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFeatureDto) {
    return this.featuresService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featuresService.remove(id)
  }
}
