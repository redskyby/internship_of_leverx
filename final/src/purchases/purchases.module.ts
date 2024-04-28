import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User as UserMongo } from './schemas/user.schema';
import {
  PurchasesSchema,
  Purchase as PurchaseMongo,
} from './schemas/purchases.schema';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vinyl } from '../vinyls/entities/vinyl.entity';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [PurchasesController],
  providers: [PurchasesService],
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
  ],
  exports: [PurchasesService],
})
export class PurchasesModule {}
