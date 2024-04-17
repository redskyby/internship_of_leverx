import {
  Controller,
  Post,
  Body,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put()
  update(@Body() dto: UpdateLikeDto) {
    return this.likesService.update(dto);
  }
}
