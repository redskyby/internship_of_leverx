import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { PostsModule } from '../posts/posts.module';
import { LikesModule } from '../likes/likes.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Post } from '../posts/entities/post.entity';
import { Like } from '../likes/entities/like.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User as UserMongo } from '../schemas/user.schema';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User, Post, Like]),
    MongooseModule.forFeature([
      {
        name: UserMongo.name,
        schema: UserSchema,
      },
    ]),
    MailModule,
    PostsModule,
    LikesModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
