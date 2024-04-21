import { forwardRef, Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';
import { Like } from '../likes/entities/like.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { User as UserMongo, UserSchema } from '../schemas/user.schema';
import { Like as LikeMongo, LikeSchema } from '../schemas/like.schema';
import { Post as PostMongo, PostSchema } from '../schemas/post.schema';
import { PostsModule } from '../posts/posts.module';
import { LikesModule } from '../likes/likes.module';

@Module({
  controllers: [TransferController],
  providers: [TransferService],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User, Post, Like]),
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
    PostsModule,
    LikesModule,
  ],
  exports: [TransferService],
})
export class TransferModule {}
