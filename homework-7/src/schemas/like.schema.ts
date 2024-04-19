import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'like' })
export class Like extends Document {
  @Prop({ type: Number, required: true, unique: true })
  id: number;

  @Prop({ type: 'ObjectId', ref: 'user', required: true })
  userId: string;

  @Prop({ type: 'ObjectId', ref: 'post', required: true })
  postId: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
