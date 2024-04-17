import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { PostCreate } from './post-create';
import { User } from '../../users/entities/user.entity';

// PostCreate - шаблон для создания пользователя

@Table({ tableName: 'post' })
export class Post extends Model<Post, PostCreate> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId : number;

  @BelongsTo(() => User)
  authorName: User;
}
