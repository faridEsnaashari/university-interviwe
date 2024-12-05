import { Optional } from 'sequelize';
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

export type Manager = {
  id: number;
  firstName: string;
  lastName: string;
  phone?: string;
  nationalCode?: string;
  birthOfDate?: string;
  fatherName?: string;
  gender: 'MALE' | 'FEMALE';
  createdAt: Date;
  updatedAt: Date;
};

export type CreateOrUpdateManager = {
  firstName: string;
  lastName: string;
  phone?: string;
  nationalCode?: string;
  birthOfDate?: string;
  fatherName?: string;
  gender: 'MALE' | 'FEMALE';
  createdAt?: Date;
  updatedAt?: Date;
};

@Table({ tableName: 'managers', underscored: true })
export class ManagerModel
  extends Model<Manager, Optional<Manager, 'id'>>
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
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
