import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { LikeCreate } from './like-create';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

// LikeCreate - шаблон для создания пользователя

@Table({ tableName: 'like' })
export class Like extends Model<Like, LikeCreate> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Post)
  @Column
  postId: number;

  @BelongsTo(() => Post)
  post: Post;
}
