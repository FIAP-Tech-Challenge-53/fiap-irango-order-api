import { Injectable } from '@nestjs/common'

import { Message } from '@aws-sdk/client-sqs'
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs'

import { Environment } from '@/infra/web/nestjs/environment'
import { PedidoControllerFactory } from '@/infra/web/nestjs/pedidos/factory/pedido.controller.factory'

@Injectable()
export class FinishCookHandler {
  constructor (
    private readonly pedidoControllerFactory: PedidoControllerFactory,
  ) { }

  @SqsMessageHandler(/** name: */ Environment.FINISH_COOK_QUEUE, /** batch: */ false)
  public async handleMessage (message: Message) {
    const obj: any = JSON.parse(message.Body ?? '')
    const input: any = JSON.parse(obj.Message ?? '')
    const controller = this.pedidoControllerFactory.get()

    await controller.finishCooking(input.pedidoId)
  }

  @SqsConsumerEventHandler(/** name: */ Environment.FINISH_COOK_QUEUE, /** eventName: */ 'processing_error')
  public onProcessingError (error: Error, message: Message) {
    // report errors here
    console.log(error, message)
  }
}
