import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ManagerController } from './manager.controller';
import { ManagerModel } from './entities/manager.entity';
import { ManagerService } from './manager.service';
import { ManagerRepository } from './entities/manager.repository';

@Module({
  imports: [SequelizeModule.forFeature([ManagerModel])],
  providers: [ManagerService, ManagerRepository],
  controllers: [ManagerController],
})
export class ManagerModule {}