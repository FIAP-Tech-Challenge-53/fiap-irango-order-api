import { Environment } from '@/infra/web/nestjs/environment';
import { PedidoControllerFactory } from '@/infra/web/nestjs/pedidos/factory/pedido.controller.factory';
import { Message } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';

@Injectable()
export class FinishCookHandler {

  constructor(
    private readonly pedidoControllerFactory: PedidoControllerFactory,
  ) { }


  @SqsMessageHandler(/** name: */ Environment.FINISH_COOK_QUEUE, /** batch: */ false)
  public async handleMessage(message: Message) {
    const obj: any = JSON.parse(message.Body ?? '');
    const controller = this.pedidoControllerFactory.get()

    await controller.finishCooking(obj.id)
  }

  @SqsConsumerEventHandler(/** name: */ Environment.FINISH_COOK_QUEUE, /** eventName: */ 'processing_error')
  public onProcessingError(error: Error, message: Message) {
    // report errors here
    console.log(error, message)

  }
}