import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { AuthModule } from '../auth/auth.module';
import { VinylsModule } from '../vinyls/vinyls.module';

@Module({
  providers: [TelegramService],
  controllers: [TelegramController],
  imports: [AuthModule, VinylsModule],
  exports: [TelegramService],
})
export class TelegramModule {}
