import {
  Controller,
  Post,
  Body,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikeDto } from './dto/like.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createLikeDto: LikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put()
  update(@Body() dto: LikeDto) {
    return this.likesService.update(dto);
  }
}
