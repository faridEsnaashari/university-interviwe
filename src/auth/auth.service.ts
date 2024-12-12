import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginLogic } from './logics/login.logic';
import { ManagerRepository } from 'src/manager/entities/manager.repository';
import { ManagerLoginDto } from './dtos/login.dto';
import { RolesEnum } from './enums/roles.enum';

@Injectable()
export class AuthService {
  constructor(private managerRepo: ManagerRepository) {}

  async loginManager(loginDto: ManagerLoginDto): Promise<{ token: string }> {
    try {
      const manager = await this.managerRepo.findOne({ ...loginDto });
      if (!manager) {
        throw '';
      }

      const token = await loginLogic(
        loginDto.nationalCode,
        loginDto.password,
        RolesEnum.MANAGER,
      );
      return { token };
    } catch {
      throw new UnauthorizedException('username or password incorrect');
    }
  }
}
