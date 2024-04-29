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
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Review } from './entities/review.entity';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({ summary: 'Дать оценку' })
  @ApiCookieAuth('auth_token')
  @ApiResponse({
    status: 201,
    description: 'Отзыв успешно создан',
    type: Review,
  })
  @ApiResponse({ status: 400, description: 'Ошибка валидации' })
  @ApiResponse({ status: 403, description: 'Нет авторизации' })
  @ApiBody({ type: CreateReviewDto })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('review')
  create(@Body() dto: CreateReviewDto) {
    return this.reviewsService.create(dto);
  }

  @ApiOperation({ summary: 'Получение всех отзывов с пагинацией' })
  @ApiCookieAuth('auth_token')
  @ApiParam({
    name: 'offset',
    type: 'integer',
    description: 'Смещение для пагинации',
    example: 0,
  })
  @ApiParam({
    name: 'limit',
    type: 'integer',
    description: 'Лимит количества элементов для пагинации',
    example: 10,
  })
  @ApiResponse({ status: 200, description: 'Список отзывов', type: [Review] })
  @ApiResponse({ status: 403, description: 'Нет авторизации' })
  @ApiResponse({
    status: 400,
    description: 'Задайте другие настройки поиска или список пуст',
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ParseIntPipe)
  @Get('reviews/:offset/:limit')
  findAll(@Param('offset') offset: number, @Param('limit') limit: number) {
    return this.reviewsService.findAll(offset, limit);
  }

  @ApiOperation({ summary: 'Удаление отзыва по ID' })
  @ApiCookieAuth('auth_token')
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'Идентификатор отзыва для удаления',
    example: 1,
  })
  @ApiResponse({ status: 200, description: 'Отзыв удален' })
  @ApiResponse({ status: 404, description: 'Отзывов с таким id не существует' })
  @ApiResponse({ status: 403, description: 'Нет авторизации' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ParseIntPipe)
  @Delete('reviews/:id')
  remove(@Param('id') id: number) {
    return this.reviewsService.remove(id);
  }
}
