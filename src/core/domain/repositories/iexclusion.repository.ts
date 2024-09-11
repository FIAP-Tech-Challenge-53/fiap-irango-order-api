import ExclusionRequest from '@/core/domain/entities/exclusion-request'

export default interface IExclusionRepository {
  create(input: ExclusionRequest): Promise<void>;
}

export const IExclusionRepository = Symbol('IExclusionRepository')
