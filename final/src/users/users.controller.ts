import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  registration(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
}
