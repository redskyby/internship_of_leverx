import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {GoogleStrategy} from "./google.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService , GoogleStrategy],
  exports : [AuthModule]
})
export class AuthModule {}
