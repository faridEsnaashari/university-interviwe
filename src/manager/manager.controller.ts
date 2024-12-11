import { Body, Controller, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  CreateManagerDto,
  createManagerDtoSchema,
} from './dtos/create-manager.dto';
import { ManagerService } from './manager.service';
import {
  UpdateManagerDto,
  updateManagerDtoSchema,
} from './dtos/update-manager.dto';

@Controller('manager')
export class ManagerController {
  constructor(private managerService: ManagerService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createManagerDtoSchema))
  async createManager(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.createManager(createManagerDto);
  }

  @Put(':id')
  async updateManager(
    @Param('id') id: number,
    @Body(new ZodValidationPipe(updateManagerDtoSchema))
    updateManagerDto: UpdateManagerDto,
  ) {
    return this.managerService.updateManager(updateManagerDto, id);
  }
}
