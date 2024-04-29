import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import {TelegramController} from "./telegram.controller";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [TelegramService],
  controllers : [TelegramController],
  imports : [AuthModule],
  exports : [TelegramService]
})
export class TelegramModule {}
