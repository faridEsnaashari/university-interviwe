import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginLogic } from './logics/login.logic';
import { ManagerRepository } from 'src/manager/entities/manager.repository';
import { ManagerLoginDto } from './dtos/login.dto';
import { RolesEnum } from './enums/roles.enum';
import { UserHasPermissionModel } from './entities/user-has-permission.entity';

@Injectable()
export class AuthService {
  constructor(private managerRepo: ManagerRepository) {}

  async loginManager(loginDto: ManagerLoginDto): Promise<{ token: string }> {
    try {
      const manager = await this.managerRepo.findOne({
        where: { ...loginDto },
        include: [
          {
            model: UserHasPermissionModel,
            as: 'permissions',
          },
        ],
      });

      if (!manager) {
        throw '';
      }

      const token = await loginLogic(
        loginDto.nationalCode,
        loginDto.password,
        manager.permissions?.map((p) => p.permission) || [],
        RolesEnum.MANAGER,
      );
      return { token };
    } catch {
      throw new UnauthorizedException('username or password incorrect');
    }
  }
}
