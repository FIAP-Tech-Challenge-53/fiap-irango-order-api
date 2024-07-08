import { Injectable } from '@nestjs/common'

import axios from 'axios'

import Pedido from '@/core/domain/entities/pedido'
import ICookService from '@/core/domain/services/icook.service'
import { Environment as envs } from '@/infra/web/nestjs/environment'

@Injectable()
export default class IRangoCookService implements ICookService {
  constructor (
  ) {}

  async registerOrder (pedido: Pedido): Promise<void> {
    console.log(`Register order for pedido ${pedido.id} at IRango Cook Service`)

    try {
      const url = `${envs.SERVICE_IRANGO_COOK_API}/v1/pedidos/register`
      await axios.post(url, pedido)
    } catch (error) {
      console.log(`Error: ${error}`)
      console.log(error.response?.data)
    }
  }
}
