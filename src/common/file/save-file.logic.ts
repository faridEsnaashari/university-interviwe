import { mkdirSync, existsSync, writeFile } from 'fs';
import * as path from 'node:path';

function saveFile(
  fileName: string,
  file: NodeJS.ArrayBufferView,
  filePath = '',
): Promise<string> {
  const pthWithFilename = path.resolve(filePath, `${Date.now()}-${fileName}`);
  if (!existsSync(filePath)) {
    mkdirSync(filePath, { recursive: true });
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

export function saveTempPublicFile(
  fileName: string,
  file: NodeJS.ArrayBufferView,
): Promise<string> {
  return saveFile(fileName, file, path.resolve('./public/', 'temps'));
}

export function saveUploadedFile(
  fileName: string,
  file: NodeJS.ArrayBufferView,
  filePath = '',
) {
  return saveFile(fileName, file, path.resolve('./uploads/', filePath));
}
