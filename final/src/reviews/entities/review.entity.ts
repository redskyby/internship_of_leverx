import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { ReviewCreateInterface } from '../../interfaces/review-create.interface';
import { Vinyl } from '../../vinyls/entities/vinyl.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'review' })
export class Review extends Model<Review, ReviewCreateInterface> {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор отзыва',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ApiProperty({
    example: 5,
    description: 'Оценка отзыва',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  review: number;

  @ApiProperty({
    example: 1,
    description: 'ID винила, к которому относится отзыв',
  })
  @ForeignKey(() => Vinyl)
  @Column({ type: DataType.INTEGER, allowNull: false })
  vinylId: number;

  @ApiProperty({
    example: 1,
    description: 'ID пользователя, который оставил отзыв',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => Vinyl)
  vinyl: Vinyl;

  @BelongsTo(() => User)
  user: User;
}
