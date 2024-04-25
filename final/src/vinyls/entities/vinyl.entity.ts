import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { VinylCreateInterface } from '../../interfaces/vinyl-create.interface';
import { Review } from '../../reviews/entities/review.entity';

@Table({ tableName: 'vinyl' })
export class Vinyl extends Model<Vinyl, VinylCreateInterface> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;
  @Column({ type: DataType.STRING, allowNull: false})
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;
  @Column({ type: DataType.STRING, allowNull: false })
  author: string;
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @HasMany(() => Review)
  reviews: Review[];
}
