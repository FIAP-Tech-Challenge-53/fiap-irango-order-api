import Pedido from '@/core/domain/entities/pedido'
import ICookService from '@/core/domain/services/icook.service'

export class CookGateway {
  constructor (private respository: ICookService) {

  }

  async registerOrder (pedido: Pedido): Promise<void> {
    return this.respository.registerOrder(pedido)
  }
}
