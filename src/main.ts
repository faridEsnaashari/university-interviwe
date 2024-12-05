import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { appConfigs } from './app.configs';
import { Logger } from 'nestjs-pino';
import { Logger as L } from './tools/pino/logger.tool';
import { UncaughtExceptionFilter } from './filters/uncaught-exceptions.filter';
import { HttpExceptionFilter } from './filters/http-exceptions.filter';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  app.useGlobalFilters(
    new UncaughtExceptionFilter(),
    new HttpExceptionFilter(),
  );

  const logger = new L('bootstrap');
  await app.listen(appConfigs.appPort, () =>
    logger.log({
      key: 'MAIN',
      data: { msg: 'app started on port ' + appConfigs.appPort },
    }),
  );
  return;
}
bootstrap();
