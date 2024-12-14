import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ManagerModule } from 'src/manager/manager.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserHasPermissionModel } from './entities/user-has-permission.entity';

@Module({
  imports: [
    ManagerModule,
    SequelizeModule.forFeature([UserHasPermissionModel]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
