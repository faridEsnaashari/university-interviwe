import { Injectable } from '@nestjs/common';
import {
  CreateManager,
  Manager,
  ManagerModel,
  UpdateManager,
} from './manager.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ManagerRepository {
  constructor(
    @InjectModel(ManagerModel)
    private managerModel: typeof ManagerModel,
  ) {}

  async create(manager: CreateManager, raw = true): Promise<Manager> {
    return this.managerModel.create(manager, { raw });
  }

  async updateOneById(
    data: UpdateManager,
    id: Manager['id'],
  ): Promise<undefined> {
    await this.managerModel.update(data, { where: { id } });
  }

  async findOneById(id: Manager['id']): Promise<Manager | null> {
    return this.managerModel.findByPk(id);
  }
}
