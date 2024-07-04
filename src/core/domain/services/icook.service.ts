import Pedido from '@/core/domain/entities/pedido'

export default interface ICookService {
  registerOrder(pedido: Pedido): Promise<void>;
}

export const ICookService = Symbol('ICookService')
