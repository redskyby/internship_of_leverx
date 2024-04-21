import { forwardRef, Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entities/user.entity';
import { Like } from './entities/like.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeSchema, Like as LikeMongo } from '../schemas/like.schema';
import { User as UserMongo, UserSchema } from '../schemas/user.schema';
import { Post as PostMongo, PostSchema } from '../schemas/post.schema';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports: [
    forwardRef(() => UsersModule),
    PostsModule,
    AuthModule,
    SequelizeModule.forFeature([Post, User, Like]),
    MongooseModule.forFeature([
      {
        name: UserMongo.name,
        schema: UserSchema,
      },
      {
        name: LikeMongo.name,
        schema: LikeSchema,
      },
      {
        name: PostMongo.name,
        schema: PostSchema,
      },
    ]),
  ],
  exports: [LikesService],
})
export class LikesModule {}
