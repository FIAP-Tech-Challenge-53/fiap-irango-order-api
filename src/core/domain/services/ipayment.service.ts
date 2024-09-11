import Pedido from '@/core/domain/entities/pedido'

export default interface IPaymentService {
  registerOrder(pedido: Pedido): Promise<void>;
}

export const IPaymentService = Symbol('IPaymentService')
