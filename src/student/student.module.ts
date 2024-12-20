import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentController } from './student.controller';
import { StudentModel } from './entities/student.entity';
import { StudentService } from './student.service';
import { StudentRepository } from './entities/repositories/student.repository';
import { AuthModule } from 'src/auth/auth.module';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([StudentModel]), AuthModule],
  providers: [StudentService, StudentRepository],
  controllers: [StudentController],
  exports: [StudentRepository],
})
export class StudentModule {}
