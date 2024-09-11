import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import ExclusionRequest from '@/core/domain/entities/exclusion-request'
import ExclusionRequestMapper from '@/core/domain/mappers/exclusion-request.mapper'
import IExclusionRepository from '@/core/domain/repositories/iexclusion.repository'
import { ExclusionRequest as Entity } from '@/infra/persistence/typeorm/entities/exclusion-request'

@Injectable()
export default class ExclusionRequestTypeormRepository implements IExclusionRepository {
  constructor (
    @InjectRepository(Entity) private readonly repository: Repository<Entity>
  ) {}

  async create (input: ExclusionRequest): Promise<void> {
    const request = ExclusionRequestMapper.toDto(input)

    await this.repository.save(request)
  }
}
