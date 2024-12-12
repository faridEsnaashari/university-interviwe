import * as jwt from 'jsonwebtoken';
import { authConfigs } from '../auth.login';
import { Manager } from 'src/manager/entities/manager.entity';
import { RolesEnum } from '../enums/roles.enum';

export async function authenticateLogic(
  token: string,
  getUserFns: {
    getManager: (userObj: {
      nationalCode: string;
      password: string;
    }) => Promise<Manager | null>;
  },
  roles?: RolesEnum[],
): Promise<{ user: Manager; role: RolesEnum.MANAGER } | false> {
  const userObj = jwt.verify(token, authConfigs.jwtSecretKey);

  if (
    typeof userObj === 'string' ||
    typeof userObj.username !== 'string' ||
    typeof userObj.password !== 'string' ||
    typeof userObj.role !== 'string'
  ) {
    return false;
  }

  if (roles && !roles.find((r) => userObj.role === r)) {
    return false;
  }

  if (userObj.role === RolesEnum.MANAGER) {
    const user = await authenticateModelLogic<Manager>(
      { username: userObj.username, password: userObj.password },
      getUserFns.getManager,
    );

    if (!user) {
      return false;
    }

    return { user, role: RolesEnum.MANAGER };
  }

  return false;
}

async function authenticateModelLogic<T extends Manager>(
  userObj: { username: string; password: string },
  getUser: (userObj: {
    nationalCode: string;
    password: string;
  }) => Promise<T | null>,
): Promise<T | false> {
  const user = await getUser({
    nationalCode: userObj.username,
    password: userObj.password,
  });

  if (!user) {
    return false;
  }

  return user;
}

export function getToken(headerObject: {
  authorization?: string;
}): string | false {
  if (!headerObject.authorization) {
    return false;
  }

  const token = headerObject.authorization.split('Bearer ')[1];
  if (token.length < 1) {
    return false;
  }

  return token;
}
