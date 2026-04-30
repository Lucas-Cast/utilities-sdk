import { Public } from '@lib/modules/auth/decorators/public.decorator'
import { RequireFeature } from '@lib/modules/auth/decorators/require-feature.decorator'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FeatureEnum } from 'libs/enums/feature-enum'
import { ClientsService } from './clients.service'
import { CreateClientDto } from './dto/create-client.dto'
import { LoginDto } from './dto/login.dto'
import { UpdateClientDto } from './dto/update-client.dto'

@ApiBearerAuth()
@ApiTags('Clients')
@Controller('clients')
@RequireFeature(FeatureEnum.CREDENTIALS_SERVICE)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Public()
  @Post('auth')
  @ApiOperation({ summary: 'Authenticate client and get JWT token' })
  login(@Body() dto: LoginDto) {
    return this.clientsService.authenticate(dto.name, dto.secret)
  }

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  create(@Body() dto: CreateClientDto) {
    return this.clientsService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'List all clients' })
  findAll() {
    return this.clientsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find client by ID' })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a client' })
  update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.clientsService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a client' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id)
  }
}
