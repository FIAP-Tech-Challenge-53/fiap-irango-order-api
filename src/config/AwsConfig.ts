import { Environment as envs } from '@/infra/web/nestjs/environment'

interface AwsConfig {
  region: string
  endpoint?: string
  credentials: {
    accessKeyId: string
    secretAccessKey: string
  }
}

const localConfig = {
  region: envs.AWS_REGION,
  endpoint: 'http://localstack:4566',
  credentials: {
    accessKeyId: envs.AWS_ACCESS_KEY_ID,
    secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
  }
}

const cloudConfig = {
  region: envs.AWS_REGION,
  credentials: {
    accessKeyId: envs.AWS_ACCESS_KEY_ID,
    secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
  }
}

export default (envs.IS_DEV_ENV ? localConfig : cloudConfig) as AwsConfig
