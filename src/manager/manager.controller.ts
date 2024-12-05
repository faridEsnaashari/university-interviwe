import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateManagerDto, createManagerDto } from './dtos/create-manager.dto';
import { ManagerService } from './manager.service';

@Controller('manager')
export class ManagerController {
  constructor(private managerService: ManagerService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createManagerDto))
  async createManager(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.createManager(createManagerDto);
  }
}
