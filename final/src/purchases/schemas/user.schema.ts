import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
@Schema({ collection: 'user' })
export class User extends Document {
  @Prop({ type: Number, required: true, unique: true })
  id: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'purchase' }] })
  purchases: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
