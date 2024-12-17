import { BadRequestException, Injectable } from '@nestjs/common';
import { ManagerRepository } from './entities/repositories/manager.repository';
import { CreateManagerDto } from './dtos/create-manager.dto';
import { Manager } from './entities/manager.entity';
import { UpdateManagerDto } from './dtos/update-manager.dto';
import { UserHasPermissionRepository } from 'src/auth/entities/repositories/user-has-permissions.repository';
import { PermissionsEnum } from 'src/auth/enums/permissions.enum';
import { FindAllManagerDto } from './dtos/find-all-manager.dto';
import { Paginated } from 'src/common/types/pagination.type';
import { saveFile } from 'src/common/file/save-file.logic';
import { xlsxToJson } from 'src/common/file/xlsx-to-json.logic';

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

  async uploadAdmission(file: Express.Multer.File) {
    const savedFile = await saveFile(
      file.originalname,
      file.buffer,
      'manager-files',
    );

    const data = xlsxToJson(savedFile);

    if (!data) {
      throw new BadRequestException('xlsx file is invalid');
    }
  }

  async updateManager(updateManagerDto: UpdateManagerDto, id: number) {
    return this.managerRepository.updateOneById(updateManagerDto, id);
  }

  async findOneManager(id: number) {
    return this.managerRepository.findOneById(id);
  }

  async findAllManager(query: FindAllManagerDto): Promise<Paginated<Manager>> {
    const { limit, page, ...where } = query;
    return this.managerRepository.pagination({
      where,
      limit: +limit,
      offset: +page - 1,
    });
  }
}
