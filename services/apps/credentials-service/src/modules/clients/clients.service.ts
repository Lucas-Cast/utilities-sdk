import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { environment } from 'libs/config/environment'
import { ClientsRepository } from './clients.repository'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'

@Injectable()
export class ClientsService {
  constructor(
    private readonly clientsRepository: ClientsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateClientDto) {
    await this.validateUniqueName(dto.name)

    const hashedSecret = await bcrypt.hash(dto.secret, environment.BCRYPT_SALT_ROUNDS)
    const client = await this.clientsRepository.create({ name: dto.name, secret: hashedSecret })

    if (dto.featureIds?.length) await this.clientsRepository.syncFeatures(client.id, dto.featureIds)

    return this.clientsRepository.findById(client.id)
  }

  async findAll() {
    return this.clientsRepository.findAll()
  }

  async findOne(id: string) {
    const client = await this.clientsRepository.findById(id)
    if (!client) throw new NotFoundException(`Client with id "${id}" not found`)

    return client
  }

  async update(id: string, dto: UpdateClientDto) {
    await this.findOne(id)
    await this.validateUniqueName(dto.name, id)

    const hashedSecret = dto.secret
      ? await bcrypt.hash(dto.secret, environment.BCRYPT_SALT_ROUNDS)
      : undefined

    const data = this.stripUndefined({
      name: dto.name,
      isActive: dto.isActive,
      secret: hashedSecret,
    })

    if (Object.keys(data).length) await this.clientsRepository.update(id, data)
    if (dto.featureIds) await this.clientsRepository.syncFeatures(id, dto.featureIds)

    return this.clientsRepository.findById(id)
  }

  async remove(id: string) {
    await this.findOne(id)
    return this.clientsRepository.delete(id)
  }

  async authenticate(name: string, secret: string) {
    const client = await this.clientsRepository.findByNameWithFeatures(name)
    if (!client) throw new UnauthorizedException('Invalid credentials')
    if (!client?.isActive) throw new UnauthorizedException('Client is inactive')

    const isValidSecret = await bcrypt.compare(secret, client.secret)
    if (!isValidSecret) throw new UnauthorizedException('Invalid credentials')

    const features = client.features.map((cf) => cf.feature.name)

    const payload = { sub: client.id, name: client.name, features }

    return { accessToken: this.jwtService.sign(payload) }
  }

  private async validateUniqueName(name?: string, excludeId?: string) {
    if (!name) return

    const existing = excludeId
      ? await this.clientsRepository.findByNameExcludingId(name, excludeId)
      : await this.clientsRepository.findByName(name)

    if (existing) throw new ConflictException(`Client "${name}" already exists`)
  }

  private stripUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>
  }
}
