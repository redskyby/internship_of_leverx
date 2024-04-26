import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  registration(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  profile(@Req() req) {
    return this.usersService.showUser();
  }
}
