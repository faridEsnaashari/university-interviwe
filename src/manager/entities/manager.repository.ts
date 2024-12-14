import { Injectable } from '@nestjs/common';
import {
  CreateManager,
  Manager,
  ManagerModel,
  UpdateManager,
} from './manager.entity';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';

@Injectable()
export class ManagerRepository {
  constructor(
    @InjectModel(ManagerModel)
    private managerModel: typeof ManagerModel,
  ) {}

  async create(manager: CreateManager, raw = true): Promise<Manager> {
    const result = await this.managerModel.create(manager);

    if (raw) {
      return JSON.parse(JSON.stringify(result));
    }

    return result;
  }

  async findOne(
    conditions: FindOptions | UpdateManager,
    raw = true,
  ): Promise<Manager | null> {
    const result = await this.managerModel.findOne({
      where: !('where' in conditions)
        ? (conditions as UpdateManager)
        : undefined,
      ...conditions,
    });

    if (raw) {
      return JSON.parse(JSON.stringify(result));
    }

    return result;
  }

  async updateOneById(
    data: UpdateManager,
    id: Manager['id'],
  ): Promise<undefined> {
    await this.managerModel.update(data, { where: { id } });
  }

  async findOneById(id: Manager['id'], raw = true): Promise<Manager | null> {
    const result = await this.managerModel.findByPk(id);

    if (raw) {
      return JSON.parse(JSON.stringify(result));
    }

    return result;
  }
}
