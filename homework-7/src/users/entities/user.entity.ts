import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { UserCreateInterface } from '../../interfaces/user-create.interface';
import { Post } from '../../posts/entities/post.entity';

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

  @HasMany(() => Post)
  posts: Post[];
}
