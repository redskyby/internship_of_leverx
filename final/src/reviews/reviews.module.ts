import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './entities/review.entity';
import { User } from '../users/entities/user.entity';
import { Vinyl } from '../vinyls/entities/vinyl.entity';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [SequelizeModule.forFeature([Review, User, Vinyl])],
})
export class ReviewsModule {}
