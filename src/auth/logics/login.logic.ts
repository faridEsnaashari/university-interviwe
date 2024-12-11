import * as jwt from 'jsonwebtoken';
import { authConfigs } from '../auth.login';

export async function loginLogic(
  username: string,
  password: string,
): Promise<string> {
  return new Promise((res, rej) => {
    jwt.sign(
      { username, password },
      authConfigs.jwtSecretKey,
      null,
      (err, encoded) => {
        if (err) rej(err);

        res(encoded);
      },
    );
  });
}
