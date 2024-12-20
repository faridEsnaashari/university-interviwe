import { Injectable } from '@nestjs/common';
import { StudentRepository } from './entities/repositories/student.repository';
import { Student } from './entities/student.entity';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { FindAllStudentDto } from './dtos/find-all-student.dto';
import { Paginated } from 'src/common/types/pagination.type';

@Injectable()
export class StudentService {
  constructor(private studentRepository: StudentRepository) {}

  //  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
  //    return this.studentRepository.create(createStudentDto);
  //  }

  async updateStudent(updateStudentDto: UpdateStudentDto, id: number) {
    return this.studentRepository.updateOneById(updateStudentDto, id);
  }

  async findOneStudent(id: number) {
    return this.studentRepository.findOneById(id);
  }

  async findAllStudent(query: FindAllStudentDto): Promise<Paginated<Student>> {
    const { limit, page, ...where } = query;
    return this.studentRepository.pagination({
      where,
      limit: +limit,
      offset: +page - 1,
    });
  }
}
