import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Только обновление пользователей, без регистрации

  @Post('user')
  registration(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  // Только для теста, убрать потом

  @Post('login')
  login(@Body() userDto: LoginUserDto) {
    return this.usersService.login(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  log(@Body() userDto: LoginUserDto) {
    return this.usersService.login(userDto);
    return userDto;
  }
}
