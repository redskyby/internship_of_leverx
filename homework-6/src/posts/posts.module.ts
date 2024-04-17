import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postsProvider } from './simple-database/simple-database-of-posts';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService, postsProvider],
  imports: [AuthModule, SequelizeModule.forFeature([Post, User])],
  exports: [PostsService, postsProvider],
})
export class PostsModule {}
