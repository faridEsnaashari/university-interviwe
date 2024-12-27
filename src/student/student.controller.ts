import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
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
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('')
  @UseGuards(HasAccessGuard)
  @Permissions([PermissionsEnum.FIND_STUDENT])
  async findAllStudent(
    @Query(new ZodValidationPipe(findAllStudentDtoSchema))
    query: FindAllStudentDto,
  ) {
    return this.studentService.findAllStudent(query);
  }

  @Get('export')
  @UseGuards(HasAccessGuard)
  @Permissions([PermissionsEnum.FIND_STUDENT, PermissionsEnum.EXPORT_STUDENT])
  async exportAllStudent(
    @Query(new ZodValidationPipe(findAllStudentDtoSchema))
    query: FindAllStudentDto,
  ) {
    return this.studentService.exportAllStudent(query);
  }

  @Get(':id')
  @UseGuards(HasAccessGuard)
  @Permissions([PermissionsEnum.FIND_STUDENT])
  async findOneStudent(@Param('id') id: number) {
    return this.studentService.findOneStudent(id);
  }

  @Post('upload-cv')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(HasAccessGuard)
  @Permissions([PermissionsEnum.UPLOAD_CV])
  async uploadCv(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: { user: { id: number } },
  ) {
    return this.studentService.uploadCv(req.user.id, file);
  }

  @Post('upload-bill')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(HasAccessGuard)
  @Permissions([PermissionsEnum.UPLOAD_BILL])
  async uploadBill(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: { user: { id: number } },
  ) {
    return this.studentService.uploadBill(req.user.id, file);
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
  @Permissions([PermissionsEnum.UPDATE_STUDENT])
  async updateStudent(
    @Param('id') id: number,
    @Body(new ZodValidationPipe(updateStudentDtoSchema))
    updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.updateStudent(updateStudentDto, id);
  }
}
