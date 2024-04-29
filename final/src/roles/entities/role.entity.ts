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
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'role' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор роли',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'admin',
    description: 'Имя роли',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
