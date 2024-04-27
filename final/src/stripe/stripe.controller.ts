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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Request } from 'express';
import { AllInformationUserDto } from '../users/dto/all-information-user.dto';

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

  @Get('/success')
  stripeSuccess(@Query() mail: string, @Query() name: string) {
    return this.stripeService.success(mail, name);
  }

  @Get('/cansel')
  stripeCansel() {
    return this.stripeService.cansel();
  }
}
