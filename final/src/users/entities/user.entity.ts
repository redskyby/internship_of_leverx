import {
  Column,
  Model,
  Table,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { UserCreateInterface } from '../../interfaces/user-create.interface';
import { Role } from '../../roles/entities/role.entity';
import { UserRoles } from '../../roles/entities/role-user.entity';
import { Review } from '../../reviews/entities/review.entity';

// UserCreateInterface -  template for creating a user

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreateInterface> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Review)
  reviews: Review[];
}
