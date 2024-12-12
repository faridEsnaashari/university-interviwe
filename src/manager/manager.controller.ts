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
import { RolesAndPermissions } from 'src/common/decorators/roles-and-permissions.decorator';
import { HasAccessGuard } from 'src/common/guards/HasAccess.guard';
import { RolesEnum } from 'src/auth/enums/roles.enum';

@Controller('manager')
export class ManagerController {
  constructor(private managerService: ManagerService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createManagerDtoSchema))
  @UseGuards(HasAccessGuard)
  @RolesAndPermissions({ roles: [RolesEnum.MANAGER] })
  async createManager(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.createManager(createManagerDto);
  }

  @Put(':id')
  @UseGuards(HasAccessGuard)
  @RolesAndPermissions({ roles: [RolesEnum.MANAGER] })
  async updateManager(
    @Param('id') id: number,
    @Body(new ZodValidationPipe(updateManagerDtoSchema))
    updateManagerDto: UpdateManagerDto,
  ) {
    return this.managerService.updateManager(updateManagerDto, id);
  }
}
