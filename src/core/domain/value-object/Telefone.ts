import BusinessException from '@/core/domain/errors/business-exception'

export default class Telefone {
  constructor (private value: string, mustValidate = true) {
    if (mustValidate && (!value || !this.validate())) {
      throw new BusinessException('Invalid Phone')
    }
  }

  /**
   * toStrings
   */
  public toString (): string {
    return this.value
  }

  private validate (): boolean {
    // const regexPhone = /^[^\+\d{1,3}\s\d{2}\s\d{5}-\d{4}]+$/

    // return regexPhone.test(this.value)
    return true
  }
}
