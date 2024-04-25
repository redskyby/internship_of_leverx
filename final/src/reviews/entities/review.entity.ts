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

@Table({ tableName: 'review' })
export class Review extends Model<Review, ReviewCreateInterface> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  review: number;

  @ForeignKey(() => Vinyl)
  @Column({ type: DataType.INTEGER, allowNull: false })
  vinylId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => Vinyl)
  vinyl: Vinyl;

  @BelongsTo(() => User)
  user: User;
}
