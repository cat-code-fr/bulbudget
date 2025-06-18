import * as fs from 'fs'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import { validateAllEnvs } from './configuration/env.config';

const env = validateAllEnvs()

async function bootstrap() {
  const httpsOptions = env.ssl.HTTPS ? { httpsOptions: { cert: fs.readFileSync(env.ssl.SSL_CERT), key: fs.readFileSync(env.ssl.SSL_KEY) } } : undefined
  const app = await NestFactory.create(AppModule, httpsOptions);
  await app.listen(env.app.SERVER_PORT ?? 3000);
}

bootstrap();
