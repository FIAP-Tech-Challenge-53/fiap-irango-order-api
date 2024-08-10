import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IPedidoRepository } from '@/core/domain/repositories/ipedido.repository'
import { ICookService } from '@/core/domain/services/icook.service'
import { IPaymentService } from '@/core/domain/services/ipayment.service'
import IRangoCookService from '@/infra/persistence/service/irango-cook.service'
import IRangoPaymentService from '@/infra/persistence/service/irango-payment.service'
import { ItemPedido } from '@/infra/persistence/typeorm/entities/item-pedido'
import { Pedido } from '@/infra/persistence/typeorm/entities/pedido'
import PedidoTypeormRepository from '@/infra/persistence/typeorm/repository/pedido-typeorm.repository'
import ConsumidoresModule from '@/infra/web/nestjs/consumidores/consumidores.module'
import PedidosController from '@/infra/web/nestjs/pedidos/pedidos.controller'
import ProdutosModule from '@/infra/web/nestjs/produtos/produtos.module'
import { StartCookHandler } from '@/infra/web/nestjs/pedidos/handles/start-cook.handles'
import { FinishCookHandler } from '@/infra/web/nestjs/pedidos/handles/finish-cook.handles'
import { ConfirmPaymentHandler } from '@/infra/web/nestjs/pedidos/handles/confirm-payment.handles'
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
    { provide: ICookService, useClass: IRangoCookService },
    StartCookHandler,
    FinishCookHandler,
    ConfirmPaymentHandler,
    PedidoControllerFactory
  ],
  controllers: [
    PedidosController
  ],
})
export default class PedidosModule {}
