import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
  imports: [AuthModule, MailModule],
})
export class StripeModule {}
