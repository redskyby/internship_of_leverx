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
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleAuth(@Req() req) {}

  @UseGuards(AuthGuard('google'))
  @Get('/google/callback')
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

  @UsePipes(ValidationPipe)
  @Post('/login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get('/logout')
  logout(@Res() res) {
    return this.authService.logOut(res);
  }
}
