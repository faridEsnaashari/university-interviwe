import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/ports/database/database.module';
import { PinoModule } from './common/tools/pino/pino.module';
import { ManagerModule } from './manager/manager.module';

@Module({
  imports: [DatabaseModule, PinoModule, ManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
