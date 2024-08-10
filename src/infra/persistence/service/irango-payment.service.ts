import { Injectable } from '@nestjs/common'

import { PublishCommand, SNSClient } from '@aws-sdk/client-sns'

import AwsConfig from '@/config/AwsConfig'
import Pedido from '@/core/domain/entities/pedido'
import IPaymentService from '@/core/domain/services/ipayment.service'
import { Environment as envs } from '@/infra/web/nestjs/environment'

@Injectable()
export default class IRangoPaymentService implements IPaymentService {
  constructor (
  ) {}

  async registerOrder (pedido: Pedido): Promise<void> {
    console.log(`Register order for pedido ${pedido.id} at IRango Payment Service`)

    try {
      const client = new SNSClient(AwsConfig)
      const command = new PublishCommand({
        TopicArn: envs.SNS_TOPIC_ORDER_CREATED,
        Message: JSON.stringify(pedido)
      })

      await client.send(command)
    } catch (error) {
      console.error(`Error: ${error}`)
      console.error(error)
    }
  }
}
