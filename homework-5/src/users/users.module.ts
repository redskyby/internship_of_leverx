import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { usersProvider } from './simpleDatabase/simpeDatabaseOfUsers';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, usersProvider],
  imports: [forwardRef(() => AuthModule), MailModule],
  exports: [UsersService],
})
export class UsersModule {}
