import { Injectable } from '@nestjs/common'

import { v4 as uuidv4 } from 'uuid'

import Pedido from '@/core/domain/entities/pedido'
import IPaymentService from '@/core/domain/services/ipayment.service'

@Injectable()
export default class IRangoPaymentService implements IPaymentService {
  constructor (
  ) {}

  async registerOrder (pedido: Pedido): Promise<string> {
    console.log(`Mocked Mercado Pago API: Register order for pedido ${pedido.id}`)
    const pagamentoId = uuidv4() // mocked ID
    console.log(`Pagamento ID: ${pagamentoId}`)
    return pagamentoId
  }
}
