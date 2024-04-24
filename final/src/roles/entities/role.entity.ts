import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { RoleCreationAttrs } from '../../interfaces/role-create.interface';
import { User } from '../../users/entities/user.entity';
import { UserRoles } from './role-user.entity';

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
