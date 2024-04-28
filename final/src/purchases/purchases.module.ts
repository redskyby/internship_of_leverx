import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User as UserMongo } from './schemas/user.schema';
import {
  PurchasesSchema,
  Purchase as PurchaseMongo,
} from './schemas/purchases.schema';

@Module({
  controllers: [PurchasesController],
  providers: [PurchasesService],
  imports: [
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
  ],
  exports: [PurchasesService],
})
export class PurchasesModule {}
