import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { StudentService } from './student.service';
import {
  UpdateStudentDto,
  updateStudentDtoSchema,
} from './dtos/update-student.dto';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { HasAccessGuard } from 'src/common/guards/HasAccess.guard';
import { PermissionsEnum } from 'src/auth/enums/permissions.enum';
import {
  FindAllStudentDto,
  findAllStudentDtoSchema,
} from './dtos/find-all-student.dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('')
  @UseGuards(HasAccessGuard)
  @Permissions([PermissionsEnum.FIND_EXPERT])
  async findAllStudent(
    @Query(new ZodValidationPipe(findAllStudentDtoSchema))
    query: FindAllStudentDto,
  ) {
    return this.studentService.findAllStudent(query);
  }

  @Get(':id')
  @UseGuards(HasAccessGuard)
  @Permissions([PermissionsEnum.FIND_EXPERT])
  async findOneStudent(@Param('id') id: number) {
    return this.studentService.findOneStudent(id);
  }

  //  @Post()
  //  @UsePipes(new ZodValidationPipe(createStudentDtoSchema))
  //  @UseGuards(HasAccessGuard)
  //  @Permissions([PermissionsEnum.CREATE_EXPERT])
  //  async createStudent(@Body() createStudentDto: CreateStudentDto) {
  //    return this.studentService.createStudent(createStudentDto);
  //  }
  //
  @Put(':id')
  @UseGuards(HasAccessGuard)
  @Permissions([PermissionsEnum.UPDATE_EXPERT])
  async updateStudent(
    @Param('id') id: number,
    @Body(new ZodValidationPipe(updateStudentDtoSchema))
    updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.updateStudent(updateStudentDto, id);
  }
}
