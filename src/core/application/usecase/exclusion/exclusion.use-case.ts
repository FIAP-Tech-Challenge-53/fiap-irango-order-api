import InputExclusionRequestDto from '@/core/domain/dto/input/exclusion-request.dto'
import ExclusionRequest from '@/core/domain/entities/exclusion-request'
import BusinessException from '@/core/domain/errors/business-exception'
import { UserDataExclusionGateway } from '@/core/operation/gateway/user-data-exclusion.gateway'

import IExclusionUseCase from './iexclusion.use-case'

export default class ExclusionUseCase implements IExclusionUseCase {
  constructor (
    private readonly gateway: UserDataExclusionGateway,
  ) {}

  async request (input: InputExclusionRequestDto): Promise<ExclusionRequest> {
    const exclusionRequest = ExclusionRequest.create(
      input.nome,
      input.endereco,
      input.telefone
    )

    try {
      await this.gateway.create(exclusionRequest)
      return exclusionRequest
    } catch (error) {
      throw new BusinessException('Erro ao requisitar inserção do pedido de exclusão de dados.')
    }
  }
}
