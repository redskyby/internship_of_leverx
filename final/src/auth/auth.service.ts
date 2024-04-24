import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  googleLogin(req) {
    const { user } = req;

    if (!user) {
      throw new NotFoundException('Юзер не найден.');
    }

    return user;
  }

  login(userDto: LoginUserDto) {}

  registration(userDto: CreateUserDto) {
    return Promise.resolve(undefined);
  }
}
