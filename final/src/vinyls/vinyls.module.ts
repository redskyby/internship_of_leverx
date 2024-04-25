import { Module } from '@nestjs/common';
import { VinylsService } from './vinyls.service';
import { VinylsController } from './vinyls.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vinyl } from './entities/vinyl.entity';
import { Review } from '../reviews/entities/review.entity';

@Module({
  controllers: [VinylsController],
  providers: [VinylsService],
  imports: [SequelizeModule.forFeature([Vinyl, Review])],
})
export class VinylsModule {}
