import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ collection: 'post' })
export class Post extends Document {
  @Prop({ type: Number, required: true, unique: true })
  id: number;
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'user', required: true })
  userId: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
