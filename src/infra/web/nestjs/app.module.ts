import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager'
import { Global, Inject, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SqsModule } from '@ssut/nestjs-sqs'
import { Cache } from 'cache-manager'
import * as redisStore from 'cache-manager-redis-store'

import QueueConfig from '@/config/QueueConfig'
import RedisConfig from '@/config/RedisConfig'
import TypeOrmConfig from '@/config/typeorm/TypeOrmConfig'
import AppCache from '@/core/helpers/AppCache'
import AppController from '@/infra/web/nestjs/app.controller'
import ConsumidoresModule from '@/infra/web/nestjs/consumidores/consumidores.module'
import PedidosModule from '@/infra/web/nestjs/pedidos/pedidos.module'
import ProdutosModule from '@/infra/web/nestjs/produtos/produtos.module'
import ExclusionRequestModule from '@/infra/web/nestjs/user-data-exclusion/user-data-exclusion.module'

export const appModules = [
  ConsumidoresModule,
  ProdutosModule,
  PedidosModule,
  ExclusionRequestModule
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
    SqsModule.register(QueueConfig),
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
  constructor (@Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async onApplicationShutdown () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (this.cacheManager as any).store.getClient().quit()
  }
}
