import * as xlsx from 'xlsx';
import { Logger } from '../tools/pino/logger.tool';

export function xlsxToJson<T>(filePath: string): T[] | false {
  try {
    const workBook = xlsx.readFile(filePath);

    const sheet = workBook.Sheets[workBook.SheetNames[0]];

    const json = xlsx.utils.sheet_to_json(sheet);

    return json as T[];
  } catch (err) {
    const logger = new Logger('FILE_EXCEPTION');
    logger.error({ key: 'XLSX_TO_JSON_EXCEPTION', data: err });

    return false;
  }
}
