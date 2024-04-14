import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postsProvider } from './simpleDatabase/simpleDatabaseOfPosts';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService, postsProvider],
  imports: [AuthModule],
})
export class PostsModule {}
