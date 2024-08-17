/* eslint-disable import/first */
/* eslint-disable import-helpers/order-imports */
import dotenv from 'dotenv'
dotenv.config()

import { Environment as envs } from '@/infra/web/nestjs/environment'
envs.validate()

import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import * as Sentry from '@sentry/node'
import * as bodyParser from 'body-parser'
import helmet from 'helmet'

import AppModule from '@/infra/web/nestjs/app.module'
import SentryConfig from '@/config/SentryConfig'
import AllExceptionFilter from '@/core/helpers/AllExceptionFilter'
import ResponseTransformInterceptor from '@/core/helpers/ResponseTransformInterceptor'

const configureSentry = (app: INestApplication) => {
  Sentry.init(SentryConfig)
  app.use(Sentry.Handlers.requestHandler())
  app.use(Sentry.Handlers.tracingHandler())
  app.use(Sentry.Handlers.errorHandler())
}

const configureSwagger = (app: INestApplication) => {
  const swaggerOptions = new DocumentBuilder()
    .setTitle('iRango Order API')
    .setDescription('iRango Order API documentation')
    .setVersion('0.0.1')
    // .addBearerAuth(undefined, 'Mobile')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'docs/json'
  })
}

async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  configureSentry(app)
  configureSwagger(app)

  app.use(helmet())

  app.use(bodyParser.json({ limit: '5mb' }))
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
  app.enableCors({ 
    origin: [`${envs.SENTRY_DSN}`,`${envs.SERVICE_IRANGO_COOK_API}`,`${envs.SERVICE_IRANGO_PAYMENT_API}`],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
  })
  app.enableShutdownHooks()
  app.useGlobalInterceptors(new ResponseTransformInterceptor())
  app.useGlobalFilters(new AllExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(envs.PORT, () => {
    console.log(`Listening at ${envs.PORT}`)
  })
}

bootstrap().catch((err) => {
  console.error(err)
})
