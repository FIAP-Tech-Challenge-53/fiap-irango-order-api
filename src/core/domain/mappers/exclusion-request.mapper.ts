import OutputExclusionRequestDto from '@/core/domain/dto/output/exclusion-request.dto'
import ExclusionRequest from '@/core/domain/entities/exclusion-request'

import Endereco from '../value-object/Endereco'
import Telefone from '../value-object/Telefone'

export default class ExclusionRequestMapper {
  static toDto (request: ExclusionRequest): OutputExclusionRequestDto {
    return {
      ...request,
      endereco: request.endereco.toString(),
      telefone: request.telefone.toString(),
      data: request.data.toDateString()
    }
  }

  static toDomainEntity (input: OutputExclusionRequestDto): ExclusionRequest {
    return new ExclusionRequest(input.id, input.nome, new Endereco(input.endereco), new Telefone(input.telefone), new Date(input.data))
  }
}
