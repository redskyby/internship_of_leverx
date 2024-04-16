import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postsProvider } from './simple-database/simple-database-of-posts';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService, postsProvider],
  imports: [AuthModule],
  exports: [PostsService],
})
export class PostsModule {}
