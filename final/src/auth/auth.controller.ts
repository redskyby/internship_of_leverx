import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  UsePipes,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '../pipes/validation.pipe';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { AuthSwaggerInterface } from '../interfaces/auth-swagger.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Вход в приложение users с помощью учетной записи google',
  })
  @ApiResponse({ status: 200, description: 'Успешный вход в систему' })
  @ApiResponse({ status: 401, description: 'Неавторизованный' })
  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleAuth(@Req() req) {}

  @ApiOperation({ summary: 'Обработчик перенаправления Google' })
  @ApiResponse({
    status: 302,
    description: 'Перенаправление после успешного входа',
  })
  @ApiResponse({ status: 401, description: 'Неавторизованный' })
  @UseGuards(AuthGuard('google'))
  @Get('/google/callback')
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

  @ApiOperation({ summary: 'Вход в систему посредством ввода данных' })
  @ApiBody({ type: LoginUserDto, description: 'Данные для входа' })
  @ApiResponse({
    status: 200,
    description: 'Успешный вход',
    type: AuthSwaggerInterface,
  })
  @ApiResponse({ status: 403, description: 'Неверный пароль.' })
  @ApiResponse({
    status: 400,
    description: 'Пользователь с таким email не существует',
  })
  @UsePipes(ValidationPipe)
  @Post('/login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Регистрация в системе посредством ввода данных' })
  @ApiBody({ type: CreateUserDto, description: 'Данные для входа' })
  @ApiResponse({
    status: 200,
    description: 'Успешный вход',
    type: AuthSwaggerInterface,
  })
  @ApiResponse({ status: 403, description: 'Неверный пароль.' })
  @ApiResponse({
    status: 400,
    description: 'Пользователь с таким email уже существует',
  })
  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Выход из сеанса.' })
  @ApiCookieAuth('auth_token')
  @ApiResponse({ status: 200, description: 'Успешный выход из системы' })
  @ApiResponse({ status: 401, description: 'Неавторизованный' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get('/logout')
  logout(@Res() res) {
    return this.authService.logOut(res);
  }
}
