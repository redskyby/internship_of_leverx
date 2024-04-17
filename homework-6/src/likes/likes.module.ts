import { forwardRef, Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';
import { likesProvider } from './simple-database/simple-database-of-likes';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entities/user.entity';
import { Like } from './entities/like.entity';

@Module({
  controllers: [LikesController],
  providers: [LikesService, likesProvider],
  imports: [
    forwardRef(() => UsersModule),
    PostsModule,
    AuthModule,
    SequelizeModule.forFeature([Post, User, Like]),
  ],
  exports: [LikesService],
})
export class LikesModule {}
