import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
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
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { HasAccessGuard } from 'src/common/guards/HasAccess.guard';
import { PermissionsEnum } from 'src/auth/enums/permissions.enum';

@Controller('manager')
export class ManagerController {
  constructor(private managerService: ManagerService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createManagerDtoSchema))
  @UseGuards(HasAccessGuard)
  @Permissions([PermissionsEnum.CREATE_MANAGER])
  async createManager(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.createManager(createManagerDto);
  }

  @Put(':id')
  @UseGuards(HasAccessGuard)
  @Permissions([PermissionsEnum.UPDATE_MANAGER])
  async updateManager(
    @Param('id') id: number,
    @Body(new ZodValidationPipe(updateManagerDtoSchema))
    updateManagerDto: UpdateManagerDto,
  ) {
    return this.managerService.updateManager(updateManagerDto, id);
  }
}
