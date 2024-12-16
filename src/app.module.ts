import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/ports/database/database.module';
import { PinoModule } from './common/tools/pino/pino.module';
import { ManagerModule } from './manager/manager.module';
import { AuthModule } from './auth/auth.module';
import { ExpertModule } from './expert/expert.module';

@Module({
  imports: [
    DatabaseModule,
    PinoModule,
    ManagerModule,
    AuthModule,
    ExpertModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
