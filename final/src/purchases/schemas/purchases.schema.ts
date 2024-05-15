import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ collection: 'purchase' })
export class Purchase extends Document {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор покупки',
  })
  @Prop({ type: Number, required: true, unique: true })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор покупки',
  })
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @ApiProperty({
    example: 29,
    description: 'Цена покупки',
  })
  @Prop({ type: Number, required: true })
  price: number;

  @ApiProperty({
    example: 1,
    description: 'Количество товаров в покупке',
  })
  @Prop({ type: Number, required: true })
  count: number;

  @ApiProperty({
    example: 'Pink Floyd',
    description: 'Автор или исполнитель',
  })
  @Prop({ type: String, required: true, unique: true })
  author: string;

  @ApiProperty({
    example: 'Classic Rock Album',
    description: 'Описание покупки',
  })
  @Prop({ type: String, required: true, unique: true })
  description: string;

  @ApiProperty({
    example: '1',
    description: 'Идентификатор пользователя, совершившего покупку',
  })
  @Prop({ type: Types.ObjectId, ref: 'user', required: true })
  userId: User;
}

export const PurchasesSchema = SchemaFactory.createForClass(Purchase);
