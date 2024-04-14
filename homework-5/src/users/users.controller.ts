import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Только обновление пользователей, без регистрации

  @Post('user')
  registration(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }


  @Post('login')
  login(@Body() userDto: LoginUserDto) {
    return this.usersService.login(userDto);
  }

}
