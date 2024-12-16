import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { AuthService } from './auth.service';
import {
  ExpertLoginDto,
  ManagerLoginDto,
  TeachertLoginDto,
  expertLoginDtoSchema,
  managerLoginDtoSchema,
  teacherLoginDtoSchema,
} from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('manager/login')
  @UsePipes(new ZodValidationPipe(managerLoginDtoSchema))
  async loginManager(@Body() login: ManagerLoginDto) {
    return this.authService.loginManager(login);
  }

  @Post('expert/login')
  @UsePipes(new ZodValidationPipe(expertLoginDtoSchema))
  async loginExpert(@Body() login: ExpertLoginDto) {
    return this.authService.loginExpert(login);
  }

  @Post('teacher/login')
  @UsePipes(new ZodValidationPipe(teacherLoginDtoSchema))
  async loginTeacher(@Body() login: TeachertLoginDto) {
    return this.authService.loginTeacher(login);
  }
}
