import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postsProvider } from './simpleDatabase/simpleDatabaseOfPosts';

@Module({
  controllers: [PostsController],
  providers: [PostsService, postsProvider],
})
export class PostsModule {}
