import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IPedidoRepository } from '@/core/domain/repositories/ipedido.repository'
import { IPaymentService } from '@/core/domain/services/ipayment.service'
import IRangoPaymentService from '@/infra/persistence/service/irango-payment.service'
import { ItemPedido } from '@/infra/persistence/typeorm/entities/item-pedido'
import { Pedido } from '@/infra/persistence/typeorm/entities/pedido'
import PedidoTypeormRepository from '@/infra/persistence/typeorm/repository/pedido-typeorm.repository'
import ConsumidoresModule from '@/infra/web/nestjs/consumidores/consumidores.module'
import PedidosController from '@/infra/web/nestjs/pedidos/pedidos.controller'
import ProdutosModule from '@/infra/web/nestjs/produtos/produtos.module'
import { StartCookHandler } from '@/infra/queue/handles/start-cook.handles'
import { FinishCookHandler } from '@/infra/queue/handles/finish-cook.handles'
import { ConfirmPaymentHandler } from '@/infra/queue/handles/confirm-payment.handles'
import { CreatedPaymentHandler } from '@/infra/queue/handles/created-payment.handles'
import { PedidoControllerFactory } from '@/infra/web/nestjs/pedidos/factory/pedido.controller.factory'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pedido,
      ItemPedido,
    ]),

    ProdutosModule,
    ConsumidoresModule,
  ],
  providers: [
    { provide: IPedidoRepository, useClass: PedidoTypeormRepository },
    { provide: IPaymentService, useClass: IRangoPaymentService },
    StartCookHandler,
    FinishCookHandler,
    CreatedPaymentHandler,
    ConfirmPaymentHandler,
    PedidoControllerFactory
  ],
  controllers: [
    PedidosController
  ],
})
export default class PedidosModule {}
