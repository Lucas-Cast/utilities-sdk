import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FeatureEnum } from 'libs/enums/feature-enum'
import { RequireFeature } from 'libs/modules/auth/decorators/require-feature.decorator'
import { CreateFeatureDto } from './dto/create-feature.dto'
import { UpdateFeatureDto } from './dto/update-feature.dto'
import { FeaturesService } from './features.service'

@ApiBearerAuth()
@ApiTags('Features')
@Controller('features')
@RequireFeature(FeatureEnum.CREDENTIALS_SERVICE)
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new feature' })
  create(@Body() dto: CreateFeatureDto) {
    return this.featuresService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'List all features' })
  findAll() {
    return this.featuresService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find feature by ID' })
  findOne(@Param('id') id: string) {
    return this.featuresService.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a feature' })
  update(@Param('id') id: string, @Body() dto: UpdateFeatureDto) {
    return this.featuresService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a feature' })
  remove(@Param('id') id: string) {
    return this.featuresService.remove(id)
  }
}
