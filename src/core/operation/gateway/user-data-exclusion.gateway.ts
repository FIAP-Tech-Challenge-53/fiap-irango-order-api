import ExclusionRequest from '@/core/domain/entities/exclusion-request'
import Repository from '@/core/domain/repositories/iexclusion.repository'

export class UserDataExclusionGateway {
  constructor (private respository: Repository) {}

  create (input: ExclusionRequest): Promise<void> {
    return this.respository.create(input)
  }
}
