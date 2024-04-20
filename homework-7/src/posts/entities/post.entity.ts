import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { PostCreateInterface } from '../../interfaces/post-create.interface';
import { User } from '../../users/entities/user.entity';

// PostCreateInterface -  template for creating a post

@Table({ tableName: 'post' })
export class Post extends Model<Post, PostCreateInterface> {
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
  userId: number;

  @BelongsTo(() => User)
  authorName: User;
}
