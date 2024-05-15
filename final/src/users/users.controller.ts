import {
  Controller,
  Body,
  UsePipes,
  Get,
  UseGuards,
  Req,
  Put,
  Delete,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AllInformationUserDto } from './dto/all-information-user.dto';
import { Request, Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

declare module 'express' {
  interface Request {
    user?: AllInformationUserDto;
  }
}

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Информация об пользователе' })
  @ApiCookieAuth('auth_token')
  @ApiResponse({
    status: 200,
    description: 'Успешный вход',
    type: AllInformationUserDto,
  })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @ApiResponse({ status: 401, description: 'Неавторизованный' })
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  profile(@Req() req: Request) {
    return this.usersService.showUser(req.user);
  }

  @ApiOperation({ summary: 'Редактирование информация об пользователе' })
  @ApiCookieAuth('auth_token')
  @ApiBody({ type: UpdateUserDto, description: 'Новая информация' })
  @ApiResponse({
    status: 200,
    description: 'Успешное редактирование',
    type: AllInformationUserDto,
  })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @ApiResponse({
    status: 500,
    description: 'Ошибка при редактировании',
  })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('/user')
  editProfile(@Req() req: Request, @Body() userDto: UpdateUserDto) {
    return this.usersService.editProfile(req.user, userDto);
  }

  @ApiOperation({
    summary: 'Удаление информация об пользователе и выход из системы',
  })
  @ApiCookieAuth('auth_token')
  @ApiResponse({ status: 200, description: 'Профиль удален' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @ApiResponse({ status: 401, description: 'Неавторизованный' })
  @UseGuards(JwtAuthGuard)
  @Delete('/user')
  deleteProfile(@Req() req: Request, @Res() res: Response) {
    return this.usersService.deleteProfile(req.user, res);
  }
}
