import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { AuthService } from './auth.service';
import { ManagerLoginDto, managerLoginDtoSchema } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('manager/login')
  @UsePipes(new ZodValidationPipe(managerLoginDtoSchema))
  async loginManager(@Body() loginManager: ManagerLoginDto) {
    return this.authService.loginManager(loginManager);
  }
}
