import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
@Schema({ collection: 'user' })
export class User extends Document {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор пользователя',
  })
  @Prop({ type: Number, required: true, unique: true })
  id: number;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
  })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({
    description: 'Фамилия пользователя',
    example: 'Иванов',
  })
  @Prop({ type: String, required: true })
  lastName: string;

  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'ivan.ivanov@example.com',
    uniqueItems: true,
  })
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @ApiProperty({
    description: 'Массив идентификаторов покупок, связанных с пользователем',
    type: [String],
    example: ['60d0fe4f5311236168a109ca'],
  })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'purchase' }] })
  purchases: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
