import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './ports/database/database.module';
import { PinoModule } from './tools/pino/pino.module';

@Module({
  imports: [DatabaseModule, PinoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
