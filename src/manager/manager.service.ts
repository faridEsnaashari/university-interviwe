import { Injectable } from '@nestjs/common';
import { ManagerRepository } from './entities/manager.repository';
import { CreateManagerDto } from './dtos/create-manager.dto';
import { Manager } from './entities/manager.entity';
import { UpdateManagerDto } from './dtos/update-manager.dto';

@Injectable()
export class ManagerService {
  constructor(private managerRepository: ManagerRepository) {}

  async createManager(createManagerDto: CreateManagerDto): Promise<Manager> {
    return this.managerRepository.create(createManagerDto);
  }

  async updateManager(updateManagerDto: UpdateManagerDto, id: number) {
    return this.managerRepository.updateOneById(updateManagerDto, id);
  }
}
