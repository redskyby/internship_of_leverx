import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { usersProvider } from './simpleDatabase/simpeDatabaseOfUsers';

@Module({
  controllers: [UsersController],
  providers: [UsersService, usersProvider],
  imports: [forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
