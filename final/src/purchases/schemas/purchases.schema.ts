import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ collection: 'purchase' })
export class Purchase extends Document {
  @Prop({ type: Number, required: true, unique: true })
  id: number;
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;
  @Prop({ type: String, required: true, unique: true })
  author: string;
  @Prop({ type: String, required: true, unique: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'user', required: true })
  userId: User;
}

export const PurchasesSchema = SchemaFactory.createForClass(Purchase);
