import Pedido from '@/core/domain/entities/pedido'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'
import BusinessException from '@/core/domain/errors/business-exception'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'

export default class ConfirmPayment {
  constructor (
    private readonly gateway: PedidoGateway,
  ) {}

  async handle (id: number): Promise<Pedido> {
    console.log(`Confirming Order with ID ${id}`)

    let pedido = await this.gateway.findById(id)

    if (!pedido) {
      throw new BusinessException('Pedido não encontrado')
    }

    if (![PedidoStatusEnum.PAGAMENTO_PENDENTE, PedidoStatusEnum.RECEBIDO].includes(pedido.status)) {
      throw new BusinessException('Pedido não está com pagamento pendente')
    }

    pedido.update({ status: PedidoStatusEnum.RECEBIDO })

    pedido = await this.gateway.save(pedido)

    return pedido
  }
}
