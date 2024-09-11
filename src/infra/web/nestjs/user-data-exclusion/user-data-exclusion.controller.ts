import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post
} from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import Repository, { IExclusionRepository } from '@/core/domain/repositories/iexclusion.repository'
import { ExclusionRequestController } from '@/core/operation/controllers/exclusion-request.controller'
import { UserDataExclusionRequest } from '@/infra/web/nestjs/user-data-exclusion/dto/user-data-exclusion.request'
import { UserDataExclusionResponse } from '@/infra/web/nestjs/user-data-exclusion/dto/user-data-exclusion.response'

@Controller('v1/user-data-exclusion')
@ApiTags('v1/user-data-exclusion')
export default class UserDataExclusionController {
  constructor (
    @Inject(IExclusionRepository) private readonly repository: Repository
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar Pedido de Exclusão dos Dados' })
  @ApiBody({ type: UserDataExclusionRequest })
  @ApiCreatedResponse({ description: 'Registro criado', type: UserDataExclusionResponse })
  create (
    @Body() input: UserDataExclusionRequest
  ): Promise<UserDataExclusionResponse> {
    const controller = new ExclusionRequestController(
      this.repository
    )

    return controller.request(input)
  }
}
