import { Injectable } from '@nestjs/common';
import { ExpertRepository } from './entities/repositories/expert.repository';
import { CreateExpertDto } from './dtos/create-expert.dto';
import { Expert } from './entities/expert.entity';
import { UpdateExpertDto } from './dtos/update-expert.dto';
import { UserHasPermissionRepository } from 'src/auth/entities/repositories/user-has-permissions.repository';
import { FindAllExpertDto } from './dtos/find-all-expert.dto';
import { Paginated } from 'src/common/types/pagination.type';

@Injectable()
export class ExpertService {
  constructor(
    private expertRepository: ExpertRepository,
    private userHasPermissionRepository: UserHasPermissionRepository,
  ) {}

  async createExpert(createExpertDto: CreateExpertDto): Promise<Expert> {
    return this.expertRepository.create(createExpertDto);
  }

  async updateExpert(updateExpertDto: UpdateExpertDto, id: number) {
    return this.expertRepository.updateOneById(updateExpertDto, id);
  }

  async findOneExpert(id: number) {
    return this.expertRepository.findOneById(id);
  }

  async findAllExpert(query: FindAllExpertDto): Promise<Paginated<Expert>> {
    const { limit, page, ...where } = query;
    return this.expertRepository.pagination({
      where,
      limit: +limit,
      offset: +page - 1,
    });
  }
}
