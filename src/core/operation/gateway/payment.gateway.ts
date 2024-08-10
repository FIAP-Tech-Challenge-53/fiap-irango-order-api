import Pedido from '@/core/domain/entities/pedido'
import IPaymentService from '@/core/domain/services/ipayment.service'

export class PaymentGateway {
  constructor (private service: IPaymentService) {

  }

  async registerOrder (pedido: Pedido): Promise<void> {
    return this.service.registerOrder(pedido)
  }
}
