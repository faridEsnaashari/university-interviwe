import { appConfigs } from 'src/app.configs';
import { getRandomNumber } from 'src/common/tools/random.tool';

export function createRandomFileName(id: number) {
  return `${id}-${Date.now()}-${getRandomNumber()}`;
}

export function getFileName(originFileName: string, id: number = 0) {
  return `${createRandomFileName(id)}.${originFileName.split('.').reverse()[0]}`;
}

export function getFileUrl(fileName: string) {
  return `${appConfigs.appBaseUrl}${fileName.split('public').reverse()[0]}`;
}
