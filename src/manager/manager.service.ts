import { Injectable } from '@nestjs/common';
import { ManagerRepository } from './entities/manager.repository';
import { CreateManagerDto } from './dtos/create-manager.dto';
import { Manager } from './entities/manager.entity';

@Injectable()
export class ManagerService {
  constructor(private managerRepository: ManagerRepository) {}

  async createManager(createManagerDto: CreateManagerDto): Promise<Manager> {
    const manager = { ...createManagerDto };
    return this.managerRepository.create(manager);
  }
}
