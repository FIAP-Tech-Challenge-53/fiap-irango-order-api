import ExclusionUseCase from '@/core/application/usecase/exclusion/exclusion.use-case'
import InputExclusionRequestDto from '@/core/domain/dto/input/exclusion-request.dto'
import OutputExclusionRequestDto from '@/core/domain/dto/output/exclusion-request.dto'
import ExclusionRequestMapper from '@/core/domain/mappers/exclusion-request.mapper'
import IExclusionRepository from '@/core/domain/repositories/iexclusion.repository'
import { UserDataExclusionGateway } from '@/core/operation/gateway/user-data-exclusion.gateway'

export class ExclusionRequestController {
  constructor (
   private readonly userDataExclusionRepository: IExclusionRepository,
  ) {}

  async request (
    input:InputExclusionRequestDto
  ): Promise<OutputExclusionRequestDto> {
    const useCase = new ExclusionUseCase(
      new UserDataExclusionGateway(this.userDataExclusionRepository),
    )

    const request = await useCase.request(input)

    return ExclusionRequestMapper.toDto(request)
  }
}
