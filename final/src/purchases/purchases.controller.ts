import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Purchases')
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('purchase')
  create(@Body() dto: CreatePurchaseDto) {
    return this.purchasesService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ParseIntPipe)
  @Delete('purchase/:id')
  remove(@Param('id') id: number) {
    return this.purchasesService.remove(id);
  }
}
