import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  UsePipes,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Purchase } from './schemas/purchases.schema';
import { AllInformationUserDto } from '../users/dto/all-information-user.dto';
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: AllInformationUserDto;
  }
}

@ApiTags('Purchases')
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @ApiOperation({ summary: 'Создание новой покупки' })
  @ApiCookieAuth('auth_token')
  @ApiResponse({
    status: 201,
    description: 'Покупка успешно создана',
    type: Purchase,
  })
  @ApiResponse({ status: 403, description: 'Не авторизован' })
  @ApiResponse({
    status: 403,
    description: 'Такая покупка уже есть в вашей корзине',
  })
  @ApiResponse({ status: 404, description: 'Нет такого пользователя' })
  @ApiResponse({ status: 404, description: 'Нет такой пластинки' })
  @ApiBody({ type: CreatePurchaseDto })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('purchase')
  create(@Body() dto: CreatePurchaseDto) {
    return this.purchasesService.create(dto);
  }

  @ApiOperation({
    summary: 'Удаление покупки по ID из mongoDB после успешной оплаты',
  })
  @ApiCookieAuth('auth_token')
  @ApiResponse({ status: 200, description: 'Покупка успешно удалена' })
  @ApiResponse({
    status: 404,
    description: 'Такой покупки нет в вашей корзине',
  })
  @ApiResponse({ status: 403, description: 'Не авторизован' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ParseIntPipe)
  @Delete('purchase')
  remove(@Req() req: Request) {
    return this.purchasesService.remove(req.user.id);
  }
}
