import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { CreateEntity, UpdateEntity } from 'src/common/types/entity.type';
import { PermissionsEnum } from '../enums/permissions.enum';
import { ManagerModel } from 'src/manager/entities/manager.entity';

export type UserHasPermission = {
  id: number;
  modelType: string;
  modelId: number;
  permission: PermissionsEnum;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserHasPermissoin = CreateEntity<UserHasPermission>;
export type UpdateUserHasPermissoin = UpdateEntity<UserHasPermission>;

@Table({ tableName: 'user_has_permissions', underscored: true })
export class UserHasPermissionModel
  extends Model<UserHasPermission, CreateUserHasPermissoin>
  implements UserHasPermission
{
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @AllowNull(false)
  @Column
  modelType!: string;

  @ForeignKey(() => ManagerModel)
  @AllowNull(false)
  @Column
  modelId!: number;

  @AllowNull(false)
  @Column
  permission!: PermissionsEnum;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: string;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: string;
}
