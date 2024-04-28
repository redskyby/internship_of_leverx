import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { PurchasesModule } from '../purchases/purchases.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vinyl } from '../vinyls/entities/vinyl.entity';
import { User } from '../users/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User as UserMongo,
  UserSchema,
} from '../purchases/schemas/user.schema';
import {
  Purchase as PurchaseMongo,
  PurchasesSchema,
} from '../purchases/schemas/purchases.schema';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
  imports: [
    SequelizeModule.forFeature([Vinyl, User]),
    MongooseModule.forFeature([
      {
        name: UserMongo.name,
        schema: UserSchema,
      },
      {
        name: PurchaseMongo.name,
        schema: PurchasesSchema,
      },
    ]),
    AuthModule,
    MailModule,
    PurchasesModule,
  ],
})
export class StripeModule {}
