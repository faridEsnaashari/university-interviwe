import { mkdirSync, existsSync, writeFile } from 'fs';
import * as path from 'node:path';

export function saveFile(
  fileName: string,
  file: NodeJS.ArrayBufferView,
  filePath = '',
): Promise<string> {
  const pth = path.resolve(`./uploads/${filePath}`);
  const pthWithFilename = path.resolve(pth, `${Date.now()}-${fileName}`);
  if (!existsSync(pth)) {
    mkdirSync(pth, { recursive: true });
  }

  return new Promise((res, rej) => {
    writeFile(pthWithFilename, file, (err) => {
      if (err) {
        rej(err);
        return;
      }

      res(pthWithFilename);
    });
  });
}
