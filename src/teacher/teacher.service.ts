import { Injectable } from '@nestjs/common';
import { TeacherRepository } from './entities/repositories/teacher.repository';
import { CreateTeacherDto } from './dtos/create-teacher.dto';
import { Teacher } from './entities/teacher.entity';
import { UpdateTeacherDto } from './dtos/update-teacher.dto';
import { FindAllTeacherDto } from './dtos/find-all-teacher.dto';
import { Paginated } from 'src/common/types/pagination.type';
import { jsonToXlsx } from 'src/common/file/xlsx.logic';

@Injectable()
export class TeacherService {
  constructor(private teacherRepository: TeacherRepository) {}

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return this.teacherRepository.create(createTeacherDto);
  }

  async updateTeacher(updateTeacherDto: UpdateTeacherDto, id: number) {
    return this.teacherRepository.updateOneById(updateTeacherDto, id);
  }

  async findOneTeacher(id: number) {
    return this.teacherRepository.findOneById(id);
  }

  async findAllTeacher(query: FindAllTeacherDto): Promise<Paginated<Teacher>> {
    const { limit, page, ...where } = query;
    return this.teacherRepository.pagination({
      where,
      limit: +limit,
      offset: +page - 1,
    });
  }

  async exportAllTeacher(query: FindAllTeacherDto): Promise<string> {
    const data = await this.findAllTeacher(query);
    const path = await jsonToXlsx(data.rows);

    if (!path) {
      throw new Error();
    }

    return path;
  }
}
