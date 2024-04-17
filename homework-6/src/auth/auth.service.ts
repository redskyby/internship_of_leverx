import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CheckException } from '../exceptions/check.exception';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  public async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new CheckException('Пользователь с таким email уже существует.');
    }
    const hashPassword = await bcrypt.hash(userDto.password, 3);

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user) {
    const payload = {
      email: user.email,
      id: user.id,
      name: user.name,
      lastName: user.lastName,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (!user) {
      throw new BadRequestException(
        'Пользователь с таким email не существует.',
      );
    }

    const passwordCompare = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (!passwordCompare) {
      throw new BadRequestException('Неверный пароль.');
    }
    return user;
  }
}
