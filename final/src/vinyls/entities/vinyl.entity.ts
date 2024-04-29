import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { VinylCreateInterface } from '../../interfaces/vinyl-create.interface';
import { Review } from '../../reviews/entities/review.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'vinyl' })
export class Vinyl extends Model<Vinyl, VinylCreateInterface> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ApiProperty({
    example: 'Dark Side of the Moon',
    description: 'Название винила',
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @ApiProperty({ example: 29.99, description: 'Цена винила' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @ApiProperty({ example: 'Pink Floyd', description: 'Автор или исполнитель' })
  @Column({ type: DataType.STRING, allowNull: false })
  author: string;

  @ApiProperty({
    example: 'Classic Rock Album',
    description: 'Описание винила',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @HasMany(() => Review)
  reviews: Review[];
}
