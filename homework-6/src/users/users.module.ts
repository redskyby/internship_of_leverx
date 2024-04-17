import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { usersProvider } from './simpleDatabase/simpe-database-of-users';
import { MailModule } from '../mail/mail.module';
import { PostsModule } from '../posts/posts.module';
import { LikesModule } from '../likes/likes.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, usersProvider],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User]),
    MailModule,
    PostsModule,
    LikesModule,
  ],
  exports: [UsersService, usersProvider],
})
export class UsersModule {}
