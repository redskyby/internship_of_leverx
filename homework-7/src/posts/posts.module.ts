import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Post as PostMongo, PostSchema } from '../schemas/post.schema';
import { User as UserMongo, UserSchema } from '../schemas/user.schema';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([Post, User]),
    MongooseModule.forFeature([
      {
        name: UserMongo.name,
        schema: UserSchema,
      },
      {
        name: PostMongo.name,
        schema: PostSchema,
      },
    ]),
  ],
  exports: [PostsService],
})
export class PostsModule {}
