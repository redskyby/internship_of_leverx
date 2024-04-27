import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('review')
  create(@Body() dto: CreateReviewDto) {
    return this.reviewsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ParseIntPipe)
  @Get('reviews/:offset/:limit')
  findAll(@Param('offset') offset: number, @Param('limit') limit: number) {
    return this.reviewsService.findAll(offset, limit);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ParseIntPipe)
  @Delete('reviews/:id')
  remove(@Param('id') id: number) {
    return this.reviewsService.remove(id);
  }
}
