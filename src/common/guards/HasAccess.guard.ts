import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { authenticateLogic, getToken } from 'src/auth/logics/auth.logic';
import { ManagerRepository } from 'src/manager/entities/manager.repository';
import { RolesAndPermissions } from '../decorators/roles-and-permissions.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class HasAccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private managerRepo: ManagerRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rolesAndPermissions = this.reflector.get(
      RolesAndPermissions,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const token = getToken(request.headers);
    if (!token) {
      return false;
    }

    const user = await authenticateLogic(
      token,
      {
        getManager: async (userObj) => this.managerRepo.findOne(userObj),
      },
      rolesAndPermissions?.roles,
    );

    if (!user) {
      return false;
    }

    request['user'] = user.user;
    request['userRole'] = user.role;

    return true;
  }
}
