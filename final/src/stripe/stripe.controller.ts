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

declare module 'express' {
  interface Request {
    user?: AllInformationUserDto;
  }
}
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('stripe')
  create(@Body() createStripeDto: CreateStripeDto, @Req() req: Request) {
    return this.stripeService.createPayments(createStripeDto, req.user);
  }

  @UsePipes(ValidationPipe)
  @Get('/success')
  stripeSuccess(@Query() dto: SendInformationDto) {
    return this.stripeService.success(dto);
  }

  @Get('/cansel')
  stripeCansel() {
    return this.stripeService.cansel();
  }
}
