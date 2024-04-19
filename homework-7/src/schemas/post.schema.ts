import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'post' })
export class Post extends Document {
  @Prop({ type: Number, required: true, unique: true })
  id: number;
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Number, required: true })
  userId: number;

  @Prop({ type: [{ type: 'ObjectId', ref: 'user' }] })
  authorName: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
