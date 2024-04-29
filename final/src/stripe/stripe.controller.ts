import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UsePipes,
  Req,
  Query,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Request } from 'express';
import { AllInformationUserDto } from '../users/dto/all-information-user.dto';
import { SendInformationDto } from './dto/send-information.dto';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

declare module 'express' {
  interface Request {
    user?: AllInformationUserDto;
  }
}
@ApiTags('Stripe')
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @ApiOperation({ summary: 'Создание платежа через Stripe' })
  @ApiCookieAuth('auth_token')
  @ApiResponse({ status: 201, description: 'Редирект на страницу покупки' })
  @ApiResponse({ status: 400, description: 'Редирект на страницу отказа' })
  @ApiResponse({
    status: 404,
    description: 'Такого пользователя не существует',
  })
  @ApiResponse({ status: 404, description: 'Корзина пуста' })
  @ApiResponse({ status: 403, description: 'Нет валидации' })
  @ApiBody({ type: CreateStripeDto })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('stripe')
  create(@Body() createStripeDto: CreateStripeDto, @Req() req: Request) {
    return this.stripeService.createPayments(createStripeDto, req.user);
  }

  @ApiOperation({ summary: 'Обработка успешного платежа в Stripe' })
  @ApiQuery({
    name: 'name',
    type: 'string',
    description: 'Имя пользователя',
    example: 'John',
  })
  @ApiQuery({
    name: 'email',
    type: 'string',
    description: 'Email пользователя',
    example: 'user@example.com',
  })
  @ApiResponse({
    status: 200,
    description: 'Спасибо за оплату, ваш платеж обрабатывается',
  })
  @UsePipes(ValidationPipe)
  @Get('/success')
  stripeSuccess(@Query() dto: SendInformationDto) {
    return this.stripeService.success(dto);
  }

  @ApiOperation({ summary: 'Отмена платежа в Stripe' })
  @ApiResponse({ status: 200, description: 'Произошла ошибка' })
  @Get('/cansel')
  stripeCansel() {
    return this.stripeService.cansel();
  }
}
