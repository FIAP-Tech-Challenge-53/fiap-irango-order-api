
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IExclusionRepository } from '@/core/domain/repositories/iexclusion.repository'
import { ExclusionRequest } from '@/infra/persistence/typeorm/entities/exclusion-request'
import ExclusionRequestTypeormRepository from '@/infra/persistence/typeorm/repository/exclusion-request-typeorm.repository'
import UserDataExclusionController from '@/infra/web/nestjs/user-data-exclusion/user-data-exclusion.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExclusionRequest
    ]),
  ],
  providers: [
    { provide: IExclusionRepository, useClass: ExclusionRequestTypeormRepository },
  ],
  controllers: [
    UserDataExclusionController
  ],
  exports: [
    IExclusionRepository
  ]
})
export default class ExclusionRequestModule {}
