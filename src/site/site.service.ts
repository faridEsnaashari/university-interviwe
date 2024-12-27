import { Injectable } from '@nestjs/common';
import { saveUploadedFile } from 'src/common/file/save-file.logic';
import { getFileName } from 'src/common/file/files.logic';
import { UploadedFileRepository } from 'src/uploaded-file/entities/repositories/uploaded-file.repository';
import { UploadedFileTypesEnum } from 'src/uploaded-file/enums/uploaded-file-types.enum';
import { StudentRepository } from 'src/student/entities/repositories/student.repository';

@Injectable()
export class SiteService {
  constructor(
    private uploadedFileRepository: UploadedFileRepository,
    private studentRepository: StudentRepository,
  ) {}

  //  async createSite(createSiteDto: CreateSiteDto): Promise<Site> {
  //    return this.siteRepository.create(createSiteDto);
  //  }

  //  async updateSite(updateSiteDto: UpdateSiteDto, id: number) {
  //    return this.siteRepository.updateOneById(updateSiteDto, id);
  //  }

  async uploadBill(id: number, file: Express.Multer.File) {
    const savedFile = await saveUploadedFile(
      getFileName(file.originalname, id),
      file.buffer,
      'sites-bill',
    );

    await this.uploadedFileRepository.create({
      uploadType: UploadedFileTypesEnum.CV,
      modelId: id,
      modelType: 'sites',
      path: savedFile,
    });
  }

  async uploadCv(id: number, file: Express.Multer.File) {
    const savedFile = await saveUploadedFile(
      getFileName(file.originalname, id),
      file.buffer,
      'sites-cv',
    );

    await this.uploadedFileRepository.create({
      uploadType: UploadedFileTypesEnum.CV,
      modelId: id,
      modelType: 'sites',
      path: savedFile,
    });
  }

  async findOneStudent(id: number) {
    return this.studentRepository.findOneById(id);
  }
}
