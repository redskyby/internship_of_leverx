import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Post } from '../posts/entities/post.entity';
import { Document } from 'mongoose';

@Schema({ collection: 'user' })
export class User extends Document {
  @Prop({ type: Number, required: true, unique: true })
  id: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: [{ type: 'ObjectId', ref: 'post' }] })
  posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);