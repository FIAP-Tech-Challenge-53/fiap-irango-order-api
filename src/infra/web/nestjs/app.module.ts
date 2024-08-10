import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager'
import { Global, Inject, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Cache } from 'cache-manager'
import * as redisStore from 'cache-manager-redis-store'

import RedisConfig from '@/config/RedisConfig'
import TypeOrmConfig from '@/config/typeorm/TypeOrmConfig'
import AppCache from '@/core/helpers/AppCache'
import AppController from '@/infra/web/nestjs/app.controller'
import ConsumidoresModule from '@/infra/web/nestjs/consumidores/consumidores.module'
import PedidosModule from '@/infra/web/nestjs/pedidos/pedidos.module'
import ProdutosModule from '@/infra/web/nestjs/produtos/produtos.module'
import { SqsModule } from '@ssut/nestjs-sqs'
import { Environment } from '@/infra/web/nestjs/environment'

export const appModules = [
  ConsumidoresModule,
  ProdutosModule,
  PedidosModule
]

// AWS.config.update({
//   region: config.AWS_REGION,
//   accessKeyId: config.ACCESS_KEY_ID,
//   secretAccessKey: config.SECRET_ACCESS_KEY,
// });

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    CacheModule.register({
      store: redisStore,
      ...RedisConfig
    }),
    SqsModule.register({
      consumers: [
        {
          name: Environment.CONFIRM_PAYMENT_QUEUE, // name of the queue 
          queueUrl: Environment.URL_QUEUE, // the url of the queue
          region: Environment.AWS_REGION,

        },
        {
          name: Environment.FINISH_COOK_QUEUE, // name of the queue 
          queueUrl: Environment.URL_QUEUE_FINISH_COOK_QUEUE, // the url of the queue
          region: Environment.AWS_REGION,
        },
        {
          name: Environment.START_COOK_QUEUE, // name of the queue 
          queueUrl: Environment.URL_QUEUE_START_COOK_QUEUE, // the url of the queue
          region: Environment.AWS_REGION,
        },
      ],
      producers: [
        {
          name: Environment.CONFIRM_PAYMENT_QUEUE, // name of the queue 
          queueUrl: Environment.URL_QUEUE, // the url of the queue
          region: Environment.AWS_REGION,

        },
      ],
    }),
    ...appModules
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppCache
  ],
  exports: [
    AppCache
  ]
})
export default class AppModule {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async onApplicationShutdown() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (this.cacheManager as any).store.getClient().quit()
  }
}
