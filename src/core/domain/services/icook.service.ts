import Pedido from '@/core/domain/entities/pedido'

export default interface ICookService {
  registerOrder(pedido: Pedido): Promise<string>;
}

export const ICookService = Symbol('ICookService')
