import { Reflector } from '@nestjs/core';
import { PermissionsEnum } from 'src/auth/enums/permissions.enum';
import { RolesEnum } from 'src/auth/enums/roles.enum';

export const RolesAndPermissions = Reflector.createDecorator<{
  roles?: RolesEnum[];
  permissions?: PermissionsEnum[];
}>();
