import { Inject, Injectable } from '@nestjs/common'

import IConsumidorRepository, {
  IConsumidorRepository as IConsumidorRepositorySymbol,
} from '@/core/domain/repositories/iconsumidor.repository'
import IPedidoRepository, {
  IPedidoRepository as IPedidoRepositorySymbol,
} from '@/core/domain/repositories/ipedido.repository'
import IProdutoRepository, {
  IProdutoRepository as IProdutoRepositorySymbol,
} from '@/core/domain/repositories/iproduto.repository'
import IPaymentService, {
  IPaymentService as IPaymentServiceSymbol,
} from '@/core/domain/services/ipayment.service'
import { PedidoController } from '@/core/operation/controllers/pedido.controller'

@Injectable()
export class PedidoControllerFactory {
  constructor (
    @Inject(IPedidoRepositorySymbol) private readonly repository: IPedidoRepository,
    @Inject(IConsumidorRepositorySymbol) private readonly consumidorRepository: IConsumidorRepository,
    @Inject(IProdutoRepositorySymbol) private readonly produtoRepository: IProdutoRepository,
    @Inject(IPaymentServiceSymbol) private readonly paymentService: IPaymentService,
  ) {

  }

  public get () {
    return new PedidoController(
      this.repository,
      this.consumidorRepository,
      this.produtoRepository,
      this.paymentService,
    )
  }
}
