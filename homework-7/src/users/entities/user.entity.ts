import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { UserCreate } from './user-create';
import { Post } from '../../posts/entities/post.entity';

// UserCreate - шаблон для создания пользователя

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreate> {
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
