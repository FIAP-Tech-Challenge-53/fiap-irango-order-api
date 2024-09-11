import Pedido from '@/core/domain/entities/pedido'
import ICookService from '@/core/domain/services/icook.service'

export class CookGateway {
  constructor (private service: ICookService) {

  }

  async registerOrder (pedido: Pedido): Promise<void> {
    return this.service.registerOrder(pedido)
  }
}
