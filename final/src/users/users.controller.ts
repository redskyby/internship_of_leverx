import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  UseGuards,
  Req,
  Put, Delete, Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AllInformationUserDto } from './dto/all-information-user.dto';
import { Request , Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';

declare module 'express' {
  interface Request {
    user?: AllInformationUserDto;
  }
}

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
  profile(@Req() req: Request) {
    return this.usersService.showUser(req.user);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('/user')
  editProfile(@Req() req: Request, @Body() userDto: UpdateUserDto) {
    return this.usersService.editProfile(req.user, userDto);
  }


  @UseGuards(JwtAuthGuard)
  @Delete('/user')
  deleteProfile(@Req() req: Request , @Res() res : Response) {
    return this.usersService.deleteProfile(req.user , res);
  }
}
