import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginLogic } from './logics/login.logic';
import { ManagerRepository } from 'src/manager/entities/repositories/manager.repository';
import {
  ExpertLoginDto,
  ManagerLoginDto,
  TeachertLoginDto,
} from './dtos/login.dto';
import { RolesEnum } from './enums/roles.enum';
import {
  UserHasPermission,
  UserHasPermissionModel,
} from './entities/user-has-permission.entity';
import { ExpertRepository } from 'src/expert/entities/repositories/expert.repository';
import { TeacherRepository } from 'src/teacher/entities/repositories/teacher.repository';

@Injectable()
export class AuthService {
  constructor(
    private expertRepo: ExpertRepository,
    private managerRepo: ManagerRepository,
    private teacherRepo: TeacherRepository,
  ) {}

  async loginTeacher(loginDto: TeachertLoginDto): Promise<{ token: string }> {
    try {
      const teacher = await this.teacherRepo.findOne({
        where: { ...loginDto },
        include: [
          {
            model: UserHasPermissionModel,
            as: 'permissions',
          },
        ],
      });

      if (!teacher) {
        throw '';
      }

      const token = await loginLogic(
        loginDto.nationalCode,
        loginDto.password,
        teacher.permissions?.map((p: UserHasPermission) => p.permission) || [],
        RolesEnum.TEACHER,
      );
      return { token };
    } catch {
      throw new UnauthorizedException('username or password incorrect');
    }
  }

  async loginExpert(loginDto: ExpertLoginDto): Promise<{ token: string }> {
    try {
      const expert = await this.expertRepo.findOne({
        where: { ...loginDto },
        include: [
          {
            model: UserHasPermissionModel,
            as: 'permissions',
          },
        ],
      });

      if (!expert) {
        throw '';
      }

      const token = await loginLogic(
        loginDto.nationalCode,
        loginDto.password,
        expert.permissions?.map((p: UserHasPermission) => p.permission) || [],
        RolesEnum.EXPERT,
      );
      return { token };
    } catch {
      throw new UnauthorizedException('username or password incorrect');
    }
  }

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
        manager.permissions?.map((p: UserHasPermission) => p.permission) || [],
        RolesEnum.MANAGER,
      );
      return { token };
    } catch {
      throw new UnauthorizedException('username or password incorrect');
    }
  }
}
