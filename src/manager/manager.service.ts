import { BadRequestException, Injectable } from '@nestjs/common';
import { ManagerRepository } from './entities/repositories/manager.repository';
import { CreateManagerDto } from './dtos/create-manager.dto';
import { Manager } from './entities/manager.entity';
import { UpdateManagerDto } from './dtos/update-manager.dto';
import { FindAllManagerDto } from './dtos/find-all-manager.dto';
import { Paginated } from 'src/common/types/pagination.type';
import { saveUploadedFile } from 'src/common/file/save-file.logic';
import { jsonToXlsx, xlsxToJson } from 'src/common/file/xlsx.logic';
import { mapAdmissionXlsxToStudent } from './logics/map-admission-xlsx-to-student.logic';
import { StudentRepository } from 'src/student/entities/repositories/student.repository';
import { createMultipleStudent } from 'src/student/logics/create-multiple-student.logic';

@Injectable()
export class ManagerService {
  constructor(
    private managerRepository: ManagerRepository,
    private studentRepository: StudentRepository,
  ) {}

  async createManager(createManagerDto: CreateManagerDto): Promise<Manager> {
    return this.managerRepository.create(createManagerDto);
  }

  async uploadAdmission(file: Express.Multer.File) {
    const savedFile = await saveUploadedFile(
      file.originalname,
      file.buffer,
      'manager-files',
    );

    const data = xlsxToJson(savedFile);

    if (!data) {
      throw new BadRequestException('xlsx file is invalid');
    }

    const mappedStudents = mapAdmissionXlsxToStudent(
      data as Record<string, number | undefined | string>[],
    );

    if (!mappedStudents) {
      throw new BadRequestException('unknown error');
    }

    const duplicated = await createMultipleStudent(
      mappedStudents.students,
      (s) => this.studentRepository.create(s),
    );

    return {
      wrongFormats: [...duplicated, ...mappedStudents.wrongFormats],
    };
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

  async exportAllManager(query: FindAllManagerDto): Promise<string> {
    const data = await this.findAllManager(query);
    const path = await jsonToXlsx(data.rows);

    if (!path) {
      throw new Error();
    }

    return path;
  }
}
