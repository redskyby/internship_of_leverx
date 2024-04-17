import { forwardRef, Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';
import { likesProvider } from './simple-database/simple-database-of-likes';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [LikesController],
  providers: [LikesService, likesProvider],
  imports: [forwardRef(() => UsersModule), PostsModule, AuthModule],
  exports: [LikesService],
})
export class LikesModule {}
