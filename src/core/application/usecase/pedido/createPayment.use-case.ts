import Pedido from '@/core/domain/entities/pedido'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'
import BusinessException from '@/core/domain/errors/business-exception'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'

export default class CreatePayment {
  constructor (
    private readonly gateway: PedidoGateway,
  ) {}

  async handle (id: number, pagamentoId: string): Promise<Pedido> {
    let pedido = await this.gateway.findById(id)

    if (!pedido) {
      throw new BusinessException('Pedido não encontrado')
    }

    if (![PedidoStatusEnum.PAGAMENTO_PENDENTE, PedidoStatusEnum.RECEBIDO].includes(pedido.status)) {
      throw new BusinessException('Pedido não está com pagamento pendente')
    }

    pedido.update({ pagamentoId, status: pedido.status })

    pedido = await this.gateway.save(pedido)

    return pedido
  }
}
