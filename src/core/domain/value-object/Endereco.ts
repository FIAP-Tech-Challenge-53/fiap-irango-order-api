import BusinessException from '@/core/domain/errors/business-exception'

export default class Endereco {
  constructor (private value: string, mustValidate = true) {
    if (mustValidate && (!value || !this.validate())) {
      throw new BusinessException('Invalid Address')
    }
  }

  /**
   * toStrings
   */
  public toString (): string {
    return this.value
  }

  private validate (): boolean {
    return this.value !== ''
  }
}
