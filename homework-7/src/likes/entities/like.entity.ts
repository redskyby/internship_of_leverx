import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { LikeCreateInterface } from '../../interfaces/like-create.interface';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

// LikeCreateInterface -  template for creating a like

@Table({ tableName: 'like' })
export class Like extends Model<Like, LikeCreateInterface> {
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
