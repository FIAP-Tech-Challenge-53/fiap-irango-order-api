export class Environment {
  static validate () {
    if (!process.env.NODE_ENV) throw new Error('NODE_ENV is not defined')
  }

  static get NODE_ENV () {
    return process.env.NODE_ENV || 'development'
  }

  static get IS_DEV_ENV () {
    const devEnvs = ['development', 'local']
    return devEnvs.includes(Environment.NODE_ENV)
  }

  static get PORT () {
    return process.env.PORT || 3001
  }

  static get SENTRY_DSN () {
    return process.env.SENTRY_DSN || ''
  }

  static get DB_HOSTNAME () {
    return process.env.DB_HOSTNAME || 'localhost'
  }

  static get DB_PORT (): number {
    return Number(process.env.DB_PORT) || 3306
  }

  static get DB_USERNAME () {
    return process.env.DB_USERNAME || 'root'
  }

  static get DB_PASSWORD () {
    return process.env.DB_PASSWORD || 'password'
  }

  static get DB_DATABASE () {
    return process.env.DB_DATABASE || 'irango_order'
  }

  static get DB_CONNECTION_LIMIT (): number {
    return Number(process.env.DB_CONNECTION_LIMIT) || 10000
  }

  static get DB_CONNECTION_TIMEOUT (): number {
    return Number(process.env.DB_CONNECTION_TIMEOUT) || 30000
  }

  static get REDIS_HOSTNAME () {
    return process.env.REDIS_HOSTNAME || 'localhost'
  }

  static get REDIS_PORT (): number {
    return Number(process.env.REDIS_PORT) || 6379
  }

  static get REDIS_DB (): number {
    return Number(process.env.REDIS_DB) || 1
  }

  static get REDIS_ENABLED (): boolean {
    return process.env.REDIS_ENABLED === 'true'
  }

  static get CACHE_ENABLED (): boolean {
    return process.env.CACHE_ENABLED === 'true'
  }

  // SERVICE_IRANGO_PAYMENT_API="http://127.0.0.1:3002"
  static get SERVICE_IRANGO_PAYMENT_API () {
    return process.env.SERVICE_IRANGO_PAYMENT_API || 'http://localhost:3002'
  }

  // SERVICE_IRANGO_COOK_API="http://127.0.0.1:3003"
  static get SERVICE_IRANGO_COOK_API () {
    return process.env.SERVICE_IRANGO_COOK_API || 'http://localhost:3003'
  }

  static get START_COOK_QUEUE () {
    return process.env.START_COOK_QUEUE || 'fiap-irango-order_cooking-started_dev'
  }

  static get FINISH_COOK_QUEUE () {
    return process.env.START_FINISH_QUEUE || 'fiap-irango-order_cooking-finished_dev'
  }

  static get CONFIRM_PAYMENT_QUEUE () {
    return process.env.CONFIRM_PAYMENT_QUEUE || 'fiap-irango-order_payment-confirmed_dev'
  }

  static get URL_QUEUE () {
    return process.env.URL_QUEUE || 'fiap-irango-order_cooking-finished_dev'
  }


  static get URL_QUEUE_START_COOK_QUEUE () {
    return process.env.URL_QUEUE_START_COOK_QUEUE || 'fiap-irango-order_cooking-finished_dev'
  }


  static get URL_QUEUE_FINISH_COOK_QUEUE () {
    return process.env.URL_QUEUE_FINISH_COOK_QUEUE || 'fiap-irango-order_cooking-finished_dev'
  }

  static get AWS_REGION () {
    return process.env.AWS_REGION || 'http://localhost:3003'
  }
}
