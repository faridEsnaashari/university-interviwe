import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ManagerModule } from 'src/manager/manager.module';

@Module({
  imports: [ManagerModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
