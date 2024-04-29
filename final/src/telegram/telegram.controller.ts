import {
  Controller,
  Get, UseGuards, UsePipes,
} from '@nestjs/common';
import {TelegramService} from "./telegram.service";
import {ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Telegram')
@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegram: TelegramService) {}


  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get('/telegram')
  test(){
    return this.telegram.create();
  }
}
