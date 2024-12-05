import { Injectable } from '@nestjs/common';
import { CreateOrUpdateManager, Manager, ManagerModel } from './manager.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ManagerRepository {
  constructor(
    @InjectModel(ManagerModel)
    private managerModel: typeof ManagerModel,
  ) {}

  async create(manager: CreateOrUpdateManager, raw = true): Promise<Manager> {
    return this.managerModel.create(manager, { raw });
  }

  async findOneById(id: Manager['id']): Promise<Manager | null> {
    return this.managerModel.findByPk(id);
  }
}
