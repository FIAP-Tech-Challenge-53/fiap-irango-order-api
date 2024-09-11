import InputExclusionRequestDto from '@/core/domain/dto/input/exclusion-request.dto'
import ExclusionRequest from '@/core/domain/entities/exclusion-request'

export default interface IExclusionUseCase {
  request(input: InputExclusionRequestDto): Promise<ExclusionRequest>;
}

export const IExclusionUseCase = Symbol('IExclusionUseCase')
