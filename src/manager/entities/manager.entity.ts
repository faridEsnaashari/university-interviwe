import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { CreateEntity, UpdateEntity } from 'src/common/types/entity.type';

export type Manager = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  nationalCode: string;
  birthOfDate: string;
  fatherName: string;
  gender: 'MALE' | 'FEMALE';
  createdAt: string;
  updatedAt: string;
};

export type CreateManager = CreateEntity<Manager>;
export type UpdateManager = UpdateEntity<Manager>;

@Table({ tableName: 'managers', underscored: true })
export class ManagerModel
  extends Model<Manager, CreateManager>
  implements Manager
{
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Default('admin')
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Default('admin')
  @Column
  lastName: string;

  @AllowNull(true)
  @Column
  fatherName: string;

  @AllowNull(true)
  @Column
  phone: string;

  @AllowNull(true)
  @Column(DataType.DATEONLY)
  birthOfDate: string;

  @AllowNull(true)
  @Column
  nationalCode: string;

  @AllowNull(false)
  @Default('MALE')
  @Column
  gender: 'MALE' | 'FEMALE';

  @CreatedAt
  @Column(DataType.DATE)
  createdAt: string;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt: string;
}
