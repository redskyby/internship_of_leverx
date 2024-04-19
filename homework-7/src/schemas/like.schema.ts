import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';
import { Post } from './post.schema';

@Schema({ collection: 'like' })
export class Like extends Document {
  @Prop({ type: Number, required: true, unique: true })
  id: number;

  @Prop({ type: 'ObjectId', ref: 'user', required: true })
  userId: User;

  @Prop({ type: 'ObjectId', ref: 'post', required: true })
  postId: Post;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
