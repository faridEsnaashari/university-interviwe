import * as jwt from 'jsonwebtoken';
import { authConfigs } from '../auth.login';
import { RolesEnum } from '../enums/roles.enum';

export async function loginLogic(
  username: string,
  password: string,
  role: RolesEnum,
): Promise<string> {
  return new Promise((res, rej) => {
    jwt.sign(
      { username, password, role },
      authConfigs.jwtSecretKey,
      (err: Error | null, encoded: string | undefined) => {
        if (err || !encoded) {
          rej(err);
          return;
        }

        res(encoded);
      },
    );
  });
}
