import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import Pedido from '@/core/domain/entities/pedido'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'

describe('Testing PedidoMapper Class', () => {
  it('toDto static method should receive Pedido Class and return PedidoDto class', () => {
    const pedido = new Pedido({
      id: 1,
      itens: [],
      total: 1,
      status: PedidoStatusEnum.PAGAMENTO_PENDENTE
    })

    const dto = PedidoMapper.toDto(pedido)

    expect(dto.total).toEqual(1)
    expect(dto.itens).toEqual([])
    expect(dto.status).toEqual(PedidoStatusEnum.PAGAMENTO_PENDENTE)
  })

  it('toDomainEntity static method should receive PedidoDto Class and return Pedido class', () => {
    const dto:PedidoDto = {
      id: 1,
      consumidorId: '',
      total: 1,
      itens: [],
      status: PedidoStatusEnum.PAGAMENTO_PENDENTE,
      pagamentoId: '',
      createdAt: new Date(1),
      updatedAt: new Date(1)
    }

    const pedido = PedidoMapper.toDomainEntity(dto)

    expect(pedido).toBeInstanceOf(Pedido)
  })
})
