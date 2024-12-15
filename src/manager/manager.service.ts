import { Injectable } from '@nestjs/common';
import { ManagerRepository } from './entities/repositories/manager.repository';
import { CreateManagerDto } from './dtos/create-manager.dto';
import { Manager } from './entities/manager.entity';
import { UpdateManagerDto } from './dtos/update-manager.dto';
import { UserHasPermissionRepository } from 'src/auth/entities/repositories/user-has-permissions.repository';
import { PermissionsEnum } from 'src/auth/enums/permissions.enum';

@Injectable()
export class ManagerService {
  constructor(
    private managerRepository: ManagerRepository,
    private userHasPermissionRepository: UserHasPermissionRepository,
  ) {}

  async createManager(createManagerDto: CreateManagerDto): Promise<Manager> {
    const manager = await this.managerRepository.create(createManagerDto);
    await this.userHasPermissionRepository.createBulk([
      {
        permission: PermissionsEnum.ALL,
        modelType: 'managers',
        modelId: manager.id,
      },
    ]);

    return manager;
  }

  async updateManager(updateManagerDto: UpdateManagerDto, id: number) {
    return this.managerRepository.updateOneById(updateManagerDto, id);
  }
}
