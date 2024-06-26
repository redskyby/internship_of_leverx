import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [AuthModule, SequelizeModule.forFeature([Post, User])],
  exports: [PostsService],
})
export class PostsModule {}
